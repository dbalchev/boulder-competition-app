'use client'
import { useMemo, useState } from 'react'
import { BoulderList } from './boulderlist'
import { Boulder, BoulderId, BoulderState } from './types'
import { EditBox } from './editbox'
const initialBoulders: Boulder[] = []

for (let n = 1; n <= 55; ++n) {
    initialBoulders.push({
        id: `${n}`,
        name: `Boulder ${n}`,
        state: BoulderState.NOT_ATTEMPTED,
    })
}

export default function Home() {
    const [boulders, setBoulders] = useState(initialBoulders)
    const [selectedId, setSelectedId] = useState<BoulderId | null>(null)
    const setState = (newState: BoulderState) => {
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
        for (let boulder of boulders) {
            if (boulder.id == selectedId) {
                return boulder
            }
        }
        throw `unknown boulder with id ${selectedId}`
    }, [selectedId, boulders])
    const editbox =
        selectedId == null ? null : (
            <EditBox
                onClose={() => setSelectedId(null)}
                setState={setState}
                boulderName={selectedBoulder!.name}
            />
        )
    return (
        <>
            <div id="welcome"> Welcome to the bouldering app</div>
            {editbox}
            <br />
            <BoulderList boulders={boulders} onClick={setSelectedId} />
        </>
    )
}
