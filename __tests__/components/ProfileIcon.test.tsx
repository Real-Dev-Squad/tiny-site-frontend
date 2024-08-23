import { render } from '@testing-library/react';
import React from 'react';

import ProfileIcon from '@/components/ProfileIcon/ProfileIcon';

describe('ProfileIcon', () => {
    it('should have the correct initials', () => {
        const { container } = render(<ProfileIcon firstName="Ankush" lastName="Dharkar" />);
        expect(container).toHaveTextContent('AD');
    });

    it('should have the correct initials if no last name is provided', () => {
        const { container } = render(<ProfileIcon firstName="Ankush" />);
        expect(container).toHaveTextContent('A');
    });
});
