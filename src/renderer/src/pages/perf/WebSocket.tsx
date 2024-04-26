import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface IData {
  value: number
  height: number
  color: string
}

const WebSocketComponent = observer(() => {
  const [data, setData] = useState<IData[]>([])
  const [timeout, setTimeout] = useState(500)
  const [length, setLength] = useState(10)
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/data/')
    let lastData: IData[] | null

    socket.onmessage = (event: MessageEvent) => {
      lastData = JSON.parse(event.data) as IData[]
    }

    const intervalId = setInterval(() => {
      if (lastData) {
        setData(lastData.slice(0, length))
        lastData = null
      }
    }, timeout)

    return () => {
      socket.close()
      clearInterval(intervalId)
    }
  }, [length, timeout])

  const returnColor = (index: number): string => {
    if (data.length) {
      return data[index].color
    } else {
      return '#f00'
    }
  }

  return (
    <div className="mx-auto w-3/5 flex justify-center items-center flex-col">
      <div className="w-72 bg-white py-4 flex flex-col items-center mx-auto inset-x-0 z-[2]">
        <h1 className="text-2xl font-bold">Text Edit</h1>
        <div className="flex mt-6">
          <div>
            <span>timeout: (max:1s/120 )</span>
            <input
              className="border ml-2"
              type="number"
              value={timeout}
              onChange={(e) => setTimeout(Number(e.target.value))}
              placeholder="timeout"
            />
          </div>
          <div className="ml-4">
            <span>length (min:5 max:100)</span>
            <input
              className="border ml-2"
              type="number"
              value={length}
              onChange={(e) =>
                setLength(() => {
                  if (Number(e.target.value) < 4) {
                    return 5
                  } else {
                    return Number(e.target.value)
                  }
                })
              }
              placeholder="timeout"
            />
          </div>
        </div>
      </div>
      <div className="mt-32">
        <LineChart width={1200} height={300} data={data}>
          <Line type="monotone" dataKey="value" stroke={returnColor(0)} legendType="square" />
          <CartesianGrid stroke={returnColor(1)} />
          <XAxis dataKey="value" />
          <YAxis />
          <Tooltip />
        </LineChart>
        <BarChart width={1200} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={returnColor(2)} />
          <Bar dataKey="value" fill={returnColor(3)} />
        </BarChart>
        <PieChart width={1200} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            label
            fill={returnColor(4)}
          />
        </PieChart>
      </div>
    </div>
  )
})

export default WebSocketComponent
