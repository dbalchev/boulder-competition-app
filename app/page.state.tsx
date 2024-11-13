import { useEffect, useMemo, useState } from 'react'
import { Boulder, BoulderId, BoulderState } from './types'

export interface LocalStateSystem {
    getLocalStateKeys: () => string[]
    useLocalState: (
        localStateKey: string
    ) => <T>(initialFunction: () => T) => [T, (newState: T) => void]
}

export function makeOrReadInitialState(nBoulders: number): Boulder[] {
    const initialBoulders = []
    for (let n = 1; n <= nBoulders; ++n) {
        initialBoulders.push({
            id: `${n}`,
            name: `Boulder ${n}`,
            state: BoulderState.NOT_ATTEMPTED,
        })
    }
    return initialBoulders
}

export const useLocalStorage = (): Storage | null => {
    const [storage, setStorage] = useState<Storage | null>(null)

    useEffect(() => {
        setStorage(localStorage)
    }, [])
    return storage
}

export const useLocalStorageState = <T,>(
    storage: Storage | null,
    localStorageKey: string | null
): [T | null, (newState: T) => void] => {
    const [reactState, setReactState] = useState<T | null>(null)
    useEffect(() => {
        if (storage === null || localStorageKey === null) {
            return
        }
        const savedValue = storage.getItem(localStorageKey)
        if (savedValue === null) {
            return
        }
        setReactState(JSON.parse(savedValue))
    }, [storage, localStorageKey])
    const localStorageSet = (newState: T) => {
        if (storage !== null && localStorageKey !== null) {
            storage.setItem(localStorageKey, JSON.stringify(newState))
        }
        setReactState(newState)
    }
    return [reactState, localStorageSet]
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
