import Footer from '@/components/Footer/';
import { render } from '@testing-library/react';

describe('Footer', () => {
    it('should render', () => {
        const { container } = render(<Footer />);
        expect(container).toHaveTextContent('The contents of this website are deployed from this open sourced repo');
    });

    it('should have a link to the repo', () => {
        const { container } = render(<Footer />);
        expect(container.querySelector('a')).toHaveAttribute(
            'href',
            'https://github.com/Real-Dev-Squad/tiny-site-frontend'
        );
    });

    it('should have a link to the repo', () => {
        const { container } = render(<Footer />);
        expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
    });
});
