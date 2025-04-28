import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

export const Sun = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/sun.glb')

    return (
        <group {...props} dispose={null}>
            <ambientLight intensity={0.5} />
            <group rotation={[-2.083, 0.146, 0.212]} scale={4.783}>
                <mesh castShadow receiveShadow geometry={(nodes.Planeta009_09Sun_0 as Mesh).geometry} material={materials['09.Sun']} />
                <mesh castShadow receiveShadow geometry={(nodes['Nubes001_09Nubes-atmosfera_-_Sun_0'] as Mesh).geometry} material={materials['09.Nubes-atmosfera_-_Sun']} rotation={[0.047, 0.234, -0.396]} scale={1.013} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/sun.glb')
