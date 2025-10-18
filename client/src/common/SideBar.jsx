import React, { useState } from 'react'
import { FaBars, FaCog, FaHome, FaNewspaper, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoCreate } from 'react-icons/io5';
import { Link } from 'react-router';

export default function SideBar() {

    const [open, setOpen] = useState(true);
    
    return (
        <>
            <div
                className={`${open ? "md:w-84" : "w-16"
                    } w-16 bg-white-800 text-gray-800 min-h-screen p-4 pt-8 relative duration-300`}
            >

                <div className="flex items-center gap-5">

                    <FaBars
                        className=" ml-2 text-2xl cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />

                </div>

                <ul className="grid space-y-3 mt-7">

                    <Link to={'/deshboard'}>
                        <li
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-xl"><FaHome /></span>
                            {open && <span className="md:block hidden text-base font-medium">Dashboard</span>}
                        </li>
                    </Link>
                    <Link to={'/content-creation'}>
                        <li
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-xl"><IoCreate /></span>
                            {open && <span className="md:block hidden text-base font-medium">Create Content</span>}
                        </li>
                    </Link>
                    <Link to={'/content-list'}>
                        <li
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-xl"><FaNewspaper /></span>
                            {open && <span className="md:block hidden text-base font-medium">My Contents</span>}
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    )
}
