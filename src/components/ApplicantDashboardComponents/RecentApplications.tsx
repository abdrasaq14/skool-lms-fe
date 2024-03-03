import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getApplicationStatus } from '../../lib/helpers'

const ApplicationData = [
    {
        id: '4',
        company_id: '5624',
        applicant_id: '97652',
        company_name: 'Maxer Technologies1',
        application_date: '2022-05-14T05:24:00',
        application_status: 'APPLIED',
        company_address: 'Orchid Road, Lekki'
    },
    {
        id: '3',
        company_id: '5627',
        applicant_id: '97632',
        company_name: 'Maxer Technologies',
        application_date: '2022-05-14T05:24:00',
        application_status: 'REJECTED',
        company_address: 'Orchid Road, Lekki'
    },
    {
        id: '10',
        company_id: '5627',
        applicant_id: '97632',
        company_name: 'Maxer Technologies',
        application_date: '2022-05-14T05:24:00',
        application_status: 'ACCEPTED',
        company_address: 'Orchid Road, Lekki'
    },
    {
        id: '6',
        company_id: '5627',
        applicant_id: '97632',
        company_name: 'Maxer Technologies',
        application_date: '2022-05-14T05:24:00',
        application_status: 'DELIVERED',
        company_address: 'Orchid Road, Lekki'
    },
    {
        id: '9',
        company_id: '5627',
        applicant_id: '97632',
        company_name: 'Maxer Technologies',
        application_date: '2022-05-14T05:24:00',
        application_status: 'PENDING',
        company_address: 'Orchid Road, Lekki'
    },
    {
        id: '7',
        company_id: '5627',
        applicant_id: '97632',
        company_name: 'Maxer Technologies',
        application_date: '2022-05-14T05:24:00',
        application_status: 'ACCEPTED',
        company_address: 'Orchid Road, Lekki'
    }
]

export default function RecentApplications() {
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company ID</th>
                            <th>Company Name</th>
                            <th>Application Date</th>
                            <th>Company Address</th>
                            <th>Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ApplicationData.map((application) => (
                            <tr key={application.id}>
                                <td>
                                    <Link to={`/order/${application.id}`}>#{application.id}</Link>
                                </td>
                                <td>
                                    <Link to={`/product/${application.company_id}`}>#{application.company_id}</Link>
                                </td>
                                <td>
                                    <Link to={`/company/${application.company_id}`}>{application.company_name}</Link>
                                </td>
                                <td>{format(new Date(application.application_date), 'dd MMM yyyy')}</td>

                                <td>{application.company_address}</td>
                                <td>{getApplicationStatus(application.application_status ?? '')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
