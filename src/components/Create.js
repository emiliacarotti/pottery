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


    return (<div className="center1">
    <>
    <center><i class="fa fa-spaghetti-monster-flying"></i></center>
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
            <select name="enviroment" id="enviroment">
              <option value='water'>--Swimmer--</option>
              <option value='air'>--Flyer--</option>
              <option value= 'earth'>--Walker--</option>
              <option value= 'unknown'>--Higher Powers--</option>

            
            <input
              type="submit"
              value={environment}
              onChange={(event) => {
                setenvironment(event.target.value);
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
                setsize(event.target.value);
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
                setfood(event.target.value);
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
                settemper(event.target.value);
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
                setimage(event.target.value);
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