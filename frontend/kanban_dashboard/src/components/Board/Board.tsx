import { useContext } from "react";
import { type FC } from "react";
import Task, { type TaskProps } from "../Task/Task";
import Button from "../Button/button";
import { AppContext, ModalContext } from "../../router/router";

export interface BoardProps {
  workspaceId: string;
  id: string;
  name: string;
  tasks: TaskProps[];
}

const Board: FC<BoardProps> = ({ workspaceId, id, name, tasks }) => {
  const modalContext = useContext(ModalContext);
  const context = useContext(AppContext);

  if (!context || !modalContext) {
    return null;
  }

  return (
    <div className="board-column">
      <h1>{name}</h1>
      <Button value="Delete board" onClick={() => {
        modalContext.setBoardId(id)
        modalContext.setTaskId("")
        modalContext.setWorkspaceId(workspaceId)
        modalContext.openModal("deleteBoard")
      }} />
      <Button value="Update board" onClick={() => {
        modalContext.setBoardId(id)
        modalContext.setTaskId("")
        modalContext.setWorkspaceId(workspaceId)
        modalContext.openModal("updateBoard")
      }} />
      <Button value="Create task" onClick={() => {
        modalContext.setBoardId(id)
        modalContext.setTaskId("")
        modalContext.setWorkspaceId(workspaceId)
        modalContext.openModal("createTask")
      }} />
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