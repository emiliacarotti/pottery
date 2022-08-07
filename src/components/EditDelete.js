import React from "react";
import { useNavigate } from "react-router-dom";


export default function EditDeleteCreature({ selectedCreature }) {

  const navigate = useNavigate();
  async function EditCreature(event) {
    try {
      const response = await fetch(`http://localhost:4000/api/creatures` + selectedCreature.creatureid, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({
          creature: {
            creatureid: event.target[0].value,
            name: event.target[1].value,
            price: event.target[2].value,
            stock: event.target[3].value,
            environment: event.target[4].value,
            size: event.target[5].value,
            food: event.target[6].value,
            temper: event.target[7].value,
            image: event.target[8].value,
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

  async function DeleteCreature(event) {
    try {
      const response = await fetch(`http://localhost:4000/api/creatures` + selectedCreature.creatureid, {
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
  console.log(selectedCreature)


  return (
    <div>
      <p>EditDelete Page</p>
    </div>
  )
}

