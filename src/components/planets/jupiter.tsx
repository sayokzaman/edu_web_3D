import { Html, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { PlanetProps } from './types.planets'
import { useFrame } from '@react-three/fiber'
import { useOrbit } from '../../hooks/useOrbit'

export function Jupiter(props: PlanetProps) {
    const { nodes, materials } = useGLTF('/models/jupiter.glb')

    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: props.orbitAxis ? props.orbitAxis[0] : 0,
        semiMinorAxis: props.orbitAxis ? props.orbitAxis[1] : 0,
        speed: 0.13 * 0.5,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            props.onPositionUpdate([position.x, position.y, position.z], 'jupiter')
        }
    })

    return (
        <group
            scale={isPaused ? [0.031, 0.031, 0.031] : [0.03, 0.03, 0.03]}
            ref={modelRef}
            position={props.position}
            onPointerOver={() => {
                if (props.currentPlanet === 'jupiter') return
                setIsPaused(true)
            }}
            onPointerOut={() => {
                if (props.currentPlanet === 'jupiter') return
                setIsPaused(false)
            }}
            onClick={() => {
                setIsPaused(true)
                props.onClick?.('jupiter')
                setTimeout(() => {
                    setIsPaused(false)
                }, 1000)
            }}
            dispose={null}
        >
            <mesh castShadow receiveShadow geometry={(nodes.Sphere_Material_0 as Mesh).geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, 0]} />
            {props.currentPlanet !== 'jupiter' ? (
                <Html className='absolute -bottom-12 -translate-x-1/2 transform'>
                    <p className='text-gray-300 text-sm font-light tracking-widest select-none'>JUPITER</p>
                </Html>
            ) : null}
        </group>
    )
}

useGLTF.preload('/models/jupiter.glb')
