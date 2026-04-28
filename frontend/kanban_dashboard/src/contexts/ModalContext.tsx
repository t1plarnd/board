
export default interface ModalContext{
    name: string
    actionToUse: string
        
    modalAlertState: boolean
    modalCreateWorkspaceState: boolean
    modalCreateBoardState: boolean
    modalCreateTaskState: boolean
    
    modalPatchWorkspaceState: boolean
    modalPatchBoardState: boolean
    modalPatchTaskState: boolean

    modalDeleteWorkspaceState: boolean
    modalDeleteBoardState: boolean
    modalDeleteTaskState: boolean

    workspaceId: string
    boardId: string
    taskId: string

    openModal: (modalName: string) => void;
    closeModal: () => void;
    
    setName: (name: string) => void;
    setActionToUse: (name: string) => void;

    setWorkspaceId: (id: string) => void;
    setBoardId: (id: string) => void;
    setTaskId: (id: string) => void;
}
