import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function Home({creatures, setCreatures, selectedCreature, setSelectedCreature, isAdmin, selectedFile, setSelectedFile}){
    let imgURL = "/creature"
    
    useEffect(()=>{
        async function getCreatures(){
            try{
                const response = await fetch('http://localhost:4000/api/creatures')

                let data = await response.json()
                console.log("data******:", data)
                setCreatures(data)

            } catch (err) {
                console.log(err)
            }

        }

        getCreatures()
    }, [])

    async function getImageUrl(fileName) {
        const storageRef = ref(storage, fileName);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL)
        
      }

    
    return ( 
        <>

        {
        creatures?.map((creature) => {
            return (
                <div key={creature.creatureid}>
                    <br></br> <br></br> <br></br>
                <div className="creaturegallery">
                <div>
                
                    <img src={ creature.image
                    } width="100" height="100"></img>
                    <div className="monsterbutton"><Link to="./SingleItem" onClick={() => setSelectedCreature(creature)}> {creature.name} </Link></div>
                    <div className="cPrice"><h6> $ {creature.price}</h6></div> 

                </div>
                </div>
                </div>
            )
            })
        }
        </>
    )
}


