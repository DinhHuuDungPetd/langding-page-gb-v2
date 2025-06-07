"use client";
import React, { useState, useEffect } from 'react';
import SampleLookup from "@/component/pages/test-result-lookup/component/SampleLookup";
import { jwtDecode } from "jwt-decode";

export default function Account() {

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

                if (username) {
                    window.location.href = `/tra-cuu/${username}`;
                } else {
                    console.error("Không tìm thấy username trong token.");
                }
            } catch (error) {
                console.error("Lỗi khi decode token:", error);
            }
        }
    }, []);

    return (
        <div>
            <div className="relative w-full h-[200px] bg-[rgba(57,139,64,0.81)] bg-no-repeat bg-cover bg-[url(https://res.cloudinary.com/dgfwxibj4/image/upload/v1747017782/backgroundMobile/pke1f6szmkkdbfxcbu5j.jpg)] md:bg-[url(https://res.cloudinary.com/ddnasugap/image/upload/q_auto,f_auto/v1745825600/greenlab/leuogprx3ixjglmgc3vd.webp)]  bg-blend-multiply">
                <div className="absolute bottom-4 left-5 md:left-10 lg:left-20  text-white text-md medium-italic z-9">
                    Trang chủ &gt; <span className="font-normal">Kết quả xét nghiệm</span>
                </div>
            </div>
            <SampleLookup />
        </div>
    );
}
