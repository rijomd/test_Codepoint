import React, { useState, useEffect } from "react";
import { Row, Modal, Button, Container, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editBlog, } from "../_Actions/userAction";
import Spinner from 'react-bootstrap/Spinner';

export const BlogEdit = (props) => {

    const { handleCloseblogAdd, show, editData } = props;
    const dispatch = useDispatch();

    const [blog, setBlog] = useState({});
    const [isError, setError] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log(editData, "editData");
        if (editData ) {
            setBlog(editData);
        }
    }, [editData]);

    const handleChange = (name, value) => {
        setBlog({
            ...blog,
            [name]: value
        })
    }
    const onSumbitAddBlog = () => {
        console.log(blog);
        setLoading(true);
        if (blog.title && blog.short_description && blog.slug && blog.content) {
            dispatch(editBlog(blog)).then((res) => {
                if (res) {
                    handleCloseblogAdd();
                    setLoading(false);
                }
            })
        }
        else {
            setError(true);
            setLoading(false);
            setErrmsg("Please fill all fields");
        }
    }

    return (
        <div>
            <Modal show={show}
                onHide={
                    () => handleCloseblogAdd()
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add  Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="blogadd">

                        {blog.image_url && <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Image  </label>
                            </Col>
                            <Col md={8}>
                                <input type="file" className="form-control" placeholder="Image"
                                    value={blog.image_url}
                                    onChange={(e) => handleChange("image_url", e.target.value)}>
                                </input>
                            </Col>
                        </Row>}

                        {blog.image_url && <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Title  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Title"
                                    value={blog.title}
                                    onChange={(e) => handleChange("title", e.target.value)}>
                                </input>
                            </Col>
                        </Row>}

                        {blog.image_url &&<Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Description </label>
                            </Col>
                            <Col md={8}>
                                <textarea type="textarea" className="form-control" placeholder="Description"
                                    value={blog.short_description}
                                    onChange={(e) => handleChange("short_description", e.target.value)}>
                                </textarea >
                            </Col>
                        </Row>}

                        {blog.image_url &&<Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Slug </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Slug"
                                    value={blog.slug}
                                    onChange={(e) => handleChange("slug", e.target.value)}>
                                </input>
                            </Col>
                        </Row>}

                        {blog.image_url && <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Content </label>
                            </Col>
                            <Col md={8}>
                                <textarea type="textarea" className="form-control" placeholder="Content"
                                    value={blog.content}
                                    onChange={(e) => handleChange("content", e.target.value)}>
                                </textarea >
                            </Col>
                        </Row>}

                        {
                            isError && <Row className="form-row m-4">
                                <p className="">
                                    {errmsg}</p>
                            </Row>
                        }
                        {
                            isLoading && <Row className="form-row m-4">
                                <Spinner animation="grow" variant="primary" />
                            </Row>
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={
                            () => onSumbitAddBlog()
                        }>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


