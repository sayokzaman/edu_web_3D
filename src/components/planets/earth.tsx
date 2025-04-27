import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Group, Mesh, BufferGeometry, BufferAttribute, EllipseCurve } from 'three'

type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
}

const Earth = (props: PlanetProps) => {
    const { nodes, materials } = useGLTF('/models/World.glb')
    const modelRef = useRef<Group>(null)
    const accumulatedTime = useRef(0)
    const lastTime = useRef(0)
    const [isPaused, setIsPaused] = useState(false)

    // Path parameters
    const semiMajorAxis = 10
    const semiMinorAxis = 6
    const curve = useMemo(() => {
        return new EllipseCurve(
            0,
            0, // center
            semiMajorAxis,
            semiMinorAxis, // xRadius, yRadius
            0,
            Math.PI * 2, // startAngle, endAngle
            false, // clockwise
            0 // rotation
        )
    }, [])

    // Create path geometry
    const pathGeometry = useMemo(() => {
        const points = curve.getPoints(100)
        const vertices = points.map(point => [point.x, 0, point.y]).flat()

        const geometry = new BufferGeometry()
        geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3))
        return geometry
    }, [curve])

    // Handle pause state changes
    useEffect(() => {
        if (!isPaused) {
            lastTime.current = performance.now() / 1000
        }
    }, [isPaused])

    // Animation loop
    useFrame(({ clock }) => {
        const speed = 0.2
        if (modelRef.current) {
            modelRef.current.rotation.y = clock.getElapsedTime() * -speed * 2
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

    return (
        <group {...props}>
            {/* The planet */}
            <group scale={isPaused ? [0.27, 0.27, 0.27] : [0.25, 0.25, 0.25]} ref={modelRef} onPointerOver={() => setIsPaused(true)} onPointerOut={() => setIsPaused(false)}>
                <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k'] as Mesh).geometry} material={materials['8081earthmap4k.002']} rotation={[1.569, -1.26, 1.57]} scale={5.099} />
                <mesh castShadow receiveShadow geometry={(nodes['8081earthmap4k001'] as Mesh).geometry} material={materials['8081earthmap4k.003']} rotation={[1.569, -1.26, 1.57]} scale={5.104} />
            </group>

            {/* The path */}
            <line>
                <bufferGeometry attach='geometry' {...pathGeometry} />
                <lineBasicMaterial attach='material' color='#4f4f4f' linewidth={1} />
            </line>
        </group>
    )
}

useGLTF.preload('/models/World.glb')

export default Earth
