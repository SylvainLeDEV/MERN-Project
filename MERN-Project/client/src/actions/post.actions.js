import axios from "axios";

//Post
export const GET_POSTS = "GET_POSTS";

export const getPost = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`  )
            .then((res) => {
                dispatch({type: GET_POSTS, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}