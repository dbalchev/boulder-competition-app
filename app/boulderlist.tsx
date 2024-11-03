import { useId } from 'react'

export type BoulderState = 'Not Attempted' | 'Attempted' | 'Flashed' | 'Passed'

export interface Boulder {
    id: string
    name: string
    state: BoulderState
}

function BoulderInfo({ boulder }: { boulder: Boulder }) {
    const elementId = useId()

    return (
        <div>
            <span id={elementId}>{boulder.name}</span>
            <span aria-labelledby={elementId}>{boulder.state}</span>
        </div>
    )
}

export function BoulderList({ boulders }: { boulders: Boulder[] }) {
    return (
        <>
            {boulders.map((boulder) => (
                <BoulderInfo boulder={boulder} key={boulder.id} />
            ))}
        </>
    )
}
