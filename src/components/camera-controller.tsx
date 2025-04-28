// components/CameraController.tsx
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera as Camera, Vector3 } from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { RefObject } from 'react'

type CameraControllerProps = {
    cameraRef: RefObject<Camera | null>
    controlsRef: RefObject<OrbitControlsImpl | undefined>
    targetPosition: [number, number, number]
    isFollowing: boolean
    isAnimating: boolean
}

export const CameraController = ({ cameraRef, controlsRef, targetPosition, isFollowing, isAnimating }: CameraControllerProps) => {
    useFrame(() => {
        if (!cameraRef.current || !controlsRef.current) return

        const earthVec = new Vector3(...targetPosition)

        if (isFollowing && !isAnimating) {
            // Follow position slightly behind and above the target
            const followOffset = new Vector3(0, 1.5, 2)
            const targetCameraPosition = earthVec.clone().add(followOffset)

            // Smooth camera movement
            cameraRef.current.position.lerp(targetCameraPosition, 1)
            controlsRef.current.target.lerp(earthVec, 1)
        }

        // Always update controls
        controlsRef.current.update()
    })

    return null
}
