import { useContext, type FC } from "react";
import Board from "../Board/Board";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import type { WorkspaceBoard } from "../../types/workspace";
import ModalUpdateWorkspace from "../Modal/modalUpdateWorkspace";
import ModalCreateBoard from "../Modal/modalCreateBoard";
import { ModalContext } from "../../contexts/ModalContext";
import ModalDeleteWorkspace from "../Modal/modalDeleteWorkspace";
import ModalAlert from "../Modal/modalAlert";

interface WorkspaceProps{
    id: string;
    name: string;
    boards: WorkspaceBoard[];
}

const Workspace: FC<WorkspaceProps> = ({id, name, boards}) => {
    const modalContext = useContext(ModalContext)
    const context = useContext(AppContext);
    
    if (!context || !modalContext) {
    return null;
    }

    return (
        <div className="workspace">
            <h1 className="workspace_data">{name}</h1>
            <Button value="Update workspace" onClick={() => {modalContext.handleOpenModal(
                <ModalUpdateWorkspace  onSuccess={(workspaceName) => {
                modalContext.handleCloseModal(<ModalAlert onFailure={modalContext.handleOnDecline} onSuccess={() => {
                    context.workspaceCallbacks.update(workspaceName, id)
                    modalContext.handleOnDecline()
                }}/>)
                }} />
    )}} />
            <Button value="Delete workspace" onClick={() => {modalContext.handleOpenModal(
               < ModalDeleteWorkspace  onSuccess={() => {
                modalContext.handleCloseModal(<ModalAlert onFailure={modalContext.handleOnDecline} onSuccess={() => {context.workspaceCallbacks.delete(id)
                modalContext.handleOnDecline()
                }}/>)
                }} />
    )}} />
            <Button value="Create board" onClick={() => {modalContext.handleOpenModal(
                <ModalCreateBoard  onSuccess={(boardName) => {
                modalContext.handleCloseModal(<ModalAlert onFailure={modalContext.handleOnDecline} onSuccess={() => {
                    context.boardCallbacks.create(boardName, id)
                    modalContext.handleOnDecline()
                }}/>)
                }} />
    )}} />
            <div className="kanban-container">
            {boards.map((board) => { 
                const boardId = board.id
                const workspaceId = id;
                const data = board.tasks
                const newData = data.map((task) => {
                    return {
                        ...task,
                        workspaceId,
                        boardId
                    };
                });
                return(
                    <Board 
                    key={board.id}
                    workspaceId={id} 
                    id={board.id} 
                    name={board.name} 
                    tasks={newData}
                    />
            )})}
            </div>
        </div>
    );
}

export default Workspace;