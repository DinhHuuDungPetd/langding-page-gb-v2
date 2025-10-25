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

    useEffect(() => {
        if (typeof window === "undefined") return;

        const fetchData = async () => {
            try {
                const fullUrl = window.location.href;
                const parts = new URL(fullUrl).pathname.split("/");

                // URL dạng /r/:code
                if (parts[1] === "r" && parts[2]) {
                    const loginRes = await axios.post(`${loginAPI}/api/v1/Auth/loginForCustomer`, {
                        username: parts[2]
                    }, {
                        headers: { Authorization: "" }
                    });

                    const token = loginRes.data?.data?.token;
                    if (!token) {
                        alert("Không lấy được token từ loginForCustomer");
                        return;
                    }

                    getPatient(token, null, null, parts[2]);
                    return;
                }

                // URL dạng /tra-cuu/r/:code
                if (parts[1] === "tra-cuu" && parts[2] === "r" && parts[3]) {
                    const loginRes = await axios.post(`${loginAPI}/api/v1/Auth/loginForCustomer`, {
                        username: parts[3]
                    }, {
                        headers: { Authorization: "" }
                    });

                    const token = loginRes.data?.data?.token;
                    if (!token) {
                        alert("Không lấy được token từ loginForCustomer");
                        return;
                    }

                    getPatient(token, null, null, parts[3]);
                    return;
                }

                // URL dạng /tra-cuu/:id/:code
                if (parts[1] === "tra-cuu" && parts[2] && parts[3]) {
                    const token = localStorage.getItem("accessToken");
                    if (!token) {
                        alert("Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
                        window.location.href = `/tra-cuu`;
                        return;
                    }

                    getPatient(token, parts[2], parts[3], null);
                }
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };

        fetchData();
    }, []);

    // =========================
    const getPatient = async (Token, DoctorID, SID, ShortURL) => {
        try {
            const params = new URLSearchParams();

            let encrypted = null;
            if (ShortURL) {
                encrypted = encrypt(ShortURL, secretKey, true);
            }

            if (DoctorID) params.append("ID", DoctorID);
            if (SID) params.append("SearchInfo", SID);
            if (encrypted) params.append("ShortURL", encodeURIComponent(encrypted));

            const response = await dataTestAPI.get(
                `api/v1/Patient?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                }
            );

            if (response.status === 200) {
                const patient = response.data.data[0];
                setUsers(patient);

                if (patient?.sid) {
                    const response2 = await dataTestAPI.get(
                        `api/v1/Result?SID=${patient.sid}`,
                        {
                            headers: {
                                Authorization: `Bearer ${Token}`
                            }
                        }
                    );
                    if (response2.status === 200) {
                        setResult(response2.data.data);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };




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
                    <table className="min-w-2/3 text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden hidden sm:table mx-auto">
                        <thead className="bg-primary text-white font-medium ">
                            {users?.sid && (
                                <tr>
                                    <th className="p-2 text-center">Mã</th>
                                    <th className="p-2 text-center">Tên</th>
                                    <th className="p-2 text-center">SĐT</th>
                                    <th className="p-2 text-center">Thời gian</th>
                                </tr>
                            )}

                        </thead>
                        <tbody>
                            {users?.sid && (
                                <tr className={` hover:bg-gray-50`}>
                                    <td className="p-2 text-center">{users?.sid || ""}</td>
                                    <td className="p-2 text-center">{users?.patientName || ""}</td>
                                    <td className="p-2 text-center">{users?.phone || ""}</td>
                                    <td className="p-2 text-center">{formatDate(users?.dateIn || "")}</td>
                                </tr>
                            )}
                            {users?.sid && (
                                <tr className={`border-t border-gray-300`}>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Giới tính:</span> {users?.sex || ""}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Năm sinh:</span> {users?.age || ""}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className='font-bold'>Trạng thái:</span> {users?.status || ""}</div></td>
                                    <td className="p-2 text-center"><div className="mx-auto"><span className="font-bold text-blue-500 underline">Tải kết quả</span></div></td>
                                </tr>
                            )}
                            <tr className=" bg-mint">
                                <td colSpan={6}>
                                    <div className="w-full flex justify-center">
                                        <div className="w-full">
                                            <div className="mb-5">
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
                                <div className="grid grid-cols-2 gap-2 bg-white rounded-lg shadow">
                                    {/* Cột trái */}
                                    <div className="space-y-2">
                                        <div><span className="font-bold">Mã:</span> {users?.sid}</div>
                                        <div><span className="font-bold">Tên:</span> {users?.patientName}</div>
                                        <div><span className="font-bold">SĐT:</span> {users?.phone}</div>
                                        <div><span className="font-bold">Năm sinh:</span> {users?.age || ""}</div>
                                    </div>

                                    {/* Cột phải */}
                                    <div className="space-y-2">
                                        <div><span className="font-bold">Trạng thái:</span> {users?.status || ""}</div>
                                        <div><span className="font-bold">Giới tính:</span> {users?.sex || ""}</div>
                                        <div><span className="font-bold text-blue-500 underline">Tải kết quả</span></div>
                                    </div>
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
