"use client";
import { useEffect, useState } from "react";
import SampleLookup from "@/component/pages/test-result-lookup/component/SampleLookup";
import LabResultSearchPage from "@/component/pages/test-result-lookup/LabResultSearchPage";

export default function Account() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setAccessToken(token);
    }, []);

    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017782/backgroundMobile/pke1f6szmkkdbfxcbu5j.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825600/greenlab/leuogprx3ixjglmgc3vd.webp)]  bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20  text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Kết quả xét nghiệm</span>
                </div>
            </div>
            {accessToken ? <LabResultSearchPage /> : <SampleLookup />}
        </div>
    );
}
