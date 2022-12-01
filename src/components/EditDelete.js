import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";

export default function EditdeletePot({
  potid,
  selectedPot,
  setSelectedPot,
  loggedIn,
  isAdmin,

}) {

  const navigate = useNavigate();


  // async function EDIT/PATCH creature  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
  async function EditPot(event) {
    try {
      const response = await fetch(`http://localhost:4000/api/pottery` + selectedPot.potid, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({
          pot: {
            potid: event.target[0].value,
            name: event.target[1].value,
            price: event.target[2].value,
            stock: event.target[3].value,
            size: event.target[4].value,
            image: event.target[5].value,
          }
        })

      })
      let result = await response.json()
      if (result.success) {
        alert("Your creature has been updated!")
        navigate("/")

      } else {
        document.getElementById("createErrorMessage").innerHTML = result.error.message
      }

    } catch (err) {
      console.log("Could not edit creature! " + err)
    }
  }


  // async function DELETE A CREATURE  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
  async function deletePot(event) {
    try {
      const response = await fetch(`http://localhost:4000/api/pottery` + selectedPot.potid, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }

      })
      let result = await response.json()
      if (result.success) {
        alert("Your creature has been deleted!")
        navigate("/")

      } else {
        document.getElementById("createErrorMessage").innerHTML = result.error.message
      }

    } catch (err) {
      console.log("Could not delete creature! " + err)
    }
  }
  console.log(selectedPot)


  return (

    <div>
      <p>EditDelete Page</p>

    </div>


  )
}
