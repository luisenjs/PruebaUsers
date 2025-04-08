import { useEffect } from "react";
import { User } from "../interfaces/user";

type modalprops = {
    user: User;
    isOpen: boolean;
    onClose: () => void;
}

export function ModalMasDetalle({ user, isOpen, onClose }: modalprops) {

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

    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="modal bg-white text-slate-700 rounded-lg shadow-lg p-10 z-20 max-h-fit min-w-[35vw] max-w-[40vw] relative">
                <button className="hover:cursor-pointer absolute top-10 right-10 text-gray-800 hover:text-gray-500 text-2xl font-bold" onClick={onClose}>
                    <img src="/src/assets/x.svg" />
                </button>
                <div className="flex flex-col items-start mb-10">
                    <h2 className="text-2xl">Detalle usuario <span className="font-bold">{user.fullname}</span></h2>
                </div>
                <div className="mb-10">
                    <div className="flex gap-2 mb-2 items-center text-[#366796]">
                        <i className="fa-solid fa-circle-info"></i>Compañía: <span className="font-bold">{user.company}</span>
                    </div>
                    <hr className="w-full text-gray-100 my-4" />
                    <div className="flex gap-2 items-center w-full">
                        <div className="flex flex-1 justify-center items-center">
                            <img src="/src/assets/Layer 1.svg" alt="" />
                        </div>
                        <div className="flex flex-col flex-1 justify-center items-center gap-5 text-[#6B7A7F]">
                            <div>
                                <h3 className="font-bold">Título</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold">Descripción</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}