import { BoulderList } from './boulderlist'
import { Boulder, BoulderState } from './types'

export default function Home() {
    const boulders: Boulder[] = [
        {
            id: '1',
            name: 'Boulder 1',
            state: BoulderState.NOT_ATTEMPTED,
        },
        {
            id: '2',
            name: 'Boulder 2',
            state: BoulderState.FLASHED,
        },
    ]
    return (
        <>
            <div id="welcome"> Welcome to the bouldering app</div>
            <BoulderList boulders={boulders} />
        </>
    )
}
