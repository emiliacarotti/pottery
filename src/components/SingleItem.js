import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";



export default function SingleItem({ selectedCreature, setSelectedCreature, isAdmin }) {
    let imgURL = "/creature"
    const navigate = useNavigate();

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
                const response = await fetch('http://localhost:4000/api/creatures/${creatureid}', {
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

    async function addToCart(event) {
        console.log(event);
        try {
            const response = await fetch('INSERT ROUTE HERE, DUMMY', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            let result = await response.json()
            if (result.success) {
                alert("Item Added to Cart!")
                navigate("/")

            } else {
                document.getElementById("createErrorMessage").innerHTML = result.error.message
            }

        } catch (err) {
            console.log("Could not add item to cart!" + err)
        }
    }

    // async function EDIT/PATCH creature  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
    async function EditCreature(event) {
        try {
            const response = await fetch('http://localhost:4000/api/creatures/edit/${creatureid}', {

                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    creature: {
                        creatureid: selectedCreature.creatureid,
                        name: creatureName,
                        price: creaturePrice,
                        stock: creatureStock,
                        environment: creatureEnvironment,
                        size: creatureSize,
                        food: creatureFood,
                        temper: creatureTemper,
                        // image: event.target[8].value,
                    }
                })

            })
            let result = await response.json()
            if (result.success) {
                alert("Your creature has been updated!")
                navigate("/")

            } else {
                document.getElementById("createErrorMessage").innerHTML = result.error.message
            }

        } catch (err) {
            console.log("Could not edit creature! " + err)
        }
    }

    // async function DELETE A CREATURE  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
    async function DeleteCreature(event) {
        try {
            const response = await fetch(`http://localhost:4000/api/creatures` + selectedCreature.creatureid, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }

            })
            let result = await response.json()
            if (result.success) {
                alert("Your creature has been deleted!")
                navigate("/")

            } else {
                document.getElementById("createErrorMessage").innerHTML = result.error.message
            }

        } catch (err) {
            console.log("Could not delete creature! " + err)
        }
    }


    return (
        <>
            <p>Single Item Page</p>
            <br></br><br></br><br></br>
            {/* <div className="center"> */}
            <div key={selectedCreature.creatureid}>
                <img src={imgURL + selectedCreature.creatureid + ".png"} width="300" height="300"></img>
                <form><div> Name: {selectedCreature.name} {isAdmin == "true" ? (
                    <>
                        <br></br>
                        <input
                            type="text"
                            onChange={(event) => {
                                setCreatureName(event.targetvalue);
                            }}
                        ></input>
                    </>
                ) : null}</div>
                    <div> Price: {selectedCreature.price} {isAdmin == "true" ? (
                        <>
                            <br></br>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setCreaturePrice(event.target.value);
                                }}
                            ></input>
                        </>
                    ) : null}</div>
                    <div> Quantity Available: {selectedCreature.stock} {isAdmin == "true" ? (
                        <>
                            <br></br>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setCreatureStock(event.target.value);
                                }}
                            ></input>
                        </>
                    ) : null}</div>
                    <div> Optimal Environment: {selectedCreature.environment} {isAdmin == "true" ? (
                        <>
                            <br></br>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setCreatureEnvironment(event.target.value);
                                }}
                            ></input>
                        </>
                    ) : null}</div>
                    <div> Size: {selectedCreature.size} {isAdmin == "true" ? (
                        <>
                            <br></br>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setCreatureSize(event.target.value);
                                }}
                            ></input>
                        </>
                    ) : null}</div>
                    <div> Type of Food: {selectedCreature.food} {isAdmin == "true" ? (
                        <>
                            <br></br>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setCreatureFood(event.target.value);
                                }}
                            ></input>
                        </>
                    ) : null}</div>
                    <div> Temperament: {selectedCreature.temper} {isAdmin == "true" ? (
                        <>
                            <br></br>
                            <input
                                type="text"
                                onChange={(event) => {
                                    setCreatureTemper(event.target.value);
                                }}
                            ></input>
                        </>
                    ) : null}</div>
                </form>
            </div>

            <form onSubmit={(event) => {
                event.preventDefault()
                addToCart(event)
            }}>
                <div> Qty:
                    <select name="quantity" id="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button href="./Cart" className="submit" type="submit">Add to Cart</button>
                    <br></br>
                    <div id="createErrorMessage" className="errors"></div>
                    <br></br></div>
            </form>
            <div> {isAdmin == "true" ? (
                <><button
                    onClick={() => {
                        DeleteCreature(selectedCreature.creatureid);
                    }}
                >
                    Delete
                </button>
                    <button
                        onClick={() => {
                            EditCreature(selectedCreature.creatureid);
                        }}
                    >
                        Edit
                    </button></>
            ) : null}</div>
            {/* </div> */}
        </>
    )
}
