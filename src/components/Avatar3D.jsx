import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_URL = 'https://threejs.org/examples/models/gltf/Xbot.glb'

export default function Avatar3D() {
  const mountRef = useRef(null)
  const [modelStatus, setModelStatus] = useState('loading')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    let frameId = 0
    let model
    let mixer
    let clock
    let pointerX = 0
    let pointerY = 0
    let disposed = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 1.8, 8.4)

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      setModelStatus('error')
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7))
    renderer.setSize(mount.clientWidth || 520, mount.clientHeight || 560)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xdafaff, 0x171329, 2.1))

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.1)
    keyLight.position.set(3, 6, 5)
    scene.add(keyLight)

    const cyanLight = new THREE.PointLight(0x00eaff, 26, 12, 2)
    cyanLight.position.set(-3, 2.5, 2)
    scene.add(cyanLight)

    const violetLight = new THREE.PointLight(0x985bff, 22, 12, 2)
    violetLight.position.set(3, 1, -2)
    scene.add(violetLight)

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.018, 12, 140),
      new THREE.MeshBasicMaterial({ color: 0x00eaff, transparent: true, opacity: 0.65 })
    )
    halo.position.set(0, 0.15, -0.45)
    halo.rotation.x = 0.18
    scene.add(halo)

    const haloBack = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.012, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0x985bff, transparent: true, opacity: 0.48 })
    )
    haloBack.position.set(0, 0.1, -0.8)
    haloBack.rotation.x = -0.12
    scene.add(haloBack)

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(1.7, 64),
      new THREE.MeshBasicMaterial({ color: 0x00eaff, transparent: true, opacity: 0.07, side: THREE.DoubleSide })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2.15
    scene.add(ground)

    const resize = () => {
      if (!mount || !renderer) return
      const width = Math.max(mount.clientWidth, 1)
      const height = Math.max(mount.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.22
    }
    const onPointerLeave = () => { pointerX = 0; pointerY = 0 }
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerleave', onPointerLeave)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    clock = new THREE.Clock()
    const loader = new GLTFLoader()
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return
        model = gltf.scene
        const bounds = new THREE.Box3().setFromObject(model)
        const size = bounds.getSize(new THREE.Vector3())
        const center = bounds.getCenter(new THREE.Vector3())
        const scale = 4.25 / Math.max(size.y, 0.001)
        model.scale.setScalar(scale)
        model.position.x = -center.x * scale
        model.position.y = -center.y * scale - 0.03
        model.position.z = -center.z * scale
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.castShadow = true
            child.frustumCulled = false
            child.material = child.material.clone()
            if ('envMapIntensity' in child.material) child.material.envMapIntensity = 1.15
          }
        })
        scene.add(model)
        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(model)
          const idle = gltf.animations.find((clip) => /idle|stand/i.test(clip.name)) || gltf.animations[0]
          mixer.clipAction(idle).play()
        }
        setModelStatus('ready')
      },
      undefined,
      () => { if (!disposed) setModelStatus('error') }
    )

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.05)
      const elapsed = clock.elapsedTime
      if (mixer) mixer.update(delta)
      if (model) {
        model.rotation.y += ((pointerX * 0.5 + Math.sin(elapsed * 0.35) * 0.12) - model.rotation.y) * 0.035
        model.rotation.x += ((-pointerY) - model.rotation.x) * 0.035
        model.position.y += ((Math.sin(elapsed * 1.2) * 0.045 - 0.03) - model.position.y + model.position.y) * 0.001
      }
      halo.rotation.z = elapsed * 0.12
      haloBack.rotation.z = -elapsed * 0.08
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerleave', onPointerLeave)
      mixer?.stopAllAction()
      renderer?.dispose()
      if (renderer?.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
    }
  }, [])

  return (
    <div className="avatar3d-stage" aria-label="Interactive animated 3D human avatar">
      <div className="avatar3d-vignette" />
      <div className="avatar3d-orbit-label"><span /> REAL-TIME 3D MODEL</div>
      <div className="avatar3d-canvas" ref={mountRef} />
      {modelStatus === 'loading' && <div className="avatar3d-loading">INITIALIZING AVATAR<span>...</span></div>}
      {modelStatus === 'error' && (
        <div className="avatar3d-loading avatar3d-error">
          3D MODEL COULD NOT LOAD
          <small>Check your internet connection and refresh.</small>
        </div>
      )}
      <div className="avatar3d-caption"><strong>ASHU</strong><span>CREATIVE DEVELOPER</span></div>
      <div className="avatar3d-coordinate">FIG. 01 / HUMAN INTERFACE</div>
    </div>
  )
}
