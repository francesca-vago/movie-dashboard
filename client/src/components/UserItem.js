import React from 'react';

export default function UserItem({user}) {
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.age}</p>
        </div>
    )
}
