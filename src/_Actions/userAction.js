import { userConstants } from '../_Constants'
import axios from 'axios';

export const userLogin = (user) => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: userConstants.USERLOGIN_REQUEST });
        if (user) {
            let response = await axios.post("http://35.91.154.220:3055/api/v1/auth/login", user);
            console.log(response, "response");
            if (response.status === 200) {
                let payload = response.data;
                let token = response.data.result && response.data.result.access_token;
                console.log(token, "token");
                localStorage.setItem('token', token);
                await dispatch({
                    type: userConstants.USERLOGIN_SUCCESS,
                    payload: payload
                });
            }
            else {
                await dispatch({
                    type: userConstants.USERLOGIN_FAIL,
                    payload: "Error"
                });
            }
            return response;
        }
    }

}


export const userRegistration = (user) => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: userConstants.USERLOGIN_REQUEST });
        if (user) {
            let response = await axios.post("http://35.91.154.220:3055/api/v1/auth/register", user);
            console.log(response, "response");
            if (response.status === 200) {
                let payload = response.data;


                await dispatch({
                    type: userConstants.USERLOGIN_SUCCESS,
                    payload: payload
                });
            }
            else {
                await dispatch({
                    type: userConstants.USERLOGIN_FAIL,
                    payload: "Error"
                });
            }
            return response;
        }
    }

}



export const blogList = () => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: userConstants.BLOGLIST_REQUEST });
        let response = await axios.get("http://35.91.154.220:3055/api/v1/blogs");
        if (response.status === 200) {
            let payload = response.data.result;
            console.log(payload, "payload");
            await dispatch({
                type: userConstants.BLOGLIST_SUCCESS,
                payload: payload,
                count: payload.length
            });
        }
        else {
            await dispatch({
                type: userConstants.BLOGLIST_FAIL,
                payload: "Error"
            });
        }
        return response;
    }

}

export const addBlog = (blog) => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: userConstants.BLOGADD_REQUEST });
        let response = await axios.post("http://35.91.154.220:3055/api/v1/blogs", blog);
        console.log(response, "response");
        if (response.status === 200) {
            let payload = response.data.result;
            await dispatch({
                type: userConstants.BLOGADD_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: userConstants.BLOGLADD_FAIL,
                payload: "Error"
            });
        }
        return response;
    }

}

export const editBlog = (blog) => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: userConstants.BLOGADD_REQUEST });
        let response = await axios.patch("http://35.91.154.220:3055/api/v1/blogs", blog);
        console.log(response, "response");
        if (response.status === 200) {
            let payload = response.data.result;
            await dispatch({
                type: userConstants.BLOGADD_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: userConstants.BLOGLADD_FAIL,
                payload: "Error"
            });
        }
        return response;
    }

}

export const blogDelete = (blog) => {

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: userConstants.BLOGADD_REQUEST });
        let response = await axios.delete("http://35.91.154.220:3055/api/v1/blogs", blog);
        console.log(response, "response");
        if (response.status === 200) {
            let payload = response.data.result;
            await dispatch({
                type: userConstants.BLOGADD_SUCCESS,
                payload: payload
            });
        }
        else {
            await dispatch({
                type: userConstants.BLOGLADD_FAIL,
                payload: "Error"
            });
        }
        return response;
    }

}


export const blogsSingle = (id) => {
    console.log(id);

    return async function saveNewTodoThunk(dispatch, getState) {

        await dispatch({ type: "BLOGSINGLE_REQUEST" });
        let response = await axios.get("http://35.91.154.220:3055/api/v1/blogs/" + id);
        if (response.status === 200) {
            let payload = response.data.result;
            console.log(payload, "payload");
            await dispatch({
                type: "BLOGSINGLE_SUCCESS",
                payload: payload
            });
        }
        return response;
    }

}