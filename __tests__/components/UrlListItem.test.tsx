import { render, screen } from '@testing-library/react';

import UrlListItem from '@/components/Dashboard/UrlListItem';
import urlsData from '../../fixtures/urls';

describe('UrlListItem', () => {
    const url = urlsData.urls[0];
    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
    };
    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

    test('renders UrlListItem component', () => {
        render(
            <UrlListItem
                url={url}
                copyButtonHandler={() => {
                    copyButtonHandler(url.OriginalUrl);
                }}
            />
        );
        const linkElement = screen.getByText(`${url.OriginalUrl}`);
        expect(linkElement).toBeInTheDocument();
    });

    test('copy button works', () => {
        render(
            <UrlListItem
                url={url}
                copyButtonHandler={() => {
                    copyButtonHandler(url.OriginalUrl);
                }}
            />
        );
        const copyButton = screen.getByTestId('copy-button');
        copyButton.click();
        expect(mockWriteText).toHaveBeenCalledWith(url.OriginalUrl);
    });
});
