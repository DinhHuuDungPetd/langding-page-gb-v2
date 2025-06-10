"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePermission } from '@/hooks/usePermission';
import { permissions } from '@/hooks/permissions';

export default function Admin() {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const canView = usePermission([
        permissions.users.view,
        permissions.roles.view,
        permissions.rolesClaims.view
    ]);

    // Đánh dấu là client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Chuyển hướng nếu không có quyền
    useEffect(() => {
        if (isClient && !canView) {
            router.push("/unauthorized");
        }
    }, [canView, isClient, router]);

    if (!isClient || !canView) return null;
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Admin</h1>
        </div>
    );
}
