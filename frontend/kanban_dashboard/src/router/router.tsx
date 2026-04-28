import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar/NavBar.tsx';
import Workspace from '../components/Workspace/Workspace.tsx';
import { useState, useEffect, createContext, useContext } from 'react';
import Button from '../components/Button/button.tsx';
import type { Workspace as WorkspaceInterface } from '../types/workspace.tsx';
import mockData from '../constants/mockData.ts';
import ModalAlert from '../components/Modal/modalAlert.tsx'; 
import ModalCreateWorkspace from '../components/Modal/modalCreateWorkspace.tsx';
import ModalCreateBoard from '../components/Modal/modalCreateBoard.tsx';
import ModalCreateTask from '../components/Modal/modalCreateTask.tsx';
import ModalUpdateWorkspace from '../components/Modal/modalUpdateWorkspace.tsx'; // Якщо є
import ModalUpdateBoard from '../components/Modal/modalUpdateBoard.tsx';
import ModalUpdateTask from '../components/Modal/modalUpdateTask.tsx'; // Якщо є
import ModalDeleteWorkspace from '../components/Modal/modalDeleteWorkspace.tsx'; // Якщо є
import ModalDeleteBoard from '../components/Modal/modalDeleteBoard.tsx';
import ModalDeleteTask from '../components/Modal/modalDeleteTask.tsx'; // Якщо є

import type AppWorkspaceContext from '../contexts/AppWorkspaceContext.tsx';
import type ModalContext from '../contexts/ModalContext.tsx';

const defaultData = mockData;

export const AppContext = createContext<AppWorkspaceContext | null>(null);
export const ModalContext = createContext<ModalContext | null>(null);

