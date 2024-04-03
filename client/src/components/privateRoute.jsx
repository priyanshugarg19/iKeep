import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { onLog } from 'firebase/app';

function PrivateRoute() {
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [validUser, setValidUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user/validuser");
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                } else {
                    setValidUser(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    });

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching user data
    }

    return (
        <>
            {
                validUser ? <Outlet /> : <Navigate to='/sign-in' />
            }
        </>
    );
}

export default PrivateRoute;