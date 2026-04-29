import { type FC } from "react";
import Button from "../Button/button";


interface ModalProps{
    onSuccess: () => void
}

const ModalDeleteBoard: FC<ModalProps> = ({onSuccess}) => {
    return(
        <div className="myModal active">
            <div className="myModalContent">
                <Button value="submit" onClick={onSuccess}/>
            </div>
        </div>
    );
}

export default ModalDeleteBoard;