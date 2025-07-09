import { useEffect, useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { usePickUp } from '../../context/pickup-object'
import * as THREE from 'three'

type Props = {
    position: [x: number, y: number, z: number]
}

const PickableBox = (props: Props) => {
    const rigidRef = useRef(null)
    const meshRef = useRef<THREE.Mesh>(null)
    const { registerPickable } = usePickUp()

    useEffect(() => {
        if (meshRef.current && rigidRef.current) {
            registerPickable(meshRef.current)

            // Attach rigidBody to object for external control
            meshRef.current.userData.rigidBody = rigidRef.current
        }
    }, [registerPickable])

    return (
        <RigidBody mass={5} ref={rigidRef} position={props.position} restitution={0.5} canSleep={false}>
            <mesh ref={meshRef} name='Box1'>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color='blue' />
            </mesh>
        </RigidBody>
    )
}

export default PickableBox
