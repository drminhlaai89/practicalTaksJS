import { AnimationMixer, AnimationAction, LoopOnce } from "three";

export class AnimationBase {
  curClipAction: AnimationAction | null = null;
  static animMixer: AnimationMixer | null = null;
  animationList: AnimationAction[];

  constructor(animationList: AnimationAction[]) {
    this.animationList = animationList;
  }

  playAnimation(anim_id: number, one_time: boolean = false): void {
    let oldClipAction: AnimationAction | null = this.curClipAction;

    if (!AnimationBase.animMixer || !this.animationList[anim_id]) return;

    const clipAction = AnimationBase.animMixer.clipAction(this.animationList[anim_id] as any);

    if (one_time) {
      clipAction.clampWhenFinished = true;
      clipAction.setLoop(LoopOnce, 0);
    }

    clipAction.reset().play();

    if (oldClipAction && oldClipAction !== clipAction) {
      oldClipAction.crossFadeTo(clipAction, 0.15, false);
    }

    this.curClipAction = clipAction;
  }

  static update(delta: number) {
    if (this.animMixer) this.animMixer.update(delta);
  }
}
