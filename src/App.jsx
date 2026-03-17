import { useRef, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Globe from 'react-globe.gl'
import VenicePage from './pages/VenicePage'
import './App.css'

// Venice coordinates
const VENICE = { lat: 42.5, lng: 13, name: 'Venice' }

function GlobePage() {
  const globeEl = useRef()
  const navigate = useNavigate()
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

  // click handler for points
  const handlePointClick = (point) => {
    if (point.name === 'Venice') {
      navigate('/venice')
    }
  }

  return (
    <div id="globeViz">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGlobe={true}
        showAtmosphere={true}
        autoRotate={true}
        autoRotateSpeed={2}
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
        backgroundColor="#000"
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobePage />} />
        <Route path="/venice" element={<VenicePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
