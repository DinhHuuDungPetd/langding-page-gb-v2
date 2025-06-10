"use client";
import React, { useState, useEffect } from 'react';
import ListResultsTableMobile from './component/ListResultsTableMobile';
import TestResultsTable from './component/TestResultsTable';
import { loginAPI } from "@/hooks/authorizeAxiosInstance";

export default function LabResultSearchPage({ params }) {
    const { customerSlug } = params;
    const id = customerSlug;
    const [token, setToken] = useState(null);

    const getToken = async () => {
        try {
            const response = await loginAPI.post(`api/v1/Auth/loginForCustomer`, {}, {
                headers: {
                    Authorization: ``
                }
            });
            if (response.status == 200) {
                setToken(response.data.data.token);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    useEffect(() => {
        getToken();
    }, []);

    return (
        <div className="overflow-x-auto p-4">
            {token ? (
                <>
                    <div className='max-w-2/3 mx-auto hidden sm:block'>
                        <TestResultsTable Token={token} sid={id} />
                    </div>
                    <div className='max-w-2/3 mx-auto block sm:hidden'>
                        <ListResultsTableMobile Token={token} sid={id} />
                    </div>
                </>
            ) : (
                <div className="text-center text-white">Đang tải dữ liệu...</div>
            )}
        </div>
    );

}
