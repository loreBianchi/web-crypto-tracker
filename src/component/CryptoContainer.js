import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CryptoDialog from './CryptoDialog';
import FetchCoinData from '../Actions/FetchCoinData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3a28c7',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {
      backgroundColor: 'aliceblue',
      cursor: 'pointer',
    },
  },
}))(TableRow);

class CryptoContainer extends Component {

  componentDidMount() {
    this.props.FetchCoinData();
  }

  renderCoinCards() {
    const { crypto } = this.props;
      console.log('xx=>', crypto.data);
      let data = crypto.data.data;
      return <TableBody>
        {data ? data.map((coin) => (
        <StyledTableRow key={coin.name}>
          <StyledTableCell component="th" scope="row">
            {coin.name}
          </StyledTableCell>
          <StyledTableCell align="right">{coin.symbol}</StyledTableCell>
          <StyledTableCell align="right">{Number(coin.priceUsd).toFixed(2)}</StyledTableCell>
          <StyledTableCell align="right">{Number(coin.marketCapUsd).toFixed(2)}</StyledTableCell>
          <StyledTableCell align="center">
            <CryptoDialog coin={coin} />
          </StyledTableCell>
        </StyledTableRow>
      )) : null}

      </TableBody>
    
  }

  render() {
    const { crypto } = this.props;
    if(!crypto.data){
      return <Paper>Loading</Paper>;
    } else {
      return (
        <Paper>
        <Table caria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Symbol</StyledTableCell>
              <StyledTableCell align="right">Price (Usd)</StyledTableCell>
              <StyledTableCell align="right">MarketCap (Usd)</StyledTableCell>
              <StyledTableCell align="center">History</StyledTableCell>
            </TableRow>
          </TableHead>
          {this.renderCoinCards()}
        </Table>
      </Paper>
  
  )
    }
  }
}

const mapStateToProps = state => {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer);
