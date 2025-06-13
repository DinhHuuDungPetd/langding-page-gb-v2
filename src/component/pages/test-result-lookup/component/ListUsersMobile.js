"use client";
import React, { useState } from 'react';
import ListResultsTableMobile from './ListResultsTableMobile';
export default function ListUsersMobile({ Token, expandedRow, toggleExpand, users }) {


    return (
        <div className="sm:hidden space-y-4 mt-4">
            {users.map((item, index) => (
                <div key={index} className="border rounded-lg p-3 shadow">
                    <div className="flex justify-between items-end text-sm font-medium">
                        <div>Mã: {item.sid}</div>
                        <button
                            className="mt-2 text-blue-500 underline"
                            onClick={() => toggleExpand(index)}
                        >
                            {expandedRow === index ? "Ẩn" : "Chi tiết"}
                        </button>
                    </div>


                    {expandedRow === index && (
                        <div className="mt-2 space-y-1 text-sm">
                            <div><strong>Tên:</strong> {item.patientName}</div>
                            <div><strong>SĐT:</strong> {item.phone}</div>
                            <div><span className='font-bold'>Giới tính:</span> {item.sex || "-"}</div>
                            <div><span className='font-bold'>Năm sinh:</span> {item.age || "-"}</div>
                            <div><span className='font-bold'>Trạng thái:</span> {item.status || "-"}</div>
                            <div><span className='font-bold'>SEQ:</span> {item.seq || "-"}</div>
                            <ListResultsTableMobile Token={Token} sid={item.sid} />

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
