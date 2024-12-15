import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <h1>Page Not Found</h1>
            <p>
                Is something missing? Let us know by <Link href="https://github.com/rerobots/docs/issues">opening an issue</Link>.
            </p>
        </>
    );
}
