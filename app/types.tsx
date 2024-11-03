export enum BoulderState {
    NOT_ATTEMPTED = 'Not Attempted',
    ATTEMPTED = 'Attempted',
    FLASHED = 'Flashed',
    PASSED = 'Passed',
}

export interface Boulder {
    id: string
    name: string
    state: BoulderState
}
