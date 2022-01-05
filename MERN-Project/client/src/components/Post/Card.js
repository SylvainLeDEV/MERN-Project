import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {dateParser, isEmpty} from "../Utils";
import FollowHandler from "../profil/FollowHandler";
import LikeButton from "./LikeButton";

const Card = ({post}) => {

    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.usersReducer)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                //Affichage
                <>
                    <div className="card-left">
                        <img src={!isEmpty(usersData[0]) && usersData.map((user) => {
                            if (user._id === post.posterId) return user.picture
                        }).join("")
                        } alt="poster-pic"/>
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) && usersData.map((user) => {
                                        if (user._id === post.posterId) return user.pseudo
                                    })
                                    }
                                </h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler idToFollow={post.posterId} type="card"/>
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (<img src={post.picture} alt="card-pic" className="card-pic"/>)}
                        {post.video && (
                            <iframe id="player" type="text/html" width="640" height="360"
                                    src={post.video}
                                    frameBorder="0"></iframe>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="Comment"/>
                                <span>{post.comments.length}</span>
                            </div>

                            <LikeButton post={post}/>
                            <img src="./img/icons/share.svg" alt="Share"/>
                        </div>
                    </div>

                </>
            )}
        </li>
    );
};

export default Card;