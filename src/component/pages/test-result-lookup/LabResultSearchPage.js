"use client";
import React, { useState, useEffect } from 'react';
import ListResultsTableMobile from './component/ListResultsTableMobile';
import TestResultsTable from './component/TestResultsTable';
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { encrypt } from "@/utils/encrypt";
import axios from 'axios';

export default function LabResultSearchPage() {
    const loginAPI = process.env.NEXT_PUBLIC_BASE_URL_LOGIN;
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const [users, setUsers] = useState([]);
    const [result, setResult] = useState([]);

    const getPatient = async (DoctorID, SID) => {
        try {

            const response = await dataTestAPI.get(`api/v1/Patient?ID=${DoctorID}&SearchInfo=${SID}`);

            if (response.status == 200) {
                setUsers(response.data.data[0]);
                const response2 = await dataTestAPI.get(`api/v1/Result?SID=${SID}`);
                if (response2.status == 200) {
                    setResult(response2.data.data);
                }
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        }

    }

    const getPatientByCustomer = async (sid) => {
        try {

            const response = await axios.post(`${loginAPI}/api/v1/Auth/loginForCustomer`, {
                username: sid
            }, {
                headers: {
                    Authorization: ``
                }
            });

            if (response.status == 200) {

                const encrypted = encrypt(sid, secretKey, true);

                const response2 = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_DATA}/api/v1/Result/GetResultBySMS?Text=${encodeURIComponent(encrypted)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${response.data.data.token}`
                        }
                    }
                );

                if (response2.status == 200) {
                    if (response2.data.isSucceeded === false) {
                        alert(response2.data.messages[0]);
                        return;
                    }
                    setResult(response2.data.data);
                }

            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }

    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const fullUrl = window.location.href;
            const parts = new URL(fullUrl).pathname.split("/");

            if (parts.length >= 4) {

                console.log
                if (parts[2] === "kq") {
                    getPatientByCustomer(parts[3]);
                } else {
                    const token = localStorage.getItem("accessToken");
                    if (!token) {
                        alert("Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                        window.location.href = `/tra-cuu`;
                        return;
                    }
                    getPatient(parts[2], parts[3]);
                }
            }
        }
    }, []);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} tháng ${month}, ${year}`;
    };

    return (
        <div className="overflow-x-auto p-4">
            {result ? (
                <>
                    <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden hidden sm:table ">
                        <thead className="bg-primary text-white font-medium ">
                            {users?.sid && (
                                <tr>
                                    <th className="p-2">STT</th>
                                    <th className="p-2 text-center">Mã</th>
                                    <th className="p-2 text-center">Tên</th>
                                    <th className="p-2 text-center">SĐT</th>
                                    <th className="p-2 text-center">Thời gian</th>
                                </tr>
                            )}

                        </thead>
                        <tbody>
                            {users?.sid && (
                                <tr className={`border-t hover:bg-gray-50`}>
                                    <td className="p-2">1</td>
                                    <td className="p-2 text-center">{users?.sid || "-"}</td>
                                    <td className="p-2 text-center">{users?.patientName || "-"}</td>
                                    <td className="p-2 text-center">{users?.phone || "-"}</td>
                                    <td className="p-2 text-center">{formatDate(users?.dateIn || "-")}</td>
                                </tr>
                            )}
                            {users?.sid && (
                                <tr>
                                    <td className="p-2">-</td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Giới tính:</span> {users?.sex || "-"}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Năm sinh:</span> {users?.age || "-"}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Trạng thái:</span> {users?.status || "-"}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>SEQ:</span> {users?.seq || "-"}</div></td>
                                </tr>
                            )}
                            <tr className="border-t bg-mint">
                                <td colSpan={6}>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-screen-lg">
                                            <div className="my-5 mx-6">
                                                {result?.length > 0 &&
                                                    <TestResultsTable result={result} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='max-w-full mx-auto block sm:hidden'>
                        <div className="mt-2 space-y-1 text-sm">
                            {users?.sid && (
                                <div>
                                    <div><strong>Tên:</strong> {users?.patientName}</div>
                                    <div><strong>SĐT:</strong> {users?.phone}</div>
                                    <div><span className='font-bold'>Giới tính:</span> {users?.sex || "-"}</div>
                                    <div><span className='font-bold'>Năm sinh:</span> {users?.age || "-"}</div>
                                    <div><span className='font-bold'>Trạng thái:</span> {users?.status || "-"}</div>
                                    <div><span className='font-bold'>SEQ:</span> {users?.seq || "-"}</div>
                                </div>
                            )}
                            {result?.length > 0 &&
                                <ListResultsTableMobile result={result} />
                            }
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-white">Đang tải dữ liệu...</div>
            )}
        </div>
    );

}
