# Video Search Feature Documentation

## Overview

The Food History app now includes an AI-powered video search system that helps teachers find and add relevant educational YouTube videos to lessons.

## Features

### 1. **AI-Powered Search**
- Uses OpenAI GPT-4 or Anthropic Claude to generate optimized search queries
- Analyzes lesson content to find the most relevant videos
- Suggests appropriate educational channels
- Filters for educational, age-appropriate content

### 2. **Simple Keyword Search**
- Direct YouTube API search with custom queries
- Useful for specific video lookups
- Fast and straightforward

### 3. **Video Management**
- Search and preview videos before adding
- See video metadata (duration, views, channel)
- Direct links to watch videos on YouTube
- Add videos to specific lessons

## Setup

### 1. Environment Variables

Add these API keys to your Vercel environment variables:

```bash
# YouTube Data API (required)
YOUTUBE_API_KEY=your_youtube_api_key

# AI Services (choose at least one)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 2. Get API Keys

**YouTube Data API:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Restrict the API key to YouTube Data API v3

**OpenAI:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key in the API keys section
3. Add it to your environment variables

**Anthropic:**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an API key
3. Add it to your environment variables

### 3. Deploy to Vercel

After adding the environment variables:

```bash
git add .
git commit -m "Add video search feature"
git push origin main
```

Vercel will automatically redeploy with the new environment variables.

## Usage

### Admin Interface

Navigate to `/admin/videos` to access the video search interface.

#### AI-Powered Search:
1. Enter the Unit Title (optional)
2. Enter the Lesson Title (required)
3. Paste lesson content or key topics (required)
4. Click "Search Videos"
5. Browse results and add to lessons

#### Simple Search:
1. Switch to "Simple Search" tab
2. Enter keywords (e.g., "ancient food preservation CrashCourse")
3. Click "Search Videos"
4. Browse results

### API Endpoints

#### POST `/api/videos/search`
AI-powered video search

Request:
```json
{
  "lessonTitle": "The Agricultural Revolution",
  "lessonContent": "Learn about how humans transitioned from hunting...",
  "unitTitle": "The Origins of Food",
  "useAI": true,
  "aiProvider": "anthropic",
  "maxResults": 10
}
```

Response:
```json
{
  "success": true,
  "videos": [
    {
      "videoId": "abc123",
      "title": "Video Title",
      "description": "...",
      "channelTitle": "CrashCourse",
      "thumbnailUrl": "https://...",
      "durationSeconds": 845,
      "viewCount": 1234567
    }
  ],
  "count": 10
}
```

#### GET `/api/videos/search?query=...`
Simple keyword search

Parameters:
- `query`: Search keywords (required)
- `maxResults`: Number of results (default: 10)

## Code Structure

```
src/
├── lib/
│   ├── youtube.ts              # YouTube API utilities
│   └── ai-video-search.ts     # AI query generation
├── app/
│   ├── api/
│   │   └── videos/
│   │       └── search/
│   │           └── route.ts   # Search API endpoint
│   └── admin/
│       └── videos/
│           └── page.tsx       # Admin video search page
└── components/
    └── admin/
        └── VideoSearchAdmin.tsx  # Video search UI
```

## Preferred Educational Channels

The AI is configured to prioritize these educational channels:

- CrashCourse
- TED-Ed
- Kurzgesagt
- PBS Eons
- Vox
- SciShow
- History Channel
- National Geographic
- Tasting History
- Bon Appétit

## Configuration

### Video Duration Filters

- **Short**: < 4 minutes
- **Medium**: 4-20 minutes (default)
- **Long**: > 20 minutes

### Search Parameters

Customize in `src/lib/youtube.ts`:

```typescript
searchYouTubeVideos({
  query: "your search",
  maxResults: 10,
  videoDuration: 'medium',  // short | medium | long
  order: 'relevance',        // relevance | date | rating | viewCount
  safeSearch: 'strict'       // none | moderate | strict
})
```

## Best Practices

1. **Use AI Search for New Lessons**: Let AI analyze your content and find optimal videos
2. **Use Simple Search for Specific Videos**: When you know exactly what you're looking for
3. **Review Before Adding**: Always preview videos before adding them to lessons
4. **Check Duration**: Aim for 5-15 minute videos for classroom use
5. **Verify Content**: Ensure videos match your curriculum standards

## Troubleshooting

### "YouTube API key not configured"
- Ensure `YOUTUBE_API_KEY` is set in Vercel environment variables
- Redeploy after adding the variable

### "AI search failed, falling back to basic search"
- Check that `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` is set
- Verify API keys are valid and have quota remaining
- The system will automatically fall back to basic search

### "Failed to search videos"
- Check API quota limits (YouTube: 10,000 units/day free tier)
- Verify all API keys are correctly formatted
- Check Vercel logs for detailed error messages

## Costs

### YouTube Data API
- Free tier: 10,000 quota units/day
- Each search costs ~100 units
- ~100 free searches per day

### OpenAI
- GPT-4 Turbo: ~$0.01 per query generation
- Recommended for production

### Anthropic
- Claude Sonnet: ~$0.003 per query generation
- More cost-effective, similar quality

## Future Enhancements

- [ ] Bulk video import from CSV
- [ ] Video transcription and search
- [ ] Student video annotations
- [ ] Video quiz generation
- [ ] Playlist management
- [ ] Video analytics (watch time, completion rate)
