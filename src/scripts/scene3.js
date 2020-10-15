import helpersModule from './helpers.js'

const { teleport, resetBall, fireEvent } = helpersModule()

export default function({ config, objects }) {

    let newPosition = config.scene3.newPosition
    let newVelocity = config.scene3.newVelocity
    let newAngularVelocity = [0, 0, 0]
    const ball = objects.find(a => a.name === 'mainBall')

    setTimeout(() => {
        resetBall(ball, config.scene3.h - 10)
        fireEvent('animationEnd')
    }, config.scene3.duration);

    return function() {
        teleport({ object: ball, newPosition, newVelocity, newAngularVelocity })
    }
}