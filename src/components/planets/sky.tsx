import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

export function Sky(props: PlanetProps) {
    const { nodes, materials } = useGLTF('/models/sky.glb')
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={500}>
                <mesh castShadow receiveShadow geometry={(nodes.Object_4 as Mesh).geometry} material={materials.material} rotation={[Math.PI / 2, 0, 0]} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/sky.glb')
