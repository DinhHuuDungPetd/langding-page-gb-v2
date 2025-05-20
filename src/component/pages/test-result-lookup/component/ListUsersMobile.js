"use client";
import React, { useState } from 'react';
import ListResultsTableMobile from './ListResultsTableMobile';
export default function ListUsersMobile({ expandedRow, toggleExpand, users }) {


    return (
        <div className="sm:hidden space-y-4 mt-4">
            {users.map((item, index) => (
                <div key={index} className="border rounded-lg p-3 shadow">
                    <div className="flex justify-between items-end text-sm font-medium">
                        <div>Mã: {item.thong_tin_phieu_xet_nghiem.ma_phieu}</div>
                        <button
                            className="mt-2 text-blue-500 underline"
                            onClick={() => toggleExpand(index)}
                        >
                            {expandedRow === index ? "Ẩn" : "Chi tiết"}
                        </button>
                    </div>


                    {expandedRow === index && (
                        <div className="mt-2 space-y-1 text-sm">
                            <div><strong>Tên:</strong> {item.thong_tin_hanh_chinh.ho_ten}</div>
                            <div><strong>SĐT:</strong> {item.thong_tin_hanh_chinh.so_dien_thoai}</div>
                            <div><span className='font-bold'>Địa chỉ:</span> {item.thong_tin_hanh_chinh.dia_chi}</div>
                            <div><span className='font-bold'>Giới tính:</span> {item.thong_tin_hanh_chinh.gioi_tinh}</div>
                            <div><span className='font-bold'>Năm sinh:</span> {item.thong_tin_hanh_chinh.nam_sinh}</div>
                            <div><span className='font-bold'>TG lấy mẫu:</span> {item.thong_tin_mau.thoi_gian_lay_mau}</div>
                            <div><span className='font-bold'>TG nhận mẫu:</span> {item.thong_tin_mau.thoi_gian_nhan_mau}</div>
                            <div><span className='font-bold'>Loại máu:</span> {item.thong_tin_mau.loai_mau}</div>
                            <div><span className='font-bold'>Người lấy mẫu:</span> {item.thong_tin_mau.nguoi_lay_mau}</div>
                            <div><span className='font-bold'>Người nhận mẫu:</span> {item.thong_tin_mau.nguoi_nhan_mau}</div>
                            <div><span className='font-bold'>Tình trạng mẫu:</span> {item.thong_tin_mau.tinh_trang_mau}</div>
                            <ListResultsTableMobile nhom_xet_nghiem={item.nhom_xet_nghiem} />

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
