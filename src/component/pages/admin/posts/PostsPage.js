import Link from "next/link";
import SearchModal from "@/component/pages/admin/posts/component/SearchModal";
import TablePosts from "@/component/pages/admin/posts/component/TablePosts"

export default function PostsPage() {
    return (
        <div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Bài viết</h2>
                <Link
                    href="/admin/posts/newPosts"
                    className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-medium py-2 px-4 rounded transition-all duration-200"
                >
                    Viết bài mới
                </Link>
            </div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <button className="font-medium text-xl hover:text-midnight">Tất cả | </button>
                <button className="font-medium text-xl hover:text-midnight">Đã xuất bản | </button>
                <button className="font-medium text-xl hover:text-midnight">Bản nháp | </button>
                <SearchModal />
            </div>
            <div>
                <TablePosts />
            </div>

        </div>
    )
}