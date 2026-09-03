import { meshes } from "../resources/meshes/meshes";
import { SceneController } from "../ts/SceneController";
import { loadedResources } from "./loadedResources";

export const resourceLoader = (path: string) => {
  return new Promise((resolve, reject) => {
    SceneController.loader.load(
      path,
      (loaded: any) => {
        resolve(loaded);
      },
      undefined,
      (err: any) => reject(err)
    );
  });
};

export const resourceLoadInit = async () => {
  const loadPromises = meshes.resources.map(async (el) => {
    const loaded = await resourceLoader(el.value);
    loadedResources[el.name] = loaded;
  });

  await Promise.all(loadPromises);
};
