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
            <EditBox
                onClose={() => setSelectedId(null)}
                setState={setSelectedBoulderState}
                boulderName={selectedBoulder.name}
            />
        )
    const boulderComponents = boulders.map((boulder) => (
        <BoulderInfo boulder={boulder} onClick={setSelectedId} key={boulder.id} />
    ))
    return (
        <div suppressHydrationWarning={true}>
            <div id="welcome"> Welcome to the bouldering app</div>
            {editbox}
            <br />
            <BoulderList boulderComponents={boulderComponents} />
        </div>
    )
}
