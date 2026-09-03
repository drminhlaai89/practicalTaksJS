import { Tween, Easing, Group } from "@tweenjs/tween.js";

export class TweenC {
  static group: Group;
  static init() {
    this.group = new Group();
  }
  static add(tween: Tween<any>) {
    this.group.add(tween);
  }

  static punchScale(target: any, scaleUp: number = 1.2, duration: number = 150) {
        if (!target) return;

        if (target.scale && typeof target.scale.x === "number") {
            const startScale = { x: target.scale.x, y: target.scale.y, z: target.scale.z };
            const endScale = { x: startScale.x * scaleUp, y: startScale.y * scaleUp, z: startScale.z * scaleUp };

            new Tween(startScale, this.group)
                .to(endScale, duration / 2)
                .easing(Easing.Quadratic.Out)
                .onUpdate((obj) => {
                    target.scale.set(obj.x, obj.y, obj.z);
                })
                .chain(
                    new Tween(endScale, this.group)
                        .to(startScale, duration / 2)
                        .easing(Easing.Quadratic.In)
                        .onUpdate((obj) => {
                            target.scale.set(obj.x, obj.y, obj.z);
                        })
                )
                .start();
        } 
        else if (target instanceof HTMLElement) {
            target.style.transform = `scale(${scaleUp})`;
            setTimeout(() => {
                target.style.transform = "scale(1)";
            }, duration);
        }
    }

  /*  example
    static createBounceAnimation(object) {
    this.bounceTween = new Tween({
      x: object.scale.x,
      y: object.scale.y,
      z: object.scale.z,
    })
      .to(
        {
          x: object.scale.x * 1.2,
          y: object.scale.y * 1.2,
          z: object.scale.z * 1.2,
        },
        400
      )
      .onUpdate(function (obj) {
        object.scale.set(obj.x, obj.y, obj.z);
      })
      .delay(100)
      .yoyo(true)
      .repeat(Infinity)
      .group(this.group)
      .start();
  } */
}
