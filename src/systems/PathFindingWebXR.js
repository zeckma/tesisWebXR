import { Vector3, MeshBasicMaterial, Mesh, Group, ArrowHelper, BoxGeometry, BufferGeometry, Line, LineBasicMaterial } from "three";

import { Pathfinding } from "three-pathfinding";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import NavMeshUrl from "/lt9-nav2.gltf";
import NavMeshUrl from "/nav-bis-3.gltf";

const zeroVector = new Vector3(0, 0, 0);

let pathfinding = new Pathfinding();
let zoneName = "level1";
let groupID;
let zoneData;
let startPosition = new Vector3();
let targetPosition = new Vector3();

// posisi end-point ketika aplikasi berjalan
let tempTargetPosition = new Vector3(9.5, 0.2, 0.9);

let line;

let camera;
let navigationArea;

let isStartCubeCreated = false;
let isEndCubeCreated = false;

const navArrows = [];

class PathFindingWebXR {
    constructor(cameraParam, navigationAreaParam) {
        camera = cameraParam;
        navigationArea = navigationAreaParam;

        // setup navmesh and navigation targets
        const loader = new GLTFLoader();
        loader.load(
            NavMeshUrl,
            (gltf) => {
                // NavMesh generator https://navmesh.isaacmason.com/
                // PathFinding https://github.com/donmccurdy/three-pathfinding

                let navMesh = gltf.scene;
                navigationArea.add(navMesh);
                navMesh.translateX(-29.6); //  translasi pada sumbu x
                navMesh.translateY(-0.1); // translasi pada sumbu y
                navMesh.translateZ(9.5); //  translasi pada sumbu z
                let navMeshGeometry = new BufferGeometry();
                navMesh.children.forEach((child) => {
                    if (child.type === "Mesh") {
                        console.log("Mesh", child);
                        navMeshGeometry = child;
                    }
                });

                // Change color of navmesh
                var newMaterial = new MeshBasicMaterial({ color: 0xfc0303 });
                navMesh.traverse((o) => {
                    if (o.isMesh) o.material = newMaterial;
                });

                navMeshGeometry.visible = true;

                zoneData = Pathfinding.createZone(navMeshGeometry.geometry);
                pathfinding.setZoneData(zoneName, zoneData);
                console.log("Zone", zoneData);
            },
            undefined,
            (e) => {
                console.error(e);
            }
        );

        // navigation line
        // const lineGeometry = new BufferGeometry();
        // const lineMaterial = new LineBasicMaterial({ color: 0xff0000, linewidth: 12 });
        // line = new Line(lineGeometry, lineMaterial);
        // line.renderOrder = 3;
        // navigationArea.add(line);

        // const lineGeometry = new BufferGeometry();
        // const lineMaterial = new LineBasicMaterial( { color: 0xff0000 } );
        // const positions = new Float32Array( 500 * 3 ); // 3 vertices per point
        // lineGeometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );
        // line = new Line( lineGeometry,  lineMaterial );
        // line.renderOrder = 3;
        // navigationArea.add(line);

        // highlight line vertices with small cubes
        const boxGeometry = new BoxGeometry(0.25, 0.25, 0.25);
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        for (let index = 0; index < 20; index++) {
            const box = new Mesh(boxGeometry, material);
            box.visible = false;
            box.renderOrder = 3;
            navArrows.push(box);
            navigationArea.add(box);
        }


        // ketika user menekan tombol, maka value tempTargetPosition berubah dan path planning diarahkan ke sana
        document.getElementById("hcmTarget").addEventListener("click", () => {
            console.log("kitchen selected");
            tempTargetPosition.set(12, 0.2, 0.9);
        });
        document.getElementById("kelasTarget").addEventListener("click", () => {
            console.log("livingRoom selected");
            tempTargetPosition.set(9.5, 0.2, 0.9);
        });
    }

