'use client'
import { makeOrReadInitialState, useLocalStorage } from './page.state'
import { Competition, CompetitionSelection } from './competitionselection'
import { useRouter } from 'next/navigation'

export default function Home() {
    const storage = useLocalStorage()
    const router = useRouter()
    const competitions: Competition[] = []
    if (storage !== null) {
        for (let keyIndex = 0; keyIndex < storage.length; ++keyIndex) {
            const name = storage.key(keyIndex)
            if (name === null) {
                continue
            }
            competitions.push({ name })
        }
    }
    const goToCompetition = (name: string) => {
        const searchParams = new URLSearchParams()
        searchParams.append('competition', name)
        router.push('/competition?' + searchParams.toString())
    }
    const createCompetitoinAndGo = (name: string, numBoulders: number) => {
        localStorage.setItem(name, JSON.stringify(makeOrReadInitialState(numBoulders)))
        goToCompetition(name)
    }
    return (
        <CompetitionSelection
            competitions={competitions}
            setSelectedName={goToCompetition}
            createNewCompetition={createCompetitoinAndGo}
        />
    )
}
