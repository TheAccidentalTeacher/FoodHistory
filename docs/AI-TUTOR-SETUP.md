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

### Phase 2: Contextual Prompts (NOW IMPLEMENTED!)

Contextual prompts are now embedded in lesson content. To activate:

1. **Run the SQL script** to add prompts to Unit 1:
   ```bash
   # In Supabase SQL Editor, run:
   database/add-contextual-prompts.sql
   ```

2. **How it works:**
   - Beautiful "💭 Think about it..." boxes appear inline with lesson text
   - Prompts spark curiosity where students naturally wonder "why?"
   - Clicking a prompt opens the tutor with that question pre-loaded
   - AI responds contextually based on what the student was reading

3. **Example prompts in lessons:**
   - "Have you ever wondered why rice is a staple food in Asia but not in Europe?"
   - "Think about your breakfast this morning. Where did each item come from?"
   - "If climate determines what can grow, how might climate change affect available foods?"

4. **Testing:**
   - Navigate to Unit 1, Lesson 1
   - Scroll through the reading tab
   - Look for gradient-colored prompt boxes
   - Click one - the tutor should open and automatically ask the question
   - AI should reference what you were reading

### Future Phases:

- [ ] Phase 3: Proactive assistance when students struggle
- [ ] Phase 4: Activity helpers with pre-loaded questions
- [ ] Video discovery integration
- [ ] Map geographic analysis prompts
