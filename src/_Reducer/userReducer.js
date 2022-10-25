import { userConstants } from '../_Constants'

const initialState = {
    loginData: {},
    blogData: [],
    blogAddData: {},
    blogSingle: {},
    count: 0,
    isListing: false,
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        //LOGIN
        case userConstants.USERLOGIN_REQUEST:
            state = {
                ...state,
                loginData: {},
            }
            break;
        case userConstants.USERLOGIN_SUCCESS:
            state = {
                ...state,
                loginData: action.payload,
            }
            break;
        case userConstants.USERLOGIN_FAIL:
            state = {
                ...state,
                loginData: {},
            }
            break;

        // LISTING
        case userConstants.BLOGLIST_REQUEST:
            state = {
                ...state,
                isListing: true,
                blogData: [],
            }
            break;
        case userConstants.BLOGLIST_SUCCESS:
            state = {
                ...state,
                isListing: false,
                blogData: action.payload,
                count: action.count
            }
            break;
        case userConstants.BLOGLIST_FAIL:
            state = {
                ...state,
                isListing: false,
                blogData: [],
            }
            break;


        //ADDING 


        case userConstants.BLOGADD_REQUEST:
            state = {
                ...state,
                blogAddData: {},
            }
            break;
        case userConstants.BLOGADD_SUCCESS:
            state = {
                ...state,
                blogAddData: action.payload,
            }
            break;
        case userConstants.BLOGLADD_FAIL:
            state = {
                ...state,
                blogAddData: {},
            }
            break;

        case "BLOGSINGLE_REQUEST":
            state = {
                ...state,
                blogSingle: {},
            }
            break;
        case "BLOGSINGLE_SUCCESS":
            state = {
                ...state,
                blogSingle: action.payload,
            }
            break;

    }

    return state;
}