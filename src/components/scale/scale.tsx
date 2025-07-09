import { Box } from '@react-three/drei'
import { ScaleTopBar } from './top-bar'
import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { Plate } from './plate'
import { ChainHookLeft } from './hook'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Scale = () => {
    const standRef = useRef(null)
    const topBarRef = useRef<RapierRigidBody>(null)
    const { rapier, world } = useRapier()

    const plateRightRef = useRef<RapierRigidBody>(null)
    const plateLeftRef = useRef<RapierRigidBody>(null)

    const leftHookRef = useRef<THREE.Object3D>(null)
    const rightHookRef = useRef<THREE.Object3D>(null)

    useFrame(() => {
        if (plateLeftRef.current && leftHookRef.current) {
            const body = plateLeftRef.current

            // Get RigidBody world position & rotation
            const position = body.translation()
            const rotation = body.rotation()

            // Apply to the ChainHook
            leftHookRef.current.position.copy({ x: position.x + 0.69, y: position.y + 0.06, z: position.z })
            leftHookRef.current.quaternion.copy(rotation)
        }

        if (plateRightRef.current && rightHookRef.current) {
            const body = plateRightRef.current

            // Get RigidBody world position & rotation
            const position = body.translation()
            const rotation = body.rotation()

            // Apply to the ChainHook
            rightHookRef.current.position.copy({ x: position.x + 0.69, y: position.y + 0.06, z: position.z })
            rightHookRef.current.quaternion.copy(rotation)
        }
    })

    useEffect(() => {
        if (!standRef.current || !topBarRef.current) return

        const stand = standRef.current
        const topBar = topBarRef.current

        const joint = rapier.JointData.revolute(
            { x: 0, y: 1.42, z: 0 }, // anchor on stand
            { x: 0, y: 0, z: 0 }, // anchor on topBar body
            { x: 0, y: 0, z: 1 }
        )

        world.createImpulseJoint(joint, stand, topBar, true)

        if (!plateRightRef.current || !plateLeftRef.current) return

        const plateRight = plateRightRef.current
        const plateRightJoint = rapier.JointData.spherical(
            { x: 0.7, y: -0.05, z: 0 }, // anchor on stand
            { x: 0, y: 0, z: 0 } // anchor on topBar body
        )
        world.createImpulseJoint(plateRightJoint, topBar, plateRight, false)

        const plateLeft = plateLeftRef.current
        const plateLeftJoint = rapier.JointData.spherical(
            { x: -0.7, y: -0.05, z: 0 }, // anchor on stand
            { x: 0, y: 0, z: 0 } // anchor on topBar body
        )
        world.createImpulseJoint(plateLeftJoint, topBar, plateLeft, false)
    }, [world, rapier])

    return (
        <>
            <RigidBody ref={standRef} type='fixed'>
                <Box position={[0, 0.5, 0]}>
                    <meshNormalMaterial />
                    <boxGeometry args={[0.02, 1.55, 0.02]} />
                </Box>
            </RigidBody>

            <RigidBody ref={topBarRef} ccd={true} colliders='cuboid' position={[0, 1.42, 0]} angularDamping={50} linearDamping={50} friction={50} canSleep={false}>
                <ScaleTopBar />
            </RigidBody>

            <RigidBody ref={plateRightRef} colliders='cuboid' position={[0.7, 1.3, 0]}>
                <Plate />
            </RigidBody>
            <group ref={rightHookRef}>
                <ChainHookLeft />
            </group>

            <RigidBody ref={plateLeftRef} colliders='cuboid' position={[-0.7, 1.3, 0]}>
                <Plate />
            </RigidBody>
            <group ref={leftHookRef}>
                <ChainHookLeft />
            </group>

            <RigidBody type='fixed' colliders='cuboid'>
                <Box position={[0, 1.49, 0]}>
                    <meshNormalMaterial />
                    <boxGeometry args={[0.05, 0.001, 0.05]} />
                </Box>
            </RigidBody>
        </>
    )
}

export default Scale
