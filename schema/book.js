export default `

  type Book {
    id: String!
    title: String!
    owner: User!
    loaner: User
    requested: Boolean!
    image: String!
  }

  type BookResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
      allBooks: [Book!]!
  }

  type Mutation {
    addBook(title: String!, image: String!): BookResponse!
    removeBook(id: String!): BookResponse!
    requestBook(id: String!): BookResponse!
    returnBook(id: String!): BookResponse!
  }

`;
