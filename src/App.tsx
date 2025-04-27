import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CanvasLoader from './components/canvas-loader'
import Model from './components/planets/earth'

function App() {
    return (
        <div className='h-screen w-screen bg-gray-900'>
            <Canvas>
                <Suspense fallback={<CanvasLoader />} />
                <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                <OrbitControls enableZoom={false} enablePan={false} enableRotate />

                <Model scale={5} position={[0, 0, 0]} rotation={[0, 0, -0.2]} />
                <ambientLight intensity={1} />
                <directionalLight position={[0, 0, 0]} intensity={0.5} />
            </Canvas>
        </div>
    )
}

export default App
