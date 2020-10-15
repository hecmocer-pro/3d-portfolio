export default function ({ config, scene, physics }) {

    const { factory } = physics // Physics object factory

    const objects = []

    /* Hardcoded */
    physics.add.ground({ width: 20, height: 20 })

    /* Spheres */
    config.spheres.forEach(function (object) {

        /* Set material */
        let objectMesh = factory.addSphere({}, { lambert: { color: object.color } })

        /* Set properties */
        objectMesh.scale.set(...object.scale)           // Scale
        objectMesh.position.set(...object.position)     // Position
        objectMesh.rotation.set(...object.rotation)     // Rotation

        // If has physics
        if (object.collisionType) {
            physics.add.existing(objectMesh, { mass: .0001, collisionFlags: config.collisionDict[object.collisionType] })
            objectMesh.body.setGravity(0, -.3, 0)
        }

        objectMesh.castShadow = object.castShadow;
        objectMesh.receiveShadow = true;

        objectMesh.name = object.name
        objects.push(objectMesh)

    })

    /* Boxes */
    config.boxes.forEach(function (object) {

        /* Set material */
        let objectMesh = factory.add.box(
            { width: object.scale[0], height: object.scale[1], depth: object.scale[2], },
            { lambert: { color: object.color }}
        )

        /* Set properties */
        objectMesh.position.set(...object.position)     // Position
        objectMesh.rotation.set(...object.rotation)     // Rotation

        // If has physics
        if (object.collisionType) {
            physics.add.existing(objectMesh, { mass: .0001, collisionFlags: config.collisionDict[object.collisionType] })
        }

        objectMesh.castShadow = object.castShadow;
        objectMesh.receiveShadow = true;

        objectMesh.name = object.name
        objects.push(objectMesh)

    })

    /* Cylinders */
    config.cylinders.forEach(function (object) {

        /* Set material */
        let objectMesh = factory.add.cylinder(
            {
                radiusTop: object.radiusTop,
                radiusBottom: object.radiusBottom,
                height: object.height,
            },
            { lambert: { color: object.color }}
        )

        /* Set properties */
        objectMesh.position.set(...object.position)     // Position
        objectMesh.rotation.set(...object.rotation)     // Rotation

        // If has physics
        if (object.collisionType) {
            physics.add.existing(objectMesh, { mass: .0001, collisionFlags: config.collisionDict[object.collisionType] })
        }

        objectMesh.castShadow = object.castShadow;
        objectMesh.receiveShadow = true;

        objectMesh.name = object.name
        objects.push(objectMesh)

    })

    const objectLoadPromises = []
    const loader = new THREE.GLTFLoader();

    config.gltfObjects.forEach(function (object) {
        const objectLoadPromise = new Promise(function(resolve, reject) {
            loader.load(
                object.url,
                function (gltf) {
                    const gltfObject = gltf.scene.children[0]

                    /* Set material */
                    gltfObject.traverse((obj) => {
                        if (obj.isMesh) {
                            obj.renderOrder = 10 - obj.renderOrder
                            obj.material = new THREE.MeshLambertMaterial({ color: object.color, side:THREE.BackSide })
                            obj.castShadow = object.castShadow;
                            // obj.receiveShadow = true;
                        }
                    });

                    /* Set properties */
                    gltfObject.scale.set(...object.scale)       // Scale
                    gltfObject.position.set(...object.position) // Position
                    gltfObject.rotation.set(...object.rotation) // Rotation

                    /* Add physics */
                    const shape = 'hacd'
                    physics.add.existing(gltfObject, { addChildren: false, shape })
                    gltfObject.body.setCollisionFlags(config.collisionDict[object.collisionType])


                    /* Add to scene */
                    scene.add(gltfObject)

                    gltfObject.name = object.name
                    objects.push(gltfObject)

                    resolve()
                },

                // called while loading is progressing
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                // called when loading has errors
                function (error) {
                    console.log('An error happened');
                    reject()
                }
            );
        })

        objectLoadPromises.push(objectLoadPromise)

    })


    return new Promise(function (resolve, reject) {

        Promise.all(objectLoadPromises).then(function() {
            resolve(objects)
        }, reject)

    })

}