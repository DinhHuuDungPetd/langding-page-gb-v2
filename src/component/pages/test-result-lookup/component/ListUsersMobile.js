"use client";
import React from 'react';
export default function ListUsersMobile({ users }) {

    return (
        <div className="sm:hidden space-y-4 mt-4">
            {users.map((item, index) => (
                <div key={index} className="border rounded-lg p-3 shadow">
                    <div>
                        <div className="flex justify-between  text-sm font-medium">
                            <div>
                                <div>Mã: <strong>{item?.sid || ""}</strong></div>
                                <div>Tên: <strong>{item?.patientName || ""}</strong></div>
                                <div>Giới tính: <strong>{item?.sex || ""}</strong></div>
                            </div>
                            <div>
                                <div>
                                    <a
                                        href={`/tra-cuu/${String(item.id).padStart(5, "0")}/${item.sid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Chi tiết
                                    </a>
                                </div>
                                <div>Năm sinh: <strong>{item?.age || ""}</strong></div>
                                <div>Trạng thái: <strong>{item?.status || ""}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
