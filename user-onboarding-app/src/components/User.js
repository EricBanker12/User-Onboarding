import React from 'react'

function User({name, role, email}) {
    //console.log(props)
    return (
        <div>
            <h3>{name}</h3>
            <p>{role}</p>
            <p>{email}</p>
        </div>
    )
}

export default User