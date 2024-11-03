import { useId } from 'react'
import { Boulder } from './types'

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
