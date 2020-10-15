export default function({ scene }) {

    const { AmmoPhysics } = ENABLE3D
    const physics = new AmmoPhysics(scene)
    // physics.debug.enable(true)

    window.physics = physics

    return physics

}