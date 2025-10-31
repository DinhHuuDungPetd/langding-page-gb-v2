"use client";
import React from 'react';

export default function ListUsersMobile({ users /*: UserItem[]*/ }) {

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    return (
        <div className="sm:hidden space-y-4 mt-4">
            {users.map((item, index) => (
                <div key={index} className="rounded-lg p-3 shadow bg-white">
                    {/* Hàng trên: Tên và Trạng thái */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-base uppercase text-gray-800">
                            {item?.patientName || ""}
                        </div>
                        <div className="text-sm font-medium text-midnight">
                            {item?.status || ""}
                        </div>
                    </div>
                    <hr className='text-gray-300' />
                    {/* Khối thông tin */}
                    <div className="text-sm text-gray-700 space-y-1 pt-2">
                        <div className="py-1">
                            Mã: <span className="font-medium text-gray-900">{item?.sid || ""}</span>
                        </div>
                        <div className="py-1">
                            Giới tính: <span className="font-medium text-gray-900">{item?.sex || ""}</span>
                        </div>
                        <div className="py-1">
                            {/* Trong ảnh ghi "Tuổi: 1996", nên tôi dùng item.age */}
                            Tuổi: <span className="font-medium text-gray-900">{item?.age || ""}</span>
                        </div>
                        <div className="py-1">
                            {/* Trường này mới, cần có trong dữ liệu 'item' */}
                            Ngày vào: <span className="font-medium text-gray-900">{formatDate(item.dateIn || "")}</span>
                        </div>
                        <div className="py-1">
                            {/* Trường này mới, cần có trong dữ liệu 'item' */}
                            Tổng tiền: <span className="font-bold text-midnight">
                                {item?.sumMoney ? `${item.sumMoney.toLocaleString('vi-VN')} đ` : "0 đ"}
                            </span>
                        </div>
                    </div>

                    {/* Nút xem chi tiết */}
                    <div className="flex justify-end mt-4 ">
                        <a
                            href={`/tra-cuu/${String(item.id).padStart(5, "0")}/${item.sid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-100 text-midnight px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Xem chi tiết
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}