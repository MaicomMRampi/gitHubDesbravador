import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useLocation } from "react-router-dom";
import ModalContato from "./ModalContato";
import logo from "../img/logo-menu.png";
export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log("🚀 ~ App ~ isMenuOpen", isMenuOpen)
    const [mounted, setMounted] = useState(false)
    const rotaAtual = location.pathname
    console.log("🚀 ~ App ~ rotaAtual", rotaAtual)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const alteraTema = (modo) => {
        console.log("🚀 ~ alteraTema ~ modo", modo)
        setTheme(modo);
    }

    const openMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const menuItems = [
        {
            id: 1,
            paginaNome: "Inicio",
            rota: "/",
        },
        {
            id: 2,
            paginaNome: "Detalhes Perfil",
            rota: "/detalhesperfil",
        },
        {
            id: 3,
            paginaNome: "Contato",
            rota: "",
        }
    ];

    return (
        <Navbar className="py-4 bg-[#636364]" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <img className="mr-3 w-32 p-3" src={logo} alt="logo" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    {theme === "dark" ? <MdDarkMode onClick={() => alteraTema('light')} size={20} /> : < MdOutlineLightMode onClick={() => alteraTema('dark')} size={20} />}
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/">
                        <span className={rotaAtual === "/" ? "text-blue-500" : "text-white"}>Início</span>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/detalhesperfil">
                        <span className={rotaAtual === "/detalhesperfil" ? "text-blue-500" : "text-white"}>   Detalhes Perfil</span>
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <span onClick={() => openMenu()} className={rotaAtual === "/contato" ? "text-blue-500 cursor-pointer" : "cursor-pointer"}>Contato</span>
                </NavbarItem>
            </NavbarContent>
            {/* <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent> */}
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.id}-${index}`}>
                        {index === 2 ? (
                            <span onClick={() => openMenu()} className="cursor-pointer text-blue-500">{item.paginaNome}</span>
                        ) : (
                            <Link
                                className="w-full"
                                href={item.rota}
                                size="lg"
                            >
                                {item.paginaNome}
                            </Link>
                        )}
                    </NavbarMenuItem>
                ))}

            </NavbarMenu>
            <ModalContato
                onClose={() => openMenu()}
                isOpen={menuOpen}
            />
        </Navbar>

    );
}
