import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar/NavBar.tsx';
import Workspace from '../components/Workspace/Workspace.tsx';
import { useState, useEffect, createContext, useContext } from 'react';
import Button from '../components/Button/button.tsx';
import type { Workspace as WorkspaceInterface } from '../types/workspace.tsx';
import mockData from '../constants/mockData.ts';

import ModalCreateWorkspace from '../components/Modal/modalCreateWorkspace.tsx';
import type AppWorkspaceContext from '../contexts/AppWorkspaceContext.tsx';
import { ModalContext, ModalContextWrapper } from '../contexts/ModalContext.tsx';

const defaultData = mockData;

export const AppContext = createContext<AppWorkspaceContext | null>(null);

const Root = () => {
    const { handleCloseModal, handleOpenModal } = useContext(ModalContext);
    const context = useContext(AppContext);

    return (
        <div>
            <NavBar workspaces={context?.data || []} />
            
            <Button value='Create workspace' onClick={() => {
                handleOpenModal(
                    <ModalCreateWorkspace onSuccess={(workspaceName) => {
                        context?.workspaceCallbacks.create(workspaceName);
                        handleCloseModal();
                    }}/>
                );
            }}/>
            
            <Outlet />
        </div>
    );
};

const rootRoute = createRootRoute({
  component: () => {
    const [data, setData] = useState(() => {
      const savedData = localStorage.getItem('my_kanban_data');
      return savedData ? JSON.parse(savedData) as WorkspaceInterface[]: defaultData;
    });

    useEffect(() => {
      localStorage.setItem('my_kanban_data', JSON.stringify(data));
    }, [data]);

    const handleCreateWorkspace = (name: string) => {
        if (!name || name.trim() === "") return; 
        setData((prev) => [
            ...prev, 
            { id: `w_${Date.now()}`, name: name, boards: [] }  
        ]);
    };
    const handleUpdateWorkspace = (name: string, workspaceId: string) => {
        if (!name || name.trim() === "") return; 
        setData((prev) => prev.map((workspace) => 
            workspace.id === workspaceId ? { ...workspace, name: name } : workspace
        ));
    };
    const handleDeleteWorkspace = (workspaceId: string) => {
        setData((prev) => prev.filter((workspace) => workspace.id !== workspaceId));
    };

    const handleCreateBoard = (name: string, workspaceId: string) => {
        if (!name || name.trim() === "") return;
        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: [...workspace.boards, { id: `b_${Date.now()}`, name: name, tasks: [] }]
                    };
                }
                return workspace;
            })
        );
    };
    const handleUpdateBoard = (name: string, workspaceId: string, boardId: string) => {
        if (!name || name.trim() === "") return;
        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.map((board) =>
                            board.id === boardId ? { ...board, name: name } : board
                        )
                    };
                }
                return workspace;
            })
        );
    };
    const handleDeleteBoard = (workspaceId: string, boardId: string) => {
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

    const handleCreateTask = (name: string, workspaceId: string, boardId: string) => {
        if (!name || name.trim() === "") return;
        setData((prev) =>
            prev.map((workspace) => {
                if (workspace.id === workspaceId) {
                    return {
                        ...workspace,
                        boards: workspace.boards.map((board) => {
                            if (board.id === boardId) {
                                return {
                                    ...board,
                                    tasks: [...board.tasks, { id: `t_${Date.now()}`, title: name }]
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
    const handleUpdateTask = (name: string, workspaceId: string, boardId: string, taskId: string) => {
        if (!name || name.trim() === "") return;
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
                                        task.id === taskId ? { ...task, title: name } : task
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
    const handleDeleteTask = (workspaceId: string, boardId: string, taskId: string) => {
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
          create: handleCreateBoard,
          update: handleUpdateBoard,
          delete: handleDeleteBoard
        },
        workspaceCallbacks: {
          create: handleCreateWorkspace,
          update: handleUpdateWorkspace,
          delete: handleDeleteWorkspace
        },
        taskCallbacks: {
          create: handleCreateTask,
          update: handleUpdateTask,
          delete: handleDeleteTask
        } 
      }}>
        <ModalContextWrapper>
          <Root />
        </ModalContextWrapper>
      </AppContext.Provider>
    );
  },
});

enum Route{
    WORKSPACES = "/workspace/$workspaceId"
}

const workspaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Route.WORKSPACES,
  component: function WorkspaceViewer() {
    const { workspaceId } = workspaceRoute.useParams();
    const  rawData  = useContext(AppContext);
    const data = rawData?.data || []
    const currentWorkspace = data.find((ws) => ws.id === workspaceId);

    if (!currentWorkspace) return <div style={{textAlign: 'center', padding: '40px'}}>Workspace not exist yet</div>;

    return( 
        <div>
            <Workspace id={currentWorkspace.id} name={currentWorkspace.name} boards={currentWorkspace.boards} />
        </div>
    );
  },
});

const routeTree = rootRoute.addChildren([workspaceRoute]);
export const router = createRouter({ routeTree });