import type {Workspace as WorkspaceInterface} from '../types/workspace.tsx';


const mockData: WorkspaceInterface[] = [{
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

export default mockData;