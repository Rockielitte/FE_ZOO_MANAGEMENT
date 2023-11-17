// @flow
import * as React from 'react';
import { useAuthorizationHeader } from '../authHeader';
import { get } from '../apiCaller';
import axios from 'axios';

export const Food = {
    getById: async (id?: string) => {
        const endpoint = `/foods/${id}`
        const test = useAuthorizationHeader()
        try {
            const response = await get(endpoint, {}, test.headers)

            return response.data
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },
};