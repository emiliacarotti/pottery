import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";



export default function SingleItem({ creatures, setCreatures, selectedCreature, setSelectedCreature, isAdmin, setIsAdmin }) {
    let imgURL = "/creature"

    const [creatureName, setCreatureName] = useState('');
    const [creaturePrice, setCreaturePrice] = useState('');
    const [creatureStock, setCreatureStock] = useState('');
    const [creatureEnvironment, setCreatureEnvironment] = useState('');
    const [creatureSize, setCreatureSize] = useState('');
    const [creatureFood, setCreatureFood] = useState('');
    const [creatureTemper, setCreatureTemper] = useState('');
    


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

            <div className="singleCreature">
                <div><h4>Name:{creatures.title}</h4></div>
                <div>Price: {creatures.price}</div>
                <div>Stock:{creatures.stock}</div>
                <div>Environment:{creatures.environment}</div>
                <div>Size:{creatures.size}</div>
                <div>Food:{creatures.food}</div>
                <div>Temperment:{creatures.temper}</div>
            </div>

            {/*EDIT CREATURE */}
            <form id={`editCreature${creatureid}`} className="editCreatureForm" onSubmit={async (event) => {
                event.preventDefault();
                const result = await editCreature(token, isAdmin, creatureName, creaturePrice, creatureStock, creatureEnvironment, creatureSize, creatureFood,creatureTemper);
                if (!result.error) {
                    getCreaturebyId();

                } else {
                    alert(result.error);
                }
            }}>
                <input type="text" placeholder="name" onChange={(event) => { setCreatureName(event.target.value) }}></input>
                <br></br>
                <input type="text" placeholder="price" onChange={(event) => { setCreaturePrice(event.target.value) }}></input>
                <br></br>
                <input type="text" placeholder="stock" onChange={(event) => { setCreatureStock(event.target.value) }}></input>
                <br></br>
                <input type="text" placeholder="environment" onChange={(event) => { setCreatureEnvironment(event.target.value) }}></input>
                <br></br>
                <input type="text" placeholder="size" onChange={(event) => { setCreatureSize(event.target.value) }}></input>
                <br></br>
                <input type="text" placeholder="food" onChange={(event) => { setCreatureFood(event.target.value) }}></input>
                <br></br>
                <input type="text" placeholder="temper" onChange={(event) => { setCreatureTemper(event.target.value) }}></input>
                <br></br>

                <button type="submit" className="editCreature">Submit Changes</button>
            </form>
                <button className="deleteCreature" onClick={() => { deleteCreature(token, creatureid) }}>Delete Creature</button>
        </>
    )
}
