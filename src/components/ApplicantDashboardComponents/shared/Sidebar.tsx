import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import decagonLogo from '/images/decagon-logo.png'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../../lib/constants' //The dashboard sidebar links are imported from the constants file

const linkClass =
    'flex items-center gap-4 px-3 py-2 hover:bg-emerald-300 hover:text-white hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
        <div className="bg-white  w-60 p-3 flex flex-col">
            <div className="flex items-center gap-2 px-1 py-3">
                <img src={decagonLogo} />
            </div>

            <div className="text-stone-950 pl-3 mt-2 text-lg"> Applicant Dashboard</div>
            <div className="py-8 flex flex-1 flex-col z-10 gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>

            <div className="flex flex-col text-stone-950 gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

//declaring types for the link props
type LinkProps = {
    path: string
    icon: React.ReactNode
    label: string
}

// This function control the linking on the dashboard sidebar
function SidebarLink({ link }: { link: LinkProps }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}
