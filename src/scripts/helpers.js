export default function () {

    const teleport = ({ object, newPosition, newVelocity, newAngularVelocity }) => {
        // set body to be kinematic
        object.body.setCollisionFlags(2)

        // set the new position
        object.position.set(...newPosition)
        object.body.needUpdate = true

        // this will run only on the next update if body.needUpdate = true
        object.body.once.update(() => {
            // set body back to dynamic
            object.body.setCollisionFlags(0)

            // if you do not reset the velocity and angularVelocity, the object will keep it
            object.body.setVelocity(...newVelocity)
            object.body.setAngularVelocity(...newAngularVelocity)
        })
    }

    const resetBall = function(ball, minHeight) {
        if (ball.position.y < minHeight) {
            teleport({ object: ball, newPosition: [0,2,0], newVelocity: [0,0,0], newAngularVelocity: [0,0,0] })
        }
    }

    const fireEvent = function (eventName, eventPayload) {
        document.dispatchEvent(new CustomEvent(eventName, { detail: eventPayload }))
    }

    const checkWindowWidth = function() {
        if (window.innerWidth < 1520) {
            document.querySelector('.deviceWidthOverlay').removeAttribute('hidden')
        } else {
            document.querySelector('.deviceWidthOverlay').setAttribute('hidden', true)
        }
    }

    return { teleport, resetBall, fireEvent, checkWindowWidth }

}