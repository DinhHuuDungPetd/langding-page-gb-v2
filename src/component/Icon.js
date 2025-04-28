// src/components/Icon.jsx
import Image from "next/image";

export default function Icon({ src, alt, size = 48 }) {
    return (
        <Image
            src={`/icons/${src}`} // Đường dẫn đến file trong thư mục public/icons/
            alt={alt}
            width={size}
            height={size}
            className="object-contain"
        />
    );
}