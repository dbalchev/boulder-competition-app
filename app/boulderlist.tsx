import { ReactNode, useId } from 'react'
import { Boulder, BoulderId, normalizeState } from './types'

export const BoulderInfo = ({
    boulder,
    onClick,
}: {
    boulder: Boulder
    onClick: (clickedBoulderId: BoulderId) => void
}) => {
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

export function BoulderList({ boulderComponents }: { boulderComponents: ReactNode[] }) {
    return (
        <div className="boulderlist">
            {boulderComponents.map((boulderComponent) => boulderComponent)}
        </div>
    )
}
