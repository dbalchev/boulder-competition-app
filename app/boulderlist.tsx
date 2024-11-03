import { useId } from 'react'
import { Boulder, BoulderId, normalizeState } from './types'

function BoulderInfo({
    boulder,
    onClick,
}: {
    boulder: Boulder
    onClick: (clickedBoulderId: BoulderId) => void
}) {
    const elementId = useId()
    const boulderClass = normalizeState(boulder.state)
    return (
        <div onClick={() => onClick(boulder.id)} className={`boulder ${boulderClass}`}>
            <span id={elementId}>{boulder.name}</span>
            <br />
            <span aria-labelledby={elementId}>{boulder.state}</span>
        </div>
    )
}

export function BoulderList({
    boulders,
    onClick,
}: {
    boulders: Boulder[]
    onClick: (clickedBoulderId: BoulderId) => void
}) {
    return (
        <div className="boulderlist">
            {boulders.map((boulder) => (
                <BoulderInfo boulder={boulder} key={boulder.id} onClick={onClick} />
            ))}
        </div>
    )
}
