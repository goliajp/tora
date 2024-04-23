import { ReactElement, useEffect, useReducer, useRef } from 'react'

interface FPSStatsProps {
  graphWidth?: number
}
interface FPSState {
  len: number
  max: number
  frames: number
  prevTime: number
  fps: number[]
}

const FPSStats = ({ graphWidth = 70 }: FPSStatsProps): ReactElement => {
  const [state, dispatch] = useReducer(
    (state: FPSState) => {
      const currentTime = Date.now()
      if (currentTime > state.prevTime + 1000) {
        const nextFPS = [
          ...new Array(Math.floor((currentTime - state.prevTime - 1000) / 1000)).fill(0),
          Math.max(1, Math.round((state.frames * 1000) / (currentTime - state.prevTime)))
        ]
        return {
          max: Math.max(state.max, ...nextFPS),
          len: Math.min(state.len + nextFPS.length, graphWidth),
          fps: [...state.fps, ...nextFPS].slice(-graphWidth),
          frames: 1,
          prevTime: currentTime
        }
      } else {
        return { ...state, frames: state.frames + 1 }
      }
    },
    {
      len: 0,
      max: 0,
      frames: 0,
      prevTime: Date.now(),
      fps: []
    }
  )

  const requestRef = useRef<number | undefined>()
  const tick = () => {
    dispatch()
    requestRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(requestRef.current || 0)
  }, [])

  const { fps, len } = state

  return (
    <div>
      <span>{fps[len - 1]} FPS</span>
    </div>
  )
}

export default FPSStats
