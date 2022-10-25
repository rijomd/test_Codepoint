import React, { useState } from 'react';
import image from '../_Images/simplelogin.jpg';
import { Link ,useNavigate} from "react-router-dom";
import { userLogin } from '../_Actions/userAction';
import { useDispatch } from 'react-redux';

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [iserror, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if (user.email && user.password) {
            console.log(user);
            dispatch(userLogin(user)).then((res) => {
                if (res) {
                    res.status === 200 ? navigate("/") : alert("Failed");
                    window.location.reload();
                }
            })
        }
        else {
            setError(true);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card-group mb-0">
                        <div className="card p-4">
                            <div className="card-body">
                                <h1>Login</h1>
                                <p className="text-muted">Sign In to your account</p>
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
                                    <p>Fill all fields</p>
                                </div>}

                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-primary px-4" onClick={handleSubmit}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to={"/register"}>
                                            <button type="button" className="btn btn-link px-0">
                                                Register?
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
    )
}

