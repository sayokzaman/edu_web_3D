import { Html, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useOrbit } from '../../hooks/useOrbit'
import { PlanetProps } from './types.planets'

const Saturn = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/saturn.glb')
    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: props.orbitAxis ? props.orbitAxis[0] : 0,
        semiMinorAxis: props.orbitAxis ? props.orbitAxis[1] : 0,
        speed: 0.09 * 0.5,
        initialAngle: 60,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            props.onPositionUpdate([position.x, position.y, position.z], 'saturn')
        }
    })

    return (
        <group
            scale={isPaused ? [0.42, 0.42, 0.42] : [0.4, 0.4, 0.4]}
            ref={modelRef}
            position={props.position}
            onPointerOver={() => {
                if (props.currentPlanet === 'saturn') return
                setIsPaused(true)
            }}
            onPointerOut={() => {
                if (props.currentPlanet === 'saturn') return
                setIsPaused(false)
            }}
            onClick={() => {
                setIsPaused(true)
                props.onClick?.('saturn')
                setTimeout(() => {
                    setIsPaused(false)
                }, 1000)
            }}
        >
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group position={[0, 0, 0]} rotation={[-1.571, -1.386, 0.1]} scale={3}>
                    <mesh castShadow receiveShadow geometry={(nodes.Object_5 as Mesh).geometry} material={materials.material} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
                    <mesh castShadow receiveShadow geometry={(nodes.Object_8 as Mesh).geometry} material={materials.material} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
                    <mesh castShadow receiveShadow geometry={(nodes.Object_11 as Mesh).geometry} material={materials.material} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
                    <mesh castShadow receiveShadow geometry={(nodes.Object_14 as Mesh).geometry} material={materials.material} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
                    <mesh castShadow receiveShadow geometry={(nodes.Object_16 as Mesh).geometry} material={materials.material} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
                </group>
                <group scale={2}>
                    <mesh castShadow receiveShadow geometry={(nodes.Object_20 as Mesh).geometry} material={materials.material_0} scale={0.01} />
                    <mesh castShadow receiveShadow geometry={(nodes.Object_23 as Mesh).geometry} material={materials.material_0} scale={0.01} />
                    <mesh castShadow receiveShadow geometry={(nodes.Object_25 as Mesh).geometry} material={materials.material_0} scale={0.01} />
                </group>
            </group>
            {props.currentPlanet !== 'saturn' && (
                <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                    <p className='text-gray-300 text-sm font-light tracking-widest select-none'>Saturn</p>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/models/saturn.glb')

export default Saturn
