export default function({ renderer , camera, config}) {

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = (window.innerWidth) / (window.innerHeight);

        camera.updateProjectionMatrix();
    })

}