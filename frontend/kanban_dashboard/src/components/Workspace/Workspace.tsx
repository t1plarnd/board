import { useContext, type FC } from "react";
import Board from "../Board/Board";
import Button from "../Button/button";
import { AppContext, ModalContext } from "../../router/router";
import type { WorkspaceBoard } from "../../types/workspace";

interface WorkspaceProps{
    id: string;
    name: string;
    boards: WorkspaceBoard[];
}

const Workspace: FC<WorkspaceProps> = ({id, name, boards}) => {
    const modalContext = useContext(ModalContext);
    const context = useContext(AppContext);

    if (!context || !modalContext) {
        return null;
    }

    return (
        <div className="workspace">
            <h1 className="workspace_data">{name}</h1>
            <Button value="Update workspace" onClick={() => {
                modalContext.setBoardId("")
                modalContext.setTaskId("")
                modalContext.setWorkspaceId(id)
                modalContext.openModal("updateWorkspace")
            }} />
            <Button value="Delete workspace" onClick={() => {
                modalContext.setBoardId("")
                modalContext.setTaskId("")
                modalContext.setWorkspaceId(id)
                modalContext.openModal("deleteWorkspace")
            }} />
            <Button value="Create board" onClick={() => {
                modalContext.setBoardId("")
                modalContext.setTaskId("")
                modalContext.setWorkspaceId(id)
                modalContext.openModal("createBoard")
            }} />
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