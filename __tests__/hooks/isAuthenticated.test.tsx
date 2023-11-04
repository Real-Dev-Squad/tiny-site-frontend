import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import IsAuthenticated from '@/hooks/isAuthenticated';

beforeAll(() => {
    fetchMock.enableMocks();
});

afterEach(() => {
    fetchMock.resetMocks();
});

it('should return isLoggedIn as true and userData if the request is successful', async () => {
    const userDataMock = {
        data: {
            Id: 1,
            Username: 'Sunny Sahsi',
            Email: 'sunnysahsi@gmail.com',
            Password: '',
            IsVerified: false,
            IsOnboarding: true,
            CreatedAt: '2023-11-04T10:02:26.582699Z',
            UpdatedAt: '2023-11-04T10:02:26.582699Z',
        },
        message: 'user fetched successfully',
    };

    fetchMock.mockResponseOnce(JSON.stringify(userDataMock), { status: 200 });
    const { result, waitForNextUpdate } = renderHook(() => IsAuthenticated());
    await waitForNextUpdate();
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.userData).toEqual(userDataMock.data);
});

it('should return isLoggedIn as false if the request is unsuccessful', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 401 });
    const { result } = renderHook(() => IsAuthenticated());
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.userData).toBeNull();
});