import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
// icones de linguagens
import { FaHtml5 } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { BsFiletypeCss } from "react-icons/bs";
import { RiJavascriptFill } from "react-icons/ri";

function DetailsPerfil() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["estrelas_asc"]));
    const location = useLocation();
    const { detailUser, reposiUser } = location.state || {};
    const [languages, setLanguages] = useState({});


    // Ordenar repositórios conforme o critério selecionado no dropdown

    const sortedRepos = useMemo(() => {
        if (!Array.isArray(reposiUser)) return [];
        let sortedArray = [...reposiUser];

        if (selectedKeys.has("estrelas_asc")) {
            // Ordenar por estrelas em ordem crescente
            sortedArray = sortedArray.sort((a, b) => a.stargazers_count - b.stargazers_count);
        } else if (selectedKeys.has("estrelas_desc")) {
            // Ordenar por estrelas em ordem decrescente
            sortedArray = sortedArray.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } else if (selectedKeys.has("nome")) {
            // Ordenar por nome 
            sortedArray = sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedKeys.has("data")) {
            // Ordenar por data de criação
            sortedArray = sortedArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (selectedKeys.has("iteracao")) {
            //interação
            sortedArray = sortedArray.sort(); // Ajuste conforme necessidade
        }
        return sortedArray;
    }, [reposiUser, selectedKeys]);


    // Função para buscar linguagens de um repositório usando axios
    const buscaLinguagens = async (repoFullName) => {
        try {
            const response = await axios.get(`https://api.github.com/repos/${repoFullName}/languages`);
            setLanguages((prev) => ({
                ...prev,
                [repoFullName]: response.data
            }));
        } catch (error) {
            console.error("Erro ao buscar linguagens", error);
        }
    };

    useEffect(() => {
        if (Array.isArray(reposiUser)) {
            reposiUser.forEach((repo) => {
                buscaLinguagens(repo.full_name);
            });
        }
    }, [reposiUser]);

    if (!detailUser || !reposiUser) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center p-6">
                <h1 className="text-3xl font-bold text-blue-500 mb-4">
                    Você não tem acesso a esta página
                </h1>
                <p className="text-lg text-gray-600">
                    Dados do usuário ou repositórios não encontrados.
                </p>
                <p className="text-lg text-gray-600">
                    Faça uma busca na página inicial
                </p>
            </div>
        );
    }



    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Detalhes do Usuário</h1>

            {/* Dados do Usuário */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <img
                    src={detailUser.avatar_url}
                    alt={detailUser.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-center text-blue-500">
                    {detailUser.name || 'Nome não disponível'}
                </h2>
                <p className="text-center text-gray-600">
                    {detailUser.bio || 'Sem descrição disponível.'}
                </p>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    <p>
                        <strong>Seguidores:</strong> {detailUser.followers}
                    </p>
                    <p>
                        <strong>Seguindo:</strong> {detailUser.following}
                    </p>
                    <p>
                        <strong>Repositórios Públicos:</strong> {detailUser.public_repos}
                    </p>
                </div>
            </div>

            {/* Repositórios do usuário */}
            <div className="mt-8 w-full max-w-3xl">
                <p className="py-2 font-bold text-lg text-center text-gray-800 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg ">
                    Repositórios
                </p>
                <p className='py-6'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered">Ordenação</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <DropdownItem key="estrelas_asc">Estrelas ascentende</DropdownItem>
                            <DropdownItem key="estrelas_desc">Estrelas decrescente</DropdownItem>
                            <DropdownItem key="nome">Nome</DropdownItem>
                            <DropdownItem key="data">Data</DropdownItem>
                            <DropdownItem key="iteracao">Iteração</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedRepos.map((repo) => (
                        <div key={repo.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 hover:bg-gray-100 transition duration-300"
                            >
                                <h3 className="text-lg font-semibold text-blue-500 mb-2">{repo.name}</h3>
                                <p className="text-gray-600 mb-4">{repo.description || 'Sem descrição.'}</p>

                                <div className="text-sm text-gray-500">
                                    <p className="mb-1">
                                        <strong>Estrelas:</strong> {repo.stargazers_count}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Observadores:</strong> {repo.watchers_count}
                                    </p>
                                    <p className="mt-2">
                                        <strong>Linguagens:</strong>
                                        {languages[repo.full_name] ? (
                                            <ul className="mt-1">
                                                {Object.keys(languages[repo.full_name]).map((lang) => (
                                                    <li key={lang} className="text-gray-600 flex items-center">
                                                        {/* Condição para exibir ícone correspondente à linguagem */}
                                                        {lang === 'HTML' ? (
                                                            <>
                                                                <FaHtml5 className="mr-2 text-red-500" /> HTML
                                                            </>
                                                        ) : lang === 'CSS' ? (
                                                            <>
                                                                <BsFiletypeCss className="mr-2 text-blue-500" /> CSS
                                                            </>
                                                        ) : lang === 'JavaScript' ? (
                                                            <>
                                                                <RiJavascriptFill className="mr-2 text-yellow-500" /> JavaScript
                                                            </>
                                                        ) : lang === 'TypeScript' ? (
                                                            <>
                                                                <SiTypescript className="mr-2 text-blue-500" /> TypeScript
                                                            </>
                                                        ) : (
                                                            lang
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>Carregando...</span>
                                        )}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailsPerfil;
