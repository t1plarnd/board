import { useContext, type FC } from "react";
import Button from "../Button/button";
import { AppContext, ModalContext } from "../../router/router";

interface ModalAlProps{
    visible: boolean
}

const ModalAlert: FC<ModalAlProps> = ({visible}) => {
    const context = useContext(AppContext)
    const modalContext = useContext(ModalContext)

    if (!visible || !context || !modalContext) return null;

    const workspaceId = modalContext.workspaceId
    const taskId = modalContext.taskId
    const boardId = modalContext.boardId
    const name = modalContext.name

    let operation = (name: string, workspaceId: string, taskId: string, BoardId: string) => {}

    if(modalContext.actionToUse === "handleCreateWorkspace") operation = context.workspaceCallbacks.create
    if(modalContext.actionToUse === "handleCreateBoard") operation = context.boardCallbacks.create
    if(modalContext.actionToUse === "handleCreateTask") operation = context.taskCallbacks.create

    if(modalContext.actionToUse === "handleUpdateWorkspace") operation = context.workspaceCallbacks.update
    if(modalContext.actionToUse === "handleUpdateBoard") operation = context.boardCallbacks.update
    if(modalContext.actionToUse === "handleUpdateTask") operation = context.taskCallbacks.update

    if(modalContext.actionToUse === "handleDeleteWorkspace") operation = context.workspaceCallbacks.delete
    if(modalContext.actionToUse === "handleDeleteBoard") operation = context.boardCallbacks.delete
    if(modalContext.actionToUse === "handleDeleteTask") operation = context.taskCallbacks.delete

    return(
        <div className="myModalAl active">
            <div className="myModalContentAl">
                <h2>Are you sure to do this</h2>
                <Button value="Yes" onClick={() => {
                    operation(name, workspaceId, taskId, boardId)
                    modalContext.closeModal();
                    modalContext.setActionToUse("")
                    modalContext.setName("")
                    modalContext.setWorkspaceId("")
                    modalContext.setBoardId("")
                    modalContext.setTaskId("")
                }}/> 
                <Button value="No" onClick={() => {
                    modalContext.closeModal();
                }}/> 
            </div>
        </div>
    );
}
export default ModalAlert;