export default function AnimatedButton({ text = 'Click me', href = '#', className = '' }) {
    return (
        <div className="block w-fit pt-2">
            <a href={href} className={`btn text-white text-xs font-medium rounded px-2 py-1 bg-primary  btn-white btn-animated ${className}`}>
                {text}
            </a>
        </div>
    );
}