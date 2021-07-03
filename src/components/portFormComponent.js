import React from "react";
import Typography from '@material-ui/core/Typography';

import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ValueConst from "../config/consts/valueConsts";
import CountryList from "../lists/countryList";

import './portFormComponent.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlNoMargin: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const defaultDateTime = new Date();
defaultDateTime.setHours(0);
defaultDateTime.setMinutes(0);


export default function PortForm(props) {
    const classes = useStyles();


    const [data, setData] = React.useState({
        arrivalDeparture: '',
        voyageNumber: '',
        ETAPortOfCall: defaultDateTime,
        ETDPortOfCall: defaultDateTime,
        ATAPortOfCall: defaultDateTime,
        ATDPortOfCall: defaultDateTime,
        callAnchorage: '',
        positionPortOfCall: '',
        portFacilityArrival: '',
        cargoDescription: '',
        nameMaster: '',
        airDraught: '',
        purposesOfCall: [''],
        portOfArrival: '',
        lastPortOfCall: '',
        nextPortOfCall: '',
    });

    let setDataProp = function (dataItem) {
        // deep copy
        let dataCopy = JSON.parse(JSON.stringify(data));

        dataCopy = {...dataCopy, ...dataItem};

        setData(dataCopy);
    }

    const countryList = new CountryList();

    console.log('data: ', data);

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            Port information
        </Typography>

        <Grid container justify={'flex-start'}>
            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Departure / Arrival</InputLabel>
                <Select
                    labelId="departure-arrival-label"
                    id="arrival-departure"
                    value={data.arrivalDeparture}
                    onChange={(e) => {
                        setDataProp({arrivalDeparture: e.target.value})
                    }}
                >
                    <MenuItem value={'Arrival'}>{ValueConst.arrival}</MenuItem>
                    <MenuItem value={'Departure'}>{ValueConst.departure}</MenuItem>
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                required
                style={{marginLeft: '10%'}}
                className={classes.formControlNoMargin}
            >
                <TextField
                    label="Voyage Number:"
                    value={data.voyageNumber}
                    onChange={(e) => setDataProp({voyageNumber: e.target.value})}
                    variant="outlined"
                />
            </FormControl>

        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '20px'}}>
            Port of call
        </Typography>

        {/*Port of call and all time pickers*/}
        <div className={'flex-parent'}>
            <div className={'flex-item-40'}>
                <TextField id="port-call-field" label="Port of call" margin={'normal'} fullWidth variant="outlined"/>

                <TextField style={{marginTop: '15px'}} id="port-facility" label="Port facility at arrival"
                           variant="outlined"/>
            </div>

            <div className={'flex-item-60'}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-between">
                        <KeyboardTimePicker
                            margin="normal"
                            id="ETA-port-of-call"
                            label="ETA to port of call"
                            value={data.ETAPortOfCall}
                            onChange={(e) => setDataProp({ETAPortOfCall: e})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="ETD-port-of-call"
                            label="ETD from port of call"
                            value={data.ETDPortOfCall}
                            onChange={(e) => setDataProp({...data, ...{ETDPortOfCall: e}})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>

                    <Grid container justify="space-between">
                        <KeyboardTimePicker
                            variant={'outlined'}
                            margin="normal"
                            id="ATA-port-of-call"
                            label="ATA to port of call"
                            value={data.ATAPortOfCall}
                            onChange={(e) => setDataProp({...data, ...{ATAPortOfCall: e}})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />

                        <KeyboardTimePicker
                            margin="normal"
                            id="ATD-port-of-call"
                            label="ATD from port of call"
                            value={data.ATDPortOfCall}
                            onChange={(e) => setDataProp({ATDPortOfCall: e})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        </div>

        {/*Port of arrival / last port of call / next port of call*/}
        <Grid container justify="space-between" style={{marginTop: '30px'}}>

            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="port-of-arrival-label">Port of arrival</InputLabel>
                <Select
                    labelId="port-of-arrival-label"
                    value={data.portOfArrival}
                    onChange={(e) => {
                        setDataProp({portOfArrival: e.target.value})
                    }}
                >
                    <MenuItem value={'port 1'}>Port 1</MenuItem>
                    <MenuItem value={'port 2'}>Port 2</MenuItem>
                    <MenuItem value={'default'}>Port default</MenuItem>
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="last-port-call-label">Last port of call</InputLabel>
                <Select
                    labelId="last-port-call-label"
                    value={data.lastPortOfCall}
                    onChange={(e) => {
                        setDataProp({lastPortOfCall: e.target.value})
                    }}
                >
                    <MenuItem value={'port 1'}>Port 1</MenuItem>
                    <MenuItem value={'port 2'}>Port 2</MenuItem>
                    <MenuItem value={'default'}>Port default</MenuItem>
                </Select>
            </FormControl>


            <FormControl
                variant="outlined"
                required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="next-port-call-label">Next port of call</InputLabel>
                <Select
                    labelId="next-port-call-label"
                    value={data.nextPortOfCall}
                    onChange={(e) => {
                        setDataProp({nextPortOfCall: e.target.value})
                    }}
                >
                    <MenuItem value={'port 1'}>Port 1</MenuItem>
                    <MenuItem value={'port 2'}>Port 2</MenuItem>
                    <MenuItem value={'default'}>Port default</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <FormControl
            variant="outlined"
            required
            className={classes.formControlNoMargin}
            style={{marginTop: "30px"}}
        >
            <InputLabel id="next-port-call-label">Call at anchorage</InputLabel>
            <Select
                labelId="next-port-call-label"
                value={data.nextPortOfCall}
                onChange={(e) => {
                    setDataProp({nextPortOfCall: e.target.value})
                }}
            >
                <MenuItem value={'port 1'}>Port 1</MenuItem>
                <MenuItem value={'port 2'}>Port 2</MenuItem>
                <MenuItem value={'default'}>Port default</MenuItem>
            </Select>
        </FormControl>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Position at port of call
        </Typography>

        {/*Latitude, longitute and time*/}
        <Grid container justify="space-between" style={{marginTop: '30px'}}>

            <TextField
                label="Latitude"
                value={data.cargoDescription}
                onChange={(e) => setDataProp({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Longtitude"
                value={data.cargoDescription}
                onChange={(e) => setDataProp({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Time"
                value={data.cargoDescription}
                onChange={(e) => setDataProp({cargoDescription: e.target.value})}
                variant="outlined"
            />

        </Grid>

        <TextField
            style={{marginTop: '30px'}}
            label="Brief description of onboard cargo"
            multiline
            fullWidth
            rowsMax={4}
            value={data.cargoDescription}
            onChange={(e) => setDataProp({cargoDescription: e.target.value})}
            variant="outlined"
        />

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Name of master
        </Typography>

        <Grid container justify={'flex-start'}>

            <TextField
                label="Family name"
                value={data.cargoDescription}
                onChange={(e) => setDataProp({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField
                style={{marginLeft: '10%'}}
                label="Given name"
                value={data.cargoDescription}
                onChange={(e) => setDataProp({cargoDescription: e.target.value})}
                variant="outlined"
            />

        </Grid>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Purpose of call
        </Typography>
        <div style={{marginTop: "20px"}}>
            {data.purposesOfCall.map((item, index) => <div key={index}>
                <TextField
                    id={`purpose-of-call-${index}`}
                    label={index === 0 ? 'Call purpose' : `Call purpose (${index})`}
                    value={item}
                    onChange={(e) => {
                        let purposeArr = data.purposesOfCall;
                        purposeArr[index] = e.target.value;
                        setDataProp({purposesOfCall: purposeArr})
                    }}
                    variant="outlined"
                />

                <IconButton
                    style={{
                        marginLeft: '10px',
                        marginBottom: '20px'
                    }}
                    color={'secondary'}
                    aria-label="delete"
                    variant={'outlined'}
                    onClick={() => {
                        if (index === 0 && data.purposesOfCall.length === 1) {
                            setDataProp({purposesOfCall: ['']})
                        } else {
                            let slicedData = JSON.parse(JSON.stringify(data.purposesOfCall));
                            slicedData.splice(index, 1);
                            setDataProp({purposesOfCall: slicedData})
                        }
                    }}
                >
                    <DeleteIcon/>
                </IconButton>

            </div>)}

            <Button
                style={{marginTop: '15px'}}
                variant="outlined"
                color="primary"
                disabled={data.purposesOfCall[data.purposesOfCall.length - 1] === ''}
                className={classes.button}
                onClick={() => setDataProp({purposeOfCall: data.purposesOfCall.push('')})}
                startIcon={<AddIcon/>}
            >
                Add new row
            </Button>

        </div>

        <TextField
            style={{marginTop: '20px'}}
            id="air-draught-field"
            label="Air draught"
            value={data.airDraught}
            onChange={(e) => setDataProp({airDraught: e.target.value})}
            variant="outlined"
        />


        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            {data.arrivalDeparture} draught
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField id="port-call-field" label="Fore draught" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Mid-ship draught" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Aft draught" margin={'normal'} variant="outlined"/>
        </Grid>


        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Name and contact details of ship's agent
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField
                style={{width: 'calc(90% - 220px)'}}
                label="Name"
                multiline
                rowsMax={2}
                value={data.cargoDescription}
                onChange={(e) => setDataProp({cargoDescription: e.target.value})}
                variant="outlined"
            />

            <TextField label="Mobile telephone" variant="outlined"/>
        </Grid>

        <Grid container justify={'space-between'}>
            <TextField id="port-call-field" label="Business telephone" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Telefax" margin={'normal'} variant="outlined"/>
            <TextField id="port-call-field" label="Email" margin={'normal'} variant="outlined"/>
        </Grid>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Number of persons on board
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField label="Number of persons" margin={'normal'} variant="outlined"/>
            <TextField label="Number of crew" margin={'normal'} variant="outlined"/>
            <TextField label="Number of passengers" margin={'normal'} variant="outlined"/>
        </Grid>
        <TextField label="Have any stowaways been found on boards" margin={'normal'} variant="outlined"/> <br/>
        <TextField label="Period of stay" margin={'normal'} variant="outlined"/>
    </>
}