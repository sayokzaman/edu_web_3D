export type PlanetProps = {
    scale?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
    orbitAxis?: [number, number]
    onClick?: (name: string) => void
    onPositionUpdate?: (position: [number, number, number], name: string) => void
    currentPlanet?: string | null
}
