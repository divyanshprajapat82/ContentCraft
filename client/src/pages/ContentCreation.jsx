import axios from "axios";
import { useContext, useState } from "react";
import { dataContext } from "../context/MainContext";

export default function ContentCreation() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: ''
    });
    let { token } = useContext(dataContext)
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.title || !formData.category || !formData.content) {
            alert('Please fill in all fields');
            return;
        }

        let obj = {
            title: formData.title,
            category: formData.category,
            content: formData.content
        }
        setSaving(true)

        let ADMIN_URL = import.meta.env.VITE_ADMIN_URL

        axios.post(`${ADMIN_URL}/content/add`, obj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                setSaving(false)
                setFormData({
                    title: '',
                    category: '',
                    content: ''
                })
            })
            .catch((error) => {
                console.error("Registration error:", error)
                setSaving(false)
            })

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-black mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Content
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 font-medium">
                        Share your knowledge with the world.
                    </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6 md:mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    📝 Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg font-medium placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none hover:border-gray-300"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your amazing article title..."
                                />
                            </div>

                            <div className="mb-6 md:mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    🏷️ Category
                                </label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none hover:border-gray-300 cursor-pointer"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-gray-400">Select a category</option>
                                    <option value="technology">🚀 Technology</option>
                                    <option value="business">💼 Business</option>
                                    <option value="design">🎨 Design</option>
                                    <option value="lifestyle">✨ Lifestyle</option>
                                    <option value="education">📚 Education</option>
                                    <option value="health">🏃 Health</option>
                                </select>
                            </div>

                            <div className="mb-8 md:mb-10">
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    📄 Content
                                </label>
                                <textarea
                                    name="content"
                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base leading-relaxed placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none hover:border-gray-300 resize-none"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    placeholder="Start writing your amazing content here... Share your thoughts, ideas, and expertise with the world!"
                                    rows="8"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">

                                <button
                                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center cursor-pointer"
                                    disabled={saving}
                                >
                                    <span className="mr-2">🚀</span>
                                    {saving ? 'Publishing...' : 'Publish'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>


    );
};
