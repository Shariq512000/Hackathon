import { TextField } from "@mui/material"
import { Select } from "@mui/material"
import { MenuItem } from "@mui/material"
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from '../context/Context';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Button} from "@mui/material";
import "./addProduct.css"

import axios from "axios";


function AddProduct() {

    let { state, dispatch } = useContext(GlobalContext);

    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("Select Category");
    const [discription, setDiscription] = useState("");
    const [unitName, setUnitName] = useState("");
    const [price, setPrice] = useState("");






    const productData = (e) => {
        e.preventDefault();
        let fileInput = document.getElementById("picture");

        console.log("fileInput: ", fileInput.files[0]);

        let formData = new FormData();

        formData.append("myFile", fileInput.files[0]);
        formData.append("name", itemName);
        formData.append("category", category);
        formData.append("discription", discription);
        formData.append("unitName", unitName);
        formData.append("price", price);
        console.log("Price :", typeof price)




        // console.log(formData.get("text"));

        axios({
            method: 'post',
            url: `${state.baseUrl}/product`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(res => {
                setLoadTweet(!loadTweet)
                console.log(`upload Success` + res.data);
            })
            .catch(err => {
                console.log("error: ", err);
            })
    }



    return (
        <div className="cent">


            <form onSubmit={productData}>
                <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" id="picture" />
                    <PhotoCamera style={{ fontSize: 200 }} />
                </IconButton>
                <br />
                <br />
                <TextField
                    id="itemName"
                    placeholder="Item Name"
                    variant="filled"
                    onChange={(e) => {
                        setItemName(e.target.value);
                    }}
                />
                <br />
                <br />
                <Select
                    style={{ width: 200 }}
                    // placeholder="Select Category"
                    value={category}
                    label="Category"
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}                >
                    <MenuItem value="fruit">Fruit</MenuItem>
                    <MenuItem value="vegetable">Vegetable</MenuItem>
                    <MenuItem value="medicine">Medicine</MenuItem>
                </Select>
                <br />
                <br />
                <TextField
                    multiline
                    rows={5}
                    variant="filled"
                    onChange={(e) => {
                        setDiscription(e.target.value);
                    }}
                    id="discription"
                    name="discription"
                    label="Discription:"
                    placeholder="Add Discription"
                />
                <br />
                <br />
                <b> Unit Name :</b> <TextField variant="filled"
                    id="unitName"
                    onChange={(e) => {
                        setUnitName(e.target.value);
                    }} />
                <br />
                <br />
                <b> Price : </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TextField variant="filled"

                    
                    type="number"

                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    id="price" />
                <br />
                <br />

                <Button variant="contained" style={{ backgroundColor: "#61B846", width: 250, height: 50, marginTop: 20, fontSize: 20 }} type="submit">
                    Add Product
                </Button>

            </form>
            <h1>Add Product</h1>
        </div>
    )
}
export default AddProduct;