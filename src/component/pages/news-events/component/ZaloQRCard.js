
import Image from 'next/image';
import { BsQrCodeScan } from 'react-icons/bs';
const ZaloQRCard = () => {
    return (
        <div className="bg-gradient-to-t from-midnight to-green-700 rounded-3xl shadow-lg p-6 m-auto flex flex-col items-center text-center">
            <div className="bg-white rounded-3xl shadow-lg p-6 max-w-sm mx-auto flex flex-col items-center text-center m-5">
                <div className="relative w-13 h-13 mb-2">
                    <Image
                        src="/images/logo/Green-Lab-Logo-01.png"
                        alt="Green Lab Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800">Green Lab</h2>
                <p className="text-gray-500 mb-4">Tài khoản OA</p>

                {/* QR Code Image */}
                <div className="relative w-50 h-50 mb-4">
                    <Image
                        src="https://res.cloudinary.com/dgfwxibj4/image/upload/v1760589199/7fa35118-0129-42a6-8dec-c3a915f18abd.png"
                        alt="Zalo OA QR Code"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Instruction Text */}
                <p className="text-sm text-gray-600 px-4">
                    Mở Zalo bấm nút quét QR{' '}
                    <span className="inline-block align-middle font-bold text-lg"><BsQrCodeScan /></span>{' '}
                    để quét quan tâm
                </p>
            </div>
        </div>
    );
};

export default ZaloQRCard;