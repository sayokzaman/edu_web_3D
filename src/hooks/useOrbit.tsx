import { useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Group } from 'three'

type EllipticalOrbitParams = {
    semiMajorAxis?: number
    semiMinorAxis?: number
    speed?: number
    autoRotateSpeed?: number
    initialAngle?: number
    pauseOnHover?: boolean
}

export const useOrbit = (params?: EllipticalOrbitParams) => {
    const { semiMajorAxis = 10, semiMinorAxis = 6, speed = 0.2, autoRotateSpeed = 2, initialAngle = 0, pauseOnHover = true } = params || {}

    const modelRef = useRef<Group>(null)
    const accumulatedTime = useRef(initialAngle)
    const lastTime = useRef(0)
    const [isPaused, setIsPaused] = useState(false)

    // Handle pause state changes
    useEffect(() => {
        if (!isPaused) {
            lastTime.current = performance.now() / 1000
        }
    }, [isPaused])

    // Animation loop
    useFrame(({ clock }) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = clock.getElapsedTime() * -speed * autoRotateSpeed
        }
        if (isPaused) return

        const now = performance.now() / 1000
        if (lastTime.current === 0) {
            lastTime.current = now
        }

        const deltaTime = now - lastTime.current
        lastTime.current = now

        accumulatedTime.current += deltaTime

        // Calculate position on ellipse
        const x = Math.cos(accumulatedTime.current * speed) * semiMajorAxis
        const z = Math.sin(accumulatedTime.current * speed) * semiMinorAxis

        // Update position
        if (modelRef.current) {
            modelRef.current.position.x = x
            modelRef.current.position.z = z
        }
    })

    return {
        modelRef,
        isPaused,
        setIsPaused: pauseOnHover ? setIsPaused : () => {},
        orbitProps: {
            position: [Math.cos(accumulatedTime.current * speed) * semiMajorAxis, 0, Math.sin(accumulatedTime.current * speed) * semiMinorAxis] as [number, number, number]
        }
    }
}
