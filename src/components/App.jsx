import React, { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  SoftShadows,
  Float,
  Sky,
  Environment,
  OrbitControls, Html,
  Loader, Stats
} from "@react-three/drei"
import { Leva, useControls } from "leva"
import { easing } from "maath"
import { Model } from "./GarageGLB4"
import annotations from "../jsons/annotations.json"
import { Tubes } from "./Tube"

function Box(props) {
  const mesh = useRef();
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[10.4, 2.3, 0.22]} />
      <meshStandardMaterial color={"gray"} opacity={0.6} transparent />
    </mesh>
  );
}

function Annotations({ selected, gotoAnnotation }) {
  return (
    <>
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg height="34" width="34" transform="translate(-16 -16)" style={{ cursor: "pointer" }}>
              <circle cx="17" cy="17" r="16" stroke="white" strokeWidth="2" fill="rgba(0,0,0,.66)"
                      onClick={() => gotoAnnotation(i)} />
              <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: "none" }}>
                {i + 1}
              </text>
            </svg>
            {a.description && i === selected && (
              <div id={"desc_" + i} className="annotationDescription"
                   dangerouslySetInnerHTML={{ __html: a.description }} />
            )}
          </Html>
        )
      })}
    </>
  )
}

function Buttons({ gotoAnnotation }) {
  return (
    <div id="annotationsPanel">
      <ul>
        {annotations.map((a, i) => {
          return (
            <li key={i}>
              <button key={i} className="annotationButton" onClick={() => gotoAnnotation(i)}>
                {a.title}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Animate({ controls, lerping, to, target }) {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta * 2)
      controls.current.target.lerp(target, delta * 2)
    }
  })
}

function Light() {
  const ref = useRef()
  useFrame((state, delta) => {
    easing.dampE(ref.current.rotation, [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0], 0.2, delta)
  })
  return (
    <group ref={ref}>
      <directionalLight position={[5, 8, -6]} castShadow intensity={2} shadow-mapSize={2048} shadow-bias={-0.001}>
        <orthographicCamera attach="shadow-camera" args={[-15.5, 15.5, 15.5, -15.5, 0.1, 50]} />
      </directionalLight>
    </group>
  )
}

export default function App() {
  const [bad, set] = useState(false)
  const { impl, debug, enabled, samples, ...config } = useControls({
    debug: true,
    enabled: true,
    size: { value: 45, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 }
  })
  const ref = useRef()
  const [lerping, setLerping] = useState(false)
  const [to, setTo] = useState()
  const [target, setTarget] = useState()
  const [selected, setSelected] = useState(-1)

  function gotoAnnotation(idx) {
    setTo(annotations[idx].camPos)
    setTarget(annotations[idx].lookAt)
    setSelected(idx)
    setLerping(true)
  }
  return (
   <>
    <Suspense fallback={null}>
      <Leva hidden />
      <Canvas shadows camera={{ position: [1.8, 6.5, 8.0] }} onPointerDown={() => setLerping(false)} onWheel={() => setLerping(false)}>
        {enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
        <color attach="background" args={["#d0d0d0"]} />
        <fog attach="fog" args={["#d0d0d0", 8, 35]} />
        <ambientLight intensity={0.4} />
        <Light />
        <Model />
        <Tubes />
        <Sphere />
        <Sphere position={[2, 4, -8]} scale={0.9} />
        <Sphere position={[-2, 2, -8]} scale={0.8} />
        <Sky inclination={0.52} scale={40} />
        <OrbitControls ref={ref} target={[3, 0, 2]} minPolarAngle={0} maxPolarAngle={Math.PI / 2.0} />
        <Environment background preset="sunset" blur={0.8} />
        <Annotations selected={selected} gotoAnnotation={gotoAnnotation} />
        <Animate controls={ref} lerping={lerping} to={to} target={target} />
        <Box position={[3.92, 0.4, 5.714]} />
        {/*<Stats />*/}
      </Canvas>
      <Buttons gotoAnnotation={gotoAnnotation} />
    </Suspense>
    <Loader />
  </>
  )
}

function Sphere({ color = "hotpink", floatIntensity = 15, position = [0, 5, -8], scale = 1 }) {
  return (
    <Float floatIntensity={floatIntensity}>
      <mesh castShadow position={position} scale={scale}>
        <sphereGeometry />
        <meshBasicMaterial color={color} roughness={1} />
      </mesh>
    </Float>
  )
}
