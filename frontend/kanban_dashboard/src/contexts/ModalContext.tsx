import { createContext, useState, type FC, type ReactNode } from "react"

export interface ModalContext{
    handleOpenModal: (modalComponent: ReactNode) => void,
    handleCloseModal: () => void,
}

export const ModalContext = createContext<ModalContext >({} as ModalContext);

export const ModalContextWrapper: FC<{children: ReactNode}> = ({children}) => {
    const [isOpen, setOpen] = useState(false)
    const [modalComponent, setModalComponent] = useState<ReactNode | null>(null)    

    const handleOpenModal = (modalComponent: ReactNode) =>{
        setModalComponent(modalComponent)
        setOpen(true)
    }
    const handleCloseModal = () =>{
        setOpen(false)
        setModalComponent(null)
    }
    
    return(
        <ModalContext.Provider value={{
            handleOpenModal,
            handleCloseModal
        }}>
            {isOpen && modalComponent}
            {children}
        </ModalContext.Provider>
        
    );
}