import helpersModule from './helpers.js'
const { fireEvent } = helpersModule()

export default function({ throttledChangeScene, objects }) {

    throttledChangeScene(true)

    let idleTimeout = setTimeout(() => {
        fireEvent('userIddle')
    }, 8000);

    window.addEventListener('wheel', function(e) {

        if (e.deltaY > 0) {
            throttledChangeScene(true)
        } else if (e.deltaY < 0) {
            throttledChangeScene(false)
        }

        clearTimeout(idleTimeout)
    })

}