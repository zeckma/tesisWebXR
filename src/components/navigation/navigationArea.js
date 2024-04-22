import { MeshStandardMaterial, Vector3, PlaneGeometry, TextureLoader, MeshBasicMaterial, Mesh, MathUtils, Group, BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
// import CasualFlapMapImageUrl from "/CasualFlatMap.png";
import lt9ImageUrl from "/img-lt9.png";

function setupNavigationAreaGeometry() {
    // create occluder material
    const occluderMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
    occluderMaterial.colorWrite = true;

    // create room map
    const navigationArea = new Group();
    // FUNGSI : createWallElement(position: any, rotation: any, scale: any, occluderMaterial: any): 
    // Dinding bagian Ruang TA MMB - Tangga
    // navigationArea.add(createWallElement(new Vector3(-14, 1, -1.5), new Vector3(0, 0, 60), new Vector3(28.5, 3, 0.06), occluderMaterial));
    // // Bagian Kaca sebelah Ruang TA MMB 
    // navigationArea.add(createWallElement(new Vector3(-28.2, 1, 0), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3), occluderMaterial));
    // // Dinding depan ruang TA MMB, dari kamar mandi sampai HCM
    // navigationArea.add(createWallElement(new Vector3(-3.7, 1, 1.5), new Vector3(0, 0, 60), new Vector3(49.5, 3, 0.06), occluderMaterial));
    // // hcm sampai ruang server (samping hcm)
    // navigationArea.add(createWallElement(new Vector3(21, 1, 5.25), new Vector3(0, 0, 60), new Vector3(0.06, 3, 7.5), occluderMaterial));
    // // dinding server
    // navigationArea.add(createWallElement(new Vector3(22.8, 1, 8.8), new Vector3(0, 0, 60), new Vector3(3.7, 3, 0.06), occluderMaterial));
    // // dinding server sampai dinding tangga darurat
    // navigationArea.add(createWallElement(new Vector3(24.7, 1, 5.25), new Vector3(0, 0, 60), new Vector3(0.06, 3, 7.5), occluderMaterial));
    // // tangga darurat
    // navigationArea.add(createWallElement(new Vector3(26.6, 1, 1.5), new Vector3(0, 0, 60), new Vector3(3.9, 3, 0.06), occluderMaterial));
    // // kaca sebelah pantry
    // navigationArea.add(createWallElement(new Vector3(28.4, 1, 0), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3), occluderMaterial));
    // // pantry
    // navigationArea.add(createWallElement(new Vector3(26.7, 1, -1.3), new Vector3(0, 0, 60), new Vector3(3.5, 3, 0.06), occluderMaterial));
    // // dinding KM Perempuan
    // navigationArea.add(createWallElement(new Vector3(25, 1, -3.1), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3.8), occluderMaterial));
    // // pintu masuk KM
    // navigationArea.add(createWallElement(new Vector3(24.4, 1, -5), new Vector3(0, 0, 60), new Vector3(1.2, 3, 0.06), occluderMaterial));
    // // dinding KM ke lift
    // navigationArea.add(createWallElement(new Vector3(23.8, 1, -3.1), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3.8), occluderMaterial));
    // // dinding lift kiri
    // navigationArea.add(createWallElement(new Vector3(22.2, 1, -1.3), new Vector3(0, 0, 60), new Vector3(3.3, 3, 0.06), occluderMaterial));
    // // Lift
    // navigationArea.add(createWallElement(new Vector3(20.8, 1, -4.9), new Vector3(0, 0, 60), new Vector3(0.06, 3, 7.4), occluderMaterial));
    // // dinding lift mhs ke lift dosen
    // navigationArea.add(createWallElement(new Vector3(15.8, 1, -8.5), new Vector3(0, 0, 60), new Vector3(10, 3, 0.06), occluderMaterial));
    // // dinding kiri lift dosen
    // navigationArea.add(createWallElement(new Vector3(10.8, 1, -6.9), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3.3), occluderMaterial));
    // //dinding lift dosen ke tangga
    // navigationArea.add(createWallElement(new Vector3(6.9, 1, -5.3), new Vector3(0, 0, 60), new Vector3(7.8, 3, 0.06), occluderMaterial));
    // // dinding tangga 1
    // navigationArea.add(createWallElement(new Vector3(3.1, 1, -3.4), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3.8), occluderMaterial));
    // // dinding tangga 2
    // navigationArea.add(createWallElement(new Vector3(0.25, 1, -3.4), new Vector3(0, 0, 60), new Vector3(0.06, 3, 3.8), occluderMaterial));

    // kamar mandi pria
    // navigationArea.add(createWallElement(new Vector3(24.3, 1, -5), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // kamar mandi wanita
    // navigationArea.add(createWallElement(new Vector3(24.8, 1, -4.4), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // 09.01 gudang
    navigationArea.add(createWallElement(new Vector3(22, 1, 3.6), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // Koordinat 09.02 HCM
    navigationArea.add(createWallElement(new Vector3(12, 1, 0.9), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // 09.03 Ruang Dosen
    navigationArea.add(createWallElement(new Vector3(9.5, 1, 0.9), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // 09.04 Ruang Mahasiswa
    navigationArea.add(createWallElement(new Vector3(-1, 1, 0.9), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // // 09.05 lab PJJ
    // navigationArea.add(createWallElement(new Vector3(-10, 1, 1), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // // 09.06 R.Dosen
    // navigationArea.add(createWallElement(new Vector3(-10, 1, -0.8), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // // 09.07 lab PJJ
    // navigationArea.add(createWallElement(new Vector3(-12, 1, 1), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // // 09.08 lab komputer aided learning
    // navigationArea.add(createWallElement(new Vector3(-12, 1, -0.8), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // // 09.09 lab TA MMB
    // navigationArea.add(createWallElement(new Vector3(-19.5, 1, -0.8), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // // Kamar mandi dosen pria
    // navigationArea.add(createWallElement(new Vector3(-24.7, 1, 4.9), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // navigationArea.add(createWallElement(new Vector3(0, 1, 0), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));
    // Kamar mandi dosen wanita
    // navigationArea.add(createWallElement(new Vector3(-23.6, 1, 4.3), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));

    navigationArea.add(createWallElement(new Vector3(-23.6, 1, 4.3), new Vector3(0, 0, 60), new Vector3(0.06, 3, 0.06), occluderMaterial));

    // UKURAN asli di real-world
    const floorGeometry = new PlaneGeometry(57.4, 18);
    // const floorGeometry = new PlaneGeometry(58.7, 20);
    // const floorGeometry = new PlaneGeometry(18, 57.4);
    const floorTexture = new TextureLoader().load(lt9ImageUrl);
    // const floorMaterial = new MeshBasicMaterial({ color: 0x26B35A });
    const floorMaterial = new MeshBasicMaterial({ map: floorTexture });
    const floorPlaneMesh = new Mesh(floorGeometry, floorMaterial);
    floorPlaneMesh.rotateX(MathUtils.degToRad(270));
    floorPlaneMesh.renderOrder = 3;
    // floorPlaneMesh.visible = true;
    navigationArea.add(floorPlaneMesh);

    // // Create edges geometry for the floor
    const edgesGeometry = new EdgesGeometry(floorGeometry);
    const lineMaterial = new LineBasicMaterial({ color: 0x000000 }); // Define border color
    const floorEdges = new LineSegments(edgesGeometry, lineMaterial);
    floorEdges.renderOrder = 3; // Make sure it's rendered above the plane
    navigationArea.add(floorEdges);


    // // To translate the plane, you can simply set its position
    floorPlaneMesh.position.set(0, 0, 0); // Set x, y, z coordinates accordingly
    floorEdges.position.copy(floorPlaneMesh.position); // Make sure edges follow the plane's position
    // navigation area parent for easier placement
    const navigationAreaParent = new Group();
    navigationAreaParent.add(navigationArea);

    return navigationAreaParent;
}

function createWallElement(position, rotation, scale, occluderMaterial) {
    const occluderGeometry = new BoxGeometry(scale.x, scale.y, scale.z);
    const occluderMesh = new Mesh(occluderGeometry, occluderMaterial);
    occluderMesh.position.set(position.x, position.y, position.z);
    occluderMesh.renderOrder = 2;

    return occluderMesh;
}



export { setupNavigationAreaGeometry };
