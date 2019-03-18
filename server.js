//const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const url = "mongodb://localhost:27017/graphql";
const mongoose = require('mongoose');

const schema = require('./server/graphql/schema');
const resolver = require('./server/graphql/resolver');

const {headers} = require('./server/middleware/headers');

// middlewares
app.use(bodyParser.json());
app.use(headers);
  
// handle req
app.use('/graphql', graphqlHttp({
	schema: schema,
	rootValue: resolver,
	graphiql: true
}));

mongoose.connect(url, {useNewUrlParser: true})
		.then( () => {
			app.listen(3002);			
		})
		.catch( err => {
			console.log("Connection error ", err)
		});

