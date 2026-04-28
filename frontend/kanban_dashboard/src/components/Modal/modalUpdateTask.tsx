import { useContext, useState, type FC } from "react";
import Button from "../Button/button";
import { ModalContext } from "../../router/router";

interface ModalProps {
    visible: boolean;
}

const ModalUpdateTask: FC<ModalProps> = ({visible}) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    
    const modalContext = useContext(ModalContext);

    if (!visible || !modalContext) return null;

    const handleSubmit = () => {
        if (/[^a-z]/.test(inputValue)) {
            setError("Only lowercase letters are allowed");
            return;
        }
        if (inputValue.length < 5) {
            setError("Minimum length is 5 characters");
            return;
        }
        if (inputValue.length > 30) {
            setError("Maximum length is 30 characters");
            return;
        }
        setError(""); 
        
        modalContext.setName(inputValue);
        modalContext.setActionToUse("handleUpdateTask");
        modalContext.openModal("alert");
        
        setInputValue(""); 
    };

    return(
        <div className="myModal active">
            <div className="myModalContent">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={({target}) => {
                        setInputValue(target.value);
                        if (error) setError(""); 
                    }} />
                {error && <p style={{ color: "red", fontSize: "12px", margin: "5px 0" }}>{error}</p>}
                <Button value="submit" onClick={handleSubmit}/>
            </div>
        </div>
    );
}
export default ModalUpdateTask;