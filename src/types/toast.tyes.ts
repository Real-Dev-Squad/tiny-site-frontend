export interface ToastType {
    id: number;
    message: string;
    isVisible?: boolean;
    timeToShow?: number;
    onDismiss: () => void;
    type?: 'success' | 'error' | 'info';
}
