import React from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Navbar', () => {
    it('should render', () => {
        const { container } = render(<Navbar />);
        expect(container).toHaveTextContent('URL Shortener');
        expect(container.querySelector('a')).toHaveAttribute('href', '#');
    });

    it('should have dropdown menu', () => {
        const { container } = render(<Navbar />);
        expect(container.querySelector('ul')).toHaveTextContent('Profile');
        expect(container.querySelector('ul')).toHaveTextContent('Dashboard');
        expect(container.querySelector('ul')).toHaveTextContent('Settings');
    });

    it.skip('should toggle menu', () => {
        const { container } = render(<Navbar />);
        const button = container.querySelector('button');
        expect(button).toHaveTextContent('Sunny');
        button?.click();
        expect(container.querySelector('ul')).toHaveClass('lg:flex space-x-4');
    });
});
