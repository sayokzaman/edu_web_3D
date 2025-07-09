import { useGLTF } from '@react-three/drei'
import { ModelProps } from '../../types'
import { Mesh } from 'three'

export function ScaleStand(props: ModelProps) {
    const { nodes, materials } = useGLTF('/models/scale/scale_stand.glb')
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={(nodes.defaultMaterial215 as Mesh).geometry} material={materials['Material.003']} />
        </group>
    )
}

useGLTF.preload('/models/scale/scale_stand.glb')
