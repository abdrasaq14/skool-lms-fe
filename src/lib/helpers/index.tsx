//This file contains helper functions that are used in the application, it formats the colors for the application status

export function getApplicationStatus(status: string) {
    switch (status) {
    
        case 'REJECTED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
                    {status.replace('_', ' ').toLowerCase()}
                </span>
            )
        case 'ACCEPTED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
                    {status.replace('_', ' ').toLowerCase()}
                </span>
            )
        case 'PENDING':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                    {status.replace('_', ' ').toLowerCase()}
                </span>
            )

    }
}
