import { useState, type FC } from "react";
import Button from "../Button/button";

interface ModalProps {
    onSuccess: (boardName: string) => void
}

const ModalCreateBoard: FC<ModalProps> = ({onSuccess}) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

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
        onSuccess(inputValue)
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

export default ModalCreateBoard;