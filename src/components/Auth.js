import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Auth = () => {
    const [auth, setAuth] = useState(false);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true);
                // setPseudo(res.data.pseudo)
            } else {
                setAuth(false)
                // setMessage(res.data.Message);
            }
        })
    }, [])

    return (
        <div>
            
        </div>
    );
};

export default Auth;