import { Html, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { useOrbit } from '../../hooks/useOrbit'

type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
    onClick?: () => void
    onPositionUpdate?: (position: [number, number, number], rotation: [number, number, number]) => void
    isFollowing?: boolean
}

const Mars = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/mars.glb')

    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: 15,
        semiMinorAxis: 10,
        speed: 0.15,
        initialAngle: 20,
        pauseOnHover: true
    })

    return (
        <group
            ref={modelRef}
            scale={isPaused ? [0.27, 0.27, 0.27] : [0.25, 0.25, 0.25]}
            onPointerOver={() => setIsPaused(true)}
            onPointerOut={() => {
                setIsPaused(false)
            }}
            {...props}
            dispose={null}
            rotation={[-1.413, 0, 0]}
        >
            <group rotation={[Math.PI / 2, 0, 0]}>
                <group name='mars_1' rotation={[Math.PI, Math.PI / 2, 0]} scale={8}>
                    <mesh name='Object_4' castShadow receiveShadow geometry={(nodes.Object_4 as Mesh).geometry} material={materials.mars} />
                    {!props.isFollowing ? (
                        <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                            <p className='text-gray-300 text-sm font-light tracking-widest'>MARS</p>
                        </Html>
                    ) : null}
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/mars.glb')

export default Mars
