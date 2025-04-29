// components/planets/earth.tsx
import { Html, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useOrbit } from '../../hooks/useOrbit'
import { PlanetProps } from './types.planets'

const Earth = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/earth.glb')
    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: props.orbitAxis ? props.orbitAxis[0] : 0,
        semiMinorAxis: props.orbitAxis ? props.orbitAxis[1] : 0,
        speed: 0.29 * 0.5,
        initialAngle: 60,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            props.onPositionUpdate([position.x, position.y, position.z], 'earth')
        }
    })

    return (
        <group
            scale={isPaused ? [0.65, 0.65, 0.65] : [0.6, 0.6, 0.6]}
            ref={modelRef}
            position={props.position}
            onPointerOver={() => {
                if (props.currentPlanet === 'earth') return
                setIsPaused(true)
            }}
            onPointerOut={() => {
                if (props.currentPlanet === 'earth') return
                setIsPaused(false)
            }}
            onClick={() => {
                setIsPaused(true)
                props.onClick?.('earth')
                setTimeout(() => {
                    setIsPaused(false)
                }, 1000)
            }}
        >
            <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k'] as Mesh).geometry} material={materials['8081earthmap4k.002']} rotation={[1.569, -1.26, 1.57]} scale={5.099} />
            <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k001'] as Mesh).geometry} material={materials['8081earthmap4k.003']} rotation={[1.569, -1.26, 1.57]} scale={5.104} />
            {props.currentPlanet !== 'earth' && (
                <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                    <p className='text-gray-300 text-sm font-light tracking-widest select-none'>EARTH</p>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/models/earth.glb')

export default Earth
