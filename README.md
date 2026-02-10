# 🍎 Food History - Interactive Learning Platform

> A comprehensive food history curriculum platform built with Next.js, Supabase, and AI-powered features

**Live Application:** [https://food-history.vercel.app](https://food-history.vercel.app)

---

## 📋 **→ [VIEW TODO & NEXT STEPS](./TODO.md) ←**

**Current Status:** Unit 1 Complete & Deployed ✅  
**Priority:** AI Tutor Integration → Map Enhancements → Video Database Integration

---

## 🎯 Project Overview

Food History is an interactive educational platform designed to teach students about the fascinating history of food, agriculture, and culinary traditions across human civilization. The platform combines reading materials, educational videos, interactive activities, quizzes, and AI-powered features to create an engaging learning experience.

### Key Features

- ✅ **20-Unit Curriculum** (Unit 1 complete, 5 more ready to deploy)
- ✅ **Interactive Lessons** with rich content and multimedia
- ✅ **Educational Videos** curated from top channels (CrashCourse, TED-Ed, PBS, etc.)
- ✅ **Interactive Map Activities** exploring food origins across continents
- ✅ **Quiz System** with auto-grading and detailed explanations
- ✅ **Reflection Activities** with word count tracking
- ✅ **AI-Powered Video Search** using OpenAI/Anthropic
- 🚧 **AI Tutor** (Coming next)
- 🚧 **Enhanced Map Features** (In planning)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- (Optional) OpenAI, Anthropic, YouTube API keys

### Installation

```bash
# Clone the repository
git clone https://github.com/TheAccidentalTeacher/FoodHistory.git
cd FoodHistory

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Database Setup

```bash
# Run Supabase migrations (if provided)
# Or manually create tables using scripts in database/

# Seed Unit 1 content
npm run seed:unit -- --unit=1
```

See [SUPABASE-SETUP-GUIDE.md](./SUPABASE-SETUP-GUIDE.md) for detailed database setup.

---

## 📁 Project Structure

```
FoodHistory/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── units/[unitId]/      # Unit pages
│   │   ├── lessons/[lessonId]/  # Lesson pages
│   │   ├── admin/               # Admin tools
│   │   └── api/                 # API routes
│   ├── components/              # React components
│   │   ├── quiz/                # Quiz interface
│   │   ├── lessons/             # Lesson components
│   │   ├── admin/               # Admin components
│   │   └── ui/                  # shadcn/ui components
│   └── lib/                     # Utilities
│       ├── supabase.ts          # Supabase client
│       ├── youtube.ts           # YouTube API
│       └── ai-video-search.ts   # AI video search
├── scripts/                     # Database seeding scripts
├── docs/                        # Documentation
├── database/                    # SQL schemas
├── UNIT-1-COMPLETE-SPECIFICATION.md  # Content files
├── TODO.md                      # Next steps & roadmap
└── README.md                    # You are here
```

---

## 🔑 Environment Variables

Required variables for full functionality:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# YouTube API (Required for video search)
YOUTUBE_API_KEY=your_youtube_api_key

# AI Services (Optional - for AI tutor & video search)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

See [.env.example](./.env.example) for complete list.

---

## 🎓 Content Overview

### Unit 1: The Origins of Food ✅
- 4 comprehensive lessons
- 12 curated educational videos
- Interactive continent exploration map
- Reflection activities with essays
- 18 quiz questions with auto-grading

### Units 2-6: Ready to Deploy
- Unit 2: Agricultural Revolutions
- Unit 3: Ancient Food Systems
- Unit 4: Medieval Food & Trade
- Unit 5: The Columbian Exchange
- Unit 6: Industrial Food Revolution

### Units 7-20: In Development
See [TODO.md](./TODO.md) for content creation roadmap.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Maps:** Leaflet + react-leaflet
- **AI:** OpenAI GPT-4, Anthropic Claude
- **Video:** YouTube Data API v3
- **Deployment:** Vercel

---

## 📚 Documentation

- **[TODO & Next Steps](./TODO.md)** - Complete roadmap and priorities
- **[Video Search Feature](./docs/VIDEO-SEARCH-FEATURE.md)** - AI-powered video search guide
- **[Supabase Setup](./SUPABASE-SETUP-GUIDE.md)** - Database configuration
- **[Deployment Guide](./VERCEL-DEPLOYMENT.md)** - Deploy to Vercel
- **[Implementation Roadmap](./IMPLEMENTATION-ROADMAP.md)** - Original planning doc

---

## 🎯 Current Priorities

1. **AI Tutor Integration** - Chat interface for student questions
2. **Enhanced Map Features** - Rich interactive maps with trade routes, timelines
3. **Video Database Integration** - Connect search to database saves
4. **Units 2-6 Deployment** - Seed and test remaining content
5. **Teacher Tools** - Grade book, class management

See full prioritized list in [TODO.md](./TODO.md).

---

## 🤝 Contributing

This project is currently in active development. Contributions, issues, and feature requests are welcome!

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Component-driven architecture

---

## 📝 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run seed:unit -- --unit=1    # Seed specific unit
npm run seed:all                  # Seed all units (when available)

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking

# Deployment
git push origin main  # Auto-deploys to Vercel
```

---

## 📞 Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Leaflet Documentation](https://leafletjs.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)

### API References
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)

### Credentials
- See `DEPLOYMENT-CREDENTIALS.md` for API keys
- See `SUPABASE-CREDENTIALS.txt` for database access

---

## 📜 License

[Add your license here]

---

## 🙏 Acknowledgments

- Educational content inspired by leading food historians
- Video content from CrashCourse, TED-Ed, PBS Eons, Vox, and other educational channels
- Built with amazing open-source tools

---

**Last Updated:** February 10, 2026  
**Version:** 1.0.0 (Unit 1 Complete)  
**Status:** ✅ Production Ready (Unit 1)
