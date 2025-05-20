"use client";
import React from 'react';

export default function ListResultsTableMobile({ nhom_xet_nghiem }) {
    return (
        <div className="mt-3 border-t pt-2 max-h-[500px] overflow-auto">
            <div className="font-semibold mb-2 text-lg">Xét nghiệm</div>
            {nhom_xet_nghiem?.length > 0 ? (
                nhom_xet_nghiem.map((nhom, i) => (
                    <div key={i} className="mb-4">
                        <div className="text-base font-bold text-blue-800 underline mb-2">{nhom.name || "-"}</div>

                        {nhom.xet_nghiem?.map((xn1, j) => {
                            const highlightClass = ["Tăng", "Dương tính"].includes(xn1.ghi_chu)
                                ? "text-red-600"
                                : ["Nhỏ", "Giảm"].includes(xn1.ghi_chu)
                                    ? "text-blue-600"
                                    : "";

                            return (
                                <div key={`xn1-${i}-${j}`} className="bg-white border rounded-lg shadow-sm p-3 mb-3">
                                    <div className="font-semibold text-gray-800">{xn1.ten_xet_nghiem || "-"}</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        <div><strong>Kết quả:</strong> <span className={highlightClass}>{xn1.ket_qua || "-"}</span></div>
                                        <div><strong>Đơn vị:</strong> {xn1.don_vi || "-"}</div>
                                        <div><strong>Khoảng tham chiếu:</strong> {xn1.khoang_tham_chieu || "-"}</div>
                                        <div><strong>Ghi chú:</strong> {xn1.ghi_chu || "-"}</div>
                                        <div><strong>Máy & Phương pháp:</strong> {`${xn1.may_xn || ""} / ${xn1.phuong_phap_xn || ""}`}</div>
                                    </div>

                                    {xn1.loai_xet_nghiem?.map((xn2, k) => {
                                        const highlightClass = ["Tăng", "Dương tính"].includes(xn2.ghi_chu)
                                            ? "text-red-600"
                                            : ["Nhỏ", "Giảm"].includes(xn2.ghi_chu)
                                                ? "text-blue-600"
                                                : "";

                                        return (
                                            <div key={`xn2-${i}-${j}-${k}`} className="mt-3 border-t pt-2 text-sm text-gray-700">
                                                <div className="font-medium">{xn2.ten_xet_nghiem || "-"}</div>
                                                <div><strong>Kết quả:</strong> <span className={highlightClass}>{xn2.ket_qua || "-"}</span></div>
                                                <div><strong>Đơn vị:</strong> {xn2.don_vi || "-"}</div>
                                                <div><strong>Khoảng tham chiếu:</strong> {xn2.khoang_tham_chieu || "-"}</div>
                                                <div><strong>Ghi chú:</strong> {xn2.ghi_chu || "-"}</div>
                                                <div><strong>Máy & Phương pháp:</strong> {`${xn2.may_xn || ""} / ${xn2.phuong_phap_xn || ""}`}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">
                    Không có dữ liệu xét nghiệm.
                </div>
            )}
        </div>
    );
}
