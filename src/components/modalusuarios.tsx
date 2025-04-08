import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

type modalprops = {
    isOpen: boolean;
    onClose: () => void;
}

export function ModalUsuarios({ isOpen, onClose }: modalprops) {

    const userSchema = z.object({
        fullname: z.string().min(1, { message: "Este campo es requedido." }).max(30, { message: "No puedes exceder los 30 caracteres." }),
        username: z.string().min(1, { message: "Este campo es requedido." }).max(10, { message: "No puedes exceder los 10 caracteres." }),
        email: z.string().min(1, { message: "Este campo es requedido." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Escriba un correo válido." }),
        phone: z.string().min(1, { message: "Este campo es requedido." }).regex(/^\+?[0-9]{10}$/, { message: "Escriba un número de télefono válido." }),
        website: z.string().min(1, { message: "Este campo es requedido." }).regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, { message: "Escriba un sitio web válido." }),
        company: z.string().min(1, { message: "Este campo es requedido." }).max(30, { message: "No puedes exceder los 30 caracteres." })
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema)
    });

    useEffect(() => {

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const modal = document.querySelector('.modal') as HTMLElement;
            if (modal && !modal.contains(target)) onClose();
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    async function sendData(data: object) {
        reset();
        try {
            await axios.post("http://localhost:3000/usuarios", data);
            Swal.fire({
                title: "Guardado exitosamente",
                icon: "success",
                confirmButtonText: "Aceptar",
                buttonsStyling: false,
                customClass: {
                    confirmButton: "bg-[#379ABA] w-60 py-2 px-5 rounded-xl text-white"
                }
            });
            onClose();
        } catch {
            Swal.fire({
                title: "Hubo un problema",
                icon: "error",
                confirmButtonText: "Aceptar",
                buttonsStyling: false,
                customClass: {
                    confirmButton: "bg-[#379ABA] w-60 py-2 px-5 rounded-xl text-white"
                }
            });
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="modal bg-white text-slate-700 rounded-lg shadow-lg p-10 z-20 max-h-fit min-w-[45vw] max-w-[70vw] relative">
                <button className="hover:cursor-pointer absolute top-10 right-10 text-gray-800 hover:text-gray-500" onClick={onClose}>
                    <img src="/src/assets/x.svg" />
                </button>
                <div className="flex flex-col items-start mb-10">
                    <h2 className="text-2xl">Crear usuario</h2>
                </div>
                <div className="overflow-auto">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(sendData)}>
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="flex flex-col">
                                <label className="font-bold text-black" htmlFor="fullname">Nombres y apellidos</label>
                                <input className={`border-1 border-gray-400 rounded-xl p-2 w-full ${errors.fullname ? "border-red-400" : ""}`} type="text" {...register("fullname")} placeholder='Luis Fendando Rivera Rodriguez' id="fullname" />
                                {errors.fullname && <p className="text-red-400">{errors.fullname.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold text-black" htmlFor="username">Nombre de usuario</label>
                                <input className={`border-1 border-gray-400 rounded-xl p-2 w-full ${errors.fullname ? "border-red-400" : ""}`} type="text" {...register("username")} placeholder='luferr' id="username" />
                                {errors.username && <p className="text-red-400">{errors.username.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold text-black" htmlFor="email">Correo</label>
                                <input className={`border-1 border-gray-400 rounded-xl p-2 w-full ${errors.fullname ? "border-red-400" : ""}`} type="text" {...register("email")} placeholder='dominio@ejemplo.com' id="email" />
                                {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold text-black" htmlFor="phone">Teláfono</label>
                                <input className={`border-1 border-gray-400 rounded-xl p-2 w-full ${errors.fullname ? "border-red-400" : ""}`} type="text" {...register("phone")} placeholder='0909090909' id="phone" />
                                {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold text-black" htmlFor="website">Sitio Web</label>
                                <input className={`border-1 border-gray-400 rounded-xl p-2 w-full ${errors.fullname ? "border-red-400" : ""}`} type="text" {...register("website")} placeholder='mipágina.com' id="website" />
                                {errors.website && <p className="text-red-400">{errors.website.message}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold text-black" htmlFor="company">Nombe de compañía</label>
                                <input className={`border-1 border-gray-400 rounded-xl p-2 w-full ${errors.fullname ? "border-red-400" : ""}`} type="text" {...register("company")} placeholder='Mi empresa' id="company" />
                                {errors.company && <p className="text-red-400">{errors.company.message}</p>}
                            </div>
                        </div>
                        <div className="flex w-full justify-end">
                            <button type="submit" className="bg-[#379ABA] py-2 px-5 rounded-xl text-white w-52">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}