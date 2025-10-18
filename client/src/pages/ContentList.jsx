import { useContext } from "react";
import { dataContext } from "../context/MainContext";
import { Link } from "react-router";

export default function ContentList() {

    let { contentData } = useContext(dataContext)


    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Content</h2>
                    <p className="text-gray-600">Manage all your articles and drafts.</p>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="border-b px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800">All Articles ({contentData.length})</h3>
                            <Link to={'/content-creation'}>
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium cursor-pointer">
                                    + New Article
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            {contentData.map((items, index) => (
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

                    </div>
                </div>
            </div>
        </>
    );
};
