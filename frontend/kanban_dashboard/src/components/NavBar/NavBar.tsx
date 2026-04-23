import { type FC } from 'react';
import { Link } from '@tanstack/react-router';
interface NavBarProps{
    workspaces: any[];
}
const NavBar: FC<NavBarProps> = ({ workspaces }: { workspaces: any[] }) => {
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