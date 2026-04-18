import Board, { type BoardProps } from "../Board/Board";

interface WorkspaceProps{
    id: string;
    name: string;
    boards: BoardProps[];
}

const Workspace = ({id, name, boards}: WorkspaceProps) =>{
    return (
        <div className="workspace">
            <p className="task-id">{id}</p>
            <h1 className="workspace_data">{name}</h1>
            <div className="kanban-container">
            {boards.map((board) => (
            <Board 
                key={board.id} 
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