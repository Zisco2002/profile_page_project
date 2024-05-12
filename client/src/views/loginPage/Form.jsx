import React, { useState } from 'react'
import { Box, Button, TextField, useTheme, Typography, useMediaQuery } from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../layouts/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
import { setLogin } from "../../state";

// TODO
// Add social media links in register
// Add phone number in register


const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
    picture: yup.string(),
})

const editSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    picture: yup.string(),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const initialValuesEdit = {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
}


const Form = ({ isEdit, oldUser }) => {
    let [pageType, setPageType] = useState("login");
    const { palette } = useTheme();

    let usr = useSelector((state) => state.user)
    if (isEdit) {
        initialValuesEdit.firstName = usr.rows[0].fname
        initialValuesEdit.lastName = usr.rows[0].lname
        initialValuesEdit.email = usr.rows[0].email
        initialValuesEdit.picture = usr.rows[0].picture
    }

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    let isLogin = pageType === "login";
    let isRegister = pageType === "register";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema;
    let initialValues;

    if (isLogin) {
        schema = loginSchema;
        initialValues = initialValuesLogin;
    }

    if (isRegister) {
        schema = registerSchema;
        initialValues = initialValuesRegister;
    }

    if (isEdit) {
        schema = editSchema;
        initialValues = initialValuesEdit;
    }

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }

        const savedUserResponse = await fetch(
            "http://localhost:3001/api/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        )
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login")
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/api/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        const error = loggedIn.error
        // add ui elements
        if (error === "Invalid password") {
            return
        }
        if (error === "User not found") {
            return
        }

        onSubmitProps.resetForm();
        if (!loggedIn.error) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            )
        }
        navigate(`/profile`)
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isEdit) await edit(values, onSubmitProps)
        else {
            if (isLogin) await login(values, onSubmitProps);
            if (isRegister && !isEdit) await register(values, onSubmitProps)
        }
    }

    const handelEditCancel = async () => {
        navigate(`/profile`);
    }

    const edit = async (values, onSubmitProps) => {
        if (!isEdit) { return }
        console.log(JSON.stringify(values));
        const editResponse = await fetch(
            `http://localhost:3001/api/users/edit/${usr.rows[0].id}`,
            {
                method: "PATCH",
                body: JSON.stringify(values),
            }
        );
        const edited = await editResponse.json();

        onSubmitProps.resetForm();
        if (!edited.error) {
            dispatch(
                setLogin({
                    user: edited.user,
                    token: edited.token,
                })
            )
        }
        navigate(`/profile`);
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={schema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form
                    onSubmit={handleSubmit}
                >
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {(isRegister || isEdit) && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </>
                        )}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {(!isEdit) && (
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{gridColumn: "span 4"}}
                            />
                        )}
                        {(isRegister || isEdit) && (
                            <>
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg, .jpeg, .png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles)
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlined />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Box>
                        {isEdit ? (
                            <>
                                <Button
                                    fullwidth
                                    type="submit"
                                    sx={{
                                        m: "2rem 0",
                                        mr: "1rem",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}
                                >
                                    {"Edit"}
                                </Button>
                                <Button
                                    fullwidth
                                    onClick={() => handelEditCancel()}
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}
                                >
                                    {"Cancel"}
                                </Button>
                            </>
                        ) : (

                            <>
                                <Button
                                    fullwidth
                                    type="submit"
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}
                                >
                                    {isLogin ? "LOGIN" : "REGISTER"}
                                </Button>
                                <Typography
                                    onClick={() => {
                                        setPageType(isLogin ? "register" : "login")
                                        resetForm()
                                    }}
                                    sx={{
                                        textDecoration: "underline",
                                        color: palette.primary.main,
                                        "&:hover": {
                                            cursor: "pointer",
                                            color: palette.primary.light,
                                        },
                                    }}
                                >
                                    {isLogin
                                        ? "Dont have an account? Sign up here."
                                        : "Already have an account? Login here."}
                                </Typography>
                            </>
                        )
                        }
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form
