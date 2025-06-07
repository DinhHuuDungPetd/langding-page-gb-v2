"use client";
import React, { useState, useEffect } from 'react';
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";

export default function TestResultsTable({ Token, sid }) {
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
        <div className="overflow-x-auto">
            <div className="relative">
                <table className="min-w-full table-fixed text-sm border border-gray-300 shadow-md rounded-t-lg">
                    <thead className="bg-primary text-white font-medium sticky top-0 z-20">
                        <tr>
                            <th className="p-2 w-3/8 border border-gray-300">Xét nghiệm</th>
                            <th className="p-2 w-1/8 border border-gray-300 text-center">Kết quả</th>
                            <th className="p-2 w-1/8 border border-gray-300 text-center">Đơn vị</th>
                            <th className="p-2 w-2/8 border border-gray-300 text-center">Giá trị tham chiếu</th>
                            <th className="p-2 w-2/8 border border-gray-300 text-center">Ghi chú</th>
                        </tr>
                    </thead>

                    <tbody className="relative z-10">
                        {result?.length > 0 ? (
                            result.map((item, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td colSpan={5} className="bg-gray-100 font-semibold p-2 border border-gray-300">
                                            {item.categoryName}
                                        </td>
                                    </tr>
                                    {item.result?.map((r, j) => {
                                        const color =
                                            r.color === 1
                                                ? "text-blue-600 font-bold"
                                                : r.color === 2
                                                    ? "text-red-500 font-bold"
                                                    : "";
                                        const bold = r.bold === 1 ? "font-bold" : "";
                                        return (
                                            <tr key={`${i}-${j}`}>
                                                <td className={`p-2 border border-gray-300 ${bold}`}>{r.testName}</td>
                                                <td className={`p-2 border border-gray-300 text-center ${color}`}>{r.result || "-"}</td>
                                                <td className="p-2 border border-gray-300 text-center">{r.unit?.trim() || "-"}</td>
                                                <td className="p-2 border border-gray-300 text-center">{r.normalRange || "-"}</td>
                                                <td className="p-2 border border-gray-300 text-center">{r.comment || "-"}</td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500 border border-gray-300">
                                    Không có dữ liệu xét nghiệm.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Ảnh nền chỉ áp dụng cho tbody */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-[length:500px_500px] opacity-10 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            "url('https://res.cloudinary.com/dgfwxibj4/image/upload/v1747380669/backgroundPC/lilroenrmomopl3a8qsp.png')",
                    }}
                ></div>
            </div>
        </div>

    );
}
