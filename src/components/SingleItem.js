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
        <><center>
            <p>Single Item Page</p>
            <br></br><br></br><br></br>
            <div className="single">
            <div key={selectedCreature.creatureid}>
                <img src={imgURL + selectedCreature.creatureid + ".png"} width="300" height="300"></img>
                <div className="beastid"> Name: {selectedCreature.name} (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                ) </div>
                <div className="beastid"> Price: {selectedCreature.price} (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                ) </div>
                <div className="beastid"> Quantity Available: {selectedCreature.stock} (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                ) </div>
                <div className="beastid"> Optimal Environment: {selectedCreature.environment} (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                ) </div>
                <div className="beastid"> Size: {selectedCreature.size}  (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                ) </div>
                <div className="beastid"> Type of Food: {selectedCreature.food} (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                ) </div>
                <div className="beastid"> Temperment: {selectedCreature.temper} (
                    <button className="editbtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                )</div>
            </div>
            
            <form onSubmit={(event) => {
                event.preventDefault()
                addToCart(event)
            }}>
                <div><div> Qty:  

                <select name="quantity" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select></div>
                <button className="addtocart"> <a href="./Cart"> Buy Now <i class='fa fa-cart-shopping'></i></a></button>
                <br></br>
                <div id="createErrorMessage" className="errors"></div>

                <br></br></div>
            </form>
            <div> (
                    <button className="deletebtn"
                        // onClick={() => {
                        //     deleteCreature(creature.creatureid);
                        // }}
                    >
                        Delete
                    </button>
                ) </div>
            </div></center>

        </>
    )
}
