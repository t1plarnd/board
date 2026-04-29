import { useContext } from "react";
import { type FC } from "react";
import Task, { type TaskProps } from "../Task/Task";
import Button from "../Button/button";
import { AppContext } from "../../router/router";
import ModalDeleteBoard from "../Modal/modalDeleteBoard";
import ModalUpdateBoard from "../Modal/modalUpdateBoard";
import ModalCreateTask from "../Modal/modalCreateTask";
import { ModalContext } from "../../contexts/ModalContext";

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
      <Button value="Delete board" onClick={() => {modalContext.handleOpenModal(<ModalDeleteBoard onSuccess={() => {
                context.boardCallbacks.delete(workspaceId, id)
                modalContext.handleCloseModal()
                }}/>
  )}}/>
      <Button value="Update board" onClick={() => {modalContext.handleOpenModal(
        <ModalUpdateBoard onSuccess={(boardName) => {
                context.boardCallbacks.update(boardName, workspaceId, id)
                modalContext.handleCloseModal()
                }} />
  )}} />
      <Button value="Create task" onClick={() => {modalContext.handleOpenModal(
        <ModalCreateTask  onSuccess={(boardName) => {
                context.taskCallbacks.create(boardName, workspaceId, id)
                modalContext.handleCloseModal()
                }}/>
  )}} />
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