const rootRoute = createRootRoute({
  component: () => {
    const [data, setData] = useState(() => {
      const savedData = localStorage.getItem('my_kanban_data');
      return savedData ? JSON.parse(savedData) as WorkspaceInterface[]: defaultData;
    });

    useEffect(() => {
      localStorage.setItem('my_kanban_data', JSON.stringify(data));
    }, [data]);

    const handleCreateWorkspace = (name: string, workspaceId: string, taskId: string, boardId: string) => {
        if (!name || name.trim() === "") return; 
        setData((prev) => [
            ...prev, 
            { id: `w_${Date.now()}`, name: name, boards: [] }  
        ]);
    };
    const handlePatchWorkspace = (name: string, workspaceId: string, taskId: string, boardId: string) => {
        if (!name || name.trim() === "") return; 
        setData((prev) => prev.map((workspace) => 
            workspace.id === workspaceId ? { ...workspace, name: name } : workspace
        ));
    };
    const handleDeleteWorkspace = (name: string, workspaceId: string, taskId: string, boardId: string) => {
        setData((prev) => prev.filter((workspace) => workspace.id !== workspaceId));
    };

    const handleCreateBoard = (name: string, workspaceId: string, taskId: string, boardId: string) => {
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
    const handlePatchBoard = (name: string, workspaceId: string, taskId: string, boardId: string) => {
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
    const handleDeleteBoard = (name: string, workspaceId: string, taskId: string, boardId: string) => {
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

    const handleCreateTask = (name: string, workspaceId: string, taskId: string, boardId: string) => {
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
    const handlePatchTask = (name: string, workspaceId: string, taskId: string, boardId: string) => {
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
    const handleDeleteTask = (name: string, workspaceId: string, taskId: string, boardId: string) => {
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
    
    const [modalCreateWorkspaceState, setModalCreateWorkspaceState] = useState(false);
    const [modalCreateTaskState, setModalCreateTaskState] = useState(false);
    const [modalCreateBoardState, setModalCreateBoardState] = useState(false);

    const [modalUpdateWorkspaceState, setModalUpdateWorkspaceState] = useState(false);
    const [modalUpdateTaskState, setModalUpdateTaskState] = useState(false);
    const [modalUpdateBoardState, setModalUpdateBoardState] = useState(false);

    const [modalDeleteWorkspaceState, setModalDeleteWorkspaceState] = useState(false);
    const [modalDeleteTaskState, setModalDeleteTaskState] = useState(false);
    const [modalDeleteBoardState, setModalDeleteBoardState] = useState(false);

    const [modalAlertState, setModalAlertState] = useState(false);

    const [workspaceId, setWorkspaceId] = useState("")
    const [boardId, setBoardId] = useState("")
    const [taskId, setTaskId] = useState("")

    const [name, setName] = useState("");
    const [actionName, setActionName] = useState("");

    const closeModal = () => {
        setModalAlertState(false);
        
        setModalCreateWorkspaceState(false);
        setModalCreateBoardState(false);
        setModalCreateTaskState(false);
        
        setModalUpdateWorkspaceState(false);
        setModalUpdateBoardState(false);
        setModalUpdateTaskState(false);
        
        setModalDeleteWorkspaceState(false);
        setModalDeleteBoardState(false);
        setModalDeleteTaskState(false);
    }

    const openModal = (modalName: string) => {
        closeModal();

        if (modalName === 'createWorkspace') setModalCreateWorkspaceState(true);
        if (modalName === 'createBoard') setModalCreateBoardState(true);
        if (modalName === 'createTask') setModalCreateTaskState(true);

        if (modalName === 'updateWorkspace') setModalUpdateWorkspaceState(true);
        if (modalName === 'updateBoard') setModalUpdateBoardState(true);
        if (modalName === 'updateTask') setModalUpdateTaskState(true);
        
        if (modalName === 'deleteWorkspace') setModalDeleteWorkspaceState(true);
        if (modalName === 'deleteBoard') setModalDeleteBoardState(true);
        if (modalName === 'deleteTask') setModalDeleteTaskState(true);

        if (modalName === 'alert') setModalAlertState(true);
    }

    const setNameModal = (name: string) => setName(name);
    const setActionToUse = (name: string) => setActionName(name);
    const setWorkspaceIdf = (id: string) => setWorkspaceId(id);
    const setBoardIdf = (id: string) => setBoardId(id);
    const setTaskIdf = (id: string) => setTaskId(id);

    return (
      <AppContext.Provider value={{ 
        data, 
        boardCallbacks: {
          create: handleCreateBoard,
          update: handlePatchBoard,
          delete: handleDeleteBoard
        },
        workspaceCallbacks: {
          create: handleCreateWorkspace,
          update: handlePatchWorkspace,
          delete: handleDeleteWorkspace
        },
        taskCallbacks: {
          create: handleCreateTask,
          update: handlePatchTask,
          delete: handleDeleteTask
        } 
      }}>
        <ModalContext.Provider value={{
            name: name,
            actionToUse: actionName,

            modalAlertState: modalAlertState,

            modalCreateWorkspaceState: modalCreateWorkspaceState,
            modalCreateBoardState: modalCreateBoardState,
            modalCreateTaskState: modalCreateTaskState,
            
            modalPatchWorkspaceState: modalUpdateWorkspaceState,
            modalPatchBoardState: modalUpdateBoardState,
            modalPatchTaskState: modalUpdateTaskState,
            
            modalDeleteWorkspaceState: modalDeleteWorkspaceState,
            modalDeleteBoardState: modalDeleteBoardState,
            modalDeleteTaskState: modalDeleteTaskState,

            openModal: openModal,
            closeModal: closeModal,
            setName: setNameModal,
            setActionToUse: setActionToUse,

            workspaceId: workspaceId,
            boardId: boardId,
            taskId: taskId,

            setWorkspaceId: setWorkspaceIdf,
            setBoardId: setBoardIdf,
            setTaskId: setTaskIdf
        }}>
          <div>
            <NavBar workspaces={data} />
            <Button value='Create workspace' onClick={() => openModal("createWorkspace")}/>
            <Outlet />
            <ModalAlert visible={modalAlertState} />
            
            <ModalCreateWorkspace visible={modalCreateWorkspaceState} />
            <ModalCreateBoard visible={modalCreateBoardState} />
            <ModalCreateTask visible={modalCreateTaskState} />
            
            <ModalUpdateWorkspace visible={modalUpdateWorkspaceState} />
            <ModalUpdateBoard visible={modalUpdateBoardState} />
            <ModalUpdateTask visible={modalUpdateTaskState} />
            
            <ModalDeleteWorkspace visible={modalDeleteWorkspaceState} />
            <ModalDeleteBoard visible={modalDeleteBoardState} />
            <ModalDeleteTask visible={modalDeleteTaskState} />
          </div>
        </ModalContext.Provider>
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