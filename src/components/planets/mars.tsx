import { Html, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { useOrbit } from '../../hooks/useOrbit'
import { useFrame } from '@react-three/fiber'
import { PlanetProps } from './types.planets'

const Mars = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/mars.glb')

    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: props.orbitAxis ? props.orbitAxis[0] : 0,
        semiMinorAxis: props.orbitAxis ? props.orbitAxis[1] : 0,
        speed: 0.24 * 0.5,
        initialAngle: 20,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            props.onPositionUpdate([position.x, position.y, position.z], 'mars')
        }
    })

    return (
        <group
            ref={modelRef}
            position={props.position}
            onPointerOver={() => {
                if (props.currentPlanet === 'mars') return
                setIsPaused(true)
            }}
            onPointerOut={() => {
                if (props.currentPlanet === 'mars') return
                setIsPaused(false)
            }}
            onClick={() => {
                setIsPaused(true)
                props.onClick?.('mars')
                setTimeout(() => {
                    setIsPaused(false)
                }, 1000)
            }}
            scale={isPaused ? [3.2, 3.2, 3.2] : [3, 3, 3]}
        >
            <mesh name='Object_4' castShadow receiveShadow geometry={(nodes.Object_4 as Mesh).geometry} material={materials.mars} />
            {props.currentPlanet !== 'mars' ? (
                <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                    <p className='text-gray-300 text-sm font-light tracking-widest select-none'>MARS</p>
                </Html>
            ) : null}
        </group>
    )
}

useGLTF.preload('/models/mars.glb')

export default Mars
