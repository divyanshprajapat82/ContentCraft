import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Register() {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    let navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';

        let obj = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        let ADMIN_URL = import.meta.env.VITE_ADMIN_URL


        if (formData.password == formData.confirmPassword) {
            setLoading(true)
            axios.post(`${ADMIN_URL}/auth/register`, obj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.msg === "Email is aleardy exist") {
                        setValidationErrors({ email: "Email already exists" });
                        setLoading(false);
                        return;
                    }
                    if (finalData.status) {
                        navigate("/")
                    }
                    setLoading(false);

                })
                .catch((error) => {
                    console.error("Registration error:", error)
                    setLoading(false)
                })
        } else {
            errors.confirmPassword = 'Passwords do not match';
            setLoading(false)
        }

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
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">Join ContentCraft</h1>
                        <p className="text-gray-600">Create your account to start creating amazing content.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none text-base text-gray-700"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                            {validationErrors.name && <div className="text-red-500 text-xs mt-2">{validationErrors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none text-base text-gray-700"
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
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none text-base text-gray-700"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                            />
                            {validationErrors.password && <div className="text-red-500 text-xs mt-2">{validationErrors.password}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-800">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none text-base text-gray-700"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                            />
                            {validationErrors.confirmPassword && <div className="text-red-500 text-xs mt-2">{validationErrors.confirmPassword}</div>}
                        </div>


                        <button type="submit" className={`px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 w-full mb-4 cursor-pointer ${loading ? 'opacity-70 pointer-events-none' : ''}`} disabled={loading}
                        >

                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Already have an account?</p>
                        <Link to={'/'}>
                            <button className="w-full px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-all duration-200 hover:shadow-md cursor-pointer">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
