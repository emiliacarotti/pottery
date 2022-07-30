import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";



export default function SingleItem({ creatures, setCreatures, selectedCreature, setSelectedCreature, isAdmin, setIsAdmin }) {
    let imgURL = "/creature"


    


    useEffect(() => {
        async function getCreaturebyId() {
            //console.log('creatureid', creatureid)
            try {
                //UPDATE URL 
                const response = await fetch('http://localhost:4000/api/creatures/SingleItem', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        creature: {
                            creatureid: creatureid
                        }
                    })
                })
                let data = await response.json()
                console.log("data******:", data.creatureid)
                setCreatures(data.creatureid)
            } catch (err) {
                console.log(err)
            }
        }

        getCreaturebyId()
    }, [])


    return (
        <>
        <p>Signle Item Page</p> 
        </>
    )
}
