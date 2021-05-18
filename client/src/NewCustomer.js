
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import Alert from '@material-ui/lab/Alert';

import { Link } from "react-router-dom";
import { CUSTOMER_API_URL, BANK_API_URL, CITY_API_URL } from './Constants';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
    button: {
        position: "right"
    },
});

export default function NewCustomer() {
    const [cities, setCities] = useState([]);
    const [isCitiesLoaded, setIsCitiesLoaded] = useState();
    const [loadingCitiesError, setLoadingCitiesError] = useState(null);

    const [banks, setBanks] = useState([]);
    const [isBanksLoaded, setIsBanksLoaded] = useState();
    const [loadingBanksError, setLoadingBanksError] = useState(null);

    let fetchCities = async () => {
        let response = await fetch(CITY_API_URL);
        let data = await response.json();

        if (response.ok)
            setCities(data);
        else {
            setLoadingCitiesError(`Loading Failed: ${data.message}`);
        }

        setIsCitiesLoaded(true)
    };

    let fetchBanks = async () => {
        let response = await fetch(BANK_API_URL);
        let data = await response.json();

        if (response.ok)
            setCities(data);
        else {
            setLoadingBanksError(`Loading Failed: ${data.message}`);
        }

        setIsBanksLoaded(true)
    };

    useEffect(() => {
        fetchCities();
        fetchBanks();
    }, []);

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Link to="customers">
                <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<ListIcon />}
                > All Customers
            </Button>
            </Link>
            <h2>New Customer</h2>
            {(!isCitiesLoaded || !isBanksLoaded) ?
                (<LinearProgress />) :
                (!!loadingCitiesError || !!loadingBanksError) ?
                    (<Alert severity="error">Loading Data Failed: {loadingCitiesError}, {loadingBanksError}</Alert>) :
                    (<div></div>)
            }
        </>
    );
}