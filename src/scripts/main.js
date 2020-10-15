// Standalone imports
import { config } from './config.js'
import { scene } from './scene.js'

// Need to be called with some options
import dprModule from './dpr.js'
import orbitControlsModule from './orbitControls.js'
import windowSizeListenerModule from './windowSizeListener.js'
import lightsModule from './lights.js'
import physicsModule from './physics.js'
import objectLoadModule from './objectLoad.js'
import animateModule from './animate.js'
import cameraModule from './camera.js'
import rendererModule from './renderer.js'
import controlsModule from './controls.js'
import sceneHandlerModule from './sceneHandler.js'
import sceneAnimationModule from './sceneAnimation.js'
import helpersModule from './helpers.js'

const { fireEvent } = helpersModule()

const { PhysicsLoader, Scene3D } = ENABLE3D

try {
    const MainScene = () => {

        const renderer = rendererModule({ config })
        const camera = cameraModule({ config })
        const physics = physicsModule({ scene })                                    // Physics
        const objectLoadPromise = objectLoadModule({ config, physics, scene })      // Models

        dprModule({ renderer })                                                     // Device pixel ratio
        orbitControlsModule({ camera, renderer })                                   // camera controls
        windowSizeListenerModule({ camera, renderer, config })                      // resize canvas on window resize
        const { spotlights, spotlightHelpers } = lightsModule({ scene, config })    // Lights

        objectLoadPromise.then(function(objects) {

            fireEvent('gltfLoaded')

            const animationCallback = sceneAnimationModule({ camera, spotlight: spotlights[0], spotlightHelper: spotlightHelpers[0], renderer })

            animateModule({ physics, scene, camera, renderer, animationCallback }) // Animate loop

            const { throttledChangeScene } = sceneHandlerModule({ camera, config, objects })
            controlsModule({ throttledChangeScene, objects })

        })

    }
    PhysicsLoader('/lib', () => MainScene())
} catch (error) {
    alert(error)
}
