import { type FC } from "react";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import { useContext } from "react";

export interface TaskProps {
  id: string;
  title: string;
  workspaceId: string;
  boardId:string;
}

const Task: FC<TaskProps> = ({ id, title, workspaceId, boardId }) => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  return (
    <div className="task-card">
      <Button value="Delete task" onClick={() => context.taskCallbacks.delete(workspaceId, boardId, id)} />
      <Button value="Update task" onClick={() => context.taskCallbacks.update(workspaceId, boardId, id)} />
      {/*<p className="task-id">{id}</p>*/}
      <h3 className="task-title">{title}</h3>
    </div>
  );
};

export default Task;