'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        try{
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            setSuccess(true);
            setEmail('');
            setName('');
            setPassword('');
        }catch(err) {
            if(axios.isAxiosError(err)) {
                if(err.response && err.response.data?.message) {
                    setError(err.response.data.message);
                }else {
                    setError('Ocurrió un error al registrar el usuario');
                }
            }else {
                setError('Ocurrió un error al registrar el usuario');
            }
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                {success && (
                    <p className="text-sm text-green-500 text-center">Registro exitoso ✅</p>
                )}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Crea tu cuenta</h1>
                    <p className="text-sm text-slate-500 mt-1">Regístratte en Own Vault</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                        id="email"
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input 
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>       
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button className="w-full" type="submit">Registrarme</Button>
                <p className="text-sm text-center text-slate-500">
                    ¿Ya tienes cuenta? {' '}
                    <Link href="/login" className="text-blue-500 hover:text-blue-600">Inicia sesión</Link>
                </p>
            </form>
        </main>
    )
}

export default Register;