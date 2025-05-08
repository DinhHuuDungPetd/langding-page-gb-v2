"use client"
import Link from "next/link";
import SearchModal from "@/component/pages/admin/posts/component/SearchModal";
import TablePosts from "@/component/pages/admin/posts/component/TablePosts"
import axios from 'axios';
import { useEffect, useState } from "react";
import FullScreenLoader from "@/component/FullScreenLoader";
export default function PostsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [searchName, setSearchName] = useState("");
    const getBlogs = async () => {
        try {
            const response = await axios.get(`${baseUrl}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        if (!searchName) return blog;
        return blog.title.toLowerCase().includes(searchName?.toLowerCase());
    });

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <div>
            {loading && <FullScreenLoader />}
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Bài viết</h2>
                <Link
                    href="/admin/posts/newPosts"
                    className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded transition-all duration-200"
                    onClick={() => setLoading(true)}
                >
                    Viết bài mới
                </Link>
            </div>
            <div className="flex items-center justify-start mb-6 gap-5">
                <SearchModal searchName={searchName} setSearchName={setSearchName} />
            </div>
            <div>
                <TablePosts setLoading={setLoading} blogs={filteredBlogs} getBlogs={getBlogs} />
            </div>

        </div>
    )
}