"use client";
import { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('Login attempt:', { email, password })
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <form className='w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-200'>
                <div className='text-center'>
                    <h2 className='text-3xl font-bold text-slate-800'>Inicia Sesion</h2>
                    <p className='text-sm text-slate-500 mt-1'>
                        Bienvenido de vuelta a Own Vault
                    </p>
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='email'>Correo Electronico</Label>
                    <Input 
                        id='email'
                        type='email'
                        placeholder='tucorreo@ejemplo.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='password'>Contraseña</Label>
                    <Input 
                        id='password'
                        type='password'
                        placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type='submit' onClick={handleSubmit} className='w-full'>
                    Iniciar Sesion
                </Button>
                <p className='text-sm text-slate-500 text-center'>
                    No tienes una cuenta? {' '}
                    <Link href='/register' className='text-blue-500 hover:underline'>Registrate</Link>
                </p>
            </form>
        </main>
    );
};

export default LoginPage;
