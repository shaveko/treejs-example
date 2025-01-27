import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, sphere, circle, controls;

init();
animate();

function init() {
    // Set up the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Set up the camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a sphere
    const radius = 1; // Sphere radius
    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Draw a circle on the sphere surface
    const circleRadius = 0.02;
    const circleSegments = 64;

    const circleGeometry = new THREE.CircleGeometry(circleRadius, circleSegments);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const circles = [];
    const amount = 100; // Number of circles to draw
    for (let i = 0; i < amount; i++) {
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circles.push(circle);
        circle.position.set(
            radius * Math.sin((Math.PI * 2 * i) / amount),
            0,
            radius * Math.cos((Math.PI * 2 * i) / amount)
        );
        sphere.add(circle); // Attach to the sphere
        // Position the circle on the sphere's surface
        circle.lookAt(sphere.position); // Ensure it's oriented correctly
    }

    // Add OrbitControls for drag rotation
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.rotateSpeed = 1;

    // Handle window resizing
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smooth rotation
    renderer.render(scene, camera);
}
