"use client";
import React from 'react';

export default function ListUsersMobile({ users /*: UserItem[]*/ }) {

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="sm:hidden space-y-4 mt-4">
            {users.map((item, index) => (
                <div key={index} className="rounded-lg p-3 shadow bg-white">
                    <div className="flex justify-between items-center mb-3">
                        <div className="font-bold text-base uppercase text-gray-800">
                            {item?.sid || ""}
                        </div>
                        <div className="text-sm font-medium text-midnight">
                            {item.status !== "Chưa có kết quả" && (
                                <a
                                    href={`/tra-cuu/${String(item.id).padStart(5, "0")}/${item.sid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-100 text-midnight px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Xem chi tiết
                                </a>
                            )}
                        </div>
                    </div>
                    <hr className='text-gray-300' />
                    <div className="text-sm text-gray-700 space-y-1 pt-2">
                        <div className="py-1 grid grid-cols-2 gap-2">
                            <div>
                                <span className="font-bold text-gray-900">{item?.patientName || ""}</span> - {item?.sex || ""} - {item?.age || ""}
                            </div>
                            <div>
                                Trạng thái: <span className="text-sm font-medium text-midnight">{item?.status || ""}</span>
                            </div>

                        </div>
                        <div className="py-1 grid grid-cols-2 gap-2">
                            <div>
                                Ngày vào: <span className="font-medium text-gray-900">{formatDate(item.dateIn || "")}</span>
                            </div>
                            <div>
                                Tổng tiền: <span className="font-bold text-midnight">
                                    {item?.sumMoney ? `${item.sumMoney.toLocaleString('vi-VN')} đ` : "0 đ"}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}