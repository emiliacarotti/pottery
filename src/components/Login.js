import react, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

export default function Login({username, setUsername, setToken, setLoggedIn}){
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function LoginUser(){
        try{
            const response = await fetch('/*ENTER A ROUTE HERE, DUMMY*/', {
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
              if(result.user){
                setToken(result.token)
                localStorage.setItem("username", username)
                setUsername(localStorage.getItem("username"))
                setLoggedIn(true)
                localStorage.setItem("token", result.token)
                navigate("/")
              }else{
                document.getElementById("createErrorMessage").innerHTML = result.message
              }
        }catch(err){
            console.log("Unable to log in! " + err)
        }
    }
    return (
        <div>
        <>
            <h4> Log In </h4>
            <form onSubmit={(event)=>{
                event.preventDefault()
                LoginUser()
                
            }}>
                <label>Username: </label>
                <input type="text" value={username} onChange={(event)=>{setUsername(event.target.value)}}></input>
                <label>Password: </label>
                <input type="text" value={password} onChange={(event)=>{setPassword(event.target.value)}}></input>
                <button type="submit">Log In</button>
                <br></br>
                <div id="createErrorMessage" className="errors"></div>
                <br></br>
            </form>
            <Link className="newAcct" to="../Register">No account? Create one here!</Link>
        </>
        </div>
    )
}