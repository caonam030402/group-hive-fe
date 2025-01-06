interface IWorkspaceCreateBody {
  name: String;
  industry: String;
  size: String;
  region: String;
  description?: String;
  avatar?: String;
  owner: {
    id: String;
  };
}

interface IWorkspace {
  id: number;
  name: String;
  industry: String;
  size: String;
  region: String;
  description: String;
  avatar: string;
  members: unknown[];
  owner: {
    id: String;
  };
}
