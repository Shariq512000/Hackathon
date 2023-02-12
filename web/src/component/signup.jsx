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
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';


import { useState } from "react";
import "./signup.css";
import Email from "@mui/icons-material/Email";



function Signup() {

    let { state, dispatch } = useContext(GlobalContext);



    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [passVisi, setPassVisi] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");





    let handleClose = () => {
        setSuccessOpen(false);
        setErrorOpen(false);
    }

    const validationSchema = yup.object({
        firstName: yup
            .string('Enter a Valid Name')
            .required('Name is Required'),
        lastName: yup
            .string('Enter a Valid Name')
            .required('Name is Required'),
        email: yup
            .string('Enter a Valid Name')
            .email('enter a valid email')
            // .isValid('enter a valid email')
            .required('email is Required'),
        password: yup
            .string('Enter Password')
            .required('Password is Required')
            .min(6)
            .max(12),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch({ type: 'CLICK_LOGIN' });
            console.log("values: ", values);
            axios.post(`${state.baseUrl}/signup`, {

                firstName: formik.values.firstName,
                lastName: formik.values.lastName,
                email: formik.values.email,
                password: formik.values.password,


            })
                .then(response => {
                    dispatch({ type: 'CLICK_LOGOUT' });
                    let message = response.data.message;
                    console.log("message: ", message)
                    console.log("response: ", response.data);
                    setSuccessOpen(true);
                    formik.resetForm();

                })
                .catch(err => {
                    dispatch({ type: 'CLICK_LOGOUT' });
                    console.log("error: ", err);
                    setErrorMessage(err.response.data.message);
                    setErrorOpen(true);
                })
        },
    });

    let passType = (passVisi) ? "text" : "password";

    return (
        <div>

            <center><h1 className="saylaniT">SAYLANI WALFARE</h1></center>
            <center><h3 className="saylaniB">ONLINE DISCOUNT STORE</h3></center>

            <form className="form" onSubmit={formik.handleSubmit}>
                <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name: "
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
                <br />
                <br />

                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name: "
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
                <br />
                <br />

                <TextField
                    id="email"
                    name="email"
                    label="Email: "
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
                <br />
                <br />

                <TextField
                    id="password"
                    name="password"
                    type={passType}
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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
                />
                <br />
                <br />

                {(state.clickLoad === false) ?

                    <Button variant="contained" style={{ backgroundColor: "#61B846", width: 250, height: 50, marginTop: 20, fontSize: 20 }} type="submit">
                        Signup
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
                        Signup Successfully!
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

            <center><Link to={"/login"} className="loginn"> Already have an account? Login </Link></center>





        </div>
    )
}

export default Signup;