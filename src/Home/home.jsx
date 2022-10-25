import React, { useEffect } from "react";
import { Header } from './header';
import { Card } from 'react-bootstrap';
import { blogList } from "../_Actions/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export const Home = () => {

    const blogs = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(blogList())
    }, []);

    return (
        <div>
            <Header />
            <Link to={"/blogs"}>
                <Card style={{ width: "50%", margin: "2rem" }}>
                    <Card.Body>
                        No of Blogs : {blogs.count}
                    </Card.Body>
                </Card>
            </Link>

        </div>
    )
}

