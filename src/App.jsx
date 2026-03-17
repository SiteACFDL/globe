import { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'
import './App.css'

// Venice coordinates (moved further south toward central Italy)
const VENICE = { lat: 42.5, lng: 13, name: 'Venice' }

function App() {
  const globeEl = useRef()
  const [pointScale, setPointScale] = useState(1)

  // show just Venice as single point
  const pointsData = [VENICE]
  
  // Create aura rings around the main point
  const auraData = [
    { ...VENICE, type: 'aura1', distance: 1 },
    { ...VENICE, type: 'aura2', distance: 2 },
    { ...VENICE, type: 'aura3', distance: 3 }
  ]
  
  // Combine main point with aura
  const allPoints = [...auraData, ...pointsData]

  // Add smooth pulsing animation to the point
  useEffect(() => {
    let animationId
    let startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) % 2000 // 2 second cycle
      const progress = elapsed / 2000
      const scale = 0.8 + 0.4 * Math.sin(progress * Math.PI * 2) // Pulse between 0.8 and 1.2
      setPointScale(scale)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Centre the camera directly on Venice and keep it there
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView(
        { lat: VENICE.lat, lng: VENICE.lng, altitude: 3 },
        2000
      )
    }
  }, [])

  // click handler for points
  const handlePointClick = (point) => {
    alert(`You clicked on ${point.name}`)
  }

  return (
    <div id="globeViz">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        showGlobe={true}
        // simple points layer
        pointsData={allPoints}
        pointLat="lat"
        pointLng="lng"
        pointColor={(point) => {
          if (point.type === 'aura1') return 'rgba(255, 0, 0, 0.3)'
          if (point.type === 'aura2') return 'rgba(255, 0, 0, 0.15)'
          if (point.type === 'aura3') return 'rgba(255, 0, 0, 0.08)'
          return 'red'
        }}
        pointRadius={(point) => {
          if (point.type === 'aura1') return 0.8 + (0.3 * pointScale)
          if (point.type === 'aura2') return 1.5 + (0.5 * pointScale)
          if (point.type === 'aura3') return 2.2 + (0.7 * pointScale)
          return 0.3  // main point
        }}
        pointAltitude={0.15 * pointScale}

        onPointClick={handlePointClick}
        // keep the view fixed on Venice
        autoRotate={true}
        backgroundColor="#000"
      />
    </div>
  )
}

export default App
