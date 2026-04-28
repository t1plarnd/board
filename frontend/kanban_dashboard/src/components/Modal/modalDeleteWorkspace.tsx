import { useContext, type FC } from "react";
import Button from "../Button/button";
import { ModalContext } from "../../router/router";


interface ModalProps{
    visible: boolean
}

const modalDeleteWorkspace: FC<ModalProps> = ({visible}) => {
    const modalContext = useContext(ModalContext)

    if (!visible || !modalContext) return null;

    return(
        <div className="myModal active">
            <div className="myModalContent">
                <Button value="submit" onClick={() => {
                    modalContext.setActionToUse("handleDeleteWorkspace")
                    modalContext.openModal("alert")
                    }}/>
            </div>
        </div>
    );
}
export default modalDeleteWorkspace;