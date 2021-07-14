const THREE = require('three');
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getAspect } from './tools';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const gltfLoader = new GLTFLoader();

export const background = {
    camera: null,
    renderer: null,
    scene: null,
    maple: null,

    fov: 90,

    clipping: {
        near: 0.1,
        far: 2000
    },

    colors: {
        sky: 0xDDA538,
        light: 0xfffdf6,
        ground: 0xFFFFFF
    },
    
    lights: {
        sun: null,
        point: null
    },

    init () {
        this._addRenderer();
        this._addScene();
        this._addCamera();
        this._addLights();
        this._addMaple();
        // _addControls();

        window.addEventListener('resize', this._onWindowResize.bind(this), false);
    },

    render () {
        // stats.update();
        this.renderer.render(this.scene, this.camera);
    },

    _addRenderer () {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setClearColor(this.colors.sky);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.Type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    },

    _addCamera () {
        this.camera = new THREE.PerspectiveCamera(this.fov, getAspect(), this.clipping.near, this.clipping.far);
        this.camera.position.set(460.57, -3.37, -116.14);
        this.camera.lookAt(0, 0, 0);
    },

    _addScene () {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcccccc);
        this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    },

    _addLights () {
        this.lights.sun = new THREE.HemisphereLight(this.colors.sky, this.colors.ground, 2.5);
        this.lights.sun.position.set(0, 500, 0);
        this.scene.add(this.lights.sun);

        this.lights.point = new THREE.DirectionalLight(this.colors.light, 4.0);
        this.lights.point.position.set(-1000, 1850, 1000);
        this.lights.point.name = "dirlight";
        this.scene.add(this.lights.point);

        this.lights.point.castShadow = true;
        this.lights.point.shadow.mapSize.width = 2048;
        this.lights.point.shadow.mapSize.height = 2048;

        const d = 300;
        this.lights.point.shadow.camera.left = -d;
        this.lights.point.shadow.camera.right = d;
        this.lights.point.shadow.camera.top = d;
        this.lights.point.shadow.camera.bottom = -d;

        this.lights.point.shadow.camera.far = 3500;
        this.lights.point.shadow.darkness = 0.35;
    },

    _addMaple () {
        gltfLoader.load('./3d/maple.gltf', (model) => {
            this.maple = model;
            this.maple.scene.translateY(-200);
            this.maple.scene.rotateY(1.5);
            this.maple.scene.scale.set(50, 50, 50);
            this.maple.scene.children[0].castShadow = true;
            this.maple.scene.children[1].receiveShadow = true;
            this.scene.add(this.maple.scene);
            this.render();
        });
    },

    _addContols () {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.listenToKeyEvents(window); // optional

        this.controls.addEventListener('change', this.render);

        this.controls.screenSpacePanning = false;

        this.controls.minDistance = 100;
        this.controls.maxDistance = 500;

        this.controls.maxPolarAngle = Math.PI / 2;
    },

    _onWindowResize () {
        this.camera.aspect = getAspect();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
};
