import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CanvasLoader from './components/canvas-loader'
import Earth from './components/planets/earth'
import { Sun } from './components/planets/sun'
import Orbit from './components/orbit'
import { PerspectiveCamera as Camera, Vector3 } from 'three'
import { CameraController } from './components/camera-controller'

function App() {
    const cameraRef = useRef<Camera>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null)
    const [earthPosition, setEarthPosition] = useState<[number, number, number]>([0, 0, 0])
    const [earthRotation, setEarthRotation] = useState<[number, number, number]>([0, 0, 0])
    const [isFollowing, setIsFollowing] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const defaultCameraPosition: [number, number, number] = [-10, 30, 30]

    const handleEarthClick = () => {
        if (!cameraRef.current || !controlsRef.current || isAnimating || isFollowing) return

        setIsFollowing(true)
        setIsAnimating(true)

        const startPosition = cameraRef.current.position.clone()
        const earthVec = new Vector3(...earthPosition)
        const zoomPosition = earthVec.clone().add(new Vector3(0, 1.5, 2))
        const duration = 1000
        const startTime = performance.now()

        const animateCamera = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const smoothProgress = progress * progress * (3 - 2 * progress)

            if (cameraRef.current) {
                cameraRef.current.position.lerpVectors(startPosition, zoomPosition, smoothProgress)
            }

            if (controlsRef.current) {
                controlsRef.current.target.lerp(earthVec, smoothProgress)
            }

            if (progress < 1) {
                requestAnimationFrame(animateCamera)
            } else {
                setIsAnimating(false)
            }
        }

        requestAnimationFrame(animateCamera)
    }

    const handleCanvasClick = () => {
        if (!isFollowing || isAnimating || !cameraRef.current || !controlsRef.current) return

        setIsFollowing(false)
        setIsAnimating(true)

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

    const updateEarthPosition = (position: [number, number, number], rotation: [number, number, number]) => {
        setEarthPosition(position)
        setEarthRotation(rotation)
    }

    return (
        <div className='relative h-screen w-screen bg-gray-900'>
            <Canvas onClick={handleCanvasClick}>
                <Suspense fallback={<CanvasLoader />} />
                <PerspectiveCamera makeDefault position={defaultCameraPosition} ref={cameraRef} />
                <OrbitControls ref={controlsRef} enableZoom enablePan />

                <CameraController cameraRef={cameraRef} controlsRef={controlsRef} targetPosition={earthPosition} isFollowing={isFollowing} isAnimating={isAnimating} />

                <pointLight position={[0, 0, 0]} intensity={200} />
                <Sun scale={0.002} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                <Earth scale={1} position={earthPosition} rotation={earthRotation} onClick={handleEarthClick} onPositionUpdate={updateEarthPosition} isFollowing={isFollowing} />
                {isFollowing ? (
                    <Html
                        position={new Vector3(...earthPosition)}
                        center
                        style={{
                            transform: 'translateY(120%) translateX(-50%)',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            padding: '1rem',
                            border: '0.5px solid gray',
                            borderRadius: '15px',
                            minWidth: '300px',
                            pointerEvents: 'none'
                        }}
                    >
                        <h3 style={{ margin: 0 }}>Planet Earth</h3>
                        <p style={{ margin: '0.5rem 0' }}>Diameter: 12,742 km</p>
                        <p style={{ margin: 0 }}>Population: 8 billion</p>
                    </Html>
                ) : null}

                <Orbit />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    )
}

export default App
