import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Header from './shared/header';
import Footer from './shared/footer';

class Books extends Component {
  constructor(){
    super();
    this.state = {
      sales: []
    };  
    axios({
        url: 'http://localhost:3002/graphql',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          query: `
            query{
              getSales {
                _id
                name
                books{
                  _id
                  title
                  description
                }                
                price
                quantity
                date
              }
            }
            `
        }      
      })
      .then(res => {
        let results = res.data.data.getSales;
        this.setState({ 
          sales: [ ...this.state.sales, ...results ]
        });
      })
      .catch( err => {
        console.log('err', err);
      });    
  }
  render() {
    const classes = theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      }
    });

    return (
      <div>  
        <Header/>
          <div>
            <h1>Sales Vouchers</h1>
              <div>
                <Grid item xs={12} sm={10} lg={8} xl={8}>
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow >
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Books</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity Date</TableCell>
                          <TableCell align="right">Bill Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.sales.map(sale => (
                          <TableRow key={sale._id}>
                            <TableCell align="right">{sale.name}</TableCell>
                              {sale.books.map(book => (
                                <React.Fragment key={book._id}>
                                  <TableCell align="right">{book.title}</TableCell>
                                  <TableCell align="right">{book.description}</TableCell>
                                </React.Fragment>                                
                              ))}  
                            <TableCell align="right">{sale.price}</TableCell>
                            <TableCell align="right">{sale.quantity}</TableCell>
                            <TableCell align="right">{sale.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>       
                </Grid>           
              </div>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default Books;
