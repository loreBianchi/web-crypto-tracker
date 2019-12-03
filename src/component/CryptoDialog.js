import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimelineTwoToneIcon from '@material-ui/icons/TimelineTwoTone';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { curveCardinal } from 'd3-shape';
import apiBaseURL from '../constants/Apis';
import { 
  FETCHING_COIN_HISTORY,
  FETCHING_COIN_HISTORY_SUCCESS,
  FETCHING_COIN_HISTORY_ERROR
} from '../Actions/ActionsTypes';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const cardinal = curveCardinal.tension(0.2);

export default function CryptoDialog({coin, interval='d1'}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const content = useSelector(state => state); //this hook gives us redux store state
  const dispatch = useDispatch(); //this hook gives us dispatch method


  function getHistory() {
    return dispatch => {
      dispatch({type: FETCHING_COIN_HISTORY})
      axios.get(`${apiBaseURL}/${coin.id}/history?interval=${interval}`)
        .then(res => dispatch({
          type: FETCHING_COIN_HISTORY_SUCCESS, payload: res.data
        }))
        .catch(err => dispatch({
          type: FETCHING_COIN_HISTORY_ERROR, payload: err
        }))
    }
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
  const coinHistory = content.history.data && content.history.data.data;
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
          <Typography variant="h3" gutterBottom>
            {Number(coin.priceUsd).toFixed(2)} $
          </Typography>

          {/* <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {coinHistory && coinHistory.map((d, i) => (
              <p key={i}>{d.priceUsd}</p>
            ))}
          </DialogContentText> */}
          <AreaChart
            width={600}
            height={400}
            data={data}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type={cardinal} dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          </AreaChart>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
