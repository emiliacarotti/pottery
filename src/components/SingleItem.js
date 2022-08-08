import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client";
import {
  BrowserRouter,
  useNavigate,
  useParams,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default function SingleItem({
  selectedCreature,
  setSelectedCreature,
  selectedFile,
  setSelectedFile,
  isAdmin,
}) {
  let imgURL = "/creature";
  const navigate = useNavigate();

  const [creatureName, setCreatureName] = useState("");
  const [creaturePrice, setCreaturePrice] = useState("");
  const [creatureStock, setCreatureStock] = useState("");
  const [creatureEnvironment, setCreatureEnvironment] = useState("");
  const [creatureSize, setCreatureSize] = useState("");
  const [creatureFood, setCreatureFood] = useState("");
  const [creatureTemper, setCreatureTemper] = useState("");

  const [nameIsShown, setNameIsShown] = useState(false);
  const [priceIsShown, setPriceIsShown] = useState(false);
  const [stockIsShown, setStockIsShown] = useState(false);
  const [environmentIsShown, setEnvironmentIsShown] = useState(false);
  const [sizeIsShown, setSizeIsShown] = useState(false);
  const [foodIsShown, setFoodIsShown] = useState(false);
  const [temperIsShown, setTemperIsShown] = useState(false);

  useEffect(() => {
    async function getCreaturebyId() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/creatures/${creatureid}",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        console.log("data******:", data.creatureid);

      } catch (err) {
        console.log(err);
      }
    }

    //getCreaturebyId()
  }, []);

  async function addToCart(event) {
    console.log(event);
    try {
      const response = await fetch("INSERT ROUTE HERE, DUMMY", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      if (result.success) {
        alert("Item Added to Cart!");
        navigate("/");
      } else {
        document.getElementById("createErrorMessage").innerHTML =
          result.error.message;
      }
    } catch (err) {
      console.log("Could not add item to cart!" + err);
    }
  }

  // async function EDIT/PATCH creature
  async function EditCreature(selectedCreature) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/creatures/edit/${selectedCreature.creatureid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
              creatureid: selectedCreature.creatureid,
              name: creatureName == "" ? selectedCreature.name : creatureName,
              price: creaturePrice == "" ? selectedCreature.price : creaturePrice,
              stock: creatureStock == "" ? selectedCreature.stock : creatureStock,
              environment: creatureEnvironment == "" ? selectedCreature.environment : creatureEnvironment,
              size: creatureSize == "" ? selectedCreature.size : creatureSize,
              food: creatureFood == "" ? selectedCreature.food : creatureFood,
              temper: creatureTemper == "" ? selectedCreature.temper : creatureTemper,

            },
          ),
        }
      );
      navigate("/");
    } catch (err) {
      console.log("Could not edit creature! " + err);
    }
  }


  // DELETE A CREATURE
  async function DeleteCreature(creatureid) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/creatures/${creatureid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

        }
      );
      navigate("/");
    } catch (err) {
      console.log("Could not delete creature! " + err);
    }
  }

  const handleNameClick = (event) => {
    setNameIsShown((current) => !current);
  };

  const handlePriceClick = (event) => {
    setPriceIsShown((current) => !current);
  };

  const handleStockClick = (event) => {
    setStockIsShown((current) => !current);
  };

  const handleEnvironmentClick = (event) => {
    setEnvironmentIsShown((current) => !current);
  };

  const handleSizeClick = (event) => {
    setSizeIsShown((current) => !current);
  };

  const handleFoodClick = (event) => {
    setFoodIsShown((current) => !current);
  };

  const handleTemperClick = (event) => {
    setTemperIsShown((current) => !current);
  };

  function Box() {
    return (
      <div>
        <h2>Box</h2>
      </div>
    );
  }

  return (
    <>
      <center>
        <p>Single Item Page</p>
        <br></br>
        <br></br>
        <br></br>
        <div className="single">
          <div key={selectedCreature.creatureid}>
            <img src={selectedCreature.image} width="300" height="300"></img>
            <form id="editCreature" //PLEASE DO NOT change this ID for CSS purposes it mess up the form
              onSubmit={async (event) => {
                event.preventDefault();
                EditCreature();
              }}
            >
              <div className="beastid">
                {" "}
                Name: {selectedCreature.name}
                {isAdmin == "true" ? (
                  <>
                    <button 
                    type = "button"
                    onClick={handleNameClick} className="editbtn">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {nameIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creatureName}
                      onChange={(event) => {
                        setCreatureName(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
              <div className="beastid">
                {" "}
                Price: ${selectedCreature.price}
                {isAdmin == "true" ? (
                  <>
                    <button
                    type = "button"
                    onClick={handlePriceClick} className="editbtn">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {priceIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creaturePrice}
                      onChange={(event) => {
                        setCreaturePrice(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
              <div className="beastid">
                {" "}
                Quantity Available: {selectedCreature.stock}
                {isAdmin == "true" ? (
                  <>
                    <button
                    type = "button"
                    onClick={handleStockClick} className="editbtn">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {stockIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creatureStock}
                      onChange={(event) => {
                        setCreatureStock(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
              <div className="beastid">
                {" "}
                Optimal Environment: {selectedCreature.environment}
                {isAdmin == "true" ? (
                  <>
                    <button
                    type = "button"
                      onClick={handleEnvironmentClick}
                      className="editbtn"
                    >
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {environmentIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creatureEnvironment}
                      onChange={(event) => {
                        setCreatureEnvironment(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
              <div className="beastid">
                {" "}
                Size: {selectedCreature.size}
                {isAdmin == "true" ? (
                  <>
                    <button
                    type = "button"
                    onClick={handleSizeClick} className="editbtn">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {sizeIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creatureSize}
                      onChange={(event) => {
                        setCreatureSize(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
              <div className="beastid">
                {" "}
                Type of Food: {selectedCreature.food}
                {isAdmin == "true" ? (
                  <>
                    <button
                    type = "button"
                    onClick={handleFoodClick} className="editbtn">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {foodIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creatureFood}
                      onChange={(event) => {
                        setCreatureFood(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
              <div className="beastid">
                {" "}
                Temperament: {selectedCreature.temper}
                {isAdmin == "true" ? (
                  <>
                    <button
                    type = "button"
                    onClick={handleTemperClick} className="editbtn">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
                {temperIsShown == true ? (
                  <>
                    <br></br>
                    <input
                      type="text"
                      value={creatureTemper}
                      onChange={(event) => {
                        setCreatureTemper(event.target.value);
                      }}
                    ></input>
                  </>
                ) : null}
              </div>
            </form>
          </div>


          <form
            onSubmit={(event) => {
              event.preventDefault();
              addToCart(event);
            }}
          >
            <div>
              <div>
                {" "}
                Qty:
                <select name="quantity" id="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <button className="addtocart">
                {" "}
                <a href="./Cart">
                  {" "}
                  Buy Now <i class="fa fa-cart-shopping"></i>
                </a>
              </button>
              <br></br>
              <div id="createErrorMessage" className="errors"></div>


              <br></br>
            </div>
          </form>


          <div>
            {isAdmin == "true" ? (
              <button
                type= "submit"
                form="editCreature" //DO NOT CHANGE THIS FORM TEXT EITHER
                onClick={(event) => {
                  event.preventDefault();
                  EditCreature(selectedCreature);
                }}
                className="deletebtn"
              >
                Edit
              </button>
            ) : null}
          </div>
          <div>
            {isAdmin == "true" ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  DeleteCreature(selectedCreature.creatureid);
                }}
                className="deletebtn"
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </center>
    </>
  );
}

