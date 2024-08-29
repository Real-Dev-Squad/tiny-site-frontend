import MockDate from 'mockdate';

import formatDate from '../../src/utils/formatDate';

beforeEach(() => {
    MockDate.set('2021-08-09T18:00:00.000Z');
});

afterEach(() => {
    MockDate.reset();
});

describe('formatDate', () => {
    it('should return 0s ago', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:59:59.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1s ago');
    });

    it('should return 1m ago', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:58:59.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1m ago');
    });

    it('should return 1h ago', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:00:00.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1h ago');
    });

    it('should return 1d ago', () => {
        const result = formatDate({
            inputDate: '2021-08-08T18:00:00.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1d ago');
    });

    it('should return 5 August 2021', () => {
        const result = formatDate({
            inputDate: '2021-08-05T00:00:00.000Z',
            relativeDuration: false,
            fullDate: false,
        });
        expect(result).toEqual('05 August 2021');
    });

    it('should return full date and time', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:59:59.000Z',
            relativeDuration: false,
            fullDate: true,
        });

        const expectedDate = new Date('2021-08-09T17:59:59.000Z');
        const expectedFormattedDate = `${expectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })} ${expectedDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })}`;

        expect(result).toEqual(expectedFormattedDate);
    });
});
