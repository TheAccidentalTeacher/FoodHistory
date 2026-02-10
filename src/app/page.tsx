import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            🍽️ Food Throughout History
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A Comprehensive Culinary Journey Through 10,000 Years of Human Civilization
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📚 20 Comprehensive Units
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explore food history from the Agricultural Revolution to modern molecular gastronomy across 80+ lessons
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗺️ Geography Mastery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Improve geography skills from 2/10 to 10/10 through interactive maps and trade route exploration
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎥 Rich Media Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Watch curated videos, view historical images, and engage with interactive activities
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🤖 AI Tutor Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized help using the Socratic method - guides you to discover answers yourself
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ✅ Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track lesson completion, quiz scores, and skill development with detailed analytics
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👨‍🍳 Culinary Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Designed for aspiring Michelin-star chefs to understand the historical context of cuisine
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students exploring the fascinating intersection of food, culture, and history. 
              From ancient agricultural practices to modern molecular gastronomy.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Create Your Free Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

