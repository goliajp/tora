import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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

const DataDashboard = observer(() => {
  // const [data, setData] = useState<IData[]>([])
  const [info, setInfo] = useState<WebSocketInfo>({} as WebSocketInfo)
  const [timeout, setTimeout] = useState(2)
  // const [length, setLength] = useState(10)
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/data/')
    let lastData: WebSocketInfo | null = null

    socket.onmessage = (event: MessageEvent) => {
      // console.log(JSON.parse(event.data), 'JSON.parse(event.data)')
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
  }, [timeout])

  return (
    <div className="mx-auto flex justify-center items-center flex-col">
      <div className="mt-12">
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
        </div>
      </div>
      <div className="mt-32">
        <div className="flex flex-wrap">
          {alphabetArray.map((char) => (
            <div key={char} className="flex items-center">
              <span className="pl-2 flex-none">{char}</span>
              <span>: {info[char]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center">
          <LineChart width={600} height={300} data={info.list}>
            <Line type="monotone" dataKey="value" stroke={info.color} legendType="square" />
            <CartesianGrid stroke={info.color} />
            <XAxis dataKey="value" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <LineChart width={600} height={300} data={info.list}>
            <Line type="monotone" dataKey="value" stroke={info.color} legendType="square" />
            <CartesianGrid stroke={info.color} />
            <XAxis dataKey="value" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          <div className="w-[600px] flex justify-between">
            <BarChart
              width={580}
              height={300}
              data={info.list}
              layout="vertical" // 让柱状图水平显示
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={info.color} />
            </BarChart>
            <BarChart width={580} height={300} data={info.list}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={info.color} shape={<TriangleBar />} />
            </BarChart>
          </div>
          <BarChart width={600} height={300} data={info.list}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={info.color} />
          </BarChart>
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          <AreaChart width={600} height={300} data={info.list}>
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill={info.color} />
          </AreaChart>
        </div>
      </div>
    </div>
  )
})

export default DataDashboard

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`
}

const TriangleBar: FunctionComponent<any> = (props: any) => {
  const { fill, x, y, width, height } = props

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
}
