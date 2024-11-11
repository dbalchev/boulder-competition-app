'use client'
import { BoulderInfo, BoulderList } from './boulderlist'
import { EditBox } from './editbox'
import { useLocalState, useBoulderSelection, makeOrReadInitialState } from './page.state'

export default function Home() {
    const [boulders, setBoulders] = useLocalState(makeOrReadInitialState)
    const { setSelectedBoulderState, selectedBoulder, setSelectedId } = useBoulderSelection({
        boulders,
        setBoulders,
    })
    const editbox =
        selectedBoulder == null ? null : (
            // <dialog open>
            <EditBox
                onClose={() => setSelectedId(null)}
                setState={setSelectedBoulderState}
                boulderName={selectedBoulder.name}
            />
            // </dialog>
        )
    const boulderComponents = boulders.map((boulder) => (
        <BoulderInfo boulder={boulder} onClick={setSelectedId} key={boulder.id} />
    ))
    return (
        <>
            {editbox}
            <div className="scroll-container">
                <div id="welcome"> Welcome to the bouldering app</div>
                <br />
                <BoulderList boulderComponents={boulderComponents} />
            </div>
        </>
    )
}
