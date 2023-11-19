import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import IsAuthenticated from '@/hooks/isAuthenticated';

import { userData } from '../../fixtures/users';

jest.mock('axios');

jest.mock('axios');

describe('IsAuthenticated', () => {
    it('fetches successfully data from an API', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { data: userData } });
        const { result, waitForNextUpdate } = renderHook(() => IsAuthenticated());
        await waitForNextUpdate();
        expect(result.current.isLoggedIn).toBe(true);
        expect(result.current.userData).toEqual(userData);
    });
});
