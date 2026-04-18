  import { 
  createRootRoute, 
  createRoute, 
  createRouter, 
  RouterProvider, 
  Outlet, 
  Link 
} from '@tanstack/react-router';
import Workspace from "./components/Workspace/Workspace";
import "./App.css";

const data = {
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
            { "id": "t2", "title": "Implement auth" },
            { "id": "t3", "title": "Fix bugs" }
          ]
        },
        {
          "id": "b2",
          "name": "Design",
          "tasks": [
            { "id": "t4", "title": "Create UI kit" },
            { "id": "t5", "title": "Landing page" }
          ]
        }
      ]
    },
    {
      "id": "w2",
      "name": "Work",
      "boards": [
        {
          "id": "b1",
          "name": "Development",
          "tasks": [
            { "id": "t1", "title": "Setup project" },
            { "id": "t2", "title": "Implement auth" },
            { "id": "t3", "title": "Fix bugs" }
          ]
        },
        {
          "id": "b2",
          "name": "Design",
          "tasks": [
            { "id": "t4", "title": "Create UI kit" },
            { "id": "t5", "title": "Landing page" }
          ]
        }
      ]
    },
    {
      "id": "w3",
      "name": "Work",
      "boards": [
        {
          "id": "b1",
          "name": "Development",
          "tasks": [
            { "id": "t1", "title": "Setup project" },
            { "id": "t2", "title": "Implement auth" },
            { "id": "t3", "title": "Fix bugs" }
          ]
        },
        {
          "id": "b2",
          "name": "Design",
          "tasks": [
            { "id": "t4", "title": "Create UI kit" },
            { "id": "t5", "title": "Landing page" }
          ]
        }
      ]
    },
    {
      "id": "w4",
      "name": "Personal",
      "boards": [
        {
          "id": "b3",
          "name": "To Do",
          "tasks": [
            { "id": "t6", "title": "Buy groceries" },
            { "id": "t7", "title": "Pay bills" }
          ]
        }
      ]
    }
  ]
};

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <nav className="top-navbar">
        <h2>My Dashboards</h2>
        <div className="nav-links">
          {data.workspaces.map((ws) => (
            <Link 
              key={ws.id} 
              to="/workspace/$workspaceId" 
              params={{ workspaceId: ws.id }}
              activeProps={{ className: "active-link" }}
              className="nav-link"
            >
              {ws.name}
            </Link>
          ))}
        </div>
      </nav>
      <Outlet />
    </div>
  ),
});

const workspaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workspace/$workspaceId',
  component: function WorkspaceViewer() {
    const { workspaceId } = workspaceRoute.useParams();
    const currentWorkspace = data.workspaces.find(ws => ws.id === workspaceId);

    if (!currentWorkspace) {
      return <div style={{ padding: '40px', textAlign: 'center' }}>Воркспейс не знайдено!</div>;
    }

    return (
      <Workspace 
        id={currentWorkspace.id} 
        name={currentWorkspace.name} 
        boards={currentWorkspace.boards} 
      />
    );
  },
});

const routeTree = rootRoute.addChildren([workspaceRoute]);
const router = createRouter({ routeTree });

const App = () => {
  return <RouterProvider router={router} />
}

export default App;