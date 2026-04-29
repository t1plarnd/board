import type {Workspace as WorkspaceInterface} from '../types/workspace.tsx';

export default interface AppWorkspaceContext{
  data: WorkspaceInterface[];
  workspaceCallbacks: {
    create: (name: string) => void;
    update: (name: string, workspaceId: string) => void;
    delete: (workspaceId: string) => void;
  };
  boardCallbacks: {
    create: (name: string, workspaceId: string) => void;
    update: (name: string, workspaceId: string, boardId: string) => void;
    delete: (workspaceId: string, boardId: string) => void;
  };
  taskCallbacks: {
    create: (name: string, workspaceId: string, boardId: string) => void;
    update: (name: string, workspaceId: string, boardId: string, taskId: string) => void;
    delete: (workspaceId: string, boardId: string, taskId: string) => void;
  };
}