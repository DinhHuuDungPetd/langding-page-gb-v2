import Image from 'next/image';

export default function ServiceContent({ content }) {
    return (
        <div className="page relative mt-8">
            <div className="container mx-auto flex flex-row items-center relative z-10 ">
                <div className="w-1/3 flex h-[500px] justify-center mr-10 border-1 border-primary rounded-tr-[200px] relative">
                    <div className="absolute w-full bottom-8 left-8 h-[500px] rounded-tr-[200px] bg-green-100 flex justify-center items-center overflow-hidden">
                        <Image
                            src={content.image}
                            alt="Image"
                            fill // Thay thế object-cover, làm hình ảnh phủ kín container
                            className="object-cover" // Đảm bảo hình ảnh giữ tỷ lệ
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <div className="text-left">
                        <h2 className="text-primary text-xl md:text-2xl font-bold whitespace-nowrap uppercase tracking-wide">
                            {content.name}
                        </h2>
                        <p className="mt-2  text-md font-medium text-justify text-black">
                            {content.description}
                        </p>
                        <ul className="mt-4 text-left text-black space-y-2 ">
                            {content.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-md font-medium">
                                    <span className="w-5 h-5 mr-2 rounded-full bg-primary flex items-center justify-center text-white">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
