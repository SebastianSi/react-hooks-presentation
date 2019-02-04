import React, {useState, useEffect} from "react";
import mockApi from "../mock_data/mockApi";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Avatar from "avataaars";
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function CandidateDialog(props) {
    const { classes } = props;

    const [candidateData, setCandidateData] = useState({})
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [techSkills, setTechSkills] = useState("")
    const [otherSkills, setOtherSkills] = useState("")
    const [salaryExpectations, setsalaryExpectations] = useState("")

    useEffect(() => {
        mockApi.fetchCandidateById(props.currentCandidateId).then((candidateData) => {
            setCandidateData(candidateData)

            setName(candidateData.name)
            setAge(candidateData.age)
            setTechSkills(candidateData.technicalSkills)
            setOtherSkills(candidateData.otherSkills)
            setsalaryExpectations(candidateData.salaryExpectations)
        })
    }, []);

    const handleChange = name => e => {
        switch (name) {
            case 'name':
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
                setsalaryExpectations(e.target.value)
                break
            default:
                console.log('Wait what?')
        }
    }

    //TODO: saveCandidateNewData schimba app state; de decis daca o sa facem cu useReducer
    //TODO: de mai sus, si pasam un dispatch prop, sau daca direct de aici schimbam, prolly prima
    let { topType, accessoriesType, hairColor, facialHairType, facialHairColor, clotheType, clotheColor, eyeType,
        eyebrowType, mouthType, skinColor } = candidateData.avatar || ""

    let ageMenuItems = []
    for (let i=11; i<80; i++) {
        ageMenuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }

    return (
        <div style={{color: "#000", width: "100%", height: "100%"}}>
            {candidateData.avatar?
            <Avatar
                style={{height: 200, width: 200}}
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
            /> :
            <CircularProgress className={classes.progress} />
            }
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
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
                            onClick={() => {props.updateCandidateData({data: {
                                    id: props.currentCandidateId,
                                    name,
                                    age,
                                    technicalSkills: techSkills,
                                    otherSkills,
                                    salaryExpectations
                                }
                            })}}>Save</Button>
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
        width: 300,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    }
});

export default withStyles(styles)(CandidateDialog);


