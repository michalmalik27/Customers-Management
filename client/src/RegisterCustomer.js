
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import UIActionState, { actionStates } from './UIActionState';
import { CUSTOMER_API_URL } from './Constants';
import { TextInput, DateInput, SelectInput, } from './Inputs';

const useStyles = makeStyles((theme) => ({
    paper: {
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
    alert: {
        width: '100%',
    },
}));

const rules = {
    idNumber: {
        pattern: { value: /^[\d]+$/i, message: "Only digits" },
        minLength: { value: 9, message: "9 digits" },
        maxLength: { value: 9, message: "9 digits" },
        required: "Required",
    },
    customerHebName: {
        pattern: { value: /^[\u0590-\u05fe-\s]+$/i, message: "Only hebrew characters '-' and space" },
        maxLength: { value: 20, message: "Maximum 20 characters" },
        required: "Required",
    },
    customerEngName: {
        pattern: { value: /^[A-Za-z-\s]+$/i, message: "Only english characters '-' and space" },
        maxLength: { value: 15, message: "Maximum 15 characters" },
        required: "Required",
    },
    dateOfBirth: {
        required: "Required",
    },
    cityId: {
        required: "Required",
    },
    bankNumber: {
        required: "Required",
    },
    bankBranch: {
        required: "Required",
    },
    accountingNumber: {
        pattern: { value: /^[\d]+$/i, message: "Only digits" },
        maxLength: { value: 10, message: "Maximum 10 digits" },
        required: "Required",
    }
};

const RegisterCustomer = ({ banks, cities }) => {
    const classes = useStyles();

    const [saveState, setSaveState] = useState(actionStates.INIT);
    const [saveStateText, setSaveStateText] = useState(undefined);

    const { handleSubmit, control, watch } = useForm({
        mode: "onChange"
    });

    const onSubmit = async (customer) => {
        try {
            setSaveState(actionStates.IN_PROCESS);
            setSaveStateText('Saving the customer...');
            console.log(customer);
            let response = await fetch(CUSTOMER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            });
            let data = await response.json();

            if (response.ok) {
                setSaveState(actionStates.IS_COMPLETED);
                setSaveStateText(undefined);
            }
            else {
                setSaveState(actionStates.IS_FAILED);
                setSaveStateText(`Save Failed: ${data.message || 'Model Is Not Valid'}`)
            }

        } catch (e) {
            setSaveState(actionStates.IS_FAILED);
            setSaveStateText(`Error ocourd...`)
        }
    }

    const bankNumber = watch('bankNumber');

    const branches = () => {
        return !bankNumber ? [] : banks.find(x => x.code === bankNumber).branches;
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
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextInput name="idNumber" label="Id Number" control={control} rules={rules.idNumber} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput name="customerHebName" label="Hebrew Name" control={control} rules={rules.customerHebName} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput name="customerEngName" label="English Name" control={control} rules={rules.customerEngName} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DateInput name="dateOfBirth" label="Date Of Birth" type="date" control={control} rules={rules.dateOfBirth} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectInput name="cityId" label="City" control={control} list={cities} extractId={item => item.cityId} extractValue={item => item.cityName} rules={rules.cityId} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectInput name="bankNumber" label="Bank" control={control} list={banks} extractId={item => item.code} extractValue={item => `${item.description} (${item.code})`} rules={rules.bankNumber} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectInput name="bankBranch" label="Bank Branch" control={control} list={branches()} extractId={item => item.branchNumber} extractValue={item => `${item.branchName} (${item.branchNumber})`} rules={rules.bankBranch} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput name="accountingNumber" label="Accounting Number" control={control} rules={rules.accountingNumber} />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={saveState == actionStates.IN_PROCESS}
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
            <UIActionState actionState={saveState} actionText={saveStateText} >
                <div className={classes.alert}>
                    <Alert severity="success">
                        The customer saved!
                    </Alert>
                </div>
            </UIActionState>
        </Container>
    );
}

export default RegisterCustomer;