import { NavLink, Outlet } from "react-router";

export function MainLayout() {
    return (
        <div className="bg-gradient-to-b from-[#366796] to-[#38C6D9] h-screen w-screen flex">
            <div className="min-w-52">
                <div className="flex flex-col items-center">
                    <img className="p-10" src="/src/assets/Logotipo.svg" alt="logotipo" />
                    <div>
                        <NavLink to="/" className={({ isActive }) =>
                            `flex items-center gap-2 font-semibold rounded-2xl py-2 px-5 absolute w-52 top-45 left-5 ${isActive ? "text-[#366796] bg-white shadow-md" : "text-white"}`
                        }> <i className="fas fa-home" />Inicio</NavLink>
                        <NavLink to="/usuarios" className={({ isActive }) =>
                            `flex items-center gap-2 font-semibold rounded-2xl py-2 px-5 absolute w-52 top-57 left-5 ${isActive ? "text-[#366796] bg-white shadow-md" : "text-white"}`
                        }><i className="fa-solid fa-users" />Usuarios</NavLink>
                    </div>
                </div>
            </div>
            <main className="h-full w-full pt-10">
                <div className="bg-[#F2F6FB] rounded-tl-[100px] h-full w-full p-5">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}