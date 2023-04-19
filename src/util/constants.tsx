export const default_timeout = 10000

export const API_RESPONSE_TYPE = {
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
}

export const INVALID_TOKEN = "Unauthorized"

export const USER_AUTHENTICATION_PATHS = [
    '/',
    '/user/sign-up',
    '/user/reset-password',
]

export const LOGIN_PATHS = {
    admin: '/admin/sign-in',
    user: '/',
}

export const USER_PATHS = [
    '/user/dashboard',
]

export const ADMIN_PATHS = [
    '/admin/dashboard',
    '/admin/users',
]

export const PAGE_NOT_FOUND_PATH = '/404'
