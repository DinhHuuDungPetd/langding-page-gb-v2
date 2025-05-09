"use client";
import NewBlogs from "@/component/pages/news-events/component/NewBlogs"

export default function NewCard({ categorys }) {
    return (
        <>
            <div>
                {categorys && categorys.length > 0 ? (
                    categorys.map((item, index) => (
                        <NewBlogs key={`table-news-${index}`} category={item} />
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500">Không có dữ liệu</div>
                )}
            </div>

        </>
    );
}
