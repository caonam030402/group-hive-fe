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
  name: String;
  industry: String;
  size: String;
  region: String;
  description: String;
  avatar: string;
  owner: {
    id: String;
  };
}
