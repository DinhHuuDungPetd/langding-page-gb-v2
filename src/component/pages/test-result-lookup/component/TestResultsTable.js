"use client";
import React from "react";

export default function TestResultsTable({ nhom_xet_nghiem }) {
    return (
        <div className="overflow-x-auto">
            {/* Table head */}
            <table className="min-w-full table-fixed text-sm border border-gray-200 shadow-md rounded-t-lg">
                <thead className="bg-primary text-white font-medium">
                    <tr>
                        <th className="p-2 w-1/6">Xét nghiệm</th>
                        <th className="p-2 w-1/6 text-center">Kết quả</th>
                        <th className="p-2 w-1/6 text-center">Đơn vị</th>
                        <th className="p-2 w-1/6 text-center">Giá trị tham chiếu</th>
                        <th className="p-2 w-1/6 text-center">Ghi chú</th>
                        {/* <th className="p-2 w-1/6 text-center">Máy / PP XN</th> */}
                    </tr>
                </thead>
            </table>

            {/* Scrollable body */}
            <div className="relative">
                {/* Ảnh nền chỉ áp dụng cho vùng bảng, không bị cuộn */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-[length:500px_500px]  opacity-10 pointer-events-none z-10"
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/dgfwxibj4/image/upload/v1747380669/backgroundPC/lilroenrmomopl3a8qsp.png')"
                    }}
                ></div>

                {/* Vùng có thể cuộn chứa bảng */}
                <div className="relative max-h-[80vh] overflow-x-auto z-10 mb-5">
                    <table className="min-w-full table-fixed text-sm">
                        <tbody>
                            {nhom_xet_nghiem?.length > 0 ? (
                                nhom_xet_nghiem.map((nhom, i) => (
                                    <React.Fragment key={i}>
                                        <tr className=" text-gray-800 underline font-bold">
                                            <td className="p-2" colSpan={6}>{nhom.name || "-"}</td>
                                        </tr>

                                        {nhom.xet_nghiem?.map((xn1, j) => {
                                            const highlightClass = ["Tăng", "Dương tính"].includes(xn1.ghi_chu)
                                                ? "text-red-600"
                                                : ["Nhỏ", "Giảm"].includes(xn1.ghi_chu)
                                                    ? "text-blue-600"
                                                    : "";

                                            return (
                                                <React.Fragment key={`xn1-${i}-${j}`}>
                                                    <tr className="border-t  text-gray-600">
                                                        <td className="p-2 w-1/6 font-bold">{xn1.ten_xet_nghiem || "-"}</td>
                                                        <td className={`p-2 w-1/6 text-center ${highlightClass}`}>
                                                            {xn1.ket_qua || "-"}
                                                        </td>
                                                        <td className="p-2 w-1/6 text-center">{xn1.don_vi || "-"}</td>
                                                        <td className="p-2 w-1/6 text-center">{xn1.khoang_tham_chieu || "-"}</td>
                                                        <td className="p-2 w-1/6 text-center">{xn1.ghi_chu || "-"}</td>
                                                        {/* <td className="p-2 w-1/6 text-center">{`${xn1.may_xn || ""} / ${xn1.phuong_phap_xn || ""}`.trim()}</td> */}
                                                    </tr>

                                                    {xn1.loai_xet_nghiem?.map((xn2, k) => {
                                                        // Xác định màu chữ dựa trên ghi_chu
                                                        const highlightClass = ["Tăng", "Dương tính"].includes(xn2.ghi_chu)
                                                            ? "text-red-600"
                                                            : ["Nhỏ", "Giảm"].includes(xn2.ghi_chu)
                                                                ? "text-blue-600"
                                                                : "";
                                                        { console.log(`"Dương tính" - ${xn2.ghi_chu}: ${xn2.ghi_chu === "Dương tính"}`) }
                                                        return (
                                                            <tr
                                                                key={`xn2-${i}-${j}-${k}`}
                                                                className="border-t  text-gray-600"
                                                            >
                                                                <td className="p-2 w-1/6">{xn2.ten_xet_nghiem || "-"}</td>
                                                                <td className={`p-2 w-1/6 text-center ${highlightClass}`}>
                                                                    {xn2.ket_qua || "-"}
                                                                </td>
                                                                <td className="p-2 w-1/6 text-center">{xn2.don_vi || "-"}</td>
                                                                <td className="p-2 w-1/6 text-center">{xn2.khoang_tham_chieu || "-"}</td>
                                                                <td className="p-2 w-1/6 text-center">{xn2.ghi_chu || "-"}</td>
                                                                {/* <td className="p-2 w-1/6 text-center">{`${xn2.may_xn || ""} / ${xn2.phuong_phap_xn || ""}`.trim()}</td> */}
                                                            </tr>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            )
                                        })}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-gray-500">
                                        Không có dữ liệu xét nghiệm.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>


    );
}
