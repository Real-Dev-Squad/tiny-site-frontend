import { render } from '@testing-library/react';
import React from 'react';

import ProfileIcon from '@/components/ProfileIcon/ProfileIcon';

describe('ProfileIcon', () => {
    it('should have the correct initials', () => {
        const { container } = render(<ProfileIcon firstName="Sunny" lastName="Sahsi" />);
        expect(container).toHaveTextContent('SS');
    });

    it('should have the correct initials if no last name is provided', () => {
        const { container } = render(<ProfileIcon firstName="Sunny" />);
        expect(container).toHaveTextContent('S');
    });
});
