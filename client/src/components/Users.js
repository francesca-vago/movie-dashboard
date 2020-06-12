import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Moment from 'react-moment';

import UserItem from './UserItem.js';

// Query
const USERS_QUERY = gql`
    query UsersQuery{
        users {
            id
            name
            email
            age
        }
    }
`

export function Users () {
    const {loading, error, data} = useQuery(USERS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error)  console.log(error);

    return (
        <React.Fragment>
            {
                data.users.map(user => <UserItem key={user.id} user={user}/>)
            }
            <div>
                <Moment format="YYYY-MM-DD HH:mm">{Date.now()}</Moment>
            </div>
        </React.Fragment>
    )
}