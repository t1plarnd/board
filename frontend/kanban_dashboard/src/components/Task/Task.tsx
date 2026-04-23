import { type FC } from "react";
import Button from "../Botton/button";
import { AppContext } from "../../router/router";
import { useContext } from "react";

export interface TaskProps {
  id: string;
  title: string;
  workspaceId: string;
  boardId:string;
}

const Task: FC<TaskProps> = ({ id, title, workspaceId, boardId }) => {
  const { data, setData } = useContext(AppContext);

  const deleteTask = () => {
    const newData = structuredClone(data);
    const workspace = newData.workspaces.find((ws: any) => ws.id === workspaceId);
    const board = workspace.boards.find((b: any) => b.id === boardId);
    board.tasks.splice(id, 1);

    setData(newData);
  };

  return (
    <div className="task-card">
      <Button value="Delete task" onClick={deleteTask} />
      {/*<p className="task-id">{id}</p>*/}
      <h3 className="task-title">{title}</h3>
    </div>
  );
};

export default Task;