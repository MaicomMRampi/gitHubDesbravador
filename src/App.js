import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
function App() {
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
      }
      console.log("🚀 ~ buscaDados ~ detailUser", reposiUser)
    } catch (error) {
      setMessage('Usuario não encontrado.')
      setMessageTipo('error')
    }
  }


  return (
    <div className='w-full'>
      <h2 className='text-blue-500 font-bold text-4xl text-center'> GitBusca</h2>
      <p className='text-center text-default-400'>Pesquise e descubra perfis do GitHub com informações detalhadas</p>
      <div className='w-[60%]  mx-auto bg-[#161b22] mt-4 rounded-lg' >
        <div className='grid grid-cols-9 gap-4  p-6' >
          <div className='col-span-6 '>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Digite o username para pesquisar'
              startContent={<IoSearch />}
            />
          </div>
          <div className='col-span-3'>
            <Button onClick={buscaDados} fullWidth className='text-white text-lg justify-center flex' color='success' endContent={<IoSearch size={18} />} >Buscar</Button>
          </div>
        </div>
      </div>
      <div className=' pt-4 w-[60%]  mx-auto'>
        <Alert severity={messageTipo}>{message}</Alert>
      </div>
    </div>
  );
}

export default App;
