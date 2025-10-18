import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import SideBar from './SideBar'

export default function Common() {
    return (
        <>
            <div className='flex'>
                <SideBar />
                <div className="w-full bg-[#F1F1F1] h-[100vh] overflow-y-scroll  relative">
                    <Header />
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
