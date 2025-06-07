
import { jwtDecode } from "jwt-decode";

export function getPermissionsFromToken() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    if (!token) return [];

    try {
        const decoded = jwtDecode(token);
        return decoded.Permission || [];
    } catch (error) {
        console.error('Invalid token', error);
        return [];
    }
}
