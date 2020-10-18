export default function({ physics, renderer, scene, camera, animationCallback }) {

    const clock = new THREE.Clock()

    const animate = () => {

        // physics.update(clock.getDelta() * 1000)
        physics.update(clock.getDelta() * 8000)
        physics.updateDebugger()
        renderer.render(scene, camera)

        animationCallback()

        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

}