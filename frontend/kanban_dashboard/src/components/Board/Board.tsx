import Task, { type TaskProps } from "../Task/Task";

export interface BoardProps {
  id: string;
  name: string;
  tasks: TaskProps[];
}

const Board = ({ id, name, tasks }: BoardProps) => {
  return (
    <div className="board-column">
      <p className="task-id">{id}</p>
      <h1>{name}</h1>
      
      <div>
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            id={task.id} 
            title={task.title} 
          />
        ))}
      </div>
    </div>
  );
};

export default Board;