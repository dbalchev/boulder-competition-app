import { useEffect, useMemo, useState } from 'react'
import { Boulder, BoulderId, BoulderState } from './types'

export function useLocalState<T>(initialFunction: () => T): [T, (newState: T) => void] {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [reactState, setReactState] = useState(initialFunction)

    useEffect(() => {
        if (!isClient) {
            return
        }
        const localStorageValue = localStorage.getItem('demo')
        if (localStorageValue === null) {
            return
        }
        setReactState(JSON.parse(localStorageValue))
    }, [isClient])
    const localStorageSet = (newState: T) => {
        if (isClient) {
            localStorage.setItem('demo', JSON.stringify(newState))
        }
        setReactState(newState)
    }
    return [reactState, localStorageSet]
}

export function makeOrReadInitialState(): Boulder[] {
    const initialBoulders = []
    for (let n = 1; n <= 55; ++n) {
        initialBoulders.push({
            id: `${n}`,
            name: `Boulder ${n}`,
            state: BoulderState.NOT_ATTEMPTED,
        })
    }
    return initialBoulders
}

export const useBoulderSelection = ({
    boulders,
    setBoulders,
}: {
    boulders: Boulder[]
    setBoulders: (newState: Boulder[]) => void
}) => {
    const [selectedId, setSelectedId] = useState<BoulderId | null>(null)
    const setSelectedBoulderState = (newState: BoulderState) => {
        const newBoulders = boulders.map((boulder) => {
            if (boulder.id !== selectedId) {
                return boulder
            }
            return {
                ...boulder,
                state: newState,
            }
        })
        setBoulders(newBoulders)
    }
    const selectedBoulder = useMemo(() => {
        if (selectedId === null) {
            return null
        }
        for (const boulder of boulders) {
            if (boulder.id == selectedId) {
                return boulder
            }
        }
        throw `unknown boulder with id ${selectedId}`
    }, [selectedId, boulders])
    return {
        setSelectedBoulderState,
        selectedBoulder,
        setSelectedId,
    }
}
