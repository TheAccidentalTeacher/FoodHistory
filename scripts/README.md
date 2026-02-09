# Database Seeding Scripts

This directory contains scripts for populating the Supabase database with course content.

## Available Scripts

### `seed-database.ts`

Seeds the database with units, lessons, videos, quizzes, and questions from unit specification markdown files.

**Features:**
- Parses markdown specification files (UNIT-X-COMPLETE-SPECIFICATION.md)
- Extracts unit metadata, lessons, quiz questions
- Inserts content into Supabase database
- Supports seeding all units or a specific unit
- Uses service role key to bypass Row Level Security

**Prerequisites:**
1. Supabase project created and configured
2. Database schema executed (from `database/init-schema.sql`)
3. Environment variables set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Usage:**

Seed all available units (Units 4, 5, 6):
```bash
npm run seed
```

Seed a specific unit:
```bash
npm run seed -- --unit 4
```

**What gets seeded:**

For each unit:
- ✅ Unit record with metadata
- ✅ Lessons (4 per unit)
- ✅ Quiz for each lesson
- ✅ Quiz questions (extracted from specification)
- ✅ Video records (YouTube IDs extracted from content)

**What doesn't get seeded yet:**
- ⏳ Reading sections (needs manual breakdown)
- ⏳ Activities (needs structured data)
- ⏳ Essay prompts (needs extraction from spec)
- ⏳ Project prompts (needs extraction from spec)

**Example Output:**
```
🌱 Food Throughout History - Database Seeder

📡 Connected to: https://xxxxx.supabase.co
🎯 Seeding Unit 4 only

📦 Seeding Unit 4...
  📝 Inserting unit: Ancient Mesopotamia - The Cradle of Cuisine
  ✅ Unit inserted with ID: 1
    📄 Inserting Lesson 1: The Fertile Crescent and Agricultural Revolution
      🎯 Creating quiz with 10 questions
      ✅ Inserted 10 questions
      🎬 Inserted 3 videos
    📄 Inserting Lesson 2: Sumerian Feasts and Temple Offerings
      🎯 Creating quiz with 10 questions
      ✅ Inserted 10 questions
      🎬 Inserted 2 videos
✅ Unit 4 seeded successfully!

🎉 Seeding complete!
```

## How the Parser Works

### Unit Metadata Extraction

Looks for markdown patterns like:
```markdown
# Unit 4: Ancient Mesopotamia
**Geographic Focus:** Mesopotamia (modern-day Iraq)
**Historical Era:** 8000 BCE - 539 BCE
**Duration:** 4 weeks
```

### Lesson Extraction

Finds lesson sections:
```markdown
## Lesson 1: The Fertile Crescent
Content here...
```

Extracts:
- Lesson title and number
- Full content (markdown)
- Video IDs from YouTube links
- Reading time estimate

### Quiz Question Parsing

Identifies quiz sections:
```markdown
### Lesson 1 Quiz

1. What crops were first domesticated in Mesopotamia?
   A) Wheat and barley
   B) Rice and millet
   C) Corn and beans
   D) Oats and rye
   **Answer:** A
   **Explanation:** The Fertile Crescent...
```

Extracts:
- Question text
- Multiple choice options (A-D)
- Correct answer
- Explanation

## Extending the Seeder

### Adding Reading Section Parsing

To parse reading sections, add logic to split lesson content into sections:

```typescript
function parseReadingSections(lessonContent: string): ReadingSection[] {
  const sections = lessonContent.split(/### (.+)/)
  return sections.map((section, index) => ({
    section_number: index + 1,
    title: extractTitle(section),
    content: extractContent(section),
    word_count: countWords(section),
    order: index + 1
  }))
}
```

### Adding Activity Parsing

Extract activities from markdown:

```markdown
**Activity: Map Exercise**
Instructions: Click on the map to identify...
Content: { "type": "click_country", "countries": ["Iraq", "Syria"] }
```

### Adding Essay/Project Prompts

Extract prompts from unit spec:

```markdown
**Essay Prompt:**
Write a 1000-word essay comparing...

**Hands-On Project:**
Create an infographic showing...
```

## Validation & Testing

After seeding, verify in Supabase dashboard:

1. **Table Editor** → `units` - Should see seeded units
2. **Table Editor** → `lessons` - Should see 4 lessons per unit
3. **Table Editor** → `quizzes` - Should see 1 quiz per lesson
4. **Table Editor** → `quiz_questions` - Should see 10-15 questions per quiz
5. **Table Editor** → `videos` - Should see video records

## Troubleshooting

**Error: "Missing environment variables"**
- Solution: Make sure `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

**Error: "File not found"**
- Solution: Make sure unit specification files exist in project root (e.g., `UNIT-4-COMPLETE-SPECIFICATION.md`)

**Error: "relation does not exist"**
- Solution: Run database schema first (`database/init-schema.sql` in Supabase SQL Editor)

**Error: "permission denied"**
- Solution: Make sure you're using `SUPABASE_SERVICE_ROLE_KEY`, not the anon key

**Partial data inserted:**
- Check Supabase logs in dashboard
- Verify markdown format matches expected patterns
- Add console.log statements to debug parser

## Future Enhancements

- [ ] Parse reading sections from markdown headers
- [ ] Extract activities with structured JSON data
- [ ] Pull essay prompts from specification files
- [ ] Extract project requirements
- [ ] Add validation for parsed data
- [ ] Support incremental updates (re-seeding without duplicates)
- [ ] Add dry-run mode to preview changes
- [ ] Generate seed data report (what was inserted)
- [ ] Support seeding from JSON files (for easier editing)
- [ ] Add rollback functionality

## Performance

- Seeds Unit 4 (4 lessons, 40 questions, 10 videos): ~5 seconds
- Seeds Units 4-6 (12 lessons total): ~15 seconds
- Uses `upsert` to avoid duplicates on re-runs

## Security Notes

⚠️ **Never commit `.env.local` with real credentials!**

The seeding script uses the **service role key** which bypasses all Row Level Security policies. This is necessary for bulk operations but should never be exposed to the client or committed to git.

In production:
- Run seeding scripts in CI/CD pipeline or admin interface
- Use separate database for development vs production
- Consider using Supabase CLI migrations instead of direct seeding
