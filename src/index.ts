import "./css/style.css";
import { NumberSpawner } from "./Numbers/NumberSpawner";
import * as THREE from "three";
import { SceneController } from "./ts/SceneController";
import { resourceLoadInit } from "./config/resourceLoader";
import { loadedResources } from "./config/loadedResources";
import { afterResourcesLoaded } from "./config/afterResourceLoaded";
import { AnimationBase } from "./ts/AnimationBase";
import { PlayerController } from "./ts/PlayerController";
import { TweenC } from "./ts/TweenC";

//Create a scene and camera
const scene = SceneController.CreateScene();
const camera = SceneController.CameraCreate();

//Initialize tween Engine
TweenC.init();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const clock = new THREE.Clock();

//resize the layout Responsive UI
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
  renderer.render(scene, camera);

  const delta = clock.getDelta();

  AnimationBase.update(delta);
  TweenC.group.update();
}

renderer.setAnimationLoop(animate);

await resourceLoadInit();
afterResourcesLoaded();
