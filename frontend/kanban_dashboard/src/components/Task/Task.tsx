import { type FC } from "react";
import Button from "../Button/button";
import { AppContext, ModalContext } from "../../router/router";
import { useContext } from "react";

export interface TaskProps {
  id: string;
  title: string;
  workspaceId: string;
  boardId:string;
}

const Task: FC<TaskProps> = ({ id, title, workspaceId, boardId }) => {
  const modalContext = useContext(ModalContext);
  const context = useContext(AppContext);
  if (!context || !modalContext) {
    return null;
  }

  return (
    <div className="task-card">
      <Button value="Delete task" onClick={() =>  {
        modalContext.setBoardId(boardId)
        modalContext.setTaskId(id)
        modalContext.setWorkspaceId(workspaceId)
        modalContext.openModal("deleteTask")
        }}/>
      <Button value="Update task" onClick={() => {
        modalContext.setBoardId(boardId)
        modalContext.setTaskId(id)
        modalContext.setWorkspaceId(workspaceId)
        modalContext.openModal("updateTask")
      }} />
      <h3 className="task-title">{title}</h3>
    </div>
  );
};

export default Task;