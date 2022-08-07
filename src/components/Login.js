import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ username, setUsername, setToken, setLoggedIn, setIsAdmin }) {
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function LoginUser() {
        try {
            const response = await fetch('https://creautures.herokuapp.com/api/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            let result = await response.json()
            console.log("hello", result);
            if (result.user) {
                setToken(result.token)
                localStorage.setItem("username", username)
                setUsername(localStorage.getItem("username",))
                setLoggedIn(true)
                localStorage.setItem("token", result.token)
                if (result.user.isadmin === 1) {
                    localStorage.setItem("isadmin", true)
                    setIsAdmin(true)
                    console.log("Admin!")
                }
                console.log(result.user)
                navigate("/")
            } else {
                document.getElementById("createErrorMessage").innerHTML = result.message
            }
        } catch (err) {
            console.log("Unable to log in! " + err)
        }
    }
    return (<div className="center">
        <>
            <h2> Log In </h2>
            <form onSubmit={(event) => {
                event.preventDefault()
                LoginUser()

            }}>
                <div className="txt_field">
                    <input type="text" required value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
                    <label>Username: </label>
                </div>

                <div className="txt_field">
                    <input type="password" required value={password} onChange={(event) => { setPassword(event.target.value) }}></input>
                    <label>Password: </label>
                </div>

                <button className="input" type="submit">Log In</button>

                <br></br>
                <div id="createErrorMessage" className="errors"></div>
                <br></br>

                <div className="signup_link">
                    No account?<a href="../Register"> Signup!</a>
                </div>
            </form>
        </>
    </div>)
}