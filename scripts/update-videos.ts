import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { unit1Videos } from './real-youtube-videos'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function updateVideos() {
  console.log('\n🎥 Updating Unit 1 videos with real YouTube IDs...\n')

  // Get lesson IDs for Unit 1
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_number')
    .eq('unit_id', 10)
    .order('lesson_number')

  if (!lessons) {
    console.log('❌ No lessons found')
    return
  }

  const videoMap: any = {
    1: unit1Videos.lesson1,
    2: unit1Videos.lesson2,
    3: unit1Videos.lesson3,
    4: unit1Videos.lesson4
  }

  for (const lesson of lessons) {
    const videos = videoMap[lesson.lesson_number]
    if (!videos) continue

    console.log(`\n📚 Lesson ${lesson.lesson_number}:`)

    // Get existing videos for this lesson
    const { data: existingVideos } = await supabase
      .from('videos')
      .select('id, sequence_order')
      .eq('lesson_id', lesson.id)
      .order('sequence_order')

    if (!existingVideos || existingVideos.length === 0) {
      console.log('  ⚠️  No videos found, inserting new...')
      
      // Insert new videos
      for (let i = 0; i < videos.length; i++) {
        const v = videos[i]
        const { error } = await supabase
          .from('videos')
          .insert({
            lesson_id: lesson.id,
            title: v.title,
            youtube_id: v.id,
            duration_seconds: v.duration,
            description: `${v.title} from ${v.channel}`,
            sequence_order: i + 1
          })

        if (error) {
          console.log(`  ❌ Error inserting video ${i + 1}:`, error.message)
        } else {
          console.log(`  ✅ Video ${i + 1}: ${v.title}`)
        }
      }
    } else {
      // Update existing videos
      for (let i = 0; i < Math.min(videos.length, existingVideos.length); i++) {
        const v = videos[i]
        const existing = existingVideos[i]

        const { error } = await supabase
          .from('videos')
          .update({
            youtube_id: v.id,
            title: v.title,
            duration_seconds: v.duration,
            description: `${v.title} from ${v.channel}`
          })
          .eq('id', existing.id)

        if (error) {
          console.log(`  ❌ Error updating video ${i + 1}:`, error.message)
        } else {
          console.log(`  ✅ Video ${i + 1}: ${v.title} (${v.id})`)
        }
      }
    }
  }

  console.log('\n✅ Video update complete!\n')
}

updateVideos()
