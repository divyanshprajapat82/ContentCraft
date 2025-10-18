import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { dataContext } from '../context/MainContext'

export default function Header() {
    let { setToken, userData, setUserData, setContentData } = useContext(dataContext)

    let navigate = useNavigate()

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    let name = "Divyansh";
    let firstLetter = name.charAt(0);
    console.log(firstLetter);



    return (
        <>
            <div className="shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/95">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ContentCraft</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">{getInitials(userData.name)}</div>
                                <div>
                                    <span className="font-medium text-gray-700 hidden sm:block">{userData.name}</span>
                                    <span className="font-medium text-gray-700 hidden sm:block">{userData.email}</span>
                                </div>
                            </div>
                            <button onClick={() => {
                                setToken("")
                                setUserData([]);
                                setContentData([]);
                                navigate('/')
                            }} className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-sm cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
