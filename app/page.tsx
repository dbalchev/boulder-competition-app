import { Boulder, BoulderList } from './boulderlist'

export default function Home() {
    const boulders: Boulder[] = [
        {
            id: '1',
            name: 'Boulder 1',
            state: 'Not Attempted',
        },
        {
            id: '2',
            name: 'Boulder 2',
            state: 'Flashed',
        },
    ]
    return (
        <>
            <div id="welcome"> Welcome to the bouldering app</div>
            <BoulderList boulders={boulders} />
        </>
    )
}
