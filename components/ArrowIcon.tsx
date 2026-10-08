interface ArrowIconProps {
    className?: string;
}

// ↘ arrow used by every button and "Learn more" link.
function ArrowIcon({ className }: ArrowIconProps) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 5v7.5H5" />
        </svg>
    );
}

export default ArrowIcon;
