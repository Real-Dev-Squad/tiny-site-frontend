export interface ToastType {
    message: string;
    isVisible?: boolean;
    timeToShow?: number;
    onDismiss: () => void;
    type?: 'success' | 'error' | 'info';
}
