
import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UIActionState, { actionStates } from './UIActionState';
import MenuItem from '@material-ui/core/MenuItem';
import { CUSTOMER_API_URL } from './Constants';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const RegisterCustomer = ({ banks, cities }) => {
    const classes = useStyles();

    const [saveState, setSaveState] = useState(actionStates.INIT);
    const [saveStateText, setSaveStateText] = useState(null);
    const [customer, setCustomer] = useState({
        idNumber: undefined,
        customerHebName: undefined,
        customerEngName: undefined,
        cityId: undefined,
        dateOfBirth: undefined,
        bankNumber: undefined,
        bankBranch: undefined,
        accountingNumber: undefined
    });

    const validationRegullar = {
        idNumber: {
            regex: new RegExp('^[0-9]{9}$'),
            errorMessage: 'Id Number must contain 9 digits'
        },
        customerHebName: {
            regex: new RegExp('^\d{9}$'),
            errorMessage: 'Id Number not valid'
        },
        customerEngName: {
            regex: new RegExp('^\d{9}$'),
            errorMessage: 'Id Number not valid'
        },
        accountingNumber: {
            regex: new RegExp('^[0-9]{1, 10}$'),
            errorMessage: 'Accounting Number must contain between 1-10 digits'
        }
    };

    const updateCustomerData = (event) => {
        let updatedCustomer = { ...customer };
        updatedCustomer[event.target.id] = event.target.value;
        setCustomer(updatedCustomer)
    }
    const showHelperText = (elementName) => {
        return !customer[elementName] ||
            (validationRegullar[elementName] && !validationRegullar[elementName].regex.exec(customer[elementName]));
    }

    const getHelperText = (elementName) => {
        if (!customer[elementName])
            return 'Required';
        if (validationRegullar[elementName] && !validationRegullar[elementName].regex.exec(customer[elementName]))
            return validationRegullar[elementName].errorMessage;
        return '';
    }

    const handleSubmit = async () => {
        try {
            console.log(customer);
            let response = await fetch(CUSTOMER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customer })
            });
            let data = await response.json();

            if (response.ok) {
                setSaveState(actionStates.IS_COMPLETED);
                setSaveStateText(null);
            }
            else {
                setSaveState(actionStates.IS_FAILED);
                setSaveStateText(`Save Failed: ${data.message || 'Model Is Not Valid'}`)
            }

        } catch (e) {
            setSaveState(actionStates.IS_FAILED);
            setSaveStateText(`Model Is Not Valid`)
        }
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    New Customer
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                max="999999999"
                                type="number"
                                name="idNumber"
                                variant="outlined"
                                id="idNumber"
                                label="ID Number"
                                helperText={getHelperText('idNumber')}
                                error={showHelperText('idNumber')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.idNumber}
                                required
                                fullWidth
                                autoFocus
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="customerHebName"
                                variant="outlined"
                                id="customerHebName"
                                label="Customer Hebrew Name"
                                helperText={getHelperText('customerHebName')}
                                error={showHelperText('customerHebName')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.customerHebName}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="customerEngName"
                                variant="outlined"
                                id="customerEngName"
                                label="Customer English Name"
                                helperText={getHelperText('customerEngName')}
                                error={showHelperText('customerEngName')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.customerEngName}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="date"
                                name="dateOfBirth"
                                variant="outlined"
                                id="dateOfBirth"
                                label="Date Of Birth"
                                helperText={getHelperText('dateOfBirth')}
                                error={showHelperText('dateOfBirth')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.dateOfBirth}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                name="cityId"
                                variant="outlined"
                                id="cityId"
                                label="City"
                                helperText={getHelperText('cityId')}
                                error={showHelperText('cityId')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.cityId}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.cityId} value={city.cityId}>
                                        {city.cityName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                name="bankNumber"
                                variant="outlined"
                                id="bankNumber"
                                label="Bank"
                                helperText={getHelperText('bankNumber')}
                                error={showHelperText('bankNumber')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.bankNumber}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {banks.map((bank) => (
                                    <MenuItem key={bank.code} value={bank.code}>
                                        {bank.description} ({bank.code})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                name="bankBranch"
                                variant="outlined"
                                id="bankBranch"
                                label="Bank Branch"
                                helperText={getHelperText('bankBranch')}
                                error={showHelperText('bankBranch')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.bankBranch}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {banks.filter(x => x.code === customer.bankNumber).map((bankBranch) => (
                                    <MenuItem key={bankBranch.braunchNumber} value={bankBranch.branchNumber}>
                                        {bankBranch.branchName} ({bankBranch.braunchNumber})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                max="999999999"
                                type="number"
                                name="idNumber"
                                variant="outlined"
                                id="accountingNumber"
                                label="Accounting Number"
                                helperText={getHelperText('accountingNumber')}
                                error={showHelperText('accountingNumber')}
                                onChange={(event) => updateCustomerData(event)}
                                value={customer.accountingNumber}
                                required
                                fullWidth
                                autoFocus
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                    </Grid>
                    <Button onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>

                        </Grid>
                    </Grid>
                </form>
            </div>
            <UIActionState actionState={saveState} actionText={saveStateText} />
        </Container>
    );
}

export default RegisterCustomer;