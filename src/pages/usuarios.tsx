import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, createColumnHelper, flexRender } from "@tanstack/react-table"
import { useEffect, useState } from "react";
import { ModalUsuarios } from "../components/modalusuarios";
import Swal from "sweetalert2";
import axios from "axios";
import { ModalMasDetalle } from "../components/modalmasdetalle";
import { User } from "../interfaces/user";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor('id', {
        header: () => (
            <span className="flex gap-2 items-center w-full justify-center">
                ID
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('fullname', {
        header: () => (
            <span className="flex gap-2 items-center w-full justify-center">
                Nombre completo
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('username', {
        header: () => (
            <span className="flex gap-2 items-center w-full justify-center">
                Nombre de usuario
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('email', {
        header: () => (
            <span className="flex gap-2 items-center w-full justify-center">
                Correo
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('phone', {
        header: () => (
            <span className="flex gap-2 items-center w-full justify-center">
                Teléfono
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor('website', {
        header: () => (
            <span className="flex gap-2 items-center w-full justify-center">
                Website
            </span>),
        cell: info => <p>{info.getValue()}</p>,
    }),
]

export function Usuarios() {

    const [newUser, setNewUser] = useState<boolean>(false);

    const [masDetalle, setMasDetalle] = useState<boolean>(false);

    const [usuarios, setUsuarios] = useState([]);

    const [user, setUser] = useState<User>()

    useEffect(() => {
        async function getdata() {
            const data = await axios.get("http://localhost:3000/usuarios")
            setUsuarios(data.data);
        }
        getdata();
    })

    const table = useReactTable({
        data: usuarios || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const guardaruser = () => {
        setNewUser(true)
    }

    function deleteuser(id: string) {
        Swal.fire({
            title: "¿Desea eliminar este usuario?",
            text: "Una vez eliminado no podrá revertir los cambios hechos.",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            customClass: {
                confirmButton: "bg-[#379ABA] w-50 py-2 px-5 rounded-xl text-white mr-2",
                cancelButton: "bg-[#6B7A7F] w-50 py-2 px-5 rounded-xl text-white ml-2"
            },
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await axios.delete(`http://localhost:3000/usuarios/${id}`)
                console.log(data)
                Swal.fire({
                    title: "Eliminado exitosamente",
                    icon: "success",
                    confirmButtonColor: "#379ABA"
                });
            }
        });
    }

    function verMasDetalle(user: User) {
        setUser(user);
        setMasDetalle(true);
    }

    return (
        <div>
            <div className="flex flex-col gap-10 p-7">
                <div>
                    <div className="flex gap-1 text-[#366796]">
                        <i className="fas fa-home" /><a className="underline" href="/">Inicio</a>
                        /
                        <a className="text-[#33535F] font-bold" href="/usuarios">Usuarios</a>
                    </div>
                    <hr className="w-full text-gray-300" />
                </div>
                <div className="flex flex-col gap-3 max-h-full">
                    <div className="flex justify-between">
                        <p className="text-[#33535F] font-bold text-2xl">Listado de usuarios</p>
                        <button className="bg-[#379ABA] py-3 px-5 rounded-xl text-white flex gap-2 items-center" onClick={guardaruser}><i className="fa-solid fa-user-plus"></i> Nuevo usuario</button>
                    </div>
                    <div className="rounded-2xl overflow-y-auto shadow-lg">
                        <table className="w-full">
                            <thead className="bg-[#366796] text-white font-normal">
                                {
                                    table.getHeaderGroups().map((headergroup) => (
                                        <tr key={headergroup.id}>
                                            {
                                                headergroup.headers.map((header) => (
                                                    <th key={header.id} className="px-4 py-4 text-[#]">
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </th>
                                                ))
                                            }
                                            <th>Acciones</th>
                                        </tr>
                                    ))
                                }
                            </thead>
                            <tbody className="bg-[#F2F6FB]">
                                {
                                    table.getRowModel().rows.map(row => (
                                        <tr key={row.id} className={`text-[#6B7A7F] ${row.index % 2 === 0 ? "bg-[#F2F6FB]" : "bg-white"}`}>
                                            {
                                                row.getVisibleCells().map(cell => (
                                                    <td className="py-4 text-center" key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                            <td>
                                                <div className='flex gap-3 justify-center'>
                                                    <button onClick={() => { verMasDetalle(row.original) }}><i className="fa-solid fa-magnifying-glass" /></button>
                                                    <button onClick={() => { deleteuser(row.original.id) }}><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {usuarios.length === 0 && (
                            <p className="text-red-400 text-center italic">No hay datos para mostrar de momento</p>
                        )}
                    </div>
                </div>
            </div>
            <ModalUsuarios isOpen={newUser} onClose={() => { setNewUser(false) }} />
            <ModalMasDetalle user={user!} isOpen={masDetalle} onClose={() => { setMasDetalle(false) }} />
        </div>
    )
}