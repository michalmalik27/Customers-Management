
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Customers from './Customers';
import NewCustomer from './NewCustomer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3, 0, 3),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Excellence
                </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <Container>
                    <Router>
                        <Switch>
                            <Route path="/customers">
                                <Customers />
                            </Route>
                            <Route path="/new-customer">
                                <NewCustomer />
                            </Route>
                            <Route path="/">
                                <Customers />
                            </Route>
                        </Switch>
                    </Router>
                </Container>
            </div>
        </>
    );
}

export default App;
