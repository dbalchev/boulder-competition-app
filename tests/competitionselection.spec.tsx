import { beforeEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Competition, CompetitionSelection } from '../app/competitionselection'

interface LocalTestContext {
    competitions: Competition[]
    competitionSelection: RenderResult
    getSelectedId: () => string | null
    getNewCompetitionRequest: () => [string, number] | null
}

beforeEach<LocalTestContext>(async (context) => {
    let competitions = [
        {
            id: 'foo',
            name: 'foo',
            lastUpdated: '2024-11-08',
        },
        {
            id: 'bar',
            name: 'bar',
            lastUpdated: '2024-11-09',
        },
    ]

    let selectedId: string | null = null
    let newCompetitionRequest: [string, number] | null = null
    let competitionSelection = render(
        <CompetitionSelection
            competitions={competitions}
            setSelectedId={(id) => {
                selectedId = id
            }}
            createNewCompetition={(name: string, numBoulders: number) => {
                newCompetitionRequest = [name, numBoulders]
            }}
        />
    )
    context.competitions = competitions
    context.competitionSelection = competitionSelection
    context.getSelectedId = () => selectedId
    context.getNewCompetitionRequest = () => newCompetitionRequest
    return async () => {
        cleanup()
    }
})

test<LocalTestContext>('CompetitionSelection order', ({ competitionSelection: { container } }) => {
    const allCompetitions = [...container.querySelectorAll('.competition')]
    const competitionNames = allCompetitions.map((c) => c.textContent)
    expect(competitionNames).toStrictEqual(['bar', 'foo'])
})

test<LocalTestContext>('CompetitionSelection select', ({
    competitionSelection: { getByText },
    getSelectedId,
}) => {
    getByText('foo').click()
    expect(getSelectedId()).toStrictEqual('foo')
})

test<LocalTestContext>('CompetitionSelection create new competition', ({
    competitionSelection: { getByText, getByPlaceholderText },
    getNewCompetitionRequest,
}) => {
    fireEvent.change(getByPlaceholderText('New Competition Name'), { target: { value: 'baz' } })
    fireEvent.change(getByPlaceholderText('Number of Boulders'), { target: { value: '34' } })
    getByText('Create new Competition').click()
    expect(getNewCompetitionRequest()).toStrictEqual(['baz', 34])
})
