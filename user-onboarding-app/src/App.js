import React from 'react'
import './App.css'

import Form from './components/Form'
import User from './components/User'

function App() {

    const [users, setUsers] = React.useState([])

    function addUser(user) {
        setUsers([...users, user])
    }

    return (
        <div className="App">
            <Form addUser={addUser} />
            <div>
                {users.map(user => <User key={user.id} {...user} />)}
            </div>
        </div>
    )
}

export default App
