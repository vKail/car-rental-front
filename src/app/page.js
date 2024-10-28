"use client";

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  // Estado para los datos de registro
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { email, password } }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.data.accessToken, { expires: 3 });
        Cookies.set('user', JSON.stringify(data.data.user), { expires: 3 });
        router.push('/Main');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante el login', error);
      alert('Hubo un error durante el login. Inténtalo de nuevo.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            lastname,
            address,
            phone,
            birthdate,
            username,
            email,
            password,
          },
        }),
      });

      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        setIsRegistering(false); // Cambia a la vista de login después de registrar
      } else {
        alert('Error en el registro. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error durante el registro', error);
      alert('Hubo un error durante el registro. Inténtalo de nuevo.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className={`bg-[#020201] flex ${isRegistering ? 'flex-col' : 'flex-row'} rounded-lg shadow-lg w-full max-w-4xl`}>
        {!isRegistering && (
          <div className="w-1/2">
            <img 
              src="https://img.freepik.com/foto-gratis/conduccion-automoviles-modernos-ciudad_23-2151674222.jpg"  
              alt="Imagen" 
              className="object-cover w-full h-full rounded-l-lg"
            />
          </div>
        )}
        <div className={`${isRegistering ? 'w-full' : 'w-1/2'} p-10`}>
          <h1 className="text-2xl font-bold text-[#c2c5cb] mb-8">
            {isRegistering ? 'Registro de Usuario' : 'RENT A CAR'}
          </h1>
          {isRegistering ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre"
                  className="w-1/2 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
                />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Apellido"
                  className="w-1/2 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
                />
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de Usuario"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
                />
                <span
                  className="absolute right-3 top-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-[#6f859b] text-white rounded hover:bg-[#c2c5cb] transition duration-200"
              >
                Registrar
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="w-full p-3 mt-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-200"
              >
                Volver al Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-[#c2c5cb] mb-2">Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-[#c2c5cb] mb-2">Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
                />
                <span
                  className="absolute right-3 top-14 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              <button
                type="submit"
                className="w-full p-3 mt-4 bg-[#6f859b] text-white rounded hover:bg-[#c2c5cb] transition duration-200"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="w-full p-3 mt-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-200"
              >
                Crear una cuenta
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
