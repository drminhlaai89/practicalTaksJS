import { Scene, PerspectiveCamera, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export class SceneController {
  static loader: GLTFLoader;
  static scene: Scene;
  static camera: PerspectiveCamera; // Khai báo property static camera

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
    // 1. Tạo camera với FOV 45 để bóp góc nhìn cận hơn giống mockup
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 2. Đặt vị trí camera cận nhân vật
    camera.position.set(-1, 3, 3);
    
    // 3. Cho camera nhìn thẳng vào tâm nhân vật và mỏ đá
    camera.lookAt(0, 0.5, 0);

    // Lưu reference camera vào static property
    SceneController.camera = camera;

    return camera;
  }

  static shakeCamera(duration = 0.15, intensity = 0.08) {
    if (!SceneController.camera) return;
    const originalPos = SceneController.camera.position.clone();
    const startTime = performance.now();

    const shake = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed < duration) {
        SceneController.camera.position.x = originalPos.x + (Math.random() - 0.5) * intensity;
        SceneController.camera.position.y = originalPos.y + (Math.random() - 0.5) * intensity;
        requestAnimationFrame(shake);
      } else {
        SceneController.camera.position.copy(originalPos);
      }
    };
    shake();
  }
}