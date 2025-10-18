import React, { useContext, useEffect } from 'react'
import { dataContext } from '../context/MainContext'
import { Link } from 'react-router'

export default function Deshboard() {

    let { userData, contentData } = useContext(dataContext)

    return (
        <>
            <div className="p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">
                        Welcome back, {userData.name}!
                    </h2>
                    <p className="text-blue-600">
                        Here's what's happening with your content today.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-center">
                        <div className="text-3xl font-bold text-blue-700">{contentData.length}</div>
                        <div className="text-gray-500 mt-2">Total Articles</div>
                    </div>
                    <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-center">
                        <div className="text-3xl font-bold text-green-700">{contentData.length}</div>
                        <div className="text-gray-500 mt-2">Published</div>
                    </div>
                    <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-center">
                        <div className="text-3xl font-bold text-yellow-500">0</div>
                        <div className="text-gray-500 mt-2">Drafts</div>
                    </div>
                    <div className="rounded-xl bg-white shadow-md p-6 flex flex-col items-center">
                        <div className="text-3xl font-bold text-indigo-700">{contentData.length}</div>
                        <div className="text-gray-500 mt-2">Total in Platform</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md mb-8">
                    <div className="border-b px-6 py-4">
                        <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                    </div>
                    <div className="px-6 py-4">
                        {contentData.length > 0 ? (
                            <div className="space-y-4">
                                {contentData.slice(0, 2).map((items, index) => (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {items.title}
                                                </h4>
                                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                                    <span>{items.category}</span>
                                                    <span>•</span>
                                                    <span>{new Date(items.date).toLocaleDateString()}</span>
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                                        Published
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm">
                                                    {items.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-blue-600 mb-4">
                                    You haven't created any content yet.
                                </p>
                                <Link to={'/content-creation'}>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200">
                                        Create Your First Article
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}
