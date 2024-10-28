const urlBase = "http://localhost:3001/cars";

export const getAllCars = async () => {
    const response = await fetch(urlBase, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const getCarById = async (id)=> {
    const response = await fetch(`${urlBase}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}; 

export const addCar = async (car) => {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
    const data = await response.json();
    return data;
};

export const updateCar = async (car) => {
    const response = await fetch(`${urlBase}/${car.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
    const data = await response.json();
    return data;
};

export const deleteCar = async (id) => {
    const response = await fetch(`${urlBase}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const reserveCar = async (id) => {
    const response = await fetch(`${urlBase}/reserve/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const cancelReservation = async (id) => {
    const response = await fetch(`${urlBase}/cancel-reservation/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const getAvailableCars = async () => {
    const response = await fetch(`${urlBase}/available`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const getReservedCars = async () => {
    const response = await fetch(`${urlBase}/reserved`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

