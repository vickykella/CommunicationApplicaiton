import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    useEffect(() => gotoLandingPage(), []);

    const gotoLandingPage = () => {
        window.location.href = "http://localhost:3000";
    }
    
    return <></>
}