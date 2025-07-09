import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { ModelProps } from '../../types'

export function ScaleTopBar(props: ModelProps) {
    const { nodes, materials } = useGLTF('/models/scale/beam00mod.glb')
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={(nodes.defaultMaterial216 as Mesh).geometry} material={materials['Material.004']} />
        </group>
    )
}

useGLTF.preload('/models/scale/beam00mod.glb')
