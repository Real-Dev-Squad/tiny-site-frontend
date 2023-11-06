export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    testId?: string;
}
