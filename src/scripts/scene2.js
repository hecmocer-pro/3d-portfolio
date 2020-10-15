import helpersModule from './helpers.js'

const { teleport, resetBall, fireEvent } = helpersModule()

export default function({ config, objects }) {

    let newPosition = config.scene2.newPosition
    let newVelocity = config.scene2.newVelocity
    let newAngularVelocity = [0, 0, 0]
    const ball = objects.find(a => a.name === 'mainBall')

    setTimeout(() => {
        resetBall(ball, config.scene2.h - 10)
        fireEvent('animationEnd')
    }, config.scene2.duration);

    return function() {
        teleport({ object: ball, newPosition, newVelocity, newAngularVelocity })
    }

}