import { createContext, useState, type FC, type ReactNode } from "react"

export interface ModalContext{
    handleOpenModal: (modalComponent: ReactNode) => void,
    handleCloseModal: (modalComponent: ReactNode) => void,
    handleOnDecline: () => void,
}

export const ModalContext = createContext<ModalContext >({} as ModalContext);

export const ModalContextWrapper: FC<{children: ReactNode}> = ({children}) => {
    const [isOpen, setOpen] = useState(false)
    const [alertState, setAlertState] = useState(false)
    const [modalComponent, setModalComponent] = useState<ReactNode | null>(null)    

    const handleOpenModal = (modalComponent: ReactNode) =>{
        setModalComponent(modalComponent)
        setOpen(true)
    }
    const handleCloseModal = (modalComponent: ReactNode) =>{
        setOpen(false)
        setAlertState(true)
        setModalComponent(modalComponent)
    }
    const handleOnDecline = () =>{
        setModalComponent(null)
        setAlertState(false)
    }

    
    return(
        <ModalContext.Provider value={{
            handleOpenModal,
            handleCloseModal,
            handleOnDecline
        }}>
            {isOpen && modalComponent || alertState && modalComponent}
            {children}
        </ModalContext.Provider>
        
    );
}