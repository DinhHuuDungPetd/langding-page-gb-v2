"use client";
import React from 'react';

export default function ListResultsTableMobile({ result }) {

    return (
        <div className="mt-3 pt-2  overflow-auto">
            <div className=" font-bold mb-2 text-lg">Xét nghiệm</div>
            {result?.length > 0 ? (
                result.map((item, i) => (
                    // Container cho mỗi danh mục (ví dụ: MIỄN DỊCH)
                    <div key={i} className="mb-4 border border-gray-300 rounded-t-lg">

                        {/* 1. Header danh mục (Thanh màu xanh lá) */}
                        <div className="bg-primary text-white text-base font-bold uppercase p-3 rounded-t-lg shadow-md">
                            {item.categoryName || "-"}
                        </div>

                        {/* 2. Container trắng chứa TẤT CẢ kết quả của danh mục này */}
                        <div className="bg-white rounded-b-lg shadow-md">

                            {item.result?.map((xn, j) => {
                                // Giữ logic 'bold' từ code cũ
                                const bold = xn.bold === 1 ? "font-bold" : "font-medium";

                                // Giữ logic 'color' cho KẾT QUẢ (text-blue-600, text-red-500)
                                // Vì ảnh có thể chỉ là 1 trường hợp bình thường (màu đen)
                                const resultColorClass =
                                    xn.color === 1
                                        ? "text-blue-600 font-bold"
                                        : xn.color === 2
                                            ? "text-red-500 font-bold"
                                            : "text-gray-900 font-bold"; // Màu đen/xám đậm mặc định

                                return (
                                    // Wrapper cho mỗi xét nghiệm (ví dụ: HBsAg)
                                    <div key={`${i}-${j}`} className="p-3">

                                        {/* 3. Tên xét nghiệm */}
                                        <div className={`text-base text-gray-800 mb-2 ${bold}`}>
                                            {xn.testName || "-"}
                                        </div>

                                        {/* 4. Lưới 2x2 cho chi tiết */}
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">

                                            {/* 4a. Kết quả */}
                                            <div>
                                                <div className="text-gray-500">Kết quả:</div>
                                                <div className={`text-base ${resultColorClass}`}>
                                                    {xn.result || ""}
                                                </div>
                                            </div>

                                            {/* 4b. Đơn vị */}
                                            <div>
                                                <div className="text-gray-500">Đơn vị:</div>
                                                <div className="font-medium text-gray-900">{xn.unit?.trim() || ""}</div>
                                            </div>

                                            {/* 4c. Khoảng tham chiếu */}
                                            <div>
                                                <div className="text-gray-500">Khoảng tham chiếu:</div>
                                                <div className="font-medium text-gray-900">{xn.normalRange || ""}</div>
                                            </div>

                                            {/* 4d. Ghi chú (style badge như ảnh) */}
                                            <div>
                                                <div className="text-gray-500">Ghi chú:</div>
                                                <div>
                                                    {xn.comment && (
                                                        <span
                                                            className={`${resultColorClass.includes("text-gray-900")
                                                                ? "bg-green-100 text-green-800"
                                                                : resultColorClass
                                                                } text-sm font-medium px-2.5 py-0.5 rounded-full`}
                                                        >
                                                            {xn.comment}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                        {/* 5. Đường kẻ phân cách (trừ item cuối) */}
                                        {j < item.result.length - 1 && (
                                            <hr className="mt-3 text-gray-500" />
                                        )}

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            ) : (
                // Trường hợp không có dữ liệu
                <div className="p-4 text-center text-gray-500">
                    Không có dữ liệu xét nghiệm.
                </div>
            )}
        </div>
    );
}
