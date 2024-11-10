import { useState } from 'react'

export interface Competition {
    id: string
    name: string
    lastUpdated: string
}

export const CompetitionSelection = ({
    competitions,
    setSelectedId,
    createNewCompetition,
}: {
    competitions: Competition[]
    setSelectedId: (id: string) => void
    createNewCompetition: (name: string, numBoulders: number) => void
}) => {
    const [competitionName, setCompetitionName] = useState('')
    const [numberOfBoulders, setNumberOfBoulders] = useState<number | null>(null)
    return (
        <>
            <div>
                <input
                    placeholder="New Competition Name"
                    value={competitionName}
                    onChange={(e) => setCompetitionName(e.target.value)}
                />
                <input
                    placeholder="Number of Boulders"
                    type="number"
                    value={numberOfBoulders || ''}
                    onChange={(e) => {
                        const newValue = e.target.value
                        if (newValue.length === 0) {
                            setNumberOfBoulders(null)
                        } else {
                            setNumberOfBoulders(Number.parseInt(newValue))
                        }
                    }}
                />
                <div
                    onClick={() => {
                        if (!competitionName || numberOfBoulders === null) {
                            return
                        }
                        createNewCompetition(competitionName, numberOfBoulders)
                    }}
                >
                    Create new Competition
                </div>
            </div>
            {competitions
                .toSorted((lh, rh) => -lh.lastUpdated.localeCompare(rh.lastUpdated))
                .map((c) => (
                    <div className="competition" key={c.id} onClick={() => setSelectedId(c.id)}>
                        {c.name}
                    </div>
                ))}
        </>
    )
}
