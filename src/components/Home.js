import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function Home({ creatures, setCreatures, selectedCreature, setSelectedCreature, isAdmin, setIsAdmin }) {
    let imgURL = "/creature"

    useEffect(() => {
        async function getCreatures() {
            try {

                const response = await fetch('http://localhost:4000/api/creatures', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'

                }
                })
                let data = await response.json()
                console.log("data******:", data)
                setCreatures(data)

            } catch (err) {
                console.log(err)
            }

        }

        getCreatures()
    }, [])


    return ( 
        <>

        {
        creatures?.map((creature) => {
            return (
                <>
                
                <br></br><br></br><br></br>
                <div className="creaturegallery">
                <div key={creature.creatureid}>
                    <img className="creatures" src={imgURL + creature.creatureid + ".png"} width="370" height="370"></img>
                    {/* {<button className="inputMOTM"> <a href="./SingleItem" onClick={() => setSelectedCreature(creature)}> {creature.name} </a></button>} */}
                    <div className="monsterbutton"><Link to="./SingleItem" onClick={() => setSelectedCreature(creature)}> {creature.name} </Link></div>
                    
                    <div className="cPrice"><h6>{creature.price}</h6></div> 
                </div>

                {/* Image - name creature1.png and dynamically generate the string for the image url */}
                </div>
                </>
                
            )
            })
        }
        </>
    )
}


