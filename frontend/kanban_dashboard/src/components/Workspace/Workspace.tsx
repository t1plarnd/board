import { useContext, type FC } from "react";
import Board from "../Board/Board";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import type { WorkspaceBoard } from "../../types/workspace";
import ModalUpdateWorkspace from "../Modal/modalUpdateWorkspace";
import ModalCreateBoard from "../Modal/modalCreateBoard";
import { ModalContext } from "../../contexts/ModalContext";
import ModalDeleteWorkspace from "../Modal/modalDeleteWorkspace";

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
                context.workspaceCallbacks.update(workspaceName, id)
                modalContext.handleCloseModal()
                }} />
    )}} />
            <Button value="Delete workspace" onClick={() => {modalContext.handleOpenModal(
               < ModalDeleteWorkspace  onSuccess={() => {
                context.workspaceCallbacks.delete(id)
                modalContext.handleCloseModal()
                }} />
    )}} />
            <Button value="Create board" onClick={() => {modalContext.handleOpenModal(
                <ModalCreateBoard  onSuccess={(boardName) => {
                context.boardCallbacks.create(boardName, id)
                modalContext.handleCloseModal()
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