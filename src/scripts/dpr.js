export default function({ renderer }) {

    const DPR = window.devicePixelRatio
    renderer.setPixelRatio(Math.min(2, DPR))

    return DPR

}