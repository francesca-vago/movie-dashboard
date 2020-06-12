const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

// Book Type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        author: {type: GraphQLString},
        year: {type: GraphQLString},
        user: {type: UserType}
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.get(`http://localhost:4000/users/${args.id}`)
                            .then(res => res.data);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return axios.get(`http://localhost:4000/users`)
                .then(res => res.data);
            }
        },
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.get(`http://localhost:4000/books/${args.id}`)
                            .then(res => res.data);
            }
        },
        books: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return axios.get(`http://localhost:4000/books`)
                .then(res => res.data);
            }
        }
    }
});

// Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, args){
                return axios.post(`http://localhost:3000/users`, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data)
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent, args){
                return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                .then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return axios.delete(`http://localhost:3000/users/${args.id}`)
                .then(res => res.data)
            }
        }
    }
})

module.exports =  new GraphQLSchema({
    query: RootQuery,
    mutation
})