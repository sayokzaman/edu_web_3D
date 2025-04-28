import { useMemo } from 'react'
import { BufferAttribute, BufferGeometry, EllipseCurve } from 'three'

const Orbit = () => {
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

    return (
        <line>
            <bufferGeometry attach='geometry' {...pathGeometry} />
            <lineDashedMaterial attach='material' color='#4f4f4f' linewidth={1} />
        </line>
    )
}

export default Orbit