    setStartPosition(start) {
        startPosition.set(start.x, start.y, start.z);

        groupID = pathfinding.getGroup(zoneName, start);
        // console.log("GroupID, StartPosition", groupID, start);
        // const startnode = pathfinding.getClosestNode(startPosition, zoneName, groupID);
        // console.log("GroupID, StartPosition, StartNode", groupID, startPosition, startnode);

        // visual for better debugging
        if (!isStartCubeCreated) {
            const startGeometry = new BoxGeometry(0.2, 0.2, 0.2);
            // const startMaterial = new MeshBasicMaterial({ color: 0x90c8ff });
            // KOTAK WARNA HIJAU
            const startMaterial = new MeshBasicMaterial({ color: 0x90c800 });
            const startCube = new Mesh(startGeometry, startMaterial);
            startCube.position.set(9.5, 0.2, 0.9);

            startCube.renderOrder = 3;

            navigationArea.add(startCube);

            isStartCubeCreated = !isStartCubeCreated;
        }
    }

    setTargetPosition(target) {
        targetPosition.set(target.x, target.y, target.z);

        // const endnode = pathfinding.getClosestNode(targetPosition, zoneName, groupID);
        // console.log("GroupID, EndPosition, EndNode", groupID, targetPosition, endnode);

        // visual for better debugging
        if (!isEndCubeCreated) {
            const targetGeometry = new BoxGeometry(0.2, 0.2, 0.2);
            // KOTAK WARNA BIRU
            const targetMaterial = new MeshBasicMaterial({ color: 0x90c8ff });
            const targetCube = new Mesh(targetGeometry, targetMaterial);
            targetCube.position.set(12, 0.2, 0.9);
            targetCube.renderOrder = 3;

            navigationArea.add(targetCube);
            isEndCubeCreated = !isEndCubeCreated;
        }
    }

    updatePositions(points) {

        const positionAttribute = line.geometry.getAttribute('position');

        for (let i = 0, l = points.length; i < l; i++) {
            positionAttribute.setXYZ(i, points[i].x, points[i].y, points[i].z);
        }
        console.log("points", points);
        console.log("line", line);
        positionAttribute.needsUpdate = true;

    }

    calculatePath(timestamp, frame, imageTracking) {
        if (frame) {
            const markerWorldPosition = imageTracking.getMarkerWorldPosition();

            if (markerWorldPosition != zeroVector) {
                // calculate "offseted" positions, as navigation mesh can't be moved/rotated
                const cameraPosition = navigationArea.worldToLocal(camera.position);
                const navStart = new Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z);
                // set endposition to current target
                const navEnd = new Vector3(tempTargetPosition.x, tempTargetPosition.y, tempTargetPosition.z);

                this.setStartPosition(navStart);
                this.setTargetPosition(navEnd);

                const path = pathfinding.findPath(startPosition, targetPosition, zoneName, groupID);
                // console.log("GroupID, Path, StartPosition, EndPosition", groupID, path, startPosition, targetPosition);
                // console.log("Zone", zoneData);

                if (path != null) {
                    const points = [];
                    points.push(navStart);
                    for (let index = 0; index < path.length; index++) {
                        points.push(path[index]);
                        navArrows[index].position.set(path[index].x, 0.2, path[index].z);
                        navArrows[index].visible = true;
                    }
                    for (let unsetIndex = path.length; unsetIndex < navArrows.length; unsetIndex++) {
                        navArrows[unsetIndex].position.set(0, 0, 0);
                        navArrows[unsetIndex].visible = false;
                    }

                    navigationArea.remove(line);
                    const lineGeometry = new BufferGeometry();
                    const lineMaterial = new LineBasicMaterial({ color: 0xff0000, linewidth: 50 });
                    line = new Line(lineGeometry, lineMaterial);
                    line.renderOrder = 3;
                    line.geometry.setFromPoints(points);
                    navigationArea.add(line);

                    // this.updatePositions(points);

                }
            }
        }
    }
}

export { PathFindingWebXR };