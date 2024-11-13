'use client'
import { useSearchParams } from 'next/navigation'
import { BoulderInfo, BoulderList } from '../boulderlist'
import { EditBox } from '../editbox'
import { useLocalStorage, useLocalStorageState, useBoulderSelection } from '../page.state'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Boulder } from '../types'

export default function Home() {
    const storage = useLocalStorage()
    const searchParams = useSearchParams()
    const currentCompetition = searchParams.get('competition')
    const router = useRouter()

    useEffect(() => {
        if (currentCompetition === null) {
            router.push('..')
        }
    }, [currentCompetition, router])

    const [originalBoulders, setBoulders] = useLocalStorageState<Boulder[]>(
        storage,
        currentCompetition
    )
    const boulders = originalBoulders || []
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
