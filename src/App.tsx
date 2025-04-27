import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CanvasLoader from './components/canvas-loader'
import Earth from './components/planets/earth'
import { Sun } from './components/planets/sun'

function App() {
    return (
        <div className='relative h-screen w-screen bg-gray-900'>
            <Canvas>
                <Suspense fallback={<CanvasLoader />} />
                <PerspectiveCamera makeDefault position={[0, 20, 0]} />
                <OrbitControls enableZoom enablePan={false} />

                <pointLight position={[0, 0, 0]} intensity={200} />

                <Sun scale={0.002} position={[0, 0, 0]} rotation={[0, 0, 0]} />

                <Earth scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />

                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    )
}

export default App
