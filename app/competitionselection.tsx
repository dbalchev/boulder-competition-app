import { useState } from 'react'

export interface Competition {
    name: string
}

export const CompetitionSelection = ({
    competitions,
    setSelectedName,
    createNewCompetition,
}: {
    competitions: Competition[]
    setSelectedName: (name: string) => void
    createNewCompetition: (name: string, numBoulders: number) => void
}) => {
    const [competitionName, setCompetitionName] = useState('')
    const [numberOfBoulders, setNumberOfBoulders] = useState<number | null>(null)
    return (
        <>
            <div className="competitionSelection">
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
                    className="createCompetition"
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
            <p className="competitionSelectionLabel">Go to existing competition</p>
            <div className="competitionSelection">
                {competitions
                    .toSorted((lh, rh) => lh.name.localeCompare(rh.name))
                    .map((c) => (
                        <div
                            className="competition"
                            key={c.name}
                            onClick={() => setSelectedName(c.name)}
                        >
                            {c.name}
                        </div>
                    ))}
            </div>
        </>
    )
}
