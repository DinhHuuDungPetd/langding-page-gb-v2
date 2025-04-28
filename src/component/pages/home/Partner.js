import PartnerSlider from "@/component/pages/home/component/PartnerSlider";

export default function PartnerComponent() {
    return (
        <section className="container mx-auto py-8">

            <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                </div>
                <h2 className="text-primary text-xl md:text-2xl font-bold whitespace-nowrap uppercase">
                    Đối tác của chúng tôi
                </h2>
                <div className="flex items-center gap-1">
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                    <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                </div>
            </div>
            <PartnerSlider />
        </section>
    )
}