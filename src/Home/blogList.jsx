import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { BlogAdd } from './blogAdd';
import { BlogEdit } from './blogEdit';
import { blogList, blogDelete} from "../_Actions/userAction";
import { Header } from './header';

import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination'
import Spinner from 'react-bootstrap/Spinner';
import { FaEye } from 'react-icons/fa';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import _ from "lodash";

export const BlogList = () => {

    const blogs = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [allBlogs, setAllblogs] = useState([]);
    const [isopenAddmodal, setAddmodal] = useState(false);
    const [editData, setEditdata] = useState({});
    const [isopenEditmodal, setEditmodal] = useState(false);
    const [currentpage, setCurrentPage] = useState(1);
    let pageSize = 5;

    useEffect(() => {
        dispatch(blogList()).then((res) => {
            if (res) {
                console.log(res, "res");
                setAllblogs(res.data.result);
                let newData = _(res.data.result).slice(0).take(pageSize).value();
                dispatch({
                    type: "BLOGLIST_SUCCESS",
                    payload: newData
                });
            }
        })
    }, [blogs.blogAddData]);

    let pageCount = allBlogs ? Math.ceil(allBlogs.length / pageSize) : 0;
    let pages = _.range(1, pageCount + 1);

    const paginateItems = (page) => {
        setCurrentPage(page);
        let start = (page - 1) * pageSize;
        let newData = _(allBlogs).slice(start).take(pageSize).value();
        dispatch({
            type: "BLOGLIST_SUCCESS",
            payload: newData
        });
    }

    const editModal = (blogs) => {
        setEditdata(blogs);
        setEditmodal(true);
    }
    const handleCloseblogEdit = () => {
        setEditmodal(false);
    }
    const deleteModal = (blogs) => {
        dispatch(blogDelete(blogs)).then((res) => {
            if (res) {
                console.log(res, "res");
                setAllblogs(res.data.result);
                let newData = _(res.data.result).slice(0).take(pageSize).value();
                dispatch({
                    type: "BLOGLIST_SUCCESS",
                    payload: newData
                });
            }
        })
    }
    const renderblogss = (blogss) => {
        let blogsArray = [];
        for (let blogs of blogss) {
            blogsArray.push(
                <tr>
                    <td><img className="blogslist-image" src={blogs.image_url} alt="demmo"></img></td>
                    <td> <p className="blogslist-titile">{blogs.title}</p></td>
                    <td>{blogs.slug}</td>

                    <td>
                        <Link to={"/blogs/" + blogs.id}>
                            <FaEye />
                        </Link>
                    </td>
                    <td>
                        <AiFillEdit onClick={() => editModal(blogs)} />
                    </td>
                    <td>
                        <AiFillDelete onClick={() => deleteModal(blogs)} />
                    </td>
                </tr>
            )
        }
        return blogsArray;
    };

    const addBlog = () => {
        setAddmodal(true);
    }
    const handleCloseblogAdd = () => {
        setAddmodal(false);
    }

    return (
        <div>
            <Header />

            <Container className=" mt-3 mb-4">
                <Row>
                    <Button variant="primary" onClick={() => addBlog()}>Add Blog</Button>
                </Row>

                <Row >
                    <Col md={12} >
                        <Container className="blogs-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                            {blogs.isListing && <Spinner animation="grow" variant="primary" />}
                            {!blogs.isListing && blogs.blogData && blogs.blogData.length > 0 &&
                                <Table className="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th >Image</th>
                                            <th >Name</th>
                                            <th >Slug</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderblogss(blogs.blogData)}
                                    </tbody>
                                </Table>}

                            {!blogs.isListing && blogs.blogData && blogs.blogData.length == 0 && <p> No blogs Found</p>}

                            {!blogs.isListing && blogs.blogData && blogs.blogData.length > 0 && <Row>
                                {pages.length > 1 && <Pagination style={{ justifyContent: "center" }}>
                                    {
                                        pages.map((page) => {
                                            return <Pagination.Item key={page} active={page === currentpage} onClick={() => paginateItems(page)}>
                                                {page}
                                            </Pagination.Item>
                                        })
                                    }
                                </Pagination>}
                            </Row>}
                        </Container>
                    </Col>
                </Row>
            </Container>

            <BlogAdd
                show={isopenAddmodal}
                handleCloseblogAdd={handleCloseblogAdd}
            />

            <BlogEdit
                show={isopenEditmodal}
                handleCloseblogAdd={handleCloseblogEdit}
                editData={editData}
            />
        </div>
    )
}

