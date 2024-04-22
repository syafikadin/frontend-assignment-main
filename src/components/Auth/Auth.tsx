// LoginForm.js
import React, {useState} from 'react'
import client from '@/client'

export const Auth = () => {
    const [username, setUsername] = useState('johndoe@mail.com')
    const [status, setStatus] = useState('logged out')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        try {
            const loginResponse = await client.api.post('/auth/login', {email: username, password})
            localStorage.setItem('accessToken', loginResponse.data.data.access_token)
            localStorage.setItem('refreshToken', loginResponse.data.data.refresh_token)

            setStatus('logged in')

            // You can add your login logic here using the username and password state
            console.log('Login submitted with:', {username, password})
        } catch (error) {
            setStatus('Error')
        }
    }

    return (
        <div>
            <h2>Login Form</h2>
            <h2 style={{color: status === 'logged in' ? 'green' : 'red'}}>Status: {status}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type='text' value={username} onChange={handleUsernameChange}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type='password' value={password} onChange={handlePasswordChange}/>
                </label>
                <br/>
                <button type='submit'>Login</button>
            </form>

            <h2 style={{color: 'red'}}> komponent ini hanya untuk tool development!! Tidak untuk di gunakan di
                solution</h2>
        </div>
    )
}
