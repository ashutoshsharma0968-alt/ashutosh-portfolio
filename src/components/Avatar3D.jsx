import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { profile } from '../data'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_URL = 'https://readyplayerme.github.io/visage/male.glb'

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
    let modelBaseY = 0
    let pointerX = 0
    let pointerY = 0
    let disposed = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 1.7, 5.2)
    camera.lookAt(0, 1.05, 0)

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
    renderer.toneMappingExposure = 1.3
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
        modelBaseY = model.position.y
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
      () => {
        if (disposed) return
        // Keep the avatar area populated even if the external GLB host is unavailable.
        const fallback = new THREE.Group()
        const mat = (color, roughness = 0.72) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.04 })
        const skin = mat(0xc98f70)
        const hair = mat(0x211a1b)
        const suit = mat(0x171b2d)
        const shirt = mat(0xeaf3f7, 0.42)
        const tie = mat(0x00cfe8, 0.38)
        const add = (geometry, material, x, y, z, group = fallback) => {
          const mesh = new THREE.Mesh(geometry, material)
          mesh.position.set(x, y, z)
          group.add(mesh)
          return mesh
        }
        // Head, hair and neck
        add(new THREE.SphereGeometry(0.31, 28, 24), skin, 0, 2.28, 0)
        add(new THREE.SphereGeometry(0.315, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.53), hair, 0, 2.42, -0.035)
        add(new THREE.CylinderGeometry(0.105, 0.12, 0.28, 18), skin, 0, 1.94, 0)
        // Tailored dark blazer and white shirt
        add(new THREE.BoxGeometry(1.18, 1.12, 0.48), suit, 0, 1.28, 0)
        add(new THREE.BoxGeometry(0.38, 0.92, 0.035), shirt, 0, 1.34, 0.252)
        const lapelLeft = add(new THREE.BufferGeometry(), shirt, -0.16, 1.57, 0.28)
        lapelLeft.geometry.dispose()
        fallback.remove(lapelLeft)
        const tieMesh = add(new THREE.BoxGeometry(0.105, 0.55, 0.045), tie, 0, 1.31, 0.285)
        tieMesh.rotation.z = -0.015
        add(new THREE.SphereGeometry(0.07, 16, 12), tie, 0, 1.61, 0.29)
        // Arms angled slightly outward, with hands
        const armLeft = add(new THREE.CylinderGeometry(0.16, 0.13, 0.95, 18), suit, -0.72, 1.3, 0.01)
        armLeft.rotation.z = -0.16
        const armRight = add(new THREE.CylinderGeometry(0.13, 0.16, 0.95, 18), suit, 0.72, 1.3, 0.01)
        armRight.rotation.z = 0.16
        add(new THREE.SphereGeometry(0.13, 16, 12), skin, -0.79, 0.78, 0.02)
        add(new THREE.SphereGeometry(0.13, 16, 12), skin, 0.79, 0.78, 0.02)
        fallback.position.y = -0.08
        fallback.userData.isFallbackAvatar = true
        model = fallback
        scene.add(model)
        setModelStatus('ready')
      }
    )

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.05)
      const elapsed = clock.elapsedTime
      if (mixer) mixer.update(delta)
      if (model) {
        model.rotation.y += ((pointerX * 0.5 + Math.sin(elapsed * 0.35) * 0.12) - model.rotation.y) * 0.035
        model.rotation.x += ((-pointerY) - model.rotation.x) * 0.035
        model.position.y = modelBaseY + Math.sin(elapsed * 1.2) * 0.045
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
    <div className="avatar3d-stage" aria-label="Cinematic half-body human 3D student developer avatar">
      <div className="avatar3d-vignette" />
      <div className="avatar3d-grain" />
      <div className="avatar3d-topline">
        <div className="avatar3d-orbit-label"><span /> DIGITAL IDENTITY / 2026</div>
        <div className="avatar3d-live-tag">● AVAILABLE TO LEARN</div>
      </div>
      <div className="avatar3d-canvas" ref={mountRef} />
      {modelStatus === 'loading' && <div className="avatar3d-loading">LOADING 3D DEVELOPER AVATAR<span>...</span></div>}
      {modelStatus === 'error' && (
        <div className="avatar3d-loading avatar3d-error">
          HUMAN 3D MODEL COULD NOT LOAD
          <small>Check your internet connection and refresh.</small>
        </div>
      )}
      <div className="avatar3d-side-data avatar3d-side-left">
        <span className="avatar3d-index">01 / PROFILE</span>
        <strong>THE BUILDER</strong>
        <span className="avatar3d-rule" />
        <span>Curious mind.</span>
        <span>Building the future.</span>
      </div>
      <div className="avatar3d-side-data avatar3d-side-right">
        <span className="avatar3d-index">02 / CURRENTLY</span>
        <strong>B.TECH</strong>
        <span>Computer Science</span>
        <span>& Technology</span>
        <span className="avatar3d-rule" />
        <span>ARKA JAIN</span>
        <span>UNIVERSITY</span>
      </div>
      <div className="avatar3d-student-card">
        <div className="avatar3d-student-monogram">AS<span>✦</span></div>
        <div className="avatar3d-student-info">
          <span className="avatar3d-index">STUDENT / DEVELOPER</span>
          <strong>{profile.name}</strong>
          <span>B.Tech · Computer Science & Technology</span>
          <span>Arka Jain University · Batch 2025–29</span>
        </div>
        <div className="avatar3d-student-status"><i /> LEARNING</div>
      </div>
      <div className="avatar3d-contact-strip">
        <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        <a href={`mailto:${profile.email}`}>EMAIL ↗</a>
      </div>
      <div className="avatar3d-coordinate">JAMSHEDPUR, INDIA · FIG. 01</div>
    </div>
  )
}
