import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Header from './shared/header';
import Footer from './shared/footer';

class Books extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      searchBook: '',
      books: []
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
              getBooks {
                _id
                title
                description
                author
                date
              }
            }
            `
        }      
      })
      .then(res => {
        let results = res.data.data.getBooks;
        this.setState({ 
          books: [ ...this.state.books, ...results ]
        });
      })
      .catch( err => {
        console.log('err', err);
      });    
  }

  handleSubmit(e) {
    alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    let { searchBook } = this.state;
    const classes = theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },      
    });
    return (
      <div>  
        <Header/>
          <div>
            <h1>Books Page</h1>
              <div>
                <Grid item xs={12} sm={10} lg={8} xl={8}>
                  <Paper className={classes.root}> 
                    <Grid item xs={6} sm={6} lg={8} xl={8}>
                    <FormControl>
                    <form onSubmit={this.handleSubmit}>
                      <label>
                        Name:
                        <input type="text" ref={(input) => this.input = input} />
                      </label>
                      <input type="submit" value="Submit" />
                    </form>
                    </FormControl>
                    </Grid>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.books.map(book => (
                            <TableRow key={book._id}>
                              <TableCell align="right">{book.title}</TableCell>
                              <TableCell align="right">{book.description}</TableCell>
                              <TableCell align="right">{book.author}</TableCell>
                              <TableCell align="right">{book.date}</TableCell>
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
