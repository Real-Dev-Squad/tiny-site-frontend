import { render, screen } from '@testing-library/react';

import UrlListItem from '@/components/Dashboard/UrlListItem';

import { urls } from '../../../__mocks__/db/urls';

describe('UrlListItem', () => {
    const url = urls.urls[0];
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
                    copyButtonHandler(url.originalUrl);
                }}
            />
        );
        const linkElement = screen.getByText(`${url.originalUrl}`);
        expect(linkElement).toBeInTheDocument();
    });

    test('copy button works', () => {
        render(
            <UrlListItem
                url={url}
                copyButtonHandler={() => {
                    copyButtonHandler(url.originalUrl);
                }}
            />
        );
        const copyButton = screen.getByTestId('copy-button');
        copyButton.click();
        expect(mockWriteText).toHaveBeenCalledWith(url.originalUrl);
    });
});
