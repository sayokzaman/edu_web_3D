// PickUpObject.tsx
import { useThree } from '@react-three/fiber'
import { useEffect, useState, useRef, ReactNode } from 'react'
import { useNormalizedMouse } from '../../hooks/useNormalizedMouse'
import * as THREE from 'three'
import { PickUpProvider } from '../../context/pickup-object'
import { RapierRigidBody } from '@react-three/rapier'
import { RigidBodyType } from '@dimforge/rapier3d'

type Props = {
    children: ReactNode
}

const PickUpObject = ({ children }: Props) => {
    const mouse = useNormalizedMouse()

    const { raycaster, camera, gl } = useThree()

    const [pickedObject, setPickedObject] = useState<THREE.Object3D | null>(null)
    const [isPicking, setIsPicking] = useState(false)

    const pickableObjects = useRef<THREE.Object3D[]>([])
    const prevMousePos = useRef<THREE.Vector2>(new THREE.Vector2())

    const registerPickable = (object?: THREE.Object3D | null) => {
        if (object instanceof THREE.Object3D && !pickableObjects.current.includes(object)) {
            pickableObjects.current.push(object)
        }
    }

    const getRigidBody = (object: THREE.Object3D): RapierRigidBody | undefined => {
        return object.userData?.rigidBody as RapierRigidBody | undefined
    }

    useEffect(() => {
        const mouseVector = new THREE.Vector2(mouse.x, mouse.y)
        const handleMouseDown = () => {
            raycaster.setFromCamera(mouseVector, camera)
            if (!Array.isArray(pickableObjects.current)) return
            const intersects = raycaster.intersectObjects(pickableObjects.current.filter(Boolean), true)

            if (intersects.length > 0 && !pickedObject) {
                const object = intersects[0].object
                setPickedObject(object)
                setIsPicking(true)
                prevMousePos.current.set(mouse.x, mouse.y)

                const rigidBody = getRigidBody(object)
                if (rigidBody) {
                    rigidBody.setBodyType(RigidBodyType.KinematicPositionBased, true)
                    rigidBody.collider(0).setEnabled(false)
                }
            }
        }

        gl.domElement.addEventListener('mousedown', handleMouseDown)
        return () => gl.domElement.removeEventListener('mousedown', handleMouseDown)
    }, [camera, raycaster, gl, pickedObject, mouse])

    useEffect(() => {
        const handleMouseMove = () => {
            if (pickedObject && isPicking) {
                const deltaX = mouse.x - prevMousePos.current.x
                const deltaY = -(mouse.y - prevMousePos.current.y)

                const rigidBody = getRigidBody(pickedObject)
                if (rigidBody) {
                    const current = rigidBody.translation()
                    const newPosition = {
                        x: current.x + deltaX * 5,
                        y: current.y - deltaY * 5,
                    }

                    const positionVector = new THREE.Vector3(newPosition.x, newPosition.y > 0 ? newPosition.y : 0, 0)
                    rigidBody.setNextKinematicTranslation(positionVector)
                }

                prevMousePos.current.set(mouse.x, mouse.y)
            }
        }

        gl.domElement.addEventListener('mousemove', handleMouseMove)
        return () => gl.domElement.removeEventListener('mousemove', handleMouseMove)
    }, [mouse, pickedObject, isPicking, gl])

    useEffect(() => {
        const handleMouseUp = () => {
            if (pickedObject) {
                setPickedObject(null)
                setIsPicking(false)

                const rigidBody = getRigidBody(pickedObject)
                if (rigidBody) {
                    rigidBody.setBodyType(RigidBodyType.Dynamic, true)
                    rigidBody.collider(0).setEnabled(true)
                }
            }
        }

        gl.domElement.addEventListener('mouseup', handleMouseUp)
        return () => gl.domElement.removeEventListener('mouseup', handleMouseUp)
    }, [pickedObject, gl])

    return <PickUpProvider value={{ registerPickable }}>{children}</PickUpProvider>
}

export default PickUpObject
