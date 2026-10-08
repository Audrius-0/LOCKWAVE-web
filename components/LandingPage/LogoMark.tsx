interface LogoMarkProps {
    className?: string;
}

// Same drawing as public/logo.svg, but inline and in currentColor so it follows the theme.
function LogoMark({ className }: LogoMarkProps) {
    return (
        <svg className={className} viewBox="0 0 512 380" fill="currentColor" aria-hidden="true">
            <path d="m256.07 85.64 88.64 117.58-88.64 117.58-88.64-117.58z" fill="none" stroke="currentColor" strokeWidth="14.74" />
            <path d="M167.43 203.22 78.79 85.64l-59.09 117.58 59.09 117.58z" fill="none" stroke="currentColor" strokeWidth="14.74" strokeDasharray="25 25" />
            <path d="m344.71 203.22 88.64-117.58 59.09 117.58-59.09 117.58z" fill="none" stroke="currentColor" strokeWidth="14.74" strokeDasharray="25 25" />
            <ellipse cx="256.07" cy="85.64" rx="19.7" ry="19.6" />
            <ellipse cx="344.71" cy="203.22" rx="19.7" ry="19.6" />
            <ellipse cx="256.07" cy="320.81" rx="19.7" ry="19.6" />
            <ellipse cx="167.43" cy="203.22" rx="19.7" ry="19.6" />
            <ellipse cx="78.79" cy="85.64" rx="19.7" ry="19.6" />
            <ellipse cx="19.7" cy="203.22" rx="19.7" ry="19.6" />
            <ellipse cx="78.79" cy="320.81" rx="19.7" ry="19.6" />
            <ellipse cx="433.35" cy="85.64" rx="19.7" ry="19.6" />
            <ellipse cx="492.45" cy="203.22" rx="19.7" ry="19.6" />
            <ellipse cx="433.35" cy="320.81" rx="19.7" ry="19.6" />
            <rect x="157.58" y="26.85" width="9.85" height="88.19" rx="4.92" />
            <rect x="157.58" y="271.81" width="9.85" height="88.19" rx="4.92" />
            <rect x="334.86" y="26.85" width="9.85" height="88.19" rx="4.92" />
            <rect x="334.86" y="271.81" width="9.85" height="88.19" rx="4.92" />
        </svg>
    );
}

export default LogoMark;
