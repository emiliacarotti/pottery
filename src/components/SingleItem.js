import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";



export default function SingleItem({ selectedCreature, setSelectedCreature }) {
    let imgURL = "/creature"
    const navigate = useNavigate();

    useEffect(() => {
        async function getCreaturebyId() {
            //console.log('creatureid', creatureid)
            try {
                //UPDATE URL 
                const response = await fetch('http://localhost:4000/api/creatures/${creatureid}' , {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let data = await response.json()
                console.log("data******:", data.creatureid)
                //setCreatures(data.creatureid)
            } catch (err) {
                console.log(err)
            }
        }

        //getCreaturebyId()
    }, [])

    async function addToCart(event){
        console.log(event);
        try{
            const response = await fetch('INSERT ROUTE HERE, DUMMY', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                
              })
              let result = await response.json()
              if(result.success){
                  alert("Item Added to Cart!")
                  navigate("/")
                  
              }else{
                document.getElementById("createErrorMessage").innerHTML = result.error.message
              }
  
        }catch(err){
            console.log("Could not add item to cart!" + err)
        }
      }


    return (
        <>
        <p>Single Item Page</p> 
        <br></br><br></br><br></br>
                {/* <div className="center"> */}
                <div key={selectedCreature.creatureid}>
                <img src={imgURL + selectedCreature.creatureid + ".png"} width="300" height="300"></img>
                <div> Name: {selectedCreature.name}</div> 
                <div> Price: {selectedCreature.price}</div> 
                <div> Quantity Available: {selectedCreature.stock}</div> 
                <div> Optimal Environment: {selectedCreature.environment}</div> 
                <div> Size: {selectedCreature.size}</div> 
                <div> Type of Food: {selectedCreature.food}</div>
                <div> Temperment: {selectedCreature.temper}</div>
                </div>
                
                <form onSubmit={(event)=>{
                    event.preventDefault()
                    addToCart(event)             
                    }}>
                <div> Qty: </div> 
                <select name="quantity" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button href="./Cart" className="submit" type="submit">Add to Cart</button>
                <br></br>
                <div id="createErrorMessage" className="errors"></div>
                <br></br>
                </form>
                {/* </div> */}
        </>
    )
}
