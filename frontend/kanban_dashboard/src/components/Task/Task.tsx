export interface TaskProps {
  id: string;
  title: string;
}

const Task = ({ id, title }: TaskProps) => {
  return (
    <div className="task-card">
      <p className="task-id">{id}</p>
      <h3 className="task-title">{title}</h3>
    </div>
  );
};

export default Task;