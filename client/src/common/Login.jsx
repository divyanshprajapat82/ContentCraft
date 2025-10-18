import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router'
import { dataContext } from '../context/MainContext';

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [validationErrors, setValidationErrors] = useState({});

    let { setToken } = useContext(dataContext)

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';

        let obj = {
            email: formData.email,
            password: formData.password,
        }



        setLoading(true);
        let ADMIN_URL = import.meta.env.VITE_ADMIN_URL



        axios.post(`${ADMIN_URL}/auth/login`, obj)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.msg === "Invalid Email or Password") {
                    setError("Invalid Email or Password")
                    setLoading(false);
                }
                if (finalData.status) {
                    setToken(finalData.token)
                    navigate("/deshboard")

                    window.location.reload();
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Registration error:", error)
                setLoading(false)
            })

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (validationErrors[e.target.name]) {
            setValidationErrors({ ...validationErrors, [e.target.name]: '' });
        }
    };
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">ContentCraft</h1>
                        <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-base text-gray-700"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            {validationErrors.email && <div className="text-red-500 text-xs mt-2">{validationErrors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-base text-gray-700"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            {validationErrors.password && <div className="text-red-500 text-xs mt-2">{validationErrors.password}</div>}
                        </div>

                        {error && <div className="text-red-600 bg-red-50 rounded-xl p-3 text-sm mb-4 font-medium">{error}</div>}

                        <button type="submit" className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 w-full mb-4 cursor-pointer 
                            ${loading ? 'opacity-70 pointer-events-none' : ''}`} disabled={loading}
                        >

                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Don't have an account?</p>
                        <Link to={'/register'}>
                            <button className="w-full px-6 py-3 border-2 border-blue-500 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-md cursor-pointer">
                                Create Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}