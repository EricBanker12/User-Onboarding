import React from 'react'

function User({name, email}) {
    //console.log(props)
    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    )
}

export default User