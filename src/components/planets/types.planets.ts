import { ModelProps } from '../../types'

export type PlanetProps = {
    orbitAxis?: [number, number]
    onClick?: (name: string) => void
    onPositionUpdate?: (position: [number, number, number], name: string) => void
    currentPlanet?: string | null
} & ModelProps
