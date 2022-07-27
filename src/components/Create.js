import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function CreateCreature(){
  const navigate = useNavigate()

    const [creatureid, setcreatureid] = useState("");
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [environment, setenvironment] = useState("");
    const [size, setsize] = useState("");
    const [food, setfood] = useState("");
    const [temper, settemper] = useState("");
    const [image, setimage] = useState("");


    // async function CREATE A NEW CREATURE
  async function newCreature(creature) {
    try {
      const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            creatureid: creature.target[0].value,
            name: creature.target[1].value,
            price: creature.target[2].value,
            stock: creature.target[3].value,
            environment: creature.target[4].value,
            size: creature.target[5].value,
            food: creature.target[6].value,
            temper: creature.target[7].value,
            image: creature.target[8].value,
          }),
        }
      );

      let result = await response.json();
      if (result) {
        alert("Your creature has been successfully created!")
        navigate("/")
      } else {
        document.getElementById("createErrorMessage").innerHTML =
          result.error.message;
      }
    } catch (err) {
      console.log("Couldn't create new creature!" + err);
    }
  }

    return (
    <>
        {
        <form
          onSubmit={(event) => {
            event.preventDefault();
            newCreature();
          }}
        >
              <div>
            <label>Creature Name/Type:</label>
            <br></br>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setname(event.target[1].value);
              }}
            ></input>

            <br></br>
            <label>ID:</label>
            <br></br>
            <input
              type="text"
              value={creatureid}
              onChange={(event) => {
                setcreatureid(event.target[0].value);
              }}
            ></input>

            
            <br></br>
            <label>Price:</label>
            <br></br>
            <input
              type="text"
              value={price}
              onChange={(event) => {
                setprice(event.target[2].value);
              }}
            ></input>

            
            <br></br>
            <label>Quantity Available:</label>
            <br></br>
            <input
              type="text"
              value={stock}
              onChange={(event) => {
                setstock(event.target[3].value);
              }}
            ></input>

            
            <br></br>
            <label>Environment Type:</label>
            <br></br>
            <input
              type="text"
              value={environment}
              onChange={(event) => {
                setenvironment(event.target[4].value);
              }}
            ></input>

            
            <br></br>
            <label>Creature Size:</label>
            <br></br>
            <input
              type="text"
              value={size}
              onChange={(event) => {
                setsize(event.target[5].value);
              }}
            ></input>

        
            <br></br>
            <label>Type of Food:</label>
            <br></br>
            <input
              type="text"
              value={food}
              onChange={(event) => {
                setfood(event.target[6].value);
              }}
            ></input>

            <br></br>
            <label>Temperment</label>
            <br></br>
            <input
              type="text"
              value={temper}
              onChange={(event) => {
                settemper(event.target[7].value);
              }}
            ></input>

<br></br>
            <label>Image</label>
            <br></br>
            <input
              type="file"
              value={image}
              onChange={(event) => {
                setimage(event.target[8].value);
              }}
            ></input>


            <br></br>
            <button type="submit">
              Create
            </button>
            <div id="createErrorMessage" ></div>
            </div>
        </form>
        }
        </>
    )
}