import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

import { blogsSingle } from "../_Actions/userAction";
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, Col, Table, } from 'react-bootstrap';
import { Header } from './header';

export const Blog = () => {
    let { id } = useParams();
    const blog = useSelector(state => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(blogsSingle(id));
    }, []);
    console.log(blog.blogSingle);

    return (
        <div>
            <Header />

            <Container className="mt-3 mb-4">

                {blog.blogSingle && <Row>
                    <Col md={6} className="singleview-image">
                        <img src={blog.blogSingle.image_url} alt="demmo"></img>
                    </Col>
                    <Col md={6} className="singleview-detail">
                        <h6>{blog.blogSingle.title}</h6>
                        <h6>Description</h6>
                        <p className="sindleview-category">{blog.blogSingle.short_description}</p>
                        <Row>
                            <h6>Content</h6>
                            <p>{blog.blogSingle.content}</p>
                        </Row>
                    </Col>
                </Row>}
            </Container>
        </div>
    )
}
