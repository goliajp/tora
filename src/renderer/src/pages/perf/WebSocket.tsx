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

type IData = {
  value: number
}

type AlphaChars =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

type NumberOfAlphaChars = { [K in AlphaChars]: number }

type BaseWebSocketInfo = {
  color: string
  list: IData[]
}

type WebSocketInfo = BaseWebSocketInfo & NumberOfAlphaChars

const alphabetArray = Array.from(
  { length: 26 },
  (_, i) => String.fromCharCode(97 + i) as AlphaChars
)

const WebSocketComponent = observer(() => {
  // const [data, setData] = useState<IData[]>([])
  const [info, setInfo] = useState<WebSocketInfo>({} as WebSocketInfo)
  const [timeout, setTimeout] = useState(2)
  // const [length, setLength] = useState(10)
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/data/')
    let lastData: WebSocketInfo | null = null

    socket.onmessage = (event: MessageEvent) => {
      console.log(JSON.parse(event.data), 'JSON.parse(event.data)')
      lastData = JSON.parse(event.data)
    }

    const intervalId = setInterval(
      () => {
        if (lastData) {
          setInfo(lastData)
          lastData = null
        }
      },
      Math.floor(1000 / timeout)
    )

    return () => {
      socket.close()
      clearInterval(intervalId)
    }
  }, [length, timeout])

  return (
    <div className="mx-auto w-3/5 flex justify-center items-center flex-col">
      <div className="w-72 bg-white py-4 flex flex-col items-center mx-auto inset-x-0 z-[2]">
        <h1 className="text-2xl font-bold">Web Socket</h1>
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
          {/*<div className="ml-4">*/}
          {/*  <span>length (min:5 max:100)</span>*/}
          {/*  <input*/}
          {/*    className="border ml-2"*/}
          {/*    type="number"*/}
          {/*    value={length}*/}
          {/*    onChange={(e) =>*/}
          {/*      setLength(() => {*/}
          {/*        if (Number(e.target.value) < 4) {*/}
          {/*          return 5*/}
          {/*        } else {*/}
          {/*          return Number(e.target.value)*/}
          {/*        }*/}
          {/*      })*/}
          {/*    }*/}
          {/*    placeholder="timeout"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="mt-32">
        <div className="flex">
          {alphabetArray.map((char) => (
            <div key={char} className="flex items-center">
              <span className="pl-2">{char}</span>
              <span>: {info[char]}</span>
            </div>
          ))}
        </div>
        <LineChart width={1200} height={300} data={info.list}>
          <Line type="monotone" dataKey="value" stroke={info.color} legendType="square" />
          <CartesianGrid stroke={info.color} />
          <XAxis dataKey="value" />
          <YAxis />
          <Tooltip />
        </LineChart>
        <BarChart width={1200} height={300} data={info.list}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={info.color} />
          <Bar dataKey="value" fill={info.color} />
        </BarChart>
        <PieChart width={1200} height={250}>
          <Pie
            data={info.list}
            dataKey="value"
            nameKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            label
            fill={info.color}
          />
        </PieChart>
      </div>
    </div>
  )
})

export default WebSocketComponent
