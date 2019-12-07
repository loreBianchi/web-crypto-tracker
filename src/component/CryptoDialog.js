import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimelineTwoToneIcon from '@material-ui/icons/TimelineTwoTone';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import apiBaseURL from '../constants/Apis';
import { 
  FETCHING_COIN_HISTORY,
  FETCHING_COIN_HISTORY_SUCCESS,
  FETCHING_COIN_HISTORY_ERROR
} from '../Actions/ActionsTypes';
import AssetAreaChart from './AssetAreaChart';

const intervalsBtnContainerStyles = {
  marginTop: 20,
  marginBottom: 20
}

export default function CryptoDialog({coin}) {
  const [open, setOpen] = React.useState(false);
  const [interval, setInterval] = React.useState('m1');
  const [scroll, setScroll] = React.useState('paper');
  const dispatch = useDispatch(); //this hook gives us dispatch method
  const history = useSelector(state => state.history);

  const intervals = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'];

  function getHistory() {
    return dispatch => {
      dispatch({type: FETCHING_COIN_HISTORY})
      axios.get(`${apiBaseURL}/${coin.id}/history?interval=${interval}`)
        .then(res => dispatch({
          type: FETCHING_COIN_HISTORY_SUCCESS, payload: res.data.data
        }))
        .catch(err => dispatch({
          type: FETCHING_COIN_HISTORY_ERROR, payload: err
        }))
    }
  }

  const handleIntervalClick = (period) => {
    setInterval(period);
    setTimeout(() => {
      dispatch(getHistory());
    }, 400)    
  }

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
    dispatch(getHistory());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <TimelineTwoToneIcon onClick={handleClickOpen('paper')} />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth={'md'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{coin.name} trend</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Typography variant="subtitle1" gutterBottom>
            1 {coin.name} is currently
          </Typography>
          <Typography variant="h5" gutterBottom>
            {Number(coin.priceUsd).toFixed(2)} $
          </Typography>
          <div style={intervalsBtnContainerStyles}>
            {intervals.map((x, i) => <Button color={x === interval ? 'primary' : 'secondary' }
              variant={x === interval ? 'outlined' : null}
              onClick={() => handleIntervalClick(x)} key={i}>{x}</Button>)}
          </div>
          <AssetAreaChart data={history.data} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
