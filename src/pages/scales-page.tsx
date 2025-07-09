import { Box, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import Scale from '../components/scale/scale'
import PickUpObject from '../components/scale/test_click_hold'
import PickableBox from '../components/scale/pickable-box'
import { ScaleStand } from '../components/scale/stand'

const ScalesPage = () => {
    return (
        <div className='h-screen w-screen'>
            <Canvas>
                <Physics gravity={[0, -9.81, 0]}>
                    <RigidBody type='fixed' colliders='cuboid' position={[0, -0.47, 0]}>
                        <Box>
                            <meshStandardMaterial color='white' />
                            <boxGeometry args={[10, 1, 10]} />
                        </Box>
                    </RigidBody>

                    <Scale />

                    <PickUpObject>
                        <PickableBox position={[1.2, 0.5, 0.2]} />
                        <PickableBox position={[1.4, 1, 0]} />
                        <PickableBox position={[1.4, 1.3, 0.3]} />
                        <PickableBox position={[1.2, 0.5, 0.5]} />
                        <PickableBox position={[1.3, 1, -0.1]} />

                        <PickableBox position={[1.2, 0.5, 0.2]} />
                        <PickableBox position={[-1.2, 0.5, 0.2]} />
                        <PickableBox position={[-1.4, 1, 0]} />
                        <PickableBox position={[-1.4, 1.3, 0.3]} />
                    </PickUpObject>
                </Physics>

                <PerspectiveCamera makeDefault position={[0, 3, 5]} />
                <OrbitControls enableRotate={false} enableZoom={true} enablePan={true} />
                <ScaleStand position={[0, 0.8, 0]} />

                <ambientLight intensity={1} />
                <pointLight position={[0, 1, 0.5]} intensity={5} />
                <pointLight position={[0, 1, -0.5]} intensity={5} />
                <pointLight position={[2, 0, 1.5]} intensity={5} />
                <pointLight position={[2, 0, -1.5]} intensity={5} />
            </Canvas>
        </div>
    )
}

export default ScalesPage
