import { render, screen } from '@testing-library/react';

import UrlList from '@/components/Dashboard/UrlList';

import { urls } from '../../../__mocks__/db/urls';

describe('UrlList', () => {
    const copyButtonHandler = jest.fn();
    const urlList = urls.urls;
    test('renders UrlList component', () => {
        render(<UrlList urls={urlList} copyButtonHandler={() => copyButtonHandler} />);
        const yourUrlText = screen.getByText(/Your URLs/i);
        expect(yourUrlText).toBeInTheDocument();
        const urlListItem = screen.getByText(urlList[0].originalUrl);
        expect(urlListItem).toBeInTheDocument();
    });
});
