import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function Home({creatures, setCreatures, selectedCreature, setSelectedCreature, isAdmin, setIsAdmin}){
    let imgURL = "/creature"
    
    useEffect(()=>{
        async function getCreatures(){
            try{

                const response = await fetch('http://localhost:4000/api/creatures', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'

                },
                })
                let data = await response.json()
                console.log("data******:",data.allCreatures)
                setCreatures(data.allCreatures)

            }catch(err){
                console.log(err)
            }

        }

        getCreatures()
    },[])

    
    return ( 
        <>

        {
        creatures.map((creature) => {
            return (
                <>
                <br></br><br></br><br></br>
                <div key={creature.creatureid}>
                    <img src={imgURL + creature.creatureid + ".png"} width="100" height="100"></img>
                    {
                    isAdmin?<li><a href="./EditDelete"> {creature.name} </a></li> : <li><a href="./SingleItem"> {creature.name} </a></li>
                    }
                    <div>{creature.price}</div> 
                </div>

                {/* Image - name creature1.png and dynamically generate the string for the image url */}
                </>
            )
            })
        }
        </>
    )
}


