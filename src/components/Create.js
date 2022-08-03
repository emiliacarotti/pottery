import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { token, BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


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

  // async function DELETE A CREATURE
  async function deleteCreature(creatureid, token) {
    try {
      const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,  //IS TOKEN WORKING PROPERLY???

        },
      });
    } catch (err) {}
  }


    return (<div className="center1">
    <>
    <center><h2><i className="fa fa-dragon"></i></h2></center>
    <br></br>{
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
            <select name="enviroment" id="enviroment">
              <option value='water'>--Swimmer--</option>
              <option value='air'>--Flyer--</option>
              <option value= 'earth'>--Walker--</option>
              <option value= 'unknown'>--Higher Powers--</option>

            
            <input
              type="submit"
              value={environment}
              onChange={(event) => {
                setenvironment(event.target[4].value);
              }}
            ></input>
</select>
            
            <br></br>
            <label>Creature Size:</label>
            <br></br>
            <select name="size" id="size">
              <option value='small'>--Pocket--</option>
              <option value='med'>--Fit's Inside--</option>
              <option value='large'>--Outside Only--</option>
              <option value='extralarge'>--Cosmic Size--</option>
            
            <input
              type="submit"
              value={size}
              onChange={(event) => {
                setsize(event.target[5].value);
              }}
            ></input>
</select>
        
            <br></br>
            <label>Type of Food:</label>
            <br></br>
            <select name="food" id="food">
              <option value='omnivore'>--Omnivore--</option>
              <option value='nuclear waste'>--Nuclear Waste--</option>
              <option value='unknown'>--Not Sure--</option>
              <option value='politicians_souls'>--Politician's Souls--</option>
            <input
              type="submit"
              value={food}
              onChange={(event) => {
                setfood(event.target[6].value);
              }}
            ></input>
</select>
            <br></br>
            <label>Temperment:</label>
            <br></br>
            <select name="temperment" id="temperment">
              <option value='docile'>--Docile--</option>
              <option value='stubborn'>--Stubborn--</option>
              <option value='dangerous'>--Watch Out--</option>
              <option value='evil'>--Will Eat the World--</option>
            <input
              type="submit"
              value={temper}
              onChange={(event) => {
                settemper(event.target[7].value);
              }}
            ></input>
</select>
<br></br>
            <label>Image:</label>
            <br></br>
            <input
              type="file" 
              value={image}
              onChange={(event) => {
                setimage(event.target[8].value);
              }}
            ></input>


            <br></br>
            <br></br>
            <button className='input' type="submit">
              Create
            </button>
            <div id="createErrorMessage" ></div>
            </div>
        </form>
        }
        </>
        </div>
    )
}