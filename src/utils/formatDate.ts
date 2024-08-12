interface FormatDateOptions {
    inputDate: string;
    relativeDuration?: boolean;
    fullDate?: boolean;
}

function formatDate({ inputDate, relativeDuration = false, fullDate = false }: FormatDateOptions): string {
    const currentDate = new Date();
    const dateToFormat = new Date(inputDate);

    const timeDifference = currentDate.getTime() - dateToFormat.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days <= 1 && relativeDuration) {
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (seconds < 60) {
            return `${seconds}s ago`;
        } else if (minutes < 60) {
            return `${minutes}m ago`;
        } else if (hours < 24) {
            return `${hours}h ago`;
        } else {
            return `${days}d ago`;
        }
    } else {
        const datePart = dateToFormat.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

        const timePart = fullDate ? dateToFormat.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }) : '';

        return fullDate ? `${datePart} ${timePart}` : datePart;
    }
}

export default formatDate;
