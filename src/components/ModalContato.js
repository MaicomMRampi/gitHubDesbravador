import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
export default function App({ isOpen, onClose }) {


    return (
        <>

            <Modal
                placement="center"
                backdrop="opaque"
                isOpen={isOpen}
                onClose={onClose}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">  Entre em contato comigo</ModalHeader>
                            <ModalBody>
                                <div className="w-full flex flex-col gap-5  ">
                                    <div className='flex flex-col gap-6'>
                                        <Link to="https://wa.me/5554996127563" target="_blank">
                                            <span className="flex items-center gap-3 ">
                                                <FaWhatsapp size={22} color="white" /> (54) 99612-7563
                                            </span>
                                        </Link>
                                        <Link to='mailto:maicom.mateus@yahoo.com.br'>
                                            <span className="flex items-center gap-3 ">
                                                <div><MdOutlineMailOutline color="white" size={25} /> </div>maicom.mateus@yahoo.com.br / maicom.azus@gmail.com
                                            </span>
                                        </Link>
                                        <Link to='https://www.facebook.com/maicom.rampi.1/' target="_blank">
                                            <span className="flex items-center gap-3 ">
                                                <div><CiFacebook color="white" size={25} /> </div>Maicom Mateus Rampi
                                            </span>
                                        </Link>
                                        <Link to='https://www.linkedin.com/in/maicom-rampi-152680173' target="_blank">
                                            <span className="flex items-center gap-3 ">
                                                <div><FaLinkedin color="white" size={25} /> </div>Linkedin
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}