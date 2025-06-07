"use client";
import React, { useState, useEffect } from 'react';
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

export default function ListResultsTableMobile({ Token, sid }) {
    const [result, setResult] = useState([]);
    const getResult = async () => {
        try {
            const response = await dataTestAPI.get(`api/v1/Result?SID=${sid}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            if (response.status == 200) {
                setResult(response.data.data);
            }
            console.log("result", response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getResult();
    }, []);

    return (
        <div className="mt-3 border-t pt-2 max-h-[700px] overflow-auto">
            <div className="font-semibold mb-2 text-lg">Xét nghiệm</div>
            {result?.length > 0 ? (
                result.map((item, i) => (
                    <div key={i} className="mb-4">
                        <div className="text-base font-bold text-blue-800 underline mb-2">{item.categoryName || "-"}</div>

                        {item.result?.map((xn, j) => {
                            const color =
                                xn.color === 1
                                    ? "text-blue-600 font-bold"
                                    : xn.color === 2
                                        ? "text-red-500 font-bold"
                                        : "";
                            const bold = xn.bold === 1 ? "text-primary font-bold" : "";

                            return (
                                <div key={`${i}-${j}`} className="bg-white border rounded-lg shadow-sm p-3 mb-3">
                                    <div className={`font-semibold ${bold}`}>{xn.testName || "-"}</div>
                                    <div className="text-sm text-gray-700 mt-1">
                                        <div><strong>Kết quả:</strong> <span className={color}>{xn.result || "-"}</span></div>
                                        <div><strong>Đơn vị:</strong> {xn.unit?.trim() || "-"}</div>
                                        <div><strong>Khoảng tham chiếu:</strong> {xn.normalRange || "-"}</div>
                                        <div><strong>Ghi chú:</strong> {xn.comment || "-"}</div>
                                    </div>
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
