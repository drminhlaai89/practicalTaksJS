import * as THREE from "three";
import { PlayerController } from "../ts/PlayerController";
import { SceneController } from "../ts/SceneController";
import { loadedResources } from "./loadedResources";
import { NumberSpawner } from "../Numbers/NumberSpawner";
import { TweenC } from "../ts/TweenC";

let crystalCount = 0;
let currentCrystalScale = 1.0;
const MIN_CRYSTAL_SCALE = 0.5;

function triggerParticleVFX(pos: THREE.Vector3) {
    const particleCount = 15;
    const geometry = new THREE.SphereGeometry(0.08, 6, 6);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xa855f7,
        transparent: true,
        opacity: 1
    });

    const particles: { mesh: THREE.Mesh; velocity: THREE.Vector3 }[] = [];

    for (let i = 0; i < particleCount; i++) {
        const pMesh = new THREE.Mesh(geometry, material.clone());
        pMesh.position.copy(pos);
        pMesh.position.y += 0.5;

        SceneController.scene.add(pMesh);

        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            Math.random() * 0.15 + 0.05,
            (Math.random() - 0.5) * 0.15
        );

        particles.push({ mesh: pMesh, velocity });
    }

    let frames = 0;
    const animate = () => {
        frames++;
        particles.forEach((p) => {
            p.mesh.position.add(p.velocity);
            p.velocity.y -= 0.008; // Apply gravity
            
            if (p.mesh.material instanceof THREE.Material) {
                p.mesh.material.opacity -= 0.04;
            }
        });

        if (frames < 25) {
            requestAnimationFrame(animate);
        } else {
            // Garbage collection
            particles.forEach((p) => {
                SceneController.scene.remove(p.mesh);
                p.mesh.geometry.dispose();
            });
        }
    };

    animate();
}

export const afterResourcesLoaded: () => void = () => {
    const mapScene = loadedResources.map.scene;
    SceneController.scene.add(mapScene);

    PlayerController.init();

    const digBtn = document.getElementById("dig-btn");
    const crystalCounterEl = document.getElementById("crystal-count");

    let crystalMesh: THREE.Object3D | null = null;
    mapScene.traverse((child: any) => {
        if (child.isMesh && !crystalMesh) {
            crystalMesh = child;
        }
    });

    if (!digBtn) return;

    digBtn.addEventListener("click", () => {
        TweenC.punchScale(digBtn);

        PlayerController.getInstance().dig(() => {
            // Impact frame callback
            crystalCount += 1;
            if (crystalCounterEl) {
                crystalCounterEl.innerText = crystalCount.toString();
            }

            const impactPos = new THREE.Vector3();
            if (crystalMesh) {
                crystalMesh.getWorldPosition(impactPos);

                // Progressive mesh shrinkage with lower boundary clamp
                if (currentCrystalScale > MIN_CRYSTAL_SCALE) {
                    currentCrystalScale -= 0.05;
                }
                crystalMesh.scale.set(currentCrystalScale, currentCrystalScale, currentCrystalScale);
                TweenC.punchScale(crystalMesh, 1.1, 100);
            } else {
                mapScene.getWorldPosition(impactPos);
            }

            // Juice effects trigger
            NumberSpawner.spawn();
            triggerParticleVFX(impactPos);
        });
    });
};