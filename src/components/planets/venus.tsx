import { Html, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { PlanetProps } from './types.planets'
import { useOrbit } from '../../hooks/useOrbit'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import Orbit from './orbit'

export function Venus(props: PlanetProps) {
    const { nodes, materials } = useGLTF('/models/venus.glb')

    const { modelRef, isPaused, setIsPaused } = useOrbit({
        semiMajorAxis: props.orbitAxis ? props.orbitAxis[0] : 0,
        semiMinorAxis: props.orbitAxis ? props.orbitAxis[1] : 0,
        speed: 0.35 * 0.2,
        initialAngle: 40,
        pauseOnHover: true
    })

    useFrame(() => {
        if (modelRef.current && props.onPositionUpdate) {
            const position = modelRef.current.position
            props.onPositionUpdate([position.x, position.y, position.z], 'venus')
        }
    })

    const [orbitColor, setOrbitColor] = useState('#4f4f4f')

    return (
        <>
            <group
                ref={modelRef}
                position={props.position}
                onPointerOver={() => {
                    if (props.currentPlanet === 'venus') return
                    setIsPaused(true)
                }}
                onPointerOut={() => {
                    if (props.currentPlanet === 'venus') return
                    setIsPaused(false)
                }}
                onClick={() => {
                    setIsPaused(true)
                    props.onClick?.('venus')
                    setTimeout(() => {
                        setIsPaused(false)
                    }, 1000)
                }}
                scale={isPaused ? [0.84, 0.84, 0.84] : [0.8, 0.8, 0.8]}
            >
                <mesh castShadow receiveShadow geometry={(nodes.Object_2 as Mesh).geometry} material={materials.material} rotation={[-Math.PI / 2, 0, 0]} />
                {props.currentPlanet !== 'venus' ? (
                    <Html className='absolute -bottom-8 -translate-x-1/2 transform'>
                        <p className='text-gray-300 text-sm font-light tracking-widest select-none'>VENUS</p>
                    </Html>
                ) : null}
            </group>
            <group
                onPointerOver={() => setOrbitColor('#abc1de')}
                onPointerOut={() => setOrbitColor('#4f4f4f')}
                onClick={() => {
                    setIsPaused(true)
                    props.onClick?.('venus')
                    setTimeout(() => {
                        setIsPaused(false)
                    }, 1000)
                }}
            >
                <Orbit xAxis={22} yAxis={20} color={orbitColor} />
            </group>
        </>
    )
}

useGLTF.preload('/models/venus.glb')
