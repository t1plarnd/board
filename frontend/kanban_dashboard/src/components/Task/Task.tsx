import { type FC } from "react";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import { useContext } from "react";
import ModalDeleteTask from "../Modal/modalDeleteTask";
import ModalUpdateTask from "../Modal/modalUpdateTask";
import { ModalContext } from "../../contexts/ModalContext";
import ModalAlert from "../Modal/modalAlert";

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
                modalContext.handleCloseModal(<ModalAlert onFailure={modalContext.handleOnDecline} onSuccess={() => {
                  context.taskCallbacks.delete(workspaceId, boardId, id)
                  modalContext.handleOnDecline()
                }}/>)
                }}/>
  )}}/>
      <Button value="Update task" onClick={() => {modalContext.handleOpenModal(
          <ModalUpdateTask onSuccess={(taskName) => {
                modalContext.handleCloseModal(<ModalAlert onFailure={modalContext.handleOnDecline} onSuccess={() => {
                  context.taskCallbacks.update(taskName, workspaceId, boardId, id)
                  modalContext.handleOnDecline()
                }}/>)
                }}/>
  )}} />
      <h3 className="task-title">{title}</h3>
    </div>
  );
};

export default Task;