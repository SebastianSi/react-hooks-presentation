import React, {useState, useEffect} from "react"
import mockApi from "../mock_data/mockApi"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import CandidateAvatar from './CandidateAvatar'
import InputLabel from '@material-ui/core/InputLabel'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

function CandidateDialog(props) {
    const { classes } = props

    const [candidateData, setCandidateData] = useState({})

    //note, while we could only use the above candidateData instead of the below parts of it,
    //useState can only set a value at a time; thus, we can't setCandidateData only for name,
    //like we would use setState in classes - though we can do setCandidateData({...candidateData, name})
    //see the below alternative implementation for name

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [techSkills, setTechSkills] = useState("")
    const [otherSkills, setOtherSkills] = useState("")
    const [salaryExpectations, setsalaryExpectations] = useState("")

    useEffect(() => {
        mockApi.fetchCandidateById(props.currentCandidateId).then((candidateData) => {
            setCandidateData(candidateData)

            //## setCandidateData({...candidateData, ...candidateData.name})
            setName(candidateData.name)
            setAge(candidateData.age)
            setTechSkills(candidateData.technicalSkills)
            setOtherSkills(candidateData.otherSkills)
            setsalaryExpectations(candidateData.salaryExpectations)
        })
    }, [])

    const handleChange = name => e => {
        switch (name) {
            case 'name':
                //## setCandidateData({...candidateData, name: e.target.value})
                setName(e.target.value)
                break
            case 'age':
                setAge(e.target.value)
                break
            case 'techSkills':
                setTechSkills(e.target.value)
                break
            case 'otherSkills':
                setOtherSkills(e.target.value)
                break
            case 'salaryExpectations':
                props.currentCandidateId ?
                    setsalaryExpectations(e.target.value) :
                    window.manageCustomExp(setsalaryExpectations, salaryExpectations)
                break
            default:
                console.log('Wait what?')
        }
    }

    let ageMenuItems = []
    for (let i=11; i<80; i++) {
        ageMenuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }

    return (
        <div style={{color: "#000", width: "100%", height: "100%"}}>
            {candidateData.avatar?
                <CandidateAvatar data={{...candidateData.avatar, height: 200, width: 200}}/>
            :
                <CircularProgress className={classes.progress} />
            }
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    //## value={candidateData.name || ""}
                    value={name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <Divider />
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select
                    value={age}
                    onChange={handleChange('age')}
                    inputProps={{name: 'age', id: 'age-simple'}}>
                    <MenuItem value={age}>
                        <em>Current: {age}</em>
                    </MenuItem>
                    {ageMenuItems}
                </Select>
                </FormControl>
                <TextField
                    id="outlined-name"
                    label="Technical Skills"
                    className={classes.textField}
                    value={techSkills}
                    onChange={handleChange('techSkills')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Other Skills"
                    className={classes.textField}
                    value={otherSkills}
                    onChange={handleChange('otherSkills')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Salary Expectations (in React Coins)"
                    className={classes.textField}
                    value={salaryExpectations}
                    onChange={handleChange('salaryExpectations')}
                    margin="normal"
                    variant="outlined"
                />
                <div style={{paddingTop: 30}}>
                    <Button variant="contained" className={classes.button}
                            onClick={props.goBack}>Cancel</Button>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => {props.updateCandidateData({
                                    id: props.currentCandidateId,
                                    name,
                                    //## name: candidateData.name,
                                    age,
                                    technicalSkills: techSkills,
                                    otherSkills,
                                    salaryExpectations
                                })}}>Save
                    </Button>
                </div>
            </form>
        </div>
    );
}

CandidateDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    currentCandidateId: PropTypes.number.isRequired
};



const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        fontWeight: 560
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 300
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
})

export default withStyles(styles)(CandidateDialog);


