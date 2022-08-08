import React, {useState } from "react";
import reactdomclient from "react-dom/client"
import { token, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
//import { createCreature } from "../../db/creature";

const server_url = `http://localhost:4000/api/creatures/create`;

export default function Create({ isAdmin }) {
  const navigate = useNavigate()

    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [stock, setstock] = useState("");
    const [environment, setenvironment] = useState("");
    const [size, setsize] = useState("");
    const [food, setfood] = useState("");
    const [temper, settemper] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [selectedFile, setSelectedFile] = useState([]);
    const metadata = {contentType: "image/jpeg"};

    async function uploadImage() {
      try {
        let imageName = uuidv4() + ".jpg";
        setImageURL(imageName)
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile[0], metadata);
        // const downloadURL = await getDownloadURL(storageRef);
        // console.log("downloadURL: ", downloadURL)
        // if (downloadURL) setImageURL(downloadURL)
        uploadTask.on("state_changed", null, null, complete);
        
        async function complete() {
          console.log("upload complete!");

          let url = await getImageUrl(imageName)
          newCreature(url)

          // getImageUrl(imageName);
          //saveImageName(imageName);
          // const downloadURL = await getDownloadURL(storageRef);
          // console.log("downloadURL: ", downloadURL)
          // setImageURL(downloadURL)

        }
        
      } catch (err) {
        console.log(err);
      }
    }



    async function getImageUrl(fileName) {
      const storageRef = ref(storage, fileName);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL
      
    }

    async function saveImageName(url) {
      const response = await fetch(`${server_url}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
    }

    async function getImageUrl(fileName) {
      const storageRef = ref(storage, fileName);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL
      
    }

    async function saveImageName(url) {
      const response = await fetch(`${server_url}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
    }

    // async function CREATE A NEW CREATURE
  async function newCreature(imageName) {
    try {
      console.log(localStorage.getItem("token"))
      console.log("selectedfile: ", selectedFile)

      //if(selectedFile.length>0) {
      //  await uploadImage();
      //}

      console.log(
        name,
        price,
        stock,
        environment,
        size,
        food,
        temper,
        imageName
        )
        
        console.log("imageURL: ", imageName)
      const response = await fetch(`${server_url}/`,        
      {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          body: JSON.stringify({
            
            name: name, 
            price: price, 
            stock: stock, 
            environment: environment, 
            size: size, 
            food: food, 
            temper: temper,
            image: imageName
          })
        }
      );
      let result = await response.json();
      console.log(result);
      if (result) {
        alert("Your creature has been successfully created!")  // please clap
        navigate("/")
      } else {
        console.log("nope")
        document.getElementById("createErrorMessage").innerHTML =
          result.error.message;
      }
    } catch (err) {
      console.log("Couldn't create new creature!" + err);
    }
  }


    return (<div className="center1">
    <>
    <center><h2><i className="fa fa-spaghetti-monster-flying"></i></h2></center>
    <br></br>{
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await uploadImage();
            
          }}>

<br></br>
<br></br>

            <div>
            
            <label>Creature Name/Type:</label>
            <br></br>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setname(event.target.value);
              }}
            ></input>


            <br></br>
            <label>Price: $</label>
            <br></br>
            <input
              type="text"
              value={price}
              onChange={(event) => {
                setprice(event.target.value);
              }}
            ></input>


            <br></br>
            <label>Quantity Available:</label>
            <br></br>
            <input
              type="text"
              value={stock}
              onChange={(event) => {
                setstock(event.target.value);
              }}
            ></input>


            <br></br>
            <label>Environment Type:</label>
            <br></br>
            <select name="enviroment" id="enviroment"
              value={environment}
              onChange={(event) => {
                setenvironment(event.target.value);
              }}>
              <option value=''>--Select One--</option>
              <option value='water'>--Swimmer--</option>
              <option value='air'>--Flyer--</option>
              <option value='earth'>--Walker--</option>
              <option value='unknown'>--Higher Powers--</option>
            </select>

            <br></br>
            <label>Creature Size:</label>
            <br></br>
            <select name="size" id="size"
              value={size}
              onChange={(event) => {
                setsize(event.target.value);
              }}>
              <option value=''>--Select One--</option>
              <option value='small'>--Pocket--</option>
              <option value='med'>--Fit's Inside--</option>
              <option value='large'>--Outside Only--</option>
              <option value='extralarge'>--Cosmic Size--</option>
            </select>


            <br></br>
            <label>Type of Food:</label>
            <br></br>
            <select name="food" id="food"
              value={food}
              onChange={(event) => {
                setfood(event.target.value);
              }}>
              <option value=''>--Select One--</option>
              <option value='omnivore'>--Omnivore--</option>
              <option value='nuclear waste'>--Nuclear Waste--</option>
              <option value='unknown'>--Not Sure--</option>
              <option value='politicians_souls'>--Politician's Souls--</option>
            </select>

            <br></br>
            <label>Temperment:</label>
            <br></br>
            <select name="temperment" id="temperment"
              value={temper}
              onChange={(event) => {
                settemper(event.target.value);
              }}>
              <option value=''>--Select One--</option>
              <option value='docile'>--Docile--</option>
              <option value='stubborn'>--Stubborn--</option>
              <option value='dangerous'>--Watch Out--</option>
              <option value='evil'>--Will Eat the World--</option>
            </select>

            <br></br>
            <label>Image:</label>
            <br></br>
            <input
              type="file"
              onChange={(event) => {
                setSelectedFile(event.target.files);
              }}
            ></input>


            <br></br>
            <br></br>
            <button className='input' type="submit">
              Create
            </button>
            <div id="createErrorMessage" ></div>
          </div>
        </form>
        }
        </>
        </div>
    )
}