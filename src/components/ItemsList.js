import React, { useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from 'avataaars'
import CandidateDialog from "./CandidateDialog";
import mockApi from '../mock_data/mockApi';
// import candidates from "../mock_data/candidates";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 460,
        backgroundColor: theme.palette.background.paper
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

function reducer(state, action) {
    switch (action.type) {
        case 'setModalOpen':
            return {...state, isModalOpen: action.isModalOpen};
        case 'setCurrCandidateId':
            return {...state, currentCandidateId: action.id};
        case 'setCandidates':
            return {...state, candidates: action.candidates};
        case 'updateCandidateData':
            // mockApi.updateCandidateData(state.currentCandidateId, action.data).then((result) => {
            //     console.log(`Updated candidateData for id ${action.data.id} : `, result)
            //     return state
            // })
            state.candidates[action.data.data.id - 1] = {...state.candidates[action.data.data.id - 1], ...action.data.data}
            // console.log(action.data)
            // changedCandidate = {...changedCandidate, ...action.data}
            console.log("NEW STATE: ", state)
            return state;
        default:
            return state;
    }
}

function ItemsList(props) {
    const { classes } = props;

    const [state, dispatch] = useReducer(reducer, {
        isModalOpen: false,
        candidates: [],
        currentCandidateId: 0
    });

    useEffect(() => { //should trigger again after reducer updates
        console.log("TRIGGERED ")
        mockApi.fetchCandidates().then((candidates) => {
            dispatch({type: 'setCandidates', candidates})
        })
    }, []); // [state && state.currentCandidateId]

    const openCandidateDialog = (candidateId) => {
        dispatch({type: 'setCurrCandidateId', id: candidateId})
        dispatch({type: 'setModalOpen', isModalOpen: true})
    }

    const closeCandidateDialog = () => {
        dispatch({type: 'setModalOpen', isModalOpen: false})
    }

    const updateCandidateData = (newData) => {
        dispatch({type: 'setModalOpen', isModalOpen: false})
        dispatch({type: 'updateCandidateData', data: newData})
        mockApi.updateCandidates(state.candidates).then((result) => {
            console.log(result)
            mockApi.fetchCandidates().then((candidates) => {
                dispatch({type: 'setCandidates', candidates})
            })
        })
    }

    return (
        <div className={classes.root} style={{marginTop: 40, borderRadius: 5}}>
            {state.isModalOpen ?
                <CandidateDialog
                    currentCandidateId={state.currentCandidateId}
                    goBack={closeCandidateDialog}
                    updateCandidateData={updateCandidateData}
                /> :
                <List component="nav">
                    {!state.candidates.length?
                        <ListItem style={{justifyContent: "center"}}>
                            <CircularProgress className={classes.progress} />
                        </ListItem> :
                        state.candidates.map((candidate) => {
                            let { topType, accessoriesType, hairColor, facialHairType, facialHairColor, clotheType, clotheColor, eyeType, eyebrowType, mouthType, skinColor } = candidate.avatar
                            return (
                                <React.Fragment key={candidate.id}>
                                    {candidate.id !== 1 && <Divider />}
                                    <ListItem>
                                        <Avatar
                                            style={{height: 60, width: 60}}
                                            avatarStyle='Circle'
                                            topType={topType}
                                            accessoriesType={accessoriesType}
                                            hairColor={hairColor}
                                            facialHairType={facialHairType}
                                            facialHairColor={facialHairColor || "Default"}
                                            clotheType={clotheType}
                                            clotheColor={clotheColor}
                                            eyeType={eyeType}
                                            eyebrowType={eyebrowType}
                                            mouthType={mouthType}
                                            skinColor={skinColor}
                                        />
                                        <ListItemText primary={candidate.name} />
                                        {/*yeeeyyy making functions in render*/}
                                        <button style={{cursor: "pointer"}} onClick={() => {openCandidateDialog(candidate.id)}}>Edit</button>
                                    </ListItem>

                                </React.Fragment>
                            )
                        })
                    }
                </List>
            }
        </div>
    );
}

ItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemsList);
