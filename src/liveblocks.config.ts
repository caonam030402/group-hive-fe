declare global {
  interface Liveblocks {
    Presence: {
      user: {
        id: string | number;
        name: string;
        avatar: string;
      };
    };
  }
}

export {};
