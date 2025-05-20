"use client";
import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
const buttons = [
    { icon: <FaPhoneVolume size={28} />, color: "bg-red-500", label: "Gọi 1", href: "tel:1900636588" },
    { icon: <FaPhone size={28} />, color: "bg-red-500", label: "Gọi 2", href: "tel:+84912615997" },
    { icon: <FaFacebook size={28} />, color: "bg-blue-600", label: "Facebook", href: "https://www.facebook.com/greenlab.real" },
    { icon: <SiZalo size={28} />, color: "bg-blue-500", label: "Zalo", href: "https://zalo.me/0912615997" },
];

const ContactButton = memo(({ button, index, isVisible }) => (
    <motion.a
        href={button.href}
        key={button.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: index * 0.05 }}
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${button.color} shadow-lg`}
        title={button.label}
        aria-label={button.label}
    >
        {button.icon}
    </motion.a>
));

ContactButton.displayName = 'ContactButton';

const ContactFloatingButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed right-4 bottom-6 flex flex-col items-center gap-3 z-50">
            <AnimatePresence>
                {open && buttons.map((btn, index) => (
                    <ContactButton
                        key={btn.label}
                        button={btn}
                        index={index}
                        isVisible={open}
                    />
                ))}
            </AnimatePresence>

            <motion.button
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.95 }}
                className={`${open ? "" : "btn btn-white"} w-16 h-16 rounded-full bg-central text-white flex items-center justify-center`}
                aria-label={open ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
                aria-expanded={open}
            >
                {open ? <FiX size={30} /> : <FiMessageCircle size={30} />}
            </motion.button>
        </div>
    );
};

export default memo(ContactFloatingButton);
