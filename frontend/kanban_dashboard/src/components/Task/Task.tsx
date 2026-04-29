import { type FC } from "react";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import { useContext } from "react";
import ModalDeleteTask from "../Modal/modalDeleteTask";
import ModalUpdateTask from "../Modal/modalUpdateTask";
import { ModalContext } from "../../contexts/ModalContext";

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
      <Button value="Delete task" onClick={() =>  {modalContext.handleOpenModal(
          <ModalDeleteTask onSuccess={() => {
                context.taskCallbacks.delete(workspaceId, boardId, id)
                modalContext.handleCloseModal()
                }}/>
  )}}/>
      <Button value="Update task" onClick={() => {modalContext.handleOpenModal(
          <ModalUpdateTask onSuccess={(taskName) => {
                context.taskCallbacks.update(taskName, workspaceId, boardId, id)
                modalContext.handleCloseModal()
                }}/>
  )}} />
      <h3 className="task-title">{title}</h3>
    </div>
  );
};

export default Task;