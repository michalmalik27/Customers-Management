import React, { Component } from 'react';
import { render } from 'react-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CUSTOMER_API_URL, BANK_API_URL, CITY_API_URL } from './Constants';

//export default class NewCustomerComponent extends Component {
//    render() {
//        return (
//            <Register />
//        );
//    }
//}

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export default class RegisterCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            email: null,
            password: null,
            errors: {
                fullName: '',
                email: '',
                password: '',
            }
        };

        this.cities = props.cities;
        this.banks = props.banks;

        this.isAddCustomerSucceeded = false;
        this.addCustomerError = '';
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'fullName':
                errors.fullName =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleSubmit = async () => {
        console.log('handleSubmit');

        console.log(this.state);
        let customer = this.state;
        let response = await fetch(CUSTOMER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        });
        let data = await response.json();

        //if (response.ok)
        //    setIsAddCustomerSucceeded(data);
        //else {
        //    setAddCustomerError(`Saving data failed: ${data.message}`);
        //}
    }

    render() {
        const { errors } = this.state;
        return (
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <form noValidate>
                        <FormControl fullWidth >
                            <TextField
                                name='fullName'
                                onChange={this.handleChange}
                                error={!!errors.fullName}
                                id="standard-error-helper-text"
                                label="Full Name"
                                helperText={errors.fullName}
                            />
                        </FormControl>
                        {/*<div className='fullName'>*/}
                        {/*    <label htmlFor="fullName">Full Name</label>*/}
                        {/*    <input type='text' name='fullName' onChange={this.handleChange} noValidate />*/}
                        {/*    {errors.fullName.length > 0 &&*/}
                        {/*        <span className='error'></span>}*/}
                        {/*</div>*/}
                        {/*<div className='email'>*/}
                        {/*    <label htmlFor="email">Email</label>*/}
                        {/*    <input type='email' name='email' onChange={this.handleChange} noValidate />*/}
                        {/*    {errors.email.length > 0 &&*/}
                        {/*        <span className='error'>{errors.email}</span>}*/}
                        {/*</div>*/}
                        {/*<div className='password'>*/}
                        {/*    <label htmlFor="password">Password</label>*/}
                        {/*    <input type='password' name='password' onChange={this.handleChange} noValidate />*/}
                        {/*    {errors.password.length > 0 &&*/}
                        {/*        <span className='error'>{errors.password}</span>}*/}
                        {/*</div>*/}
                        {/*<div className='info'>*/}
                        {/*    <small>Password must be eight characters in length.</small>*/}
                        {/*</div>*/}

                        <FormControl fullWidth >
                            <Button
                                onClick={this.handleSubmit}
                                disabled={!validateForm(errors)}
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </FormControl>
                    </form>
                </Grid >
            </Grid >
        );
    }
}