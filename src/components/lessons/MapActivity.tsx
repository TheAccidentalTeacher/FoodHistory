'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polygon, useMap, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

interface ContinentData {
  name: string
  bounds: LatLngExpression[]
  color: string
  foods: string[]
  fact: string
  explored: boolean
}

interface MapActivityProps {
  onComplete: () => void
}

export default function MapActivity({ onComplete }: MapActivityProps) {
  const [continents, setContinents] = useState<Record<string, ContinentData>>({
    africa: {
      name: 'Africa',
      bounds: [[37, -18], [-35, -18], [-35, 52], [37, 52]],
      color: '#f97316',
      foods: ['Coffee (Ethiopia)', 'Okra', 'Watermelon', 'Yams', 'Sorghum', 'Kola nuts'],
      fact: 'Africa has incredible agricultural diversity! Different regions developed different crops.',
      explored: false
    },
    asia: {
      name: 'Asia',
      bounds: [[55, 25], [-10, 25], [-10, 150], [55, 150]],
      color: '#ef4444',
      foods: ['Rice', 'Tea (China)', 'Black pepper (India)', 'Cinnamon (Sri Lanka)', 'Soybeans', 'Mangoes'],
      fact: 'Asia was the origin of the spice trade that shaped world history for thousands of years.',
      explored: false
    },
    europe: {
      name: 'Europe',
      bounds: [[71, -25], [36, -25], [36, 45], [71, 45]],
      color: '#3b82f6',
      foods: ['Wheat varieties', 'Olives', 'Grapes', 'Oats', 'Beets', 'Many cheeses'],
      fact: 'Many "European" foods actually came from elsewhere! Tomatoes, potatoes, and corn all arrived AFTER 1492.',
      explored: false
    },
    northAmerica: {
      name: 'North America',
      bounds: [[72, -170], [15, -170], [15, -52], [72, -52]],
      color: '#10b981',
      foods: ['Corn/Maize', 'Wild rice', 'Squash', 'Beans', 'Blueberries', 'Pecans', 'Sunflowers'],
      fact: 'The "Three Sisters" (corn, beans, squash) were grown together in an ingenious agricultural system.',
      explored: false
    },
    southAmerica: {
      name: 'South America',
      bounds: [[13, -82], [-56, -82], [-56, -34], [13, -34]],
      color: '#8b5cf6',
      foods: ['Potatoes (Andes)', 'Tomatoes', 'Cacao (chocolate!)', 'Quinoa', 'Peppers', 'Avocados', 'Pineapple'],
      fact: 'Potatoes were domesticated in the Andes mountains. There are over 4,000 varieties!',
      explored: false
    },
    oceania: {
      name: 'Oceania',
      bounds: [[-10, 110], [-50, 110], [-50, 180], [-10, 180]],
      color: '#06b6d4',
      foods: ['Taro', 'Coconut', 'Breadfruit', 'Macadamia nuts (Australia)'],
      fact: 'Island cultures developed unique agricultural adaptations and food preservation methods for seafaring.',
      explored: false
    }
  })

  const [selectedContinent, setSelectedContinent] = useState<string>('')
  const [reflection, setReflection] = useState('')
  const [showReflection, setShowReflection] = useState(false)

  const exploredCount = Object.values(continents).filter(c => c.explored).length
  const allExplored = exploredCount === 6

  const handleContinentClick = (continentKey: string) => {
    setContinents(prev => ({
      ...prev,
      [continentKey]: { ...prev[continentKey], explored: true }
    }))
    setSelectedContinent(continentKey)
  }

  useEffect(() => {
    if (allExplored && !showReflection) {
      setShowReflection(true)
    }
  }, [allExplored, showReflection])

  const handleSubmit = () => {
    if (reflection.trim().split(/\s+/).filter(w => w.length > 0).length >= 30) {
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Explore the Continents</h3>
            <p className="text-sm text-muted-foreground">
              Click on each continent to discover food origins
            </p>
          </div>
          <Badge variant={allExplored ? 'default' : 'secondary'}>
            {exploredCount}/6 Explored
          </Badge>
        </div>

        <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {Object.entries(continents).map(([key, continent]) => (
              <Polygon
                key={key}
                positions={continent.bounds}
                pathOptions={{
                  color: continent.explored ? '#22c55e' : continent.color,
                  fillColor: continent.explored ? '#22c55e' : continent.color,
                  fillOpacity: continent.explored ? 0.4 : 0.3,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => handleContinentClick(key)
                }}
              >
                <Popup>
                  <div className="p-2 max-w-xs">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      {continent.name}
                      {continent.explored && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="font-semibold text-sm">Foods that originated here:</p>
                        <ul className="text-xs space-y-1 mt-1">
                          {continent.foods.map((food, i) => (
                            <li key={i}>• {food}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Fact:</span> {continent.fact}
                        </p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Polygon>
            ))}
          </MapContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {Object.entries(continents).map(([key, continent]) => (
            <div
              key={key}
              className="flex items-center gap-2 p-2 rounded border"
              style={{ borderColor: continent.color }}
            >
              {continent.explored ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: continent.color }} />
              )}
              <span className="text-sm font-medium">{continent.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {showReflection && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Reflection Question</h4>
              <Label htmlFor="reflection" className="text-sm">
                Which continent do you think has had the MOST influence on global cuisine? Explain your reasoning. (Minimum: 30 words)
              </Label>
            </div>
            <Textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="There's no wrong answer - explain your reasoning..."
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {reflection.trim().split(/\s+/).filter(w => w.length > 0).length} words
              </span>
              <Button
                onClick={handleSubmit}
                disabled={reflection.trim().split(/\s+/).filter(w => w.length > 0).length < 30}
              >
                Submit Answer
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
