export default function({ scene, config }) {

    scene.add(new THREE.AmbientLight(0xffffff, .6))
    scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.4))

    const spotlights = []
    const spotlightHelpers = []

    config.spotlights.forEach(lightConfig => {

        const spotlight = new THREE.SpotLight(0xffffff, 0.2);

        spotlight.position.set(...lightConfig.position);
        spotlight.target.position.set(...lightConfig.targetPosition);

        // Spotlight shadows
        spotlight.castShadow = lightConfig.castShadow;
        spotlight.shadow.camera.near = lightConfig.shadowNear;
        spotlight.shadow.camera.far = lightConfig.shadowFar;
        spotlight.shadow.camera.fov = lightConfig.shadowFov;
        spotlight.shadow.mapSize.width = lightConfig.shadowWidth;
        spotlight.shadow.mapSize.height = lightConfig.shadowHeight;

        //Adjust spotlight parameters
        spotlight.angle = lightConfig.angle;
        spotlight.penumbra = lightConfig.penumbra;
        spotlight.decay = lightConfig.decay;
        spotlight.distance = lightConfig.distance;
        spotlight.target.updateMatrixWorld();
        scene.add(spotlight)
        scene.add(spotlight.target)

        spotlights.push(spotlight)

        const spotLightHelper = new THREE.SpotLightHelper( spotlight );
        window.enableSpotlightHelper = function() {
            scene.add( spotLightHelper );
        }

        spotlightHelpers.push(spotLightHelper)


    });

    return { spotlights, spotlightHelpers }

}