import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
export default function Navbar({loggedIn, Logout}){
    return (
        <div>
        <>
            <Link to="/"> Home </Link>
            <Link to="Deal"> Beast of the Month </Link>
            <Link to="About"> About Us </Link>
            <Link to="Cart"> My Cart </Link>
        {
            loggedIn?<Link to="MyProfile"> My Profile </Link>: null
        }
        {
            !loggedIn?<Link to="Login"> Login </Link>: <button onClick={Logout}> Logout</button>
        }
        </>
        </div>
    )
}