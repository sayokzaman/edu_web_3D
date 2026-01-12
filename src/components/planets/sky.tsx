import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Group, Mesh, DoubleSide, MeshStandardMaterial } from 'three'

type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

export function Sky(props: PlanetProps) {
    const { nodes, materials } = useGLTF('/models/star.glb') as unknown as {
        nodes: { Sphere: Mesh }
        materials: { ['Material.003']: MeshStandardMaterial }
    }

    const groupRef = useRef<Group>(null)

    return (
        <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} scale={props.scale}>
            <mesh geometry={nodes.Sphere.geometry} scale={500}>
                <meshBasicMaterial map={materials['Material.003'].map} side={DoubleSide} />
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/star.glb')
