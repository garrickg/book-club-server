export default `

type User {
    id: String!
    username: String!
    email: String!
    city: String!
    state: String!
    books: [Book!]!
    myRequests: [Request!]!
    requestsForMe: [Request!]!
}

type Query {
    me: User!
}

type UpdateResponse {
    ok: Boolean!
    errors: [Error!]
}

type LoginResponse {
    ok: Boolean!
    token: String!
    refreshToken: String!
    errors: [Error!]
    user: User!
}

type Mutation {
    register(username: String!, email: String!, password: String!): LoginResponse!
    login(email: String!, password: String!): LoginResponse!
    updateUser(username: String!, city: String!, state: String!): UpdateResponse!
}

`;
