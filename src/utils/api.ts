import {isServer, QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...(!isServer && { staleTime: 1000 * 60 }),
            retry: 1,
        },
    },
})
export const apiRoutes = {
    GET_USERS: 'http://localhost:3001/users',
    LOGIN: 'http://localhost:3001/users/login/'
}