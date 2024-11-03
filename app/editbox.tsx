import { BoulderState } from './types'

export function EditBox({
    onClose,
    setState,
}: {
    onClose: () => void
    setState: (newState: BoulderState) => void
}) {
    return (
        <div>
            <div onClick={() => onClose()}>Close</div>
            <>
                {Object.values(BoulderState).map((state) => {
                    return (
                        <div
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
