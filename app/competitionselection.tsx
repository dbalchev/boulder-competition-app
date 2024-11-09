export interface Competition {
    id: string
    name: string
    lastUpdated: string
}

export const CompetitionSelection = ({
    competitions,
    setSelectedId,
}: {
    competitions: Competition[]
    setSelectedId: (id: string) => void
    createNewCompetition: (name: string, numBoulders: number) => void
}) => {
    return (
        <>
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
