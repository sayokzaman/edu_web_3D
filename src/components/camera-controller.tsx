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
    currentPlanet: string | null
}

export const CameraController = ({ cameraRef, controlsRef, targetPosition, isFollowing, isAnimating, currentPlanet }: CameraControllerProps) => {
    useFrame(() => {
        if (!cameraRef.current || !controlsRef.current) return

        const earthVec = new Vector3(...targetPosition)

        if (isFollowing && !isAnimating) {
            let followOffset = null
            if (currentPlanet === 'jupiter') {
                followOffset = new Vector3(0, 8, 15)
            } else if (currentPlanet === 'saturn') {
                followOffset = new Vector3(0, 2, 7)
            } else {
                followOffset = new Vector3(0, 1.5, 4)
            }
            // Follow position slightly behind and above the target
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
