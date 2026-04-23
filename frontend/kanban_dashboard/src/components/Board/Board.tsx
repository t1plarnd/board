import { useContext } from "react";
import { type FC } from "react";
import Task, { type TaskProps } from "../Task/Task";
import Button from "../Botton/button";
import { AppContext } from "../../router/router";

export interface BoardProps {
  workspaceId: string;
  id: string;
  name: string;
  tasks: TaskProps[];
}

const Board: FC<BoardProps> = ({ workspaceId, id, name, tasks }) => {
  const { data, setData } = useContext(AppContext);

  const createTask = () => {
    const userTitle = window.prompt("Enter new task title:");
    if (!userTitle || userTitle.trim() === "") {
        return; 
    }

    const newData = structuredClone(data);
    const workspace = newData.workspaces.find((ws: any) => ws.id === workspaceId);
    const board = workspace.boards.find((b: any) => b.id === id);
    board.tasks.push({ 
        id: `t_${Date.now()}`, 
        title: userTitle
    });

    setData(newData);
};

  const deleteBoard = () => {
    const newData = structuredClone(data);
    const workspace = newData.workspaces.find((ws: any) => ws.id === workspaceId);
    workspace.boards.splice(id, 1);

    setData(newData);
  };

  return (
    <div className="board-column">
      {/*<p className="task-id">{id}</p>*/}
      <h1>{name}</h1>
      <Button value="Delete board" onClick={deleteBoard} />
      <Button value="Create task" onClick={createTask} />
      <div>
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            id={task.id}
            workspaceId={workspaceId}
            boardId={id} 
            title={task.title} 
          />
        ))}
      </div>
    </div>
  );
};

export default Board;