import helpersModule from './helpers.js'
import { showTextScenesFns, hideTextScenesFns } from './domTextController.js'

const { checkWindowWidth } = helpersModule()

let waitForAnimationTimeout = null

/* WINDOW event listeners */
window.addEventListener('resize', () => {
    checkWindowWidth()
})

window.addEventListener('keydown', (e) => {
    if (e.key == "ArrowDown") {
        changeScene(true)
    } else if (e.key == "ArrowUp") {
        changeScene(false)
    }
})

/* CUSTOM Event listeners */
document.addEventListener('gltfLoaded', function () {
    document.querySelector('.loadingOverlay').setAttribute('hidden', true)
})

document.addEventListener('waitForAnimationToEnd', function () {
    document.querySelector('.waitForAnimation').removeAttribute('hidden')

    clearTimeout(waitForAnimationTimeout)
    waitForAnimationTimeout = setTimeout(() => {
        document.querySelector('.waitForAnimation').setAttribute('hidden', true)
    }, 2000);
})

document.addEventListener('animationEnd', function () {
    clearTimeout(waitForAnimationTimeout)
    document.querySelector('.waitForAnimation').setAttribute('hidden', true)
})

document.addEventListener('userIddle', function () {
    document.querySelector('.scrollForMore').removeAttribute('hidden')
    waitForAnimationTimeout = setTimeout(() => {
        document.querySelector('.scrollForMore').setAttribute('hidden', true)
    }, 2000);
})

document.addEventListener('NavigatedTo', function (event) {
    hideTextScenesFns.forEach(function(hideTextSceneFn) {
        hideTextSceneFn()
    })
    switch (event.detail) {
        case 0:
            showTextScenesFns[0]()
            break;
        case 1:
            showTextScenesFns[1]()
            break;
        case 2:
            showTextScenesFns[2]()
            break;
        default:
            break;
    }
})


/* BUTTON event listeners */
document.querySelector('#closeOverlayButton').addEventListener('click', function () {
    document.querySelector('.deviceWidthOverlay').setAttribute('hidden', true)
})


/* God modes */
window.enablePhysics = function() {
    window.physics.debug.enable(true)
}

window.orbitControlsEnabled = false
window.orbitControlsEnabledAtLeastOnce = false
window.enableStalkerMode = function() {
    const tip = document.querySelector('.arrowKeysForNavigating')
    tip.removeAttribute('hidden')
    setTimeout(() => {
        tip.setAttribute('hidden', true)
    }, 4000);

    window.orbitControlsEnabled = !window.orbitControlsEnabled
}

document.querySelector('#invisibleNewtonMode').addEventListener('click', function () {
    window.enablePhysics()
})

document.querySelector('#invisibleStalkerMode').addEventListener('click', function () {
    window.enableStalkerMode()
})

document.querySelector('#invisibleHeliosMode').addEventListener('click', function () {
    window.enableSpotlightHelper()
})

document.querySelector('#invisibleImpatientMode').addEventListener('click', function () {
    window.enableImpatientMode()
})

/* Always on start */
checkWindowWidth()