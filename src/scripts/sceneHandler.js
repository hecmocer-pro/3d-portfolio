import scene1 from './scene1.js'
import scene2 from './scene2.js'
import scene3 from './scene3.js'

import helpersModule from './helpers.js'
const { fireEvent } = helpersModule()


export default function({ camera, config, objects }) {

    let currentScene = -1
    const scenes = [scene1, scene2, scene3]
    let waitingForAnimation = false
    let impatientModeEnabled = false
    let animationTimeout = null

    window.enableImpatientMode = function() {
        impatientModeEnabled = true
        waitingForAnimation = false
        clearTimeout(animationTimeout)
    }

    const nextScene = function() {
        if (currentScene < scenes.length - 1) {
            if (!waitingForAnimation) {
                waitingForAnimation = !impatientModeEnabled

                currentScene++
                const scene = scenes[currentScene]
                const sceneConfig = config[`scene${currentScene+1}`]

                fireEvent('NavigatedTo', currentScene)
                scene({ camera, config, objects })(false)

                if (currentScene !== 0) {
                    window.targetCameraY = sceneConfig.h
                }

                animationTimeout = setTimeout(() => {
                    waitingForAnimation = false
                }, sceneConfig.duration);

            } else {
                fireEvent('waitForAnimationToEnd')
            }

            return true
        } else {
            return false
        }
    }

    const prevScene = function() {
        if (currentScene > 0) {
            if (!waitingForAnimation) {
                waitingForAnimation = !impatientModeEnabled

                currentScene--
                const scene = scenes[currentScene]
                const sceneConfig = config[`scene${currentScene+1}`]

                fireEvent('NavigatedTo', currentScene)
                scene({ camera, config, objects })(true)

                if (currentScene !== scenes.length) {
                    window.targetCameraY = sceneConfig.h
                }

                animationTimeout = setTimeout(() => {
                    waitingForAnimation = false
                }, sceneConfig.duration);

            } else {
                fireEvent('waitForAnimationToEnd')
            }

            return true
        } else {
            return false
        }
    }

    const changeScene = function(forward) {
        if (forward) {
            return nextScene()
        } else {
            return prevScene()
        }
    }

    window.changeScene = changeScene


    const throttledChangeScene = changeScene

    return { throttledChangeScene }

}