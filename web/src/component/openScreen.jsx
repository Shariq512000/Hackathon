import "./signup.css"
import { Button } from "@mui/material"
import logo from "./../images/Logo.png"

function OpenScreen() {

    return (
        <div>

            <div className="picDiv">
                <img className="logoPic" src={logo} />
            </div>
            <center><h1 className="tSaylani">SAYLANI WALFARE</h1></center>
            <center><h3 className="saylaniB">ONLINE DISCOUNT STORE</h3></center>

            <center><Button variant="contained" style={{ backgroundColor: "#61B846", width: 250, height: 50, marginTop: 20, fontSize: 20, marginTop:280 }} type="submit">
                Get Started
            </Button></center>
        </div>
    )
}
export default OpenScreen