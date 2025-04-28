// components/EarthInfoCard.tsx
import { Html } from '@react-three/drei'
import { Vector3 } from 'three'

type EarthInfoCardProps = {
    position: [number, number, number]
    visible: boolean
}

export const EarthInfoCard = ({ position, visible }: EarthInfoCardProps) => {
    if (!visible) return null

    return (
        <Html
            position={new Vector3(...position)}
            center
            distanceFactor={10}
            style={{
                transform: 'translateY(-100%)',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                minWidth: '200px',
                pointerEvents: 'none'
            }}
        >
            <h3 style={{ margin: 0 }}>Planet Earth</h3>
            <p style={{ margin: '0.5rem 0' }}>Diameter: 12,742 km</p>
            <p style={{ margin: 0 }}>Population: 8 billion</p>
        </Html>
    )
}
