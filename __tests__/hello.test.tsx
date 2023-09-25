import React from 'react';
import { render } from '@testing-library/react';
import { Hello } from '../src/app/hello';

describe('Hello', () => {
    it('should render', () => {
        const { container } = render(<Hello />);
        expect(container).toHaveTextContent('Hello');
    });
});
