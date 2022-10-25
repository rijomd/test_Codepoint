import React, { useState } from 'react';
import image from '../_Images/simplelogin.jpg';
import { Link } from "react-router-dom";
import { userRegistration } from '../_Actions/userAction'
import { useDispatch } from 'react-redux';

export const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [iserror, setError] = useState(false);
    const [error, setErrormsg] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if (user.name && user.email && user.password) {
            console.log(user);
            dispatch(userRegistration(user));
            setError(true);
            setErrormsg("Succces Please Login");
        }
        else {
            setError(true);
            setErrormsg("Fill all fields");
        }
    }

    return (
        <>

            <br />
            <br />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card-group mb-0">
                            <div className="card p-4">
                                <div className="card-body">
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Name"
                                            value={user.name}
                                            onChange={(e) => handleChange("name", e.target.value)}>
                                        </input>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Email"
                                            value={user.email}
                                            onChange={(e) => handleChange("email", e.target.value)}>
                                        </input>
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="Password"
                                            value={user.password}
                                            onChange={(e) => handleChange("password", e.target.value)}>
                                        </input>
                                    </div>
                                    {iserror && <div className="row">
                                        <p>{error}</p>
                                    </div>}

                                    <div className="row">
                                        <div className="col-6">
                                            <button type="button" className="btn btn-primary px-4" onClick={handleSubmit}>
                                                Sign Up
                                            </button>
                                        </div>
                                        <div className="col-6 text-right">
                                            <Link to={"/login"}>
                                                <button type="button" className="btn btn-link px-0">
                                                    Login?
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="card text-white py-5 d-md-down-none mobile"
                                style={{ width: "44%" }}
                            >
                                <div className="card-body text-center">
                                    <div>
                                        <img src={image} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

