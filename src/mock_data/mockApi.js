import candidates from './candidates';
// localStorage.setItem("candidates", candidates)

const TWO_SECONDS = 2000
const ONE_SECOND = 1000
let CANDIDATES_STATE = candidates

//Asumptia ar fi ca fetchCandidates ia doar date generale despre fiecare, iar fetchById ia date detaliate
const mockApi = {
    fetchCandidates: async () => resolveAfterXSeconds({type: "fetchAll"}),
    fetchCandidateById: async (id) => resolveAfterXSeconds({type: "fetchById", id}),
    updateCandidates: async (candidates) => resolveAfterXSeconds({type: "updateCandidates", candidates}),
    updateCandidateData: async (id, newCandidateData) => resolveAfterXSeconds({type: "updateCandidateData", id, newCandidateData})
}

const resolveAfterXSeconds = (action) => {
    console.log("CANDIDATES in mockApi: ", CANDIDATES_STATE)
    switch (action.type) {
        case "fetchAll":
            return new Promise(resolve => {
                setTimeout(() => {resolve(CANDIDATES_STATE)}, TWO_SECONDS)
            })
        case "fetchById":
            return new Promise(resolve => {
                setTimeout(() => {resolve(CANDIDATES_STATE.find((cand) => cand.id === action.id))}, ONE_SECOND)
            })
        case "updateCandidates":
            return new Promise(resolve => {
                CANDIDATES_STATE = action.candidates
                setTimeout(() => {resolve("SUCCESS")}, TWO_SECONDS)
            })
        case "updateCandidateData":
            return new Promise(resolve => {
                let candidate = CANDIDATES_STATE.find((cand) => cand.id === action.id)
                candidate = action.newCandidateData
                setTimeout(() => {resolve("SUCCESS")}, ONE_SECOND)
            })
    }

}

export default mockApi
