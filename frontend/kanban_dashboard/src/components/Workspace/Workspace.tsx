import { useContext, type FC } from "react";
import Board from "../Board/Board";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import type { WorkspaceBoard } from "../../types/workspace";

interface WorkspaceProps{
    id: string;
    name: string;
    boards: WorkspaceBoard[];
}

const Workspace: FC<WorkspaceProps> = ({id, name, boards}) => {
    const context = useContext(AppContext);
    if (!context) {
        return null;
    }

    return (
        <div className="workspace">
            {/*<p className="task-id">{id}</p>*/}
            <h1 className="workspace_data">{name}</h1>
            <Button value="Update workspace" onClick={() => context.workspaceCallbacks.update(id)} />
            <Button value="Delete workspace" onClick={() => context.workspaceCallbacks.delete(id)} />
            <Button value="Create board" onClick={() => {context.boardCallbacks.create(id)}} />
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