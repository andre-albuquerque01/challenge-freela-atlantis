'use client'
import { logout } from "@/app/action"

export const LogoutComponent = () => {
    const handleLogout = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault()
         await logout()
    }
    return (
        <div className="bg-forum-gradient-3 p-3 hover:bg-slate-400 rounded cursor-pointer">
            <button onClick={(e) => handleLogout(e)}>
                Logout
            </button>
        </div>
    )
}