import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export const useNormalizedMouse = () => {
    const { gl } = useThree()
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const rect = gl.domElement.getBoundingClientRect()
            setMouse({
                x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
                y: -((event.clientY - rect.top) / rect.height) * 2 + 1
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [gl])

    return mouse
}
