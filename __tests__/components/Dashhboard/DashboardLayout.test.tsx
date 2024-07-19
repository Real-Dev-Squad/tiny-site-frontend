import { render, screen } from '@testing-library/react';

import { DashboardLayout } from '@/components/Dashboard/dashboard-layout';

describe('DashboardLayout', () => {
    test('renders DashboardLayout with children', () => {
        render(
            <DashboardLayout remainingUrls={10}>
                <div>Test Child Component</div>
            </DashboardLayout>
        );
        expect(screen.getByText('Your URLs')).toBeInTheDocument();
        expect(screen.getByText('Remaining: 10 / 50')).toBeInTheDocument();
        expect(screen.getByText('Test Child Component')).toBeInTheDocument();
    });

    test('renders DashboardLayout without remainingUrls', () => {
        render(
            <DashboardLayout>
                <div>Test Child Component</div>
            </DashboardLayout>
        );
        expect(screen.getByText('Your URLs')).toBeInTheDocument();
        expect(screen.queryByText(/Remaining:/)).toBeNull();
        expect(screen.getByText('Test Child Component')).toBeInTheDocument();
    });

    test('renders DashboardLayout with maximum URLs', () => {
        render(
            <DashboardLayout remainingUrls={50}>
                <div>Test Child Component</div>
            </DashboardLayout>
        );
        expect(screen.getByText('Your URLs')).toBeInTheDocument();
        expect(screen.getByText('Remaining: 50 / 50')).toBeInTheDocument();
        expect(screen.getByText('Test Child Component')).toBeInTheDocument();
    });
});
