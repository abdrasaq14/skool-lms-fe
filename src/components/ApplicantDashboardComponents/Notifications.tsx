import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const NotificationsData = [
    {
        id: '3433',
        company_name: 'Google',
        notification_thumbnail: 'https://source.unsplash.com/100x100?macbook',
        notification_status: 'Accepted'
    },
    {
        id: '3432',
        company_name: 'Decagon',
        notification_thumbnail: 'https://source.unsplash.com/100x100?macbook',
        notification_status: 'Rejected'
    }
]

function Notifications() {
    return (
        <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
            <strong className="text-gray-700 font-medium"> Notifications </strong>
            <div className="mt-4 flex flex-col gap-3">
                {NotificationsData.map((notification) => (
                    <Link
                        key={notification.id}
                        to={`/product/${notification.id}`}
                        className="flex items-start hover:no-underline"
                    >
                        <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                            <img
                                className="w-full h-full object-cover rounded-sm"
                                src={notification.notification_thumbnail}
                                alt={notification.company_name}
                            />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm text-gray-800  ">
                                {notification.company_name}
                                {notification.notification_status === 'Rejected' ? 'Rejected' : 'Accepted'} Your
                                Application
                            </p>
                            <span
                                className={classNames(
                                    notification.notification_status === 'Rejected' ? 'text-red-500' : 'text-green-500'
                                )}
                            ></span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Notifications
