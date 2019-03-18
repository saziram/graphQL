const { buildSchema } = require('graphql');
module.exports = buildSchema(`
		type bookSchema {
			_id: ID!
			title: String!
			description: String!
			author: String!
			date: String!
		}
		type saleSchema {
			_id: ID!
			name: String!
			books: [bookSchema!]!
			price: Float!
			quantity: Int!
			date: String!
		}
		
		input bookParams {
			title: String
			description: String
			author: String
			date: String		
		}
		input saleParams {
			name: String
			books: [String]
			price: Float
			quantity: Int
			date: String
		}

		type RootQuery {
			getBooks(requestBody : bookParams): [bookSchema!]!
			getSales(requestBody : saleParams): [saleSchema!]!
		}		
		type RootMutation {
			createBook(postBody: bookParams): [bookSchema]
			createSale(postBody: saleParams): [saleSchema]
		}

		schema {
			query: RootQuery,
			mutation: RootMutation,
		}
	`);