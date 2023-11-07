import React from 'react';
import { render } from '@testing-library/react';
import ProfileIcon from '@/components/ProfileIcon/ProfileIcon';

describe('ProfileIcon', () => {
    it('should have the correct initials', () => {
        const { container } = render(<ProfileIcon firstName="Sunny" lastName="Sahsi" size={50} />);
        expect(container).toHaveTextContent('SS');
    });
});
