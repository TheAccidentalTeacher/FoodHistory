# AI Tutor Setup Instructions

## 1. Database Setup

Run the SQL schema in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy the contents of `database/tutor-schema.sql`
4. Run the SQL

This will create:
- `tutor_conversations` table
- `tutor_messages` table
- Appropriate indexes
- RLS policies
- Trigger for updating conversation activity

## 2. Environment Variables

Ensure these are set in Vercel (already configured):
```
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key (optional, for fallback)
```

## 3. Deploy

```bash
git add -A
git commit -m "Add AI Tutor with geographic framework"
git push origin main
```

Vercel will automatically deploy.

## 4. Testing

1. Navigate to any lesson (e.g., `/units/10/lessons/110`)
2. Click the floating chat icon in bottom-right corner
3. Try asking:
   - "How does geography affect this topic?"
   - "Help me understand the location context"
   - "What connections can I make to previous lessons?"
   - "Help me find videos about this topic"

## 5. Expected Behavior

The AI Tutor should:
- ✅ Use Socratic method (ask questions before giving answers)
- ✅ Reference the 5 Themes of Geography explicitly (Location, Place, HEI, Movement, Region)
- ✅ Help develop search strategies for videos
- ✅ Make connections across lessons
- ✅ Track conversation history
- ✅ Display geographic themes as badges

## Troubleshooting

**Chat doesn't open:**
- Check browser console for errors
- Verify API keys are set in Vercel

**AI doesn't respond:**
- Check Supabase tables exist
- Verify RLS policies allow student access
- Check Anthropic API key is valid

**Themes not displaying:**
- Content analysis extracts themes automatically
- Themes appear as colored badges below AI messages

## Next Steps

- [ ] Add contextual prompts in lesson content (Phase 2)
- [ ] Proactive assistance when students struggle (Phase 3)
- [ ] Activity helpers with pre-loaded questions
- [ ] Video discovery integration
- [ ] Map geographic analysis prompts
