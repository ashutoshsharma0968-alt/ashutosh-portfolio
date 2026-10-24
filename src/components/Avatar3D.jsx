import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { profile } from '../data'

export default function Avatar3D() {
  const mountRef = useRef(null)
  const [modelStatus, setModelStatus] = useState('loading')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    let frameId = 0
    let model
    let clock
    let modelBaseY = 0
    let pointerX = 0
    let pointerY = 0
    let disposed = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 1.65, 7.1)
    camera.lookAt(0, 1.22, 0)

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

    // A custom, consistently rendered 3D developer avatar (no third-party model dependency).
    const avatar = new THREE.Group()
    const material = (color, roughness = 0.62, metalness = 0.04) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness })
    const skin = material(0xc98e70, 0.72)
    const skinShadow = material(0xa96d55, 0.76)
    const hair = material(0x191b25, 0.48)
    const jacket = material(0x171d2d, 0.42, 0.12)
    const jacketEdge = material(0x2b354b, 0.4, 0.12)
    const shirt = material(0xe8eef5, 0.36)
    const tie = material(0x16d9ee, 0.3, 0.16)
    const eyeWhite = material(0xf3f5f7, 0.3)
    const iris = material(0x30221c, 0.34)
    const dark = material(0x17151a, 0.55)
    const lip = material(0x8d5148, 0.68)

    const mesh = (geometry, mat, position, parent = avatar) => {
      const item = new THREE.Mesh(geometry, mat)
      item.position.set(...position)
      item.castShadow = true
      item.receiveShadow = true
      parent.add(item)
      return item
    }
    const ellipsoid = (mat, position, scale, parent = avatar, segments = 28) => {
      const item = mesh(new THREE.SphereGeometry(1, segments, Math.max(16, segments - 4)), mat, position, parent)
      item.scale.set(...scale)
      return item
    }
    const capsule = (mat, position, radius, length, parent = avatar) =>
      mesh(new THREE.CapsuleGeometry(radius, length, 8, 18), mat, position, parent)

    // Tailored half-body silhouette, slightly broader shoulders and a clean blazer.
    const torso = mesh(new THREE.CylinderGeometry(0.48, 0.66, 1.28, 40, 1, false), jacket, [0, 1.02, 0])
    torso.scale.z = 0.72
    ellipsoid(jacket, [-0.43, 1.53, 0], [0.34, 0.25, 0.31])
    ellipsoid(jacket, [0.43, 1.53, 0], [0.34, 0.25, 0.31])
    mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.34, 24), skin, [0, 1.91, 0.015])

    // White shirt front and a neat cyan tie.
    mesh(new THREE.BoxGeometry(0.34, 0.93, 0.035), shirt, [0, 1.22, 0.335])
    const tieShape = new THREE.Shape()
    tieShape.moveTo(-0.07, 0.24); tieShape.lineTo(0.07, 0.24)
    tieShape.lineTo(0.13, -0.27); tieShape.lineTo(0, -0.43)
    tieShape.lineTo(-0.13, -0.27); tieShape.closePath()
    const tieMesh = mesh(new THREE.ShapeGeometry(tieShape), tie, [0, 1.21, 0.36])
    tieMesh.material.side = THREE.DoubleSide
    const knot = mesh(new THREE.BoxGeometry(0.105, 0.105, 0.055), tie, [0, 1.53, 0.39])
    knot.rotation.z = 0.04

    // Angled blazer lapels, built as clean tailored panels.
    const makePanel = (points, mat) => {
      const shape = new THREE.Shape()
      shape.moveTo(points[0][0], points[0][1])
      for (let i = 1; i < points.length; i++) shape.lineTo(points[i][0], points[i][1])
      shape.closePath()
      const panel = mesh(new THREE.ShapeGeometry(shape), mat, [0, 0, 0.39])
      panel.material.side = THREE.DoubleSide
      return panel
    }
    makePanel([[-0.28, 1.67], [-0.06, 1.48], [-0.22, 1.08], [-0.43, 1.56]], jacketEdge)
    makePanel([[0.28, 1.67], [0.06, 1.48], [0.22, 1.08], [0.43, 1.56]], jacketEdge)
    for (let i = 0; i < 3; i++) ellipsoid(jacketEdge, [0.31, 1.03 - i * 0.16, 0.36], [0.018, 0.018, 0.012], avatar, 12)

    // Arms in a relaxed, confident pose with subtle cuffs and hands.
    const leftArm = capsule(jacket, [-0.73, 1.16, 0.01], 0.17, 0.66)
    leftArm.rotation.z = -0.19
    const rightArm = capsule(jacket, [0.73, 1.16, 0.01], 0.17, 0.66)
    rightArm.rotation.z = 0.19
    const leftCuff = capsule(shirt, [-0.81, 0.72, 0.035], 0.105, 0.12)
    leftCuff.rotation.z = -0.19
    const rightCuff = capsule(shirt, [0.81, 0.72, 0.035], 0.105, 0.12)
    rightCuff.rotation.z = 0.19
    ellipsoid(skin, [-0.83, 0.57, 0.04], [0.13, 0.17, 0.12])
    ellipsoid(skin, [0.83, 0.57, 0.04], [0.13, 0.17, 0.12])

    // Face: soft jaw, ears, hairline, brows, eyes, nose and a restrained smile.
    ellipsoid(skin, [0, 2.28, 0.015], [0.315, 0.405, 0.29], avatar, 40)
    ellipsoid(skinShadow, [-0.315, 2.26, 0], [0.065, 0.12, 0.075], avatar, 20)
    ellipsoid(skinShadow, [0.315, 2.26, 0], [0.065, 0.12, 0.075], avatar, 20)
    // Hair cap and swept fringe.
    ellipsoid(hair, [0, 2.52, -0.005], [0.325, 0.22, 0.30], avatar, 36)
    const fringe = ellipsoid(hair, [-0.095, 2.48, 0.225], [0.205, 0.105, 0.09], avatar, 28)
    fringe.rotation.z = -0.24
    ellipsoid(hair, [0.19, 2.43, 0.15], [0.13, 0.105, 0.14], avatar, 24)
    // Eyes sit forward enough to read clearly under the cinematic lighting.
    for (const side of [-1, 1]) {
      ellipsoid(eyeWhite, [side * 0.115, 2.31, 0.274], [0.064, 0.038, 0.026], avatar, 20)
      ellipsoid(iris, [side * 0.115, 2.31, 0.297], [0.026, 0.028, 0.012], avatar, 16)
      const brow = ellipsoid(hair, [side * 0.115, 2.385, 0.274], [0.073, 0.018, 0.025], avatar, 18)
      brow.rotation.z = side * -0.08
    }
    ellipsoid(skinShadow, [0, 2.23, 0.292], [0.045, 0.075, 0.055], avatar, 20)
    ellipsoid(skin, [0, 2.20, 0.326], [0.052, 0.035, 0.04], avatar, 18)
    ellipsoid(lip, [0, 2.115, 0.277], [0.075, 0.018, 0.022], avatar, 20)
    // Jaw stubble shadow adds definition without making the face harsh.
    const jawShadow = ellipsoid(skinShadow, [0, 2.04, 0.15], [0.205, 0.075, 0.17], avatar, 28)
    jawShadow.material.transparent = true
    jawShadow.material.opacity = 0.22

    avatar.scale.setScalar(1.12)
    avatar.position.set(0, -0.22, 0)
    model = avatar
    modelBaseY = avatar.position.y
    scene.add(avatar)
    setModelStatus('ready')

    // Load a textured, natural-proportioned human character for the cinematic hero.
    // The locally-built avatar above stays visible as a fallback if the asset host is unavailable.
    const humanLoader = new GLTFLoader()
    humanLoader.load(
      'https://www.innerscene.com/api/library/one-hand-on-hip-3d-person-standing-7d13068a/download',
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose()
          })
          return
        }
        const human = gltf.scene
        const bounds = new THREE.Box3().setFromObject(human)
        const size = bounds.getSize(new THREE.Vector3())
        const center = bounds.getCenter(new THREE.Vector3())
        const desiredHeight = 3.45
        human.scale.setScalar(desiredHeight / Math.max(size.y, 0.01))
        human.position.x = -center.x * human.scale.x
        human.position.y = -bounds.min.y * human.scale.y - 0.55
        human.position.z = -center.z * human.scale.z
        human.traverse((object) => {
          if (object.isMesh) {
            object.castShadow = true
            object.receiveShadow = true
            if (object.material) {
              object.material.needsUpdate = true
              if ('roughness' in object.material) object.material.roughness = Math.min(object.material.roughness ?? 0.7, 0.78)
            }
          }
        })
        scene.remove(avatar)
        model = human
        modelBaseY = human.position.y
        scene.add(human)
        setModelStatus('ready')
      },
      undefined,
      () => {
        // Keep the custom fallback visible if the hosted GLB cannot be fetched.
        setModelStatus('ready')
      }
    )

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.05)
      const elapsed = clock.elapsedTime
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
      {modelStatus === 'loading' && <div className="avatar3d-loading">PREPARING 3D PROFILE<span>...</span></div>}
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
