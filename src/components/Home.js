import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function Home({creatures, setCreatures, selectedCreature, setSelectedCreature, isAdmin, setIsAdmin}){
    
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
           {/* <div>
      {creatures.map((creatures) => {
        return (
          <div key={creatures.creatureid}>
            <div>{creatures.name}</div>
            <div>{creatures.price}</div> 
            </div> */}
        </>
    )


    
        

}


