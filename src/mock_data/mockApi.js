import candidates from './candidates'

const TWO_SECONDS = 200
let CANDIDATES_STATE = candidates

const mockApi = {
    fetchCandidates: async () => resolveAfter2Seconds({type: "fetchAll"}),
    fetchCandidateById: async (id) => resolveAfter2Seconds({type: "fetchById", id}),
    updateCandidates: async (candidates) => resolveAfter2Seconds({type: "updateCandidates", candidates})
}

const resolveAfter2Seconds = (action) => {
    switch (action.type) {
        case "fetchAll":
            return new Promise(resolve => {
                setTimeout(() => {resolve(CANDIDATES_STATE)}, TWO_SECONDS)
            })
        case "fetchById":
            return new Promise(resolve => {
                setTimeout(() => {resolve(CANDIDATES_STATE.find((cand) => cand.id === action.id))}, TWO_SECONDS)
            })
        case "updateCandidates":
            return new Promise(resolve => {
                CANDIDATES_STATE = action.candidates
                setTimeout(() => {resolve("SUCCESS")}, TWO_SECONDS)
            })
        default:
            console.log("Well, why 'd you call me then?")
    }
}

export default mockApi
