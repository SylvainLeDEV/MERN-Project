import React, {useEffect, useState} from 'react';
import Routes from "./components/routes";
import {UidContext} from "./components/routes/AppContext";
import axios from "axios";

const App = () => {
    const [uid, setUid] = useState(null);

    useEffect(async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}jwtid`,
            withCredentials: true,
        })
            .then((res) => {
                console.log(res)
                setUid(res.data)
            })
            .catch((err) => console.log("No token"))
    },[uid])

    return (
        <UidContext.Provider value={uid}>
            <Routes/>
        </UidContext.Provider>
    );
};

export default App;