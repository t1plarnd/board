import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar/NavBar.tsx';
import Workspace from '../components/Workspace/Workspace.tsx';
import { useState, useEffect, createContext, useContext } from 'react';
import Button from '../components/Botton/button.tsx';

const defaultData = {
  "workspaces": [
    {
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
    }
  ]
};

export const AppContext = createContext<any>(null);

const rootRoute = createRootRoute({
  component: () => {
    const [data, setData] = useState(() => {
      const savedData = localStorage.getItem('my_kanban_data');
      return savedData ? JSON.parse(savedData) : defaultData;
    });

    useEffect(() => {
      localStorage.setItem('my_kanban_data', JSON.stringify(data));
    }, [data]);

    const createWorkspace = () => {
      const userTitle = window.prompt("Enter new workspace name:");
        if (!userTitle || userTitle.trim() === "") {
            return; 
        }
      const newData = structuredClone(data);
      newData.workspaces.push({ 
          id: `w_${Date.now()}`,
          name: userTitle,
          boards: [] 
      });

      setData(newData);
    };

    return (
      <AppContext.Provider value={{ data, setData }}>
        <div>
          <NavBar workspaces={data.workspaces} />
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
    const { data } = useContext(AppContext);
    const currentWorkspace = data.workspaces.find((ws: any) => ws.id === workspaceId);

    if (!currentWorkspace) return <div style={{textAlign: 'center', padding: '40px'}}>Workspace not exist yet</div>;

    return <Workspace id={currentWorkspace.id} name={currentWorkspace.name} boards={currentWorkspace.boards} />;
  },
});

const routeTree = rootRoute.addChildren([workspaceRoute]);
export const router = createRouter({ routeTree });