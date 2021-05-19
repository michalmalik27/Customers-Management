
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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import UIActionState, { actionStates } from './UIActionState';

import { Link } from "react-router-dom";
import { CUSTOMER_API_URL } from './Constants';

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

export default function Customers() {
    const classes = useStyles();

    const [loadState, setLoadState] = useState(actionStates.INIT);
    const [loadStateText, setLoadStateText] = useState(null);

    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setLoadState(actionStates.IN_PROCESS);
        setLoadStateText('Loading the customers...')
        fetchCustomers();
    }, []);

    let fetchCustomers = async () => {
        let response = await fetch(CUSTOMER_API_URL);
        let data = await response.json();

        if (response.ok) {
            setCustomers(data);
            setLoadStateText(null);
            setLoadState(actionStates.IS_COMPLETED);
        }
        else {
            setLoadState(actionStates.IS_FAILED);
            setLoadStateText(`Loading Failed: ${data.message}`)
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Link to="new-customer">
                <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                > New Customer
            </Button>
            </Link>
            <h2>Customers</h2>
            <UIActionState actionState={loadState} actionText={loadStateText}>
                <>
                    {customers.length === 0 ?
                        (< Alert severity="warning">There is not any customer</Alert>) :
                        (< Paper className={classes.root} >
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id Number</TableCell>
                                            <TableCell>Hebrew Name</TableCell>
                                            <TableCell>English Name</TableCell>
                                            <TableCell> Date Of Birth </TableCell>
                                            <TableCell>City Name</TableCell>
                                            <TableCell>Bank</TableCell>
                                            <TableCell>Branch</TableCell>
                                            <TableCell>Accounting Number</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.customerId}>
                                                    <TableCell>{row.idNumber}</TableCell>
                                                    <TableCell>{row.customerHebName}</TableCell>
                                                    <TableCell>{row.customerEngName}</TableCell>
                                                    <TableCell>{row.dateOfBirth}</TableCell>
                                                    <TableCell>{row.cityName}</TableCell>
                                                    <TableCell>{row.bankNumber}</TableCell>
                                                    <TableCell>{row.bankBranch}</TableCell>
                                                    <TableCell>{row.accountingNumber}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={customers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper >)
                    }
                </>
            </UIActionState>
        </>
    );
}