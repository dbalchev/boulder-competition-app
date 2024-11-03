export type BoulderId = string

export enum BoulderState {
    NOT_ATTEMPTED = 'Not Attempted',
    ATTEMPTED = 'Attempted',
    FLASHED = 'Flashed',
    PASSED = 'Passed',
}

export function normalizeState(state: string) {
    for (const keyAndValue of Object.entries(BoulderState)) {
        if (keyAndValue.includes(state)) {
            return keyAndValue[0]
        }
    }
    throw `unknown state ${state}`
}

export interface Boulder {
    id: BoulderId
    name: string
    state: BoulderState
}
