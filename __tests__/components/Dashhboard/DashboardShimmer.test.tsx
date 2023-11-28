import { render, screen } from '@testing-library/react';

import DashboardShimmer from '@/components/ShimmerEffect/DashboardShimmer';

describe('DashboardShimmer', () => {
    test('should render DashboardShimmer component', () => {
        render(<DashboardShimmer />);

        const dashboardShimmer = screen.getByTestId('dashboard-shimmer');
        expect(dashboardShimmer).toBeInTheDocument();
    });
});
