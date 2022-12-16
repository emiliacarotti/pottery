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
  selectedPot,
  setSelectedPot,
  selectedFile,
  setSelectedFile,
  isAdmin,
}) {
  let imgURL = "/pot";
  const navigate = useNavigate();

  const [potName, setPotName] = useState("");
  const [potPrice, setPotPrice] = useState("");
  const [potStock, setPotStock] = useState("");

  const [nameIsShown, setNameIsShown] = useState(false);
  const [priceIsShown, setPriceIsShown] = useState(false);
  const [stockIsShown, setStockIsShown] = useState(false);

  useEffect(() => {
    async function getPotById() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/pottery/${potid}",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        console.log("data******:", data.potid);

      } catch (err) {
        console.log(err);
      }
    }

    //getPotById()
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
  async function EditPot(selectedPot) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/pottery/edit/${selectedPot.potid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            potid: selectedPot.potid,
            name: potName == "" ? selectedPot.name : potName,
            price: potPrice == "" ? selectedPot.price : potPrice,
            stock: potStock == "" ? selectedPot.stock : potStock,
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
  async function deletePot(potid) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/pottery/${potid}`,
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

  function Box() {
    return (
      <div>
        <h2>Box</h2>
      </div>
    );
  }

  return (
    <>
      <div className="singlepage">
        <div className="singlesquare">
          <div className="singlepot" key={selectedPot.potid}>
            <img src={selectedPot.image} width="300" height="300"></img>
            <form id="editCreature" //PLEASE DO NOT change this ID for CSS purposes it mess up the form
              onSubmit={async (event) => {
                event.preventDefault();
                EditPot();
              }}
            >
              <div>
                {" "}
                <h1>{selectedPot.name}
                  {isAdmin == "true" ? (
                    <>
                      <button
                        type="button"
                        onClick={handleNameClick} className="editbtn">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </>
                  ) : null}</h1>
                  {nameIsShown == true ? (
                    <>
                      <br></br>
                      <input
                        type="text"
                        value={potName}
                        onChange={(event) => {
                          setPotName(event.target.value);
                        }}
                      ></input>
                    </>
                  ) : null}
              </div>
              <div>
                {" "}
                <h2>
                  ${selectedPot.price}
                  {isAdmin == "true" ? (
                    <>
                      <button
                        type="button"
                        onClick={handlePriceClick} className="editbtn">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </>
                  ) : null}</h2>
                  {priceIsShown == true ? (
                    <>
                      <br></br>
                      <input
                        type="text"
                        value={potPrice}
                        onChange={(event) => {
                          setPotPrice(event.target.value);
                        }}
                      ></input>
                    </>
                  ) : null}
              </div>
              <div>
                {" "}
                <h3>
                  {selectedPot.stock} remaining in stock.
                  {isAdmin == "true" ? (
                    <>
                      <button
                        type="button"
                        onClick={handleStockClick} className="editbtn">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </>
                  ) : null}</h3>
                  {stockIsShown == true ? (
                    <>
                      <br></br>
                      <input
                        type="text"
                        value={potStock}
                        onChange={(event) => {
                          setPotStock(event.target.value);
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
            <div className = "qtyandaddtocart">
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
                  Add to Cart <i class="fa fa-cart-shopping"></i>
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
                type="submit"
                form="editCreature" //DO NOT CHANGE THIS FORM TEXT EITHER
                onClick={(event) => {
                  event.preventDefault();
                  EditPot(selectedPot);
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
                  deletePot(selectedPot.potid);
                }}
                className="deletebtn"
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

