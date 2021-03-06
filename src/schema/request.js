export default `

  type Request {
    id: String!
    approved: Boolean!
    active: Boolean!
    book: Book!
    requester: User!
  }

  type RequestResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    approveRequest(id: String!): RequestResponse!  
  }

`;
