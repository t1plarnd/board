import { type FC } from "react";
import Button from "../Button/button";

interface ModalAlProps{
    onSuccess: () =>  void,
    onFailure: () =>  void,
}

const ModalAlert: FC<ModalAlProps> = ({onSuccess, onFailure}) => {
    

    return(
        <div className="myModalAl active">
            <div className="myModalContentAl">
                <h2>Are you sure to do this</h2>
                <Button value="Yes" onClick={onSuccess}/> 
                <Button value="No" onClick={onFailure}/> 
            </div>
        </div>
    );
}

export default ModalAlert;