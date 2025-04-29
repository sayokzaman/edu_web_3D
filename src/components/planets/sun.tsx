import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useRef } from 'react'
import { Group, Mesh } from 'three'

type Props = {
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
}

export function Sun(props: Props) {
    const modelRef = useRef<Group>(null)
    const { nodes, materials } = useGLTF('/models/sun_model.glb')

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.0005
        }
    })

    return (
        <group ref={modelRef} scale={props.scale} position={props.position} rotation={props.rotation}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh castShadow receiveShadow geometry={(nodes.Object_2 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_3 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_4 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_5 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_6 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_7 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_8 as Mesh).geometry} material={materials.material} />
                <mesh castShadow receiveShadow geometry={(nodes.Object_9 as Mesh).geometry} material={materials.material} />
            </group>
            <EffectComposer>
                <Bloom intensity={2} luminanceThreshold={0} luminanceSmoothing={0.9} />
            </EffectComposer>
        </group>
    )
}

useGLTF.preload('/models/sun_model.glb')
