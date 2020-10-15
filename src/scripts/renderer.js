export default function({ config }) {

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(config.width, config.height)
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return renderer

}
