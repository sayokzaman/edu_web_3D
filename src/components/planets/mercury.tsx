import { Html, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { PlanetProps } from './types.planets'
import { useFrame } from '@react-three/fiber'
import { useOrbit } from '../../hooks/useOrbit'
import Orbit from './orbit'
import { useState } from 'react'

export function Mercury(props: PlanetProps) {
    const { nodes, materials } = useGLTF('/models/mercury.glb')

    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: props.orbitAxis ? props.orbitAxis[0] : 0,
        semiMinorAxis: props.orbitAxis ? props.orbitAxis[1] : 0,
        speed: 0.47 * 0.2,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            props.onPositionUpdate([position.x, position.y, position.z], 'mercury')
        }
    })

    const [orbitColor, setOrbitColor] = useState('#4f4f4f')

    return (
        <>
            <group
                ref={modelRef}
                position={props.position}
                onPointerOver={() => {
                    if (props.currentPlanet === 'mercury') return
                    setIsPaused(true)
                    setOrbitColor('#abc1de')
                }}
                onPointerOut={() => {
                    if (props.currentPlanet === 'mercury') return
                    setIsPaused(false)
                }}
                onClick={() => {
                    setIsPaused(true)
                    props.onClick?.('mercury')
                    setTimeout(() => {
                        setIsPaused(false)
                    }, 1000)
                }}
                scale={isPaused ? [0.1, 0.1, 0.1] : [0.1, 0.1, 0.1]}
            >
                <mesh castShadow receiveShadow geometry={(nodes['Sphere001_Material_#50_0'] as Mesh).geometry} material={materials.Material_50} rotation={[-Math.PI / 2, 0, 0]} />
                {props.currentPlanet !== 'mercury' ? (
                    <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                        <p className='text-gray-300 text-sm font-light tracking-widest select-none'>MERCURY</p>
                    </Html>
                ) : null}
            </group>
            <group
                onPointerOver={() => setOrbitColor('#abc1de')}
                onPointerOut={() => setOrbitColor('#4f4f4f')}
                onClick={() => {
                    setIsPaused(true)
                    props.onClick?.('mercury')
                    setTimeout(() => {
                        setIsPaused(false)
                    }, 1000)
                }}
            >
                <Orbit xAxis={15} yAxis={15} color={orbitColor} />
            </group>
        </>
    )
}

useGLTF.preload('/models/mercury.glb')
