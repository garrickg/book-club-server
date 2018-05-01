export default `

  type Book {
    id: String!
    title: String!
    author: String!
    owner: User!
    requested: Boolean!
    image: String!
  }

  type BookResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allBooks: [Book!]!
    myBooks: [Book!]!
  }

  type Mutation {
    addBook(title: String!, image: String!, author: String!): BookResponse!
    removeBook(id: String!): BookResponse!
    requestBook(id: String!): BookResponse!
    returnBook(id: String!): BookResponse!
  }

`;
