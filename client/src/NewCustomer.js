
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BANK_API_URL, CITY_API_URL } from './Constants';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import RegisterCustomer from './RegisterCustomer';
import UIActionState, { actionStates } from './UIActionState';
import { Container } from '@material-ui/core';

export default function NewCustomer() {
    const [cities, setCities] = useState([]);
    const [loadCitiesState, setLoadCitiesState] = useState(actionStates.INIT);
    const [loadCitiesStateText, setLoadCitiesStateText] = useState(null);

    const [banks, setBanks] = useState([]);
    const [loadBanksState, setLoadBanksState] = useState(actionStates.INIT);
    const [loadBanksStateText, setLoadBanksStateText] = useState(null);

    useEffect(() => {
        setLoadCitiesState(actionStates.IN_PROCESS);
        setLoadCitiesStateText(`Loading Cities...`);

        setLoadBanksState(actionStates.IN_PROCESS);
        setLoadBanksStateText(`Loading Banks...`);

        fetchCities();
        fetchBanks();
    }, []);

    let fetchCities = async () => {
        let response = await fetch(CITY_API_URL);
        let data = await response.json();

        if (response.ok) {
            setCities(data);
            setLoadCitiesState(actionStates.IS_COMPLETED);
            setLoadCitiesStateText(null);
        }
        else {
            setLoadCitiesState(actionStates.IS_FAILED);
            setLoadCitiesStateText(`Loading Cities Failed: ${data.message}`)
        }
    };

    let fetchBanks = async () => {
        let response = await fetch(BANK_API_URL);
        let data = await response.json();

        if (response.ok) {
            setBanks(data);
            setLoadBanksState(actionStates.IS_COMPLETED);
            setLoadBanksStateText(null);
        }
        else {
            setLoadBanksState(actionStates.IS_FAILED);
            setLoadBanksStateText(`Loading Banks Failed: ${data.message}`)
        }
    }

    let allDataLoaded = () => loadBanksState == actionStates.IS_COMPLETED &&
        loadCitiesState == actionStates.IS_COMPLETED;

    return (
        <>
            <Link to="customers">
                <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    startIcon={<ListIcon />}
                > All Customers
            </Button>
            </Link>
            <Container>
                <UIActionState actionState={loadCitiesState} actionText={loadCitiesStateText} />
                <UIActionState actionState={loadBanksState} actionText={loadBanksStateText} />
                {allDataLoaded() && <RegisterCustomer cities={cities} banks={banks} />}
            </Container>       
        </>
    );
}
