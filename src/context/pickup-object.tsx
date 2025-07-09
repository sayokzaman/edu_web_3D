// PickUpContext.tsx
import { createContext, useContext } from 'react'
import * as THREE from 'three'

type PickUpContextType = {
    registerPickable: (obj: THREE.Object3D) => void
}

const PickUpContext = createContext<PickUpContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const usePickUp = () => {
    const ctx = useContext(PickUpContext)
    if (!ctx) throw new Error('usePickUp must be used within a <PickUpObject>')
    return ctx
}

export const PickUpProvider = PickUpContext.Provider
