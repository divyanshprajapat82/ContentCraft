import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let dataContext = createContext()
export default function MainContext({ children }) {

    const [token, setToken] = useState(localStorage.getItem("TOKEN") ?? "")
    const [userData, setUserData] = useState([])
    const [contentData, setContentData] = useState([])
    let ADMIN_URL = import.meta.env.VITE_ADMIN_URL




    useEffect(() => {
        if (token) {
            localStorage.setItem("TOKEN", token)
        } else {
            localStorage.removeItem("TOKEN")
        }
    }, [token]);

    useEffect(() => {

        axios.get(`${ADMIN_URL}/auth/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                setUserData(finalData.data)
            })
    }, [token])

    useEffect(() => {

        axios.get(`${ADMIN_URL}/content/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                setContentData(finalData.data)
            })
            .catch(err => console.log(err.response?.data));
    }, [token])


    let obj = {
        token, setToken,
        userData, setUserData,
        contentData, setContentData
    }


    return (
        <dataContext.Provider value={obj}>
            {children}
        </dataContext.Provider>
    )
}
