import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useToast from '@/hooks/useToast';

describe('useToast', () => {
    test('should add and dismiss a toast', () => {
        const { result } = renderHook(() => useToast());
        act(() => {
            result.current.showToast('Toast Message', 3000, 'success');
        });
        expect(result.current.toasts).toHaveLength(1);
        act(() => {
            result.current.toasts[0].onDismiss();
        });
        expect(result.current.toasts).toHaveLength(0);
    });
});
