import { render } from '@testing-library/react';
import router from 'next/router';
import React from 'react';

import CreateNew from '@/components/CreateNew';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '/',
        };
    },
}));

describe('CreateNew', () => {
    it('should not show this link on the home page', () => {
        router.pathname = '/';
        const { queryByTestId } = render(<CreateNew />);
        const link = queryByTestId('create-new-link');
        expect(link).not.toBeInTheDocument();
    });
});
