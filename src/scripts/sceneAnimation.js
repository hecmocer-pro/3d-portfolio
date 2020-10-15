export default function({ camera, spotlight, spotlightHelper, renderer }) {

    return function() {

        if (!window.orbitControlsEnabledAtLeastOnce) {
            if (camera.position.y > window.targetCameraY + 0.1) {
                camera.position.y = camera.position.y - 0.1
            } else if (camera.position.y < window.targetCameraY - 0.1) {
                camera.position.y = camera.position.y + 0.1
            } else {
                camera.position.y = window.targetCameraY
            }
        }

        if (window.orbitControlsEnabled && !window.orbitControlsEnabledAtLeastOnce) {
            window.orbitControlsEnabledAtLeastOnce = true
            const controls = new THREE.OrbitControls(camera, renderer.domElement)
            controls.target.set( 0, 30, 0 );
        }

        if (spotlight.target.position.y > window.targetCameraY + 0.1) {
            spotlight.position.y = spotlight.position.y - .5
            spotlight.target.position.y = spotlight.target.position.y - .1
            spotlight.target.updateMatrixWorld();
            spotlightHelper.update()
        } else if (spotlight.target.position.y < window.targetCameraY - 0.1) {
            spotlight.position.y = spotlight.position.y + .5
            spotlight.target.position.y = spotlight.target.position.y + .1
            spotlight.target.updateMatrixWorld();
            spotlightHelper.update()
        }

    }
}