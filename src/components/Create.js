import React, { useState } from "react";
import reactdomclient from "react-dom/client"
import { token, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
//import { createPot } from "../../db/pot";

const server_url = `http://localhost:4000/api/pottery/create`;

export default function Create({ isAdmin }) {
  const navigate = useNavigate()

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [size, setsize] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const metadata = { contentType: "image/jpeg" };

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
        newPot(url)

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
  async function newPot(imageName) {
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
        size,
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
            size: size,
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


  return (<div className="move">
    <div className="center1">
      <>
        <center><h2><i className="fa fa-dragon"></i></h2></center>
        {
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await uploadImage();

            }}>




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
    </div></div>
  )
}