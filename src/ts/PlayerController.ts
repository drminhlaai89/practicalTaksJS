import { AnimationAction, AnimationMixer, Object3D } from "three";
import { loadedResources } from "../config/loadedResources";
import { SceneController } from "./SceneController";
import { AnimationBase } from "./AnimationBase";
import { TweenC } from "./TweenC";

export class PlayerController extends AnimationBase {
  private static instance: PlayerController;
  private isDigging: boolean = false;
  constructor() {
    const animationList = loadedResources.character.animations as AnimationAction[];
    super(animationList);

    let animMixer = new AnimationMixer(loadedResources.character.scene);
    AnimationBase.animMixer = animMixer;

    this.playAnimation(1, false);
  }

  static init() {
    const playerObject = loadedResources.character.scene as Object3D;

    SceneController.scene.add(playerObject);

    playerObject.position.x -= 1.5;
    playerObject.rotateY(-180);
      
        if (!PlayerController.instance) {
            PlayerController.instance = new PlayerController();
        }
  }
  public static getInstance(): PlayerController {
        return PlayerController.instance;
    }

    public dig(onImpactCallback?: () => void) {
        // Prevent action overlap during execution
        if (this.isDigging) return;
        this.isDigging = true;

        // Play swing animation clip
        this.playAnimation(0, true);

        // Sync visual & audio feedback with pickaxe impact frame
        const IMPACT_DELAY = 350; 
        const ANIMATION_DURATION = 800;

        setTimeout(() => {
            onImpactCallback?.();
        }, IMPACT_DELAY);

        // Reset to idle upon action completion
        setTimeout(() => {
            this.playAnimation(1, false);
            this.isDigging = false;
        }, ANIMATION_DURATION);
    }
}
