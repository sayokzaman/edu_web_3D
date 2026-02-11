import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CanvasLoader from '../components/canvas-loader'
import Earth from '../components/planets/earth'
import { Sun } from '../components/planets/sun'
import { PerspectiveCamera as Camera, Vector3 } from 'three'
import { CameraController } from '../components/camera-controller'
import { Sky } from '../components/planets/sky'
import Mars from '../components/planets/mars'
import { Mercury } from '../components/planets/mercury'
import { Jupiter } from '../components/planets/jupiter'
import { Venus } from '../components/planets/venus'
import Saturn from '../components/planets/saturn'
import { planetsData } from '../data/planet-info'

const SolarSystem = () => {
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

    const selectedPlanetInfo = currentPlanet ? planetsData[currentPlanet] : null

    return (
        <div className='relative h-screen w-screen bg-gray-900'>
            <Canvas onClick={handleCanvasClick}>
                <Suspense fallback={<CanvasLoader />} />

                <PerspectiveCamera makeDefault position={[-100, 130, 130]} ref={cameraRef} />

                <CameraController cameraRef={cameraRef} controlsRef={controlsRef} targetPosition={currentPlanet ? planetsPosition[currentPlanet] : defaultCameraPosition} isFollowing={isFollowing} isAnimating={isAnimating} currentPlanet={currentPlanet} />

                <OrbitControls ref={controlsRef} enableZoom enablePan={false} maxDistance={450} minDistance={currentPlanet ? 0 : 15} />

                <Sky />

                <Sun scale={0.005} position={[0, 0, 0]} rotation={[0, 0, 0]} />

                <>
                    <Mercury orbitAxis={[15, 15]} position={planetsPosition.mercury} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                </>

                <>
                    <Venus orbitAxis={[22, 20]} position={planetsPosition.venus} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                </>

                <>
                    <Earth orbitAxis={[32, 30]} position={planetsPosition.earth} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                </>

                <>
                    <Mars orbitAxis={[50, 47]} position={planetsPosition.mars} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                </>

                <>
                    <Jupiter orbitAxis={[140, 120]} position={planetsPosition.jupiter} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                </>

                <>
                    <Saturn orbitAxis={[170, 160]} position={planetsPosition.saturn} onClick={handlePlanetClick} onPositionUpdate={updatePlanetsPosition} currentPlanet={currentPlanet} />
                </>

                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 0]} intensity={2000} />
            </Canvas>

            {/* Planet Name Display - Top Left */}
            {selectedPlanetInfo && (
                <div className='absolute top-8 left-8 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/50 rounded-lg px-6 py-4 shadow-2xl'>
                    <h2 className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text'>{selectedPlanetInfo.displayName}</h2>
                    <p className='text-sm text-gray-400 mt-1'>{selectedPlanetInfo.type}</p>
                </div>
            )}

            {/* Information Sidebar - Right */}
            {selectedPlanetInfo && (
                <div className='absolute top-1/2 -translate-y-1/2 right-2 h-[calc(100vh-72px)] w-96 bg-zinc-900/95 backdrop-blur-md shadow-2xl overflow-y-auto z-50 rounded-xl border border-cyan-500/30'>
                    <div className='p-6'>
                        {/* Close Button */}
                        <button onClick={() => handleCanvasClick()} className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-cyan-500/20 border border-zinc-700 hover:border-cyan-500 transition-all duration-200 text-gray-400 hover:text-cyan-400'>
                            ✕
                        </button>

                        {/* Header */}
                        <div className='mb-6'>
                            <h3 className='text-2xl font-bold text-white mb-2'>{selectedPlanetInfo.displayName}</h3>
                            <div className='h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'></div>
                        </div>

                        {/* Description */}
                        <div className='mb-6'>
                            <p className='text-gray-300 leading-relaxed'>{selectedPlanetInfo.description}</p>
                        </div>

                        {/* Planet Stats */}
                        <div className='space-y-4 mb-6'>
                            <h4 className='text-lg font-semibold text-cyan-400 mb-3'>Quick Facts</h4>

                            <div className='grid gap-3 grid-cols-2'>
                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Diameter</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.diameter}</div>
                                </div>

                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Mass</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.mass}</div>
                                </div>

                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Distance from Sun</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.distanceFromSun}</div>
                                </div>

                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Orbital Period</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.orbitalPeriod}</div>
                                </div>

                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Rotation Period</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.rotationPeriod}</div>
                                </div>

                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Temperature</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.temperature}</div>
                                </div>

                                <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-800'>
                                    <div className='text-xs text-gray-500 mb-1'>Moons</div>
                                    <div className='text-white font-medium'>{selectedPlanetInfo.moons}</div>
                                </div>
                            </div>
                        </div>

                        {/* Interesting Facts */}
                        <div>
                            <h4 className='text-lg font-semibold text-cyan-400 mb-3'>Did You Know?</h4>
                            <ul className='space-y-2'>
                                {selectedPlanetInfo.facts.map((fact, index) => (
                                    <li key={index} className='flex items-start'>
                                        <span className='text-cyan-500 mr-2 mt-1'>•</span>
                                        <span className='text-gray-300 text-sm'>{fact}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SolarSystem
