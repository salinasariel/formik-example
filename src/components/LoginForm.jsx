import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Toast,
    ToastBody,
    ToastHeader
} from "reactstrap";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(false);
    const [isLoggedin, setLoggedin] = React.useState(false);


    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    };
    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const generateObjectLogin = () => {
        const Data = {
            email,
            password,
        };
        return Data;
    };

    const validEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^\S+@\S+\.\S+$/);
    };

    const validationRequirementsLogin = {
        email: { required: true, isEmail: true },
        password: { required: true, minLength: 6 },
    };

    const validateLogin = (loginObject, field) => {
        let errors = {};
        if (loginObject) {
            Object.keys(validationRequirementsLogin).forEach((key) => {
                if (validationRequirementsLogin[key].required && !loginObject[key]) {
                    errors[key] = "El campo es obligatorio.";
                } else if (
                    validationRequirementsLogin[key].isEmail &&
                    !validEmail(loginObject[key]) &&
                    (key === field || !field)
                ) {
                    errors[key] = "Debe ingresar un email válido.";
                } else if (
                    validationRequirementsLogin[key].minLength > 0 &&
                    loginObject[key].length < validationRequirementsLogin[key].minLength
                ) {
                    errors[key] =
                        "El campo debe terner al menos " +
                        validationRequirementsLogin[key].minLength +
                        " caracteres.";
                }
            });
        }
        return errors;
    };


    const loginHandler = (ev) => {
        ev.preventDefault();
        if (!email || !password) {
            return;
        }

        fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("RESPONSE from login success ", data);
                setLoggedin(true);
            });

        // console.log(email, password);
    };




    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Form onSubmit={loginHandler}>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="email" className="mr-sm-2">
                                        Email
                                    </Label>
                                    <Input
                                        placeholder="email@email.com"
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        onChange={changeEmailHandler}
                                        onBlur={(e) => {
                                            setErrors(validateLogin(generateObjectLogin()));
                                        }}
                                    />
                                    {errors?.email && (
                                        <Label className="text-danger"> {errors.email} </Label>
                                    )}
                                </FormGroup>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label for="password" className="mr-sm-2">
                                        Password
                                    </Label>
                                    <Input
                                        placeholder="contraseña"
                                        type={state ? "text" : "password"}
                                        id="password"
                                        className="form-control"
                                        onChange={changePasswordHandler}
                                        onBlur={(e) => {
                                            setErrors(validateLogin(generateObjectLogin()));
                                        }}
                                    />
                                    {errors?.password && (
                                        <Label className="text-danger"> {errors.password} </Label>
                                    )}
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                    <Card className="mt-5">
                        <CardBody>
                            {isLoggedin && (
                                <>
                                    <div className="p-3 bg-success my-2 rounded">
                                        <Toast>
                                            <ToastHeader>Success</ToastHeader>
                                            <ToastBody>
                                                User is logged in on the system.
                                            </ToastBody>
                                        </Toast>
                                    </div>
                                </>
                            )}

                            {!isLoggedin && (
                                <div>
                                    Please login with your credentials. <br /> Look at
                                    https://reqres.in/ for api help.
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}