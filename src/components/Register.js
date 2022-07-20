import react, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function CreateProfile({setToken, setLoggedIn}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function CreateNewProfile(event){
        try{
            const response = await fetch('/*ENTER A ROUTE HERE, DUMMY*/', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: event.target[0].value,
                    password: event.target[1].value
                })
              })
              let result = await response.json()
              console.log(result)

              if(result.user){
                setToken(result.token)
                setLoggedIn(true)
                localStorage.setItem("token", result.token)
                navigate("/")
              } else {
                if(result.name == "PasswordLengthError") {
                    document.getElementById("createErrorMessage").innerHTML = "Password must be at least 8 characters!"

                }
                else {
                    document.getElementById("createErrorMessage").innerHTML = result.message
                }
              }
        }catch(err){
            console.log("Registration Failed!! " + err)
        }
    }

   
    return (
      <div>
        <>
            <h1> Create a new account!</h1>
            <form onSubmit={(event)=>{
                event.preventDefault()
                CreateNewProfile(event)
            }}>
                <label>Username: </label>
                <input type="text" value={username} onChange={(event)=>{setUsername(event.target.value)}}></input>
                <label>Password: </label>
                <input type="text" value={password} onChange={(event)=>{setPassword(event.target.value)}}></input>
                <button type="submit">Sign Up</button>
                <br></br>
                <div id="createErrorMessage" className="errors"></div>
                <br></br>
            </form>
            <Link className="newAcct" to="../Login">Already have an account? Sign in!</Link>
        </>
        </div>
    )
}