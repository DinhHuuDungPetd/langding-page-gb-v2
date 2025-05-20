"use client";
import React, { useState } from 'react';
import TestResultsTable from './TestResultsTable';
export default function TableUsers({ expandedRow, toggleExpand, users }) {


    return (
        <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden hidden sm:table ">
            <thead className="bg-primary text-white font-medium ">
                <tr>
                    <th className="p-2">STT</th>
                    <th className="p-2 text-center">Mã</th>
                    <th className="p-2 text-center">Tên</th>
                    <th className="p-2 text-center">SĐT</th>
                    <th className="p-2 text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr className="border-t hover:bg-gray-50">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 text-center">{item.thong_tin_phieu_xet_nghiem.ma_phieu}</td>
                            <td className="p-2 text-center">{item.thong_tin_hanh_chinh.ho_ten}</td>
                            <td className="p-2 text-center">{item.thong_tin_hanh_chinh.so_dien_thoai}</td>
                            <td className="p-2  text-center">
                                <button className="text-blue-500" onClick={() => toggleExpand(index)}>
                                    {expandedRow === index ? "Ẩn" : "Chi tiết"}
                                </button>
                            </td>
                        </tr>
                        {expandedRow === index && (
                            <tr className="border-t bg-mint">
                                <td colSpan={5}>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-screen-lg">
                                            <div className="flex justify-center">
                                                <div className="mt-2 mx-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 max-w-4xl w-full">
                                                    <div className="mx-auto"><span className='font-bold'>Địa chỉ:</span> {item.thong_tin_hanh_chinh.dia_chi}</div>
                                                    <div className="mx-auto"><span className='font-bold'>Giới tính:</span> {item.thong_tin_hanh_chinh.gioi_tinh}</div>
                                                    <div className="mx-auto"><span className='font-bold'>Năm sinh:</span> {item.thong_tin_hanh_chinh.nam_sinh}</div>
                                                    {/* 
    <div><span className='font-bold'>TG lấy mẫu:</span> {item.thong_tin_mau.thoi_gian_lay_mau}</div>
    <div><span className='font-bold'>TG nhận mẫu:</span> {item.thong_tin_mau.thoi_gian_nhan_mau}</div>
    <div><span className='font-bold'>Loại máu:</span> {item.thong_tin_mau.loai_mau}</div>
    <div><span className='font-bold'>Người lấy mẫu:</span> {item.thong_tin_mau.nguoi_lay_mau}</div>
    <div><span className='font-bold'>Người nhận mẫu:</span> {item.thong_tin_mau.nguoi_nhan_mau}</div>
    <div><span className='font-bold'>Tình trạng mẫu:</span> {item.thong_tin_mau.tinh_trang_mau}</div> 
    */}
                                                </div>
                                            </div>
                                            <div className="my-5 mx-6">
                                                <TestResultsTable nhom_xet_nghiem={item.nhom_xet_nghiem} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}
