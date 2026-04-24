export interface WorkspaceTask{
  id: string;
  title: string;
}
export interface WorkspaceBoard{
  id: string;
  name: string;
  tasks: WorkspaceTask[];
}
export interface Workspace{
  id: string;
  name: string;
  boards: WorkspaceBoard[];
}