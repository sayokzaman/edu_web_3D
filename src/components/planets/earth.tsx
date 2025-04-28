// components/planets/earth.tsx
import { Html, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
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

const Earth = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/World.glb')
    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: 10,
        semiMinorAxis: 6,
        speed: 0.2,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            const rotation = modelRef.current.rotation
            props.onPositionUpdate([position.x, position.y, position.z], [rotation.x, rotation.y, rotation.z])
        }
    })

    return (
        <group>
            <group
                scale={isPaused ? [0.27, 0.27, 0.27] : [0.25, 0.25, 0.25]}
                ref={modelRef}
                position={props.position}
                rotation={props.rotation}
                onPointerOver={() => {
                    if (!props.isFollowing) {
                        setIsPaused(true)
                    }
                }}
                onPointerOut={() => {
                    if (!props.isFollowing) {
                        setIsPaused(false)
                    }
                }}
                onClick={() => {
                    setIsPaused(true)
                    props.onClick?.()
                    setTimeout(() => {
                        setIsPaused(false)
                    }, 1000)
                }}
            >
                <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k'] as Mesh).geometry} material={materials['8081earthmap4k.002']} rotation={[1.569, -1.26, 1.57]} scale={5.099} />
                <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k001'] as Mesh).geometry} material={materials['8081earthmap4k.003']} rotation={[1.569, -1.26, 1.57]} scale={5.104} />
                {!props.isFollowing ? (
                    <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                        <p className='text-gray-300 text-sm font-light tracking-widest'>EARTH</p>
                    </Html>
                ) : null}
            </group>
        </group>
    )
}

export default Earth
