import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import IsAuthenticated from '@/hooks/isAuthenticated';

import { userData } from '../../fixtures/users';

jest.mock('axios');

describe('IsAuthenticated', () => {
    it('fetches successfully data from an API and sets state', async () => {
        jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: { data: userData } });
        const { result, waitFor } = renderHook(() => IsAuthenticated());

        await act(async () => {
            await waitFor(() => result.current.isLoggedIn === true);
        });

        expect(result.current.isLoggedIn).toBe(true);
        expect(result.current.userData).toEqual(userData);
    });

    it('handles unsuccessful API response and sets isLoggedIn to false', async () => {
        jest.spyOn(axios, 'get').mockResolvedValue({ status: 401 });
        const { result, waitFor } = renderHook(() => IsAuthenticated());

        await act(async () => {
            await waitFor(() => result.current.isLoggedIn === false);
        });

        expect(result.current.isLoggedIn).toBe(false);
        expect(result.current.userData).toBe(null);
    });

    it('handles API error and sets isLoggedIn to false', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
        const { result, waitFor } = renderHook(() => IsAuthenticated());

        await act(async () => {
            await waitFor(() => result.current.isLoggedIn === false);
        });

        expect(result.current.isLoggedIn).toBe(false);
        expect(result.current.userData).toBe(null);
    });
});
