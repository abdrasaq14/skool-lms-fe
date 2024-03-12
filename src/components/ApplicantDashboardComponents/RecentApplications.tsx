import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'

interface UserDetails{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string

}

interface CourseDetails{
    id: number,
    courseSearch: string,
    courseType: string,
    courseDuration: string,
    createdAt: string,
    updatedAt: string

}



export default function RecentApplications() {

    const [ userDetails, setUserDetails ] = useState<UserDetails | null>(null)
    const [ courseDetails, setCourseDetails] = useState<CourseDetails | null>(null)
    const [ applicationDetails, setApplicationDetails] = useState({})


    useEffect(() => {

        const fetchUserDetails = async () => {

        try {
            const res = await axiosInstance.get("/users/dashboard")
            console.log(res.data)

            if(res.data.userDetails || res.data.applicationDetails || res.data.courseDetails){
                setUserDetails(res.data.userDetails)
                setCourseDetails(res.data.courseDetails)
                setApplicationDetails(res.data.applicationDetails)
            }
            
        } catch (error) {
            
        }
    }

    fetchUserDetails()


    }, [])




    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Application</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                         
                            <th>Program</th>
                            <th>Course</th>
                            <th>Application Date</th>
                            <th>Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             courseDetails && (
                                <tr className=' text-gray-500'>
                                    <td>
                                        <Link to={`#`}>{courseDetails.courseType}</Link>
                                    </td>
                                    <td>
                                        <Link to={`#`}>{courseDetails.courseSearch}</Link>
                                    </td>
                                    <td>
                                    <Link to={`#`}>{format(new Date(), 'dd MMM yyyy')}</Link>
                                    </td>
                                    <td>
                                    <Link to={`#`}>
                                        pending
                                    </Link>
                                        </td>
                                </tr>
                            )
                        }
                        {/* {ApplicationData.map((application) => ( */}
                            
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
