import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function Creature({
    creature,
    setcreature,
    loggedIn,
    token,
    username,
    isAdmin,
    
  }) {
    const [creatureid, setcreatureid] = useState("");
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [environment, setenvironment] = useState("");
    const [size, setsize] = useState("");
    const [food, setfood] = useState("");
    const [temper, settemper] = useState("");
    const [image, setimage] = useState("");


    // useEffect GET AND SET CREATURES
  useEffect(() => {
    async function getCreature() {
      const url = "";  //URL NEEDS TO BE COMPLETED
      try {
        const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/`);
        let data = await response.json();
        data = data.reverse();
        setcreature(data);
      } catch (err) {
        console.log("error in Creature");
      }
    }
    getCreature();
  }, [creature]);



    // async function CREATE A NEW CREATURE
  async function newCreature() {
    try {
      const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            creatureid: creatureid,
            name: name,
            price: price,
            stock: stock,
            environment: environment,
            size: size,
            food: food,
            temper:temper,
            image: image,
          }),
        }
      );

      let result = await response.json();
      if (result) {
        console.log(result);
        setcreature(creature);
      } else {
        document.getElementById("createErrorMessage").innerHTML =
          result.error.message;
      }
    } catch (err) {
      console.log("Couldn't create new creature!" + err);
    }
  }

  // async function DELETE A CREATURE
  async function deleteCreature(creatureid) {
    try {
      const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {}
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
                setname(event.target.value);
              }}
            ></input>

            <br></br>
            <label>ID:</label>
            <br></br>
            <input
              type="text"
              value={creatureid}
              onChange={(event) => {
                setcreatureid(event.target.value);
              }}
            ></input>

            
            <br></br>
            <label>Price:</label>
            <br></br>
            <input
              type="text"
              value={price}
              onChange={(event) => {
                setprice(event.target.value);
              }}
            ></input>

            
            <br></br>
            <label>Quantity Available:</label>
            <br></br>
            <input
              type="text"
              value={stock}
              onChange={(event) => {
                setstock(event.target.value);
              }}
            ></input>

            
            <br></br>
            <label>Environment Type:</label>
            <br></br>
            <input
              type="text"
              value={environment}
              onChange={(event) => {
                setenvironment(event.target.value);
              }}
            ></input>

            
            <br></br>
            <label>Creature Size:</label>
            <br></br>
            <input
              type="text"
              value={size}
              onChange={(event) => {
                setsize(event.target.value);
              }}
            ></input>

        
            <br></br>
            <label>Type of Food:</label>
            <br></br>
            <input
              type="text"
              value={food}
              onChange={(event) => {
                setfood(event.target.value);
              }}
            ></input>

            <br></br>
            <label>Temperment</label>
            <br></br>
            <input
              type="text"
              value={temper}
              onChange={(event) => {
                settemper(event.target.value);
              }}
            ></input>

<br></br>
            <label>Image</label>
            <br></br>
            <input
              type="file"
              value={image}
              onChange={(event) => {
                setimage(event.target.value);
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