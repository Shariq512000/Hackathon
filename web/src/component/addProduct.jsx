import { TextField } from "@mui/material"
import { Select } from "@mui/material"
import { MenuItem } from "@mui/material"
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from '../context/Context';
import axios from "axios";


function AddProduct() {

    let { state, dispatch } = useContext(GlobalContext);

    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
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


        // console.log(formData.get("text"));

        axios({
            method: 'post',
            url: `${state.baseUrl}/product`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
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
        <div>


            <form onSubmit={productData}>
                <input type="file" id="picture"/>
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
                    value={category}
                    label="Category"
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                Unit Name : <TextField variant="filled"
                    id="unitName"
                    onChange={(e) => {
                        setUnitName(e.target.value);
                    }} />
                <br />
                <br />
                Price : <TextField variant="filled"

                    type="number"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    id="price" />
                <br />
                <br />

                <button type="submit">Submit</button>

            </form>
            <h1>Add Product</h1>
        </div>
    )
}
export default AddProduct;