import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CanvasLoader from './components/canvas-loader'
import Earth from './components/planets/earth'
import { Sun } from './components/planets/sun'
import Orbit from './components/orbit'
import { PerspectiveCamera as Camera, Vector3 } from 'three'
import { CameraController } from './components/camera-controller'
import { Sky } from './components/planets/sky'
import Mars from './components/planets/mars'
import { Mercury } from './components/planets/mercury'
import { Jupiter } from './components/planets/jupiter'
import { Venus } from './components/planets/venus'
import Saturn from './components/planets/saturn'

function App() {
    const [planetsPosition, setPlanetsPosition] = useState<{ [key: string]: [number, number, number] }>({
        sun: [0, 0, 0],
        mercury: [0, 0, 0],
        venus: [0, 0, 0],
        earth: [0, 0, 0],
        mars: [0, 0, 0],
        jupiter: [0, 0, 0],
        saturn: [0, 0, 0]
    })
    const [currentPlanet, setCurrentPlanet] = useState<string | null>(null)

    const cameraRef = useRef<Camera>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const defaultCameraPosition: [number, number, number] = [-100, 130, 130]

    const handlePlanetClick = (planet: string) => {
        // Guard clauses
        if (!cameraRef.current || !controlsRef.current || isAnimating || (isFollowing && currentPlanet === planet)) return

        // Set states
        setCurrentPlanet(planet)
        setIsFollowing(true)
        setIsAnimating(true)

        // Get positions
        const startPosition = cameraRef.current.position.clone()
        const planetPos = planetsPosition[planet] || [0, 0, 0]
        const planetVector = new Vector3(...planetPos)

        // Calculate target position (adjust these values for each planet if needed)
        let zoomOffset = null
        if (planet === 'jupiter') {
            zoomOffset = new Vector3(0, 8, 15)
        } else if (planet === 'saturn') {
            zoomOffset = new Vector3(0, 2, 7)
        } else {
            zoomOffset = new Vector3(0, 1.3, 3.5)
        }
        const zoomPosition = planetVector.clone().add(zoomOffset)

        // Animation setup
        const duration = 1000 // ms
        const startTime = performance.now()

        // Animation loop
        const animateCamera = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Smooth easing function
            const smoothProgress = progress * progress * (3 - 2 * progress)

            // Move camera
            if (cameraRef.current) {
                cameraRef.current.position.lerpVectors(startPosition, zoomPosition, smoothProgress)
            }

            // Update controls target
            if (controlsRef.current) {
                controlsRef.current.target.lerp(planetVector, smoothProgress)
            }

            // Continue animation or finish
            if (progress < 1) {
                requestAnimationFrame(animateCamera)
            } else {
                setIsAnimating(false)
            }
        }

        // Start animation
        requestAnimationFrame(animateCamera)
    }

    const handleCanvasClick = () => {
        if (!isFollowing || isAnimating || !cameraRef.current || !controlsRef.current) return

        setIsFollowing(false)
        setIsAnimating(true)
        setCurrentPlanet(null)

        const startPosition = cameraRef.current.position.clone()
        const defaultVec = new Vector3(...defaultCameraPosition)
        const duration = 1000
        const startTime = performance.now()

        const animateCamera = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const smoothProgress = progress * progress * (3 - 2 * progress)

            if (cameraRef.current) {
                cameraRef.current.position.lerpVectors(startPosition, defaultVec, smoothProgress)
            }

            if (controlsRef.current) {
                controlsRef.current.target.lerp(new Vector3(0, 0, 0), smoothProgress)
                controlsRef.current.update()
            }

            if (progress < 1) {
                requestAnimationFrame(animateCamera)
            } else {
                setIsAnimating(false)
            }
        }

        requestAnimationFrame(animateCamera)
    }

    const updatePlanetsPosition = (position: [number, number, number], name: string) => {
        setPlanetsPosition(prev => ({ ...prev, [name]: position }))
    }

    return (
        <div className='relative h-screen w-screen bg-gray-900'>
            <Canvas onClick={handleCanvasClick}>
                <Suspense fallback={<CanvasLoader />} />

                <PerspectiveCamera makeDefault position={[-100, 130, 130]} ref={cameraRef} />

                <CameraController cameraRef={cameraRef} controlsRef={controlsRef} targetPosition={currentPlanet ? planetsPosition[currentPlanet] : defaultCameraPosition} isFollowing={isFollowing} isAnimating={isAnimating} currentPlanet={currentPlanet} />

                <OrbitControls ref={controlsRef} enableZoom enablePan={false} maxDistance={400} />

                <Sky />

                <Sun scale={0.01} position={[0, 0, 0]} rotation={[0, 0, 0]} />

                <>
                    <Mercury orbitAxis={[15, 15]} position={planetsPosition.mercury} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                    <Orbit xAxis={15} yAxis={15} />
                </>

                <>
                    <Venus orbitAxis={[22, 20]} position={planetsPosition.venus} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                    <Orbit xAxis={22} yAxis={20} />
                </>

                <>
                    <Earth orbitAxis={[32, 30]} position={planetsPosition.earth} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                    <Orbit xAxis={32} yAxis={30} />
                </>

                <>
                    <Mars orbitAxis={[50, 47]} position={planetsPosition.mars} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                    <Orbit xAxis={50} yAxis={47} />
                </>

                <>
                    <Jupiter orbitAxis={[70, 63]} position={planetsPosition.jupiter} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                    <Orbit xAxis={70} yAxis={63} />
                </>

                <>
                    <Saturn orbitAxis={[85, 80]} position={planetsPosition.saturn} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                    <Orbit xAxis={85} yAxis={80} />
                </>

                <ambientLight intensity={0.3} />
                <pointLight position={[0, 0, 0]} intensity={2000} />
            </Canvas>
            {/* <div className='absolute top-0 right-0 w-64 bg-white'>asd</div> */}
        </div>
    )
}

export default App
