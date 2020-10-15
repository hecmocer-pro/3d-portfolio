import helpersModule from './helpers.js'

const { teleport, resetBall, fireEvent } = helpersModule()

export default function({ config, objects }) {

    const ball = objects.find(a => a.name === 'mainBall')
    const ballConfig = config.spheres.find(a => a.name === 'mainBall')

    const newPosition = ballConfig.position
    const newVelocity = [0,0,0]
    const newAngularVelocity = [0,0,0]

    setTimeout(() => {
        resetBall(ball, config.scene1.h - 10)
        fireEvent('animationEnd')
    }, config.scene1.duration);

    return function(isTransitionedBack) {
        if (isTransitionedBack) {
            setTimeout(() => {
                teleport({ object: ball, newPosition, newVelocity, newAngularVelocity })
            }, config.transitionTime);
        } else {
            teleport({ object: ball, newPosition, newVelocity, newAngularVelocity })
        }
    }

}