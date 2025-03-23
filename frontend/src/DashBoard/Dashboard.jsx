import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Header from '../Header/Header'
import QuizzesList from '../QuizList/QuizList'

const Dashboard = () => {
    const [userData, setUser] = useState()

    useEffect(() => {
        const getUser = async () => {
            try {
                const apiResponse = await fetch(import.meta.env.VITE_API_URL+'/auth/get-user', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!apiResponse.ok) {
                    throw new Error('Unauthorized')
                }
                const responseData = await apiResponse.json()

                setUser(responseData)
                // console.log(responseData);
            } catch (error) {
                console.log(error)
            }
        }

        getUser()
    }, [])

    if (!userData || !userData.success) return <div className="loading">Loading...</div>

    return (
        <div className="dashboard-container">
            <Header />
            <h1 className="dashboard-title">User Data</h1>
            {userData ? (
                <div className="user-info">
                    <img 
                        className="user-avatar" 
                        src={userData.user?.avatar || "/default-avatar.png"} 
                        alt="User Avatar" 
                    />
                    <p><strong>Name:</strong> {userData.user?.name || "N/A"}</p>
                    <p><strong>Email:</strong> {userData.user?.email || "N/A"}</p>
                    <p><strong>Phone Number:</strong> {userData.user?.phoneNumber || "N/A"}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <QuizzesList/>
        </div>
    );
}

export default Dashboard
