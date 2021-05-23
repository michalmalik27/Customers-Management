
import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import UIActionState, { actionStates } from './UIActionState';
import { CUSTOMER_API_URL } from './Constants';
import { useForm, Controller } from "react-hook-form";

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
    alert: {
        width: '100%',
    },
}));

const Input = ({ control, name, label, type, rules }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    type={type}
                    label={label}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            )}
            rules={rules}
        />);
}

const Select = ({ control, name, label, list, idField, valueField, rules }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    select
                    label={label}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                >
                    { list.map((item) =>
                        <MenuItem key={item[idField]} value={item[idField]}>
                            {item[valueField]}
                        </MenuItem>
                    )}
                </TextField>
            )}
            rules={rules}
        />);
}

const rules = {
    idNumber: {
        minLength: { value: 9, message: "9 digits" },
        maxLength: { value: 9, message: "9 digits" },
        required: "Required",
    },
    customerHebName: {
        pattern: {
            value: /^[\u0590-\u05fe-\s]+$/i,
            message:
                "Only hebrew characters '-' and space",
        },
        maxLength: { value: 20, message: "Maximum 20 characters" },
        required: "Required",
    }, customerEngName: {
        pattern: {
            value: /^[A-Za-z-\s]+$/i,
            message:
                "Only english characters '-' and space",
        },
        maxLength: { value: 15, message: "Maximum 15 characters" },
        required: "Required",
    }, dateOfBirth: {
        required: "Required",
    }, cityId: {
        required: "Required",
    }, bankNumber: {
        required: "Required",
    }, bankBranch: {
        required: "Required",
    }, accountingNumber: {
        maxLength: { value: 10, message: "Maximum 10 digits" },
        required: "Required",
    }
};

const RegisterCustomer = ({ banks, cities }) => {
    const classes = useStyles();

    const [saveState, setSaveState] = useState(actionStates.INIT);
    const [saveStateText, setSaveStateText] = useState(undefined);

    const { handleSubmit, control, watch } = useForm();

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
            setSaveStateText(`Model Is Not Valid`)
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
                            <Input name="idNumber" label="Id Number" type="number" control={control} rules={rules.idNumber} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input name="customerHebName" label="Hebrew Name" type="text" control={control} rules={rules.customerHebName} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input name="customerEngName" label="English Name" type="text" control={control} rules={rules.customerEngName} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input name="dateOfBirth" label="Date Of Birth" type="date" control={control} rules={rules.dateOfBirth} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select name="cityId" label="City" control={control} list={cities} idField="cityId" valueField="cityName" rules={rules.cityId} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select name="bankNumber" label="Bank" control={control} list={banks} idField="code" valueField="description" rules={rules.bankNumber} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select name="bankBranch" label="Bank Branch" control={control} list={branches()} idField="branchNumber" valueField="branchName" rules={rules.bankBranch} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input name="accountingNumber" label="Accounting Number" type="number" control={control} rules={rules.accountingNumber} />
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