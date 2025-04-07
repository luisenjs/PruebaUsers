import { Home, Users } from "lucide-react";
import { Usuarios } from "../pages/usuarios";

export function MainLayout() {
    return (
        <div className="bg-gradient-to-b from-[#366796] to-[#38C6D9] h-screen w-screen flex">
            <div className="min-w-52">
                <div className="flex flex-col items-center">
                    <img className="p-10" src="/src/assets/Logotipo.svg" alt="logotipo" />
                    <div className="flex flex-col gap-3">
                        <button className="flex gap-2 text-white font-semibold rounded-2xl py-2 px-5 w-52 absolute top-45 left-5"><Home />Inicio</button>
                        <button className="flex gap-2 text-[#366796] font-semibold bg-white rounded-2xl py-2 px-5 absolute w-52 top-57 left-5"><Users />Usuarios</button>
                    </div>
                </div>
            </div>
            <main className="h-full w-full pt-10">
                <div className="bg-[#F2F6FB] rounded-tl-[100px] h-full w-full p-5">
                    <Usuarios />
                </div>
            </main>
        </div>
    )
}