"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try{
        const { email, password } = await request.json();
        if(!email || !password) {
            return NextResponse.json(
                { message: 'Email y contraseña son requeridos' },
                { status: 400 }
            );
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if(!user){
            return NextResponse.json(
                { message: 'No existe un usuario con ese email' },
                { status: 404 }
            );
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return NextResponse.json(
                { message: 'Contraseña incorrecta' },
                { status: 401 }
            );
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );
        const response = NextResponse.json({
            message: 'Inicio de sesion exitoso',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 25
        });
        return response;
    }catch(error){
        console.error('Error al iniciar sesion', error);
        return NextResponse.json(
            { message: 'Error al iniciar sesion' },
            { status: 500 }
        );
    };
};