import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CandidateAvatar from './CandidateAvatar'
import CandidateDialog from './CandidateDialog'
import mockApi from '../mock_data/mockApi'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 460,
        backgroundColor: theme.palette.background.paper
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
})

function reducer(state, action) {
    switch (action.type) {
        case 'setModalOpen':
            return {...state, isModalOpen: action.isModalOpen}
        case 'setCandidates':
            return {...state, candidates: action.candidates}
        case 'setCurrCandidateId':
            return {...state, currentCandidateId: action.id}
        case 'updateCandidateData':
            const newState = state
            const currCandidateIndex = state.candidates.findIndex(x => x.id === state.currentCandidateId)
            newState.candidates[currCandidateIndex] = {...newState.candidates[currCandidateIndex], ...action.data}
            return newState
        default:
            return state
    }
}

function ItemsList(props) {
    const { classes } = props

    const [state, dispatch] = useReducer(reducer, {
        isModalOpen: false,
        candidates: [],
        currentCandidateId: 0
    })

    useEffect(() => {
        console.log("783457843587")
        fetchCandidates()
    }, [])

    const toggleOpenCandidateDialog = (shouldOpen, candidateId) => {
        shouldOpen && dispatch({type: 'setCurrCandidateId', id: candidateId}) //I love naming functions openStuff and then also doing other stuff in it. Don't you??
        dispatch({type: 'setModalOpen', isModalOpen: shouldOpen})
     }

    const fetchCandidates = () => {
        mockApi.fetchCandidates().then((candidates) => {
            dispatch({type: 'setCandidates', candidates})
        })
    }

    const updateCandidateData = (newData) => {
        dispatch({type: 'setModalOpen', isModalOpen: false})
        dispatch({type: 'updateCandidateData', data: newData})
        mockApi.updateCandidates(state.candidates).then(fetchCandidates)
    }

    return (
        <div className={classes.root} style={{marginTop: 40, borderRadius: 5}}>
            {state.isModalOpen ?
                <CandidateDialog
                    currentCandidateId={state.currentCandidateId}
                    goBack={() => {toggleOpenCandidateDialog(false)}}
                    updateCandidateData={updateCandidateData}
                /> :
                <List component="nav" style={{padding: 0}}>
                    {!state.candidates.length?
                        <ListItem style={{justifyContent: "center"}}>
                            <CircularProgress className={classes.progress} />
                        </ListItem> :
                        state.candidates.map((candidate, i) => (
                                <React.Fragment key={candidate.id}>
                                    {i && <Divider />}
                                    <ListItem>
                                        <CandidateAvatar data={{...candidate.avatar, height: 80, width: 80}}/>
                                        <ListItemText primary={candidate.name} />
                                        <button style={{cursor: "pointer"}} onClick={() => {toggleOpenCandidateDialog(true, candidate.id)}}>Edit</button>
                                    </ListItem>
                                </React.Fragment>
                            ))
                    }
                </List>
            }
        </div>
    );
}

ItemsList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemsList)
