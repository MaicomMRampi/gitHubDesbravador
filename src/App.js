import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const [userName, setUsername] = useState()
  const [message, setMessage] = useState()
  const [messageTipo, setMessageTipo] = useState()
  console.log("🚀 ~ App ~ userName", userName)

  const buscaDados = async () => {
    try {
      const detailUser = await axios.get(`https://api.github.com/users/${userName}`)
      const reposiUser = await axios.get(`https://api.github.com/users/${userName}/repos`)

      if (detailUser.status === 200 && reposiUser.status === 200) {
        setMessage('Usuario encontrado, indo para detalhes ...')
        setMessageTipo('success')
        setTimeout(() => {
          navigate('/detalhesperfil', { state: { detailUser: detailUser.data, reposiUser: reposiUser.data } })
        }, 2000)
      }
      console.log("🚀 ~ buscaDados ~ detailUser", reposiUser)
    } catch (error) {
      setMessage('Usuario não encontrado.')
      setMessageTipo('error')
    }
    setTimeout(() => {
      setMessage('')
      setMessageTipo('')
    }, 3000)

  }


  return (
    <div className='w-full pt-8'>
      <h2 className='text-blue-500 font-bold text-4xl text-center'> GitBusca</h2>
      <p className='text-center text-default-400 py-2'>Pesquise e descubra perfis do GitHub com informações detalhadas</p>
      <div className="w-full px-4 sm:w-[80%] md:w-[60%] mx-auto bg-[#161b22] mt-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 p-6">
          {/* Campo de Input */}
          <div className="md:col-span-6">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite o username para pesquisar"
              startContent={<IoSearch />}
              className="w-full"
            />
          </div>

          {/* Botão de Buscar */}
          <div className="md:col-span-3 flex">
            <Button
              onClick={buscaDados}
              fullWidth
              className="text-white text-lg "
              color="success"
              endContent={<IoSearch size={21} />}
            >
              Buscar
            </Button>
          </div>
        </div>
      </div>

      <div className=' pt-4 w-[60%]  mx-auto'>
        {message ?
          (
            <Alert severity={messageTipo}>{message}</Alert>
          ) :
          null
        }
      </div>
    </div>
  );
}

export default App;
