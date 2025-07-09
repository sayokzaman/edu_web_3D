import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { ModelProps } from '../../types'

export function ChainHookLeft(props: ModelProps) {
    const { nodes, materials } = useGLTF('/models/scale/chain_hook.glb')
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={(nodes.defaultMaterial358 as Mesh).geometry} material={materials['aiStandardSurface2SG.002']} position={[0, -0.593, 0]} />
            <mesh castShadow receiveShadow geometry={(nodes.defaultMaterial359 as Mesh).geometry} material={materials['aiStandardSurface2SG.002']} position={[0, -0.593, 0]} />
        </group>
    )
}

useGLTF.preload('/models/scale/chain_hook.glb')
