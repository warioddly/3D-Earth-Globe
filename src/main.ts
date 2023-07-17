
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Earth } from './earth';
import { Light } from './light';




class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;

    private readonly _earth: Earth = new Earth();
    private readonly _light: Light = new Light();


    constructor() {

        this._scene = new THREE.Scene();
        this._scene.add(this._earth.earth);
        this._scene.add(this._light.light);

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 0.9;

        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setAnimationLoop( this._animation.bind(this) );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);

        document.body.appendChild( this._renderer.domElement );

        window.addEventListener( 'resize', this._resize.bind(this) );

    }




    private _animation( time ) {

        this._earth.rotate(time);

        this._controls.update();

        this._renderer.render( this._scene, this._camera );

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }



}



const engine = new Engine();
