/* eslint-disable @next/next/no-img-element */
"use client";

import FormCreateCar from "./FormCreateCar";
import CarDetailsModal from "./CarDetailsModal";
import CarsLoader from "../ui/loaders/CarsLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getAllCars } from "../../hooks/carsServices";
import { useState } from "react";
import useSWR from "swr";

export default function CarsTabs() {
    const { data: cars, error, mutate } = useSWR('/cars', getAllCars);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 9;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const openModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    // Manejo de errores y estado de carga
    if (!cars) return <div className="w-full flex justify-center items-center h-full"><CarsLoader /></div>;
    if (error) return <div>Failed to load cars</div>;

    // Filtrar los autos según el query de búsqueda
    const filteredCars = cars.filter((car) =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery)
    );

    // Variables para el paginador
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    return (
        <Tabs defaultValue={"cars"} className="px-12 py-8">
            <TabsList>
                {<TabsTrigger value="cars">Cars</TabsTrigger>}
            </TabsList>

            <TabsContent value="cars">
                <div className="text-black p-8">

                    <h2 className="text-2xl font-bold mb-6">Cars</h2>

                    {/* Boton para crear un nuevo auto */}
                    <button
                        onClick={openCreateModal}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
                    >
                        Add New Car
                    </button>

                    {/* Input para el buscador */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by model or description"
                        className="mb-6 p-2 border rounded w-full"
                    />

                    {/* Grid de tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentCars.map((car) => (
                            <div key={car.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex">
                                {/* Imagen */}
                                <div className="w-1/3">
                                    {car.image && (
                                        <img
                                            src={`data:image/png;base64,${Buffer.from(car.image.data).toString('base64')}`}
                                            alt="Car Image"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                {/* Contenido */}
                                <div className="w-2/3 p-4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
                                        <p className="text-gray-700 mb-4">{car.description}</p>
                                    </div>
                                    {/* Botones */}
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => openModal(car)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                        >
                                            More Information
                                        </button>
                                        <button
                                            onClick={() => {/* Función para eliminar */ }}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        >
                                            Disable
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginador */}
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'} font-bold rounded`}
                        >
                            Previous
                        </button>
                        <p>
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'} font-bold rounded`}
                        >
                            Next
                        </button>
                    </div>

                    {/* Modales */}
                    {isModalOpen && selectedCar && (
                        <CarDetailsModal
                            car={selectedCar}
                            onClose={closeModal}
                            mutate={mutate}
                        />
                    )}
                    {isCreateModalOpen && (
                        <FormCreateCar
                            onClose={closeCreateModal}
                            mutate={mutate}
                        />
                    )}
                </div>
            </TabsContent>
        </Tabs>
    );
}
