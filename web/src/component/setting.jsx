import axios from "axios";
import { useState } from "react";
import { TextField } from "@mui/material"
import { useContext } from "react";
import { GlobalContext } from '../context/Context';

function Setting() {
    let { state, dispatch } = useContext(GlobalContext);


    const [category, setCategory] = useState("");
    const addCategory = async (e) => {

        e.preventDefault()
        try {
            const response = await axios.post(`${state.baseUrl}/category/${category}`, {
                withCredentials: true
            })
            console.log("response: ", response);
            console.log("data: ", response.data)
            // console.log("posts: ", posts);
        }
        catch (error) {
            console.log("error in getting all Products: ", error);
        }

    }
    return (
        <div>
            <form onSubmit={addCategory}>
                <TextField
                    type="text"
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Setting;