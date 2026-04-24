import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar/NavBar.tsx';
import Workspace from '../components/Workspace/Workspace.tsx';
import { useState, useEffect, createContext, useContext } from 'react';
import Button from '../components/Button/button.tsx';
import type {Workspace as WorkspaceInterface} from '../types/workspace.tsx';

interface AppWorkspaceContext{
  data: WorkspaceInterface[];
  workspaceCallbacks: {
    create: (id: string) => void;
    update: (workspaceId: string) => void;
    delete: (workspaceId: string) => void;
  };
  boardCallbacks: {
    create: (workspaceId: string) => void;
    update: (workspaceId: string, boardId: string) => void;
    delete: (workspaceId: string, boardId: string) => void;
  };
  taskCallbacks: {
    create: (workspaceId: string, boardId: string) => void;
    update: (workspaceId: string, boardId: string, taskId: string) => void;
    delete: (workspaceId: string, boardId: string, taskId: string) => void;
  };
}

const defaultData: WorkspaceInterface[] = [{
      "id": "w1",
      "name": "Work",
      "boards": [
        {
          "id": "b1",
          "name": "Development",
          "tasks": [
            { "id": "t1", "title": "Setup project" },
            { "id": "t2", "title": "Implement auth" }
          ]
        }
      ]
    }]

export const AppContext = createContext<AppWorkspaceContext | null>(null);

const rootRoute = createRootRoute({
  component: () => {
    const [data, setData] = useState(() => {
      const savedData = localStorage.getItem('my_kanban_data');
      return savedData ? JSON.parse(savedData) as WorkspaceInterface[]: defaultData;
    });

    useEffect(() => {
      localStorage.setItem('my_kanban_data', JSON.stringify(data));
    }, [data]);

const createWorkspace = () => {
        const userTitle = window.prompt("Enter new workspace name:");
        if (!userTitle || userTitle.trim() === "") return; 
        
        setData((prev) => [
            ...prev, 
            { id: `w_${Date.now()}`, name: userTitle, boards: [] }
        ]);
    };

    const patchWorkspace = (workspaceId: string) => {
        const userTitle = window.prompt("Edit workspace name:");
        if (!userTitle || userTitle.trim() === "") return; 

        setData((prev) => prev.map((workspace) => 
            workspace.id === workspaceId 
                ? { ...workspace, name: userTitle } 
                : workspace
        ));
    };

    const deleteWorkspace = (workspaceId: string) => {
        setData((prev) => prev.filter((workspace) => workspace.id !== workspaceId));
    };

    const createBoard = (workspaceId: string) => {
        const userTitle = window.prompt("Enter new board name:");
        if (!userTitle || userTitle.trim() === "") return;

        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: [
                            ...workspace.boards,
                            { id: `b_${Date.now()}`, name: userTitle, tasks: [] }
                        ]
                    };
                }
                return workspace;
            })
        );
    };
    const patchBoard = (workspaceId: string, boardId: string) => {
        const userTitle = window.prompt("Edit board name:");
        if (!userTitle || userTitle.trim() === "") return;

        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.map((board) =>
                            board.id === boardId ? { ...board, name: userTitle } : board
                        )
                    };
                }
                return workspace;
            })
        );
    };
    const deleteBoard = (workspaceId: string, boardId: string) => {
        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.filter((board) => board.id !== boardId)
                    };
                }
                return workspace;
            })
        );
    };
    const createTask = (workspaceId: string, boardId: string) => {
        const userTitle = window.prompt("Enter new task title:");
        if (!userTitle || userTitle.trim() === "") return;

        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.map((board) => {
                            if (board.id === boardId) {
                                return {
                                    ...board,
                                    tasks: [
                                        ...board.tasks,
                                        { id: `t_${Date.now()}`, title: userTitle }
                                    ]
                                };
                            }
                            return board;
                        })
                    };
                }
                return workspace;
            })
        );
    };
    const patchTask = (workspaceId: string, boardId: string, taskId: string) => {
        const userTitle = window.prompt("Edit task title:");
        if (!userTitle || userTitle.trim() === "") return;

        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.map((board) => {
                            if (board.id === boardId) {
                                return {
                                    ...board,
                                    tasks: board.tasks.map((task) =>
                                        task.id === taskId ? { ...task, title: userTitle } : task
                                    )
                                };
                            }
                            return board;
                        })
                    };
                }
                return workspace;
            })
        );
    };
    const deleteTask = (workspaceId: string, boardId: string, taskId: string) => {
        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.map((board) => {
                            if (board.id === boardId) {
                                return {
                                    ...board,
                                    tasks: board.tasks.filter((task) => task.id !== taskId)
                                };
                            }
                            return board;
                        })
                    };
                }
                return workspace;
            })
        );
    };

    return (
      <AppContext.Provider value={{ 
        data, 
        boardCallbacks: {
          create: createBoard,
          update: patchBoard,
          delete: deleteBoard
          },
          workspaceCallbacks: {
          create: createWorkspace,
          update: patchWorkspace,
          delete: deleteWorkspace
          } ,
          taskCallbacks: {
          create: createTask,
          update: patchTask,
          delete: deleteTask
          } 
          
        }}>
        <div>
          <NavBar workspaces={data} />
          <Button value='Create workspace' onClick={createWorkspace}/>
          <Outlet />
        </div>
      </AppContext.Provider>
    );
  },
});

const workspaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workspace/$workspaceId',
  component: function WorkspaceViewer() {
    const { workspaceId } = workspaceRoute.useParams();
    const  rawData  = useContext(AppContext);
    const data = rawData?.data || []
    const currentWorkspace = data.find((ws) => ws.id === workspaceId);

    if (!currentWorkspace) return <div style={{textAlign: 'center', padding: '40px'}}>Workspace not exist yet</div>;

    return <Workspace id={currentWorkspace.id} name={currentWorkspace.name} boards={currentWorkspace.boards} />;
  },
});

const routeTree = rootRoute.addChildren([workspaceRoute]);
export const router = createRouter({ routeTree });