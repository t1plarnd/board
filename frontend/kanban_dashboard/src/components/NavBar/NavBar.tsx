import { type FC } from 'react';
import { Link } from '@tanstack/react-router';
import type {Workspace as WorkspaceInterface} from '../../types/workspace.tsx';

interface NavBarProps{
    workspaces: WorkspaceInterface[];
}

const NavBar: FC<NavBarProps> = ({ workspaces }) => {
  return (
    <nav className="top-navbar">
      <h2>My Dashboards</h2>
      <div className="nav-links">
        {workspaces.map((ws) => (
          <Link 
            key={ws.id} 
            to="/workspace/$workspaceId" 
            params={{ workspaceId: ws.id }}
            activeProps={{ className: "active-link" }}
            className="nav-link">
            {ws.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;