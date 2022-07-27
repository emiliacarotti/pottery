import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function EditDeleteCreature({
    creatureid,
    selectedCreature,
    setSelectedCreature,
    loggedIn,
    isAdmin,
    
  }) {
   
    const navigate = useNavigate();


    // async function EDIT/PATCH creature
    async function EditCreature(event){
        try{
            const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/` + selectedCreature.creatureid, {
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
              if(result.success){
                  alert("Your creature has been updated!")
                  navigate("/")
                  
              }else{
                document.getElementById("createErrorMessage").innerHTML = result.error.message
              }

        }catch(err){
            console.log("Could not edit creature! " + err)
        }
    }


  // async function DELETE A CREATURE
  async function DeleteCreature(event){
    try{
        const response = await fetch(`/*ENTER A ROUTE HERE, DUMMY*/` + selectedCreature.creatureid, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
            
          })
          let result = await response.json()
          if(result.success){
              alert("Your creature has been deleted!")
              navigate("/")
              
          }else{
            document.getElementById("createErrorMessage").innerHTML = result.error.message
          }

    }catch(err){
        console.log("Could not delete creature! " + err)
    }
}
console.log(selectedCreature)


return ( 

    <div>
        <p>EditDelete Page</p>
        
            {/* <form onSubmit={(event)=>{
                event.preventDefault()
                EditCreature(event)
                
                }}>
                
                <div key={selectedCreature.creatureid}></div>
                <label>Name: </label>
                <input type="text" defaultValue={selectedCreature.name}></input>
                <label>Price: </label>
                <input type="text" defaultValue={selectedCreature.price}></input>
                <label>Stock: </label>
                <input type="text" defaultValue={selectedCreature.stock}></input>
                <label>Environment: </label>
                <input type="text" defaultValue={selectedCreature.environment}></input>
                <label>Size: </label>
                <input type="text" defaultValue={selectedCreature.size}></input>
                <label>Food: </label>
                <input type="text" defaultValue={selectedCreature.food}></input>
                <label>Temperment: </label>
                <input type="text" defaultValue={selectedCreature.temper}></input>
                <label>Image: </label>
                <input type="file" defaultValue={selectedCreature.image}></input>
                <button type="submit">Update Creature</button>
                <br></br>
                <div id="createErrorMessage" class="errors"></div>
                <br></br>
            </form> 

            <form  onSubmit={(event)=>{
                event.preventDefault()
                DeleteCreature(event)
                
                }}>
                <div key={selectedCreature.creatureid}></div>
                <div key={selectedCreature.name}></div>
                <div key={selectedCreature.price}></div>
                <div key={selectedCreature.stock}></div>
                <div key={selectedCreature.environment}></div>
                <div key={selectedCreature.size}></div>
                <div key={selectedCreature.food}></div>
                <div key={selectedCreature.temper}></div>
                <div key={selectedCreature.image}></div>
                <button type="submit">Delete Creature</button>
                <br></br>
                <div id="createErrorMessage" class="errors"></div>
                <br></br>
            </form> */}

    </div> 
        //BUTTONS SHOULD ONLY SHOW FOR ADMIN

)}  
