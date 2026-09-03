export interface ConvertResourceType {
  type: string;
  resources: {
    name: string;
    value: string;
  }[];
}

export const meshes: ConvertResourceType = {
  type: "mesh",
  resources: [
    {
      name: "map",
      value: "models/Stickman_Level.glb",
    },
    {
      name: "character",
      value: "models/Stickman_Player.glb",
    },
  ],
};
