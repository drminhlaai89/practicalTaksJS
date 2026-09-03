import { Scene, PerspectiveCamera, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export class SceneController {
  static loader: GLTFLoader;
  static scene: Scene;

  static CreateScene() {
    const scene = new Scene();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    SceneController.loader = loader;
    SceneController.scene = scene;
    return scene;
  }

  static CameraCreate() {
    const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = -1;
    camera.position.y = 3;
    camera.position.z = 2;
    camera.rotation.x = -Math.PI / 4;

    return camera;
  }
}
