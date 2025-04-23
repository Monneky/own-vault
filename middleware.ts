import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('token')?.value;
    if(!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    }catch(error){
        console.log('Error > ', error);
        return NextResponse.redirect(new URL('/login', request.url));
    };
};

export const config = {
    matcher: [
        // Proteger todo EXCEPTO la página principal
        '/((?!^$|login|register|publico|favicon.ico|_next|api).*)',
    ],
};