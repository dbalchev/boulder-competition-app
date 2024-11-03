'use client'
import { useState } from 'react'
import { BoulderList } from './boulderlist'
import { Boulder, BoulderId, BoulderState } from './types'
import { EditBox } from './editbox'
const initialBoulders: Boulder[] = [
    {
        id: '1',
        name: 'Boulder 1',
        state: BoulderState.NOT_ATTEMPTED,
    },
    {
        id: '2',
        name: 'Boulder 2',
        state: BoulderState.FLASHED,
    },
]
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
    const editbox =
        selectedId == null ? null : (
            <EditBox onClose={() => setSelectedId(null)} setState={setState} />
        )
    return (
        <>
            <div id="welcome"> Welcome to the bouldering app</div>
            {editbox}
            <BoulderList boulders={boulders} onClick={setSelectedId} />
        </>
    )
}
