import { useId } from 'react'
import { Boulder, BoulderId } from './types'

function BoulderInfo({
    boulder,
    onClick,
}: {
    boulder: Boulder
    onClick: (clickedBoulderId: BoulderId) => void
}) {
    const elementId = useId()
    const boulderClass = boulder.state.toUpperCase().replaceAll(' ', '_')
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
        <>
            {boulders.map((boulder) => (
                <BoulderInfo boulder={boulder} key={boulder.id} onClick={onClick} />
            ))}
        </>
    )
}
