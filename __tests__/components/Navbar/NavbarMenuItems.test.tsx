import { render } from '@testing-library/react';
import React from 'react';

import NavbarMenuItems from '@/components/Navbar/NavbarMenuItems';

describe('NavbarMenuItems', () => {
    it('should render', () => {
        const { container } = render(<NavbarMenuItems menuOpen={true} />);
        expect(container).toContainHTML('Create New');
        expect(container).toContainHTML('Dashboard');
        expect(container).toContainHTML('Sign Out');
    });
});
