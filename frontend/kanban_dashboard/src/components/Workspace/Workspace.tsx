import { useContext, type FC } from "react";
import Board, { type BoardProps } from "../Board/Board";
import Button from "../Botton/button";
import { AppContext } from "../../router/router";

interface WorkspaceProps{
    id: string;
    name: string;
    boards: BoardProps[];
}

const Workspace: FC<WorkspaceProps> = ({id, name, boards}) => {
    const { data, setData } = useContext(AppContext);

    const createBoard = () => {
        const userTitle = window.prompt("Enter new board name:");
        if (!userTitle || userTitle.trim() === "") {
            return; 
        }

        const newData = structuredClone(data);
        const workspace = newData.workspaces.find((ws: any) => ws.id === id);
        workspace.boards.push({
            id: `t_${Date.now()}`,
            name: userTitle,
            tasks: []
        })

        setData(newData);
    };
    const deleteWorkspace = () => {
        const newData = structuredClone(data);
        newData.workspaces.splice(id, 1)

        setData(newData);
    };

    return (
        <div className="workspace">
            {/*<p className="task-id">{id}</p>*/}
            <h1 className="workspace_data">{name}</h1>
            <Button value="Create board" onClick={createBoard} />
            <Button value="Delete workspace" onClick={deleteWorkspace} />
            <div className="kanban-container">
            {boards.map((board) => (
            <Board 
                key={board.id}
                workspaceId={id} 
                id={board.id} 
                name={board.name} 
                tasks={board.tasks}
            />
            ))}
            </div>
        </div>
    );
}

export default Workspace;