export default function({ config }) {

    const camera = new THREE.PerspectiveCamera(60, config.width / config.height, 0.1, 1000)
    camera.position.set(0, config.scene1.h, 20)
    window.targetCameraY = config.scene1.h

    return camera
}
