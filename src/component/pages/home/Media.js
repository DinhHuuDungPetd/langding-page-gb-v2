import MediaSlider from "@/component/pages/home/component/MediaSlider";

export default function MediaComponent (){
    return(
        <section className="container mx-auto pt-8">

            <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                </div>
                <h2 className="text-primary text-xl md:text-2xl font-bold whitespace-nowrap uppercase">
                    Báo chí nói gì về Green Lab
                </h2>
                <div className="flex items-center gap-1">
                    <span className="w-16 h-[2px] bg-[#36803E]"></span>
                    <span className="w-2 h-2 bg-[#36803E] rounded-full"></span>
                </div>
            </div>
            <MediaSlider/>
        </section>
    )
}