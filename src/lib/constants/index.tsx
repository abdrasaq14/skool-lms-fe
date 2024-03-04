import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineBell,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'Applications',
        label: 'Applications',
        path: '/dashboard/application',
        icon: <HiOutlineCube />
    },
    {
        key: 'Notifications',
        label: 'Notifications',
        path: '/dashboard/notifications',
        icon: <HiOutlineBell />
    },
    {
        key: 'messages',
        label: 'Messages',
        path: '/dashboard/messages',
        icon: <HiOutlineAnnotation />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/dashboard/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/dashboard/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
