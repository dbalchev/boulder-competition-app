import { beforeEach, describe, expect, it, test } from 'vitest'
import { render, screen, renderHook, cleanup } from '@testing-library/react'
import Page from '../app/page'
import { Boulder, BoulderState } from '../app/types'
import { afterEach } from 'node:test'
import { useBoulderSelection } from '../app/page.state'

test('Page', () => {
    render(<Page />)
    expect(screen.getByText('Welcome to the bouldering app')).toBeDefined()
})

describe('useBoulderSelection', () => {
    const boulders: Boulder[] = [
        {
            id: '1',
            name: 'Boulder 1',
            state: BoulderState.NOT_ATTEMPTED,
        },
        {
            id: '2',
            name: 'Boulder 2',
            state: BoulderState.NOT_ATTEMPTED,
        },
    ]
    let newBoulderState: Boulder[] | null = null
    const setBoulders = (newState: Boulder[]) => {
        newBoulderState = newState
    }
    beforeEach(() => {
        newBoulderState = null
    })
    afterEach(() => {
        cleanup()
    })
    it('initial value', () => {
        const { result } = renderHook(() => useBoulderSelection({ boulders, setBoulders }))
        expect(result.current.selectedBoulder).toBe(null)
        expect(newBoulderState).toBe(null)
    })
    it('after seelection', () => {
        const { result, rerender } = renderHook(() =>
            useBoulderSelection({ boulders, setBoulders })
        )
        result.current.setSelectedId('2')
        rerender()

        expect(result.current.selectedBoulder).toStrictEqual({
            id: '2',
            name: 'Boulder 2',
            state: BoulderState.NOT_ATTEMPTED,
        })
        expect(newBoulderState).toBe(null)
    })
    it('after set state', () => {
        const { result, rerender } = renderHook(() =>
            useBoulderSelection({ boulders, setBoulders })
        )

        result.current.setSelectedId('2')
        rerender()
        result.current.setSelectedBoulderState(BoulderState.ATTEMPTED)
        rerender()
        expect(newBoulderState).toStrictEqual([
            {
                id: '1',
                name: 'Boulder 1',
                state: BoulderState.NOT_ATTEMPTED,
            },
            {
                id: '2',
                name: 'Boulder 2',
                state: BoulderState.ATTEMPTED,
            },
        ])
    })
})
