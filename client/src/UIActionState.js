import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const UIActionState = ({ actionState, actionText, children = <></> }) => {
  const classes = useStyles();

  return !actionState || actionState == actionStates.INIT ? (
    <></>
  ) : actionState == actionStates.IN_PROCESS ? (
    <div className={classes.root}>
      <Alert severity="info">
        {actionText || "Please wait until the operation is completed"}
      </Alert>
      <LinearProgress />
    </div>
  ) : actionState == actionStates.IS_COMPLETED ? (
    { ...children }
  ) : (
    <Alert severity="error">{actionText || "The operation failed"}</Alert>
  );
};

export const actionStates = {
  INIT: "init",
  IN_PROCESS: "inProcess",
  IS_COMPLETED: "isCompleted",
  IS_FAILED: "isFailed",
};

export default UIActionState;
