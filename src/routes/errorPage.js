import React from 'react';
import imagem from '../img/imagem.svg';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
function ErrorPage() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className=" w-1/2 h-1/2 flex flex-col items-center justify-center text-white font-bold text-2xl">
                <div>
                    <img
                        src={imagem} // Caminho relativo a partir de public
                        alt="Página não encontrada"
                        className="max-w-96 h-96"
                    />
                </div>
                <div className=' flex flex-col gap-4'>
                    <h2 className='text-4xl text-black font-semibold'>Ops! Não encontramos essa página</h2>
                    <Link to="/" className="text-black">
                        <Button className='transform hover:-translate-y-1 hover:scale-110' fullWidth variant="contained" color="primary">
                            Página inicial
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;

