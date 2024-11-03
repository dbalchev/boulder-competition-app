import { BoulderState, normalizeState } from './types'

export function EditBox({
    onClose,
    setState,
    boulderName,
}: {
    onClose: () => void
    setState: (newState: BoulderState) => void
    boulderName: string
}) {
    return (
        <div className="editbox">
            <div>Choose the new state for {boulderName}</div>
            <div className="closeEditBox" onClick={() => onClose()}>
                Close
            </div>
            <>
                {Object.values(BoulderState).map((state) => {
                    return (
                        <div
                            className={`setState ${normalizeState(state)}`}
                            key={state}
                            onClick={() => {
                                onClose()
                                setState(state)
                            }}
                        >
                            {state}
                        </div>
                    )
                })}
            </>
        </div>
    )
}
