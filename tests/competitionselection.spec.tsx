import { beforeEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Competition, CompetitionSelection } from '../app/competitionselection'

interface LocalTestContext {
    competitions: Competition[]
    competitionSelection: RenderResult
    getSelectedName: () => string | null
    getNewCompetitionRequest: () => [string, number] | null
}

beforeEach<LocalTestContext>(async (context) => {
    let competitions = [
        {
            name: 'foo',
        },
        {
            name: 'bar',
        },
    ]

    let selectedName: string | null = null
    let newCompetitionRequest: [string, number] | null = null
    let competitionSelection = render(
        <CompetitionSelection
            competitions={competitions}
            setSelectedName={(name) => {
                selectedName = name
            }}
            createNewCompetition={(name: string, numBoulders: number) => {
                newCompetitionRequest = [name, numBoulders]
            }}
        />
    )
    context.competitions = competitions
    context.competitionSelection = competitionSelection
    context.getSelectedName = () => selectedName
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
    getSelectedName,
}) => {
    getByText('foo').click()
    expect(getSelectedName()).toStrictEqual('foo')
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
