import type {Workspace as WorkspaceInterface} from '../types/workspace.tsx';

export default interface AppWorkspaceContext{
  data: WorkspaceInterface[];
  workspaceCallbacks: {
    create: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
    update: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
    delete: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
  };
  boardCallbacks: {
    create: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
    update: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
    delete: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
  };
  taskCallbacks: {
    create: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
    update: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
    delete: (name: string, workspaceId: string, taskId: string, BoardId: string) => void;
  };
}