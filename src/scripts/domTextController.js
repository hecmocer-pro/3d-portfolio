const scenes = [1, 2, 3]
//     scenes.forEach(function(scene) {
//         const element = document.querySelector(`#scene${scene+1}`)
//         element.classList.remove(`prevScene${scene-1}`)
//     })
// }

const resetSceneContainerCurrentScene = function() {
    const container = document.querySelector('.sceneContainer')

    container.classList.remove('notTransitionedYet')
    scenes.forEach(function(scene) {
        container.classList.remove(`currentScene${scene}`)
    })
}

const showTextScene1 = function (prevScene) {
    resetSceneContainerCurrentScene()
    const container = document.querySelector('.sceneContainer')
    container.classList.add('currentScene1')

    const element = document.querySelector('#scene1')
    element.removeAttribute('hidden')
}

const showTextScene2 = function (prevScene) {
    resetSceneContainerCurrentScene()
    const container = document.querySelector('.sceneContainer')
    container.classList.add('currentScene2')

    const element = document.querySelector('#scene2')
    element.removeAttribute('hidden')
}

const showTextScene3 = function (prevScene) {
    resetSceneContainerCurrentScene()
    const container = document.querySelector('.sceneContainer')
    container.classList.add('currentScene3')

    const element = document.querySelector('#scene3')
    element.removeAttribute('hidden')
}

const hideTextScene1 = function () {
    document.querySelector('#scene1').setAttribute('hidden', true)
}

const hideTextScene2 = function () {
    document.querySelector('#scene2').setAttribute('hidden', true)
}

const hideTextScene3 = function () {
    document.querySelector('#scene3').setAttribute('hidden', true)
}


const showTextScenesFns = [showTextScene1, showTextScene2, showTextScene3]
const hideTextScenesFns = [hideTextScene1, hideTextScene2, hideTextScene3]

export {
    showTextScenesFns, hideTextScenesFns
}