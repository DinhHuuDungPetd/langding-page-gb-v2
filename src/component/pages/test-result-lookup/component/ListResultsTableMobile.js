"use client";
import React from 'react';

export default function ListResultsTableMobile({ result }) {

    return (
        <div className="mt-3 border-t pt-2  overflow-auto">
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
                                        : "text-gray-800 font-bold";
                            const bold = xn.bold === 1 ? "text-primary font-bold" : "";

                            return (
                                <div key={`${i}-${j}`} className="bg-white border rounded-lg shadow-sm p-3 mb-3">
                                    <div className={` ${bold}`}>{xn.testName || "-"}</div>
                                    <div className="text-sm mt-1">
                                        <div>Kết quả: <span className={color}>{xn.result || ""}</span></div>
                                        <div>Đơn vị: <span className={"text-gray-800 font-bold"}>{xn.unit?.trim() || ""}</span></div>
                                        <div>Khoảng tham chiếu: <span className={"text-gray-800 font-bold"}>{xn.normalRange || ""}</span></div>
                                        <div>Ghi chú: <span className={color}>{xn.comment || ""}</span></div>
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
