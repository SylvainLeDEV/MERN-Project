import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../Utils";
import {followUser, unfollowUser} from "../../actions/user.actions";

const FollowHandler = ({idToFollow, type}) => {
    const userData = useSelector((state => state.userReducer));
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true)
    }

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow))
        setIsFollowed(false)

    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false)
        }
    }, [userData, idToFollow])

    return (
        <>
            {isFollowed === true && !isEmpty(userData) && (
                <span onClick={handleUnFollow}>
                {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
                    {type === "card" && <img src="./img/icons/checked.svg" alt="Checked"></img>}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                {type === "suggestion" && <button className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt="Checked"></img>}
                </span>
            )}
        </>
    );
};

export default FollowHandler;