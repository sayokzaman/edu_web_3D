import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

const Model = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/World.glb')

    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k'] as Mesh).geometry} material={materials['8081earthmap4k.002']} rotation={[1.569, -1.26, 1.57]} scale={5.099} />
            <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k001'] as Mesh).geometry} material={materials['8081earthmap4k.003']} rotation={[1.569, -1.26, 1.57]} scale={5.104} />
        </group>
    )
}

useGLTF.preload('/models/World.glb')

export default Model
