export type BoulderId = string

export enum BoulderState {
    NOT_ATTEMPTED = 'Not Attempted',
    ATTEMPTED = 'Attempted',
    FLASHED = 'Flashed',
    PASSED = 'Passed',
}

export interface Boulder {
    id: BoulderId
    name: string
    state: BoulderState
}
