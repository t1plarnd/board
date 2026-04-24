import { useContext } from "react";
import { type FC } from "react";
import Task, { type TaskProps } from "../Task/Task";
import Button from "../Button/button";
import { AppContext } from "../../router/router";

export interface BoardProps {
  workspaceId: string;
  id: string;
  name: string;
  tasks: TaskProps[];
}

const Board: FC<BoardProps> = ({ workspaceId, id, name, tasks }) => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  return (
    <div className="board-column">
      {/*<p className="task-id">{id}</p>*/}
      <h1>{name}</h1>
      <Button value="Delete board" onClick={() => {context.boardCallbacks.delete(workspaceId, id)}} />
      <Button value="Update board" onClick={() => {context.boardCallbacks.update(workspaceId, id)}} />
      <Button value="Create task" onClick={() => {context.taskCallbacks.create(workspaceId, id)}} />
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