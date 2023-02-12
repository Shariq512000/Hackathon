import { useContext } from "react";
import { GlobalContext } from '../context/Context';

import axios from "axios";
import { Formik, Form, Field, useFormik } from 'formik';
import * as yup from 'yup';
import {
    BooleanSchema,
    DateSchema,
    MixedSchema,
    NumberSchema,
    ArraySchema,
    ObjectSchema,
    StringSchema,
} from 'yup';
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';


import { useState } from "react";
import "./signup.css";




function Login() {

    let { state, dispatch } = useContext(GlobalContext);



    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passVisi, setPassVisi] = useState(false);






    let handleClose = () => {
        setSuccessOpen(false);
        setErrorOpen(false);
    }

    const validationSchema = yup.object({
        email: yup
            .string('Enter a Valid Name')
            .email('enter a valid email')
            // .isValid('enter a valid email')
            .required('email is Required'),
        password: yup
            .string('Enter Password')
            .required('Password is Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            dispatch({ type: 'CLICK_LOGIN' });
            console.log("values: ", values);

            try {
                let response = await axios.post(`${state.baseUrl}/login`, {
                    email: formik.values.email,
                    password: formik.values.password,


                }, {
                    withCredentials: true
                })
                dispatch({ type: 'CLICK_LOGOUT' });
                let message = response.data.message;
                console.log("message: ", message)
                console.log("response: ", response.data);
                setSuccessOpen(true);
                setSuccessMessage(message);
                dispatch({ type: 'USER_LOGIN', payload: response.data.profile })
                formik.resetForm();

            }
            catch (error) {
                dispatch({ type: 'CLICK_LOGOUT' });
                console.log("error: ", error);
                setErrorMessage(error.response.data.message);
                setErrorOpen(true);
            }
        },
    });

    let passType = (passVisi) ? "text" : "password";

    return (
        <div>
            <center><h1 className="saylaniT">SAYLANI WALFARE</h1></center>
            <center><h3 className="saylaniB">ONLINE DISCOUNT STORE</h3></center>

            <form className="form" onSubmit={formik.handleSubmit}>

                <TextField
                    id="email"
                    name="email"
                    label="Email: "
                    type="email"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <br />
                <br />

                <TextField
                    id="password"
                    name="password"
                    label="Password: "
                    type={passType}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={
                                    () => { setPassVisi(!passVisi) }
                                }>
                                    {(passVisi) ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <br />
                <br />

                <Link to={"/forget-password"} className="loginn">Forget Password?</Link>
                <br />
                <br />

                {(state.clickLoad === false) ?

                    <Button variant="contained" style={{ backgroundColor: "#61B846", width: 250, height: 50, marginTop: 20, fontSize: 20 }} type="submit">
                        Login
                    </Button>
                    :
                    <CircularProgress />
                }



                {/* Successfully Alert */}

                <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>

                {/* Error Alert */}

                <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage};
                    </Alert>
                </Snackbar>
            </form>

            <center><Link to={"/signup"} className="loginn"> Don't have an account? Register </Link></center>





        </div>
    )
}
export default Login;