import route from '@/renderer/src/constants/route'
import { Link } from 'react-router-dom'

export const LeftRoute = () => {
  return (
    <div className="w-24 bg-red-500 h-full fixed flex flex-col items-center py-6 left-0 top-0">
      {route.map((item, index) => {
        //有name就取name，没有就取path，去掉第一个字符
        return (
          <div key={index} className="mb-2 relative group w-full text-center">
            <Link to={item.children ? '/' : item.path} className="text-white text-xl">
              {item.name ?? item.path.substring(1)}
            </Link>
            {item.children && (
              <div className="absolute bg-white left-20 top-2 shadow rounded-xl w-28 flex-col text-center py-4 hidden group-hover:flex z-[5]">
                {item.children.map((child, childIndex) => {
                  return (
                    <Link
                      to={child.path}
                      key={childIndex}
                      className="text-black text-sm pb-2 last:pb-0 hover:text-blue-500"
                    >
                      {child.name ?? child.path.substring(1)}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
