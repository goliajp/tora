import { observer } from 'mobx-react-lite'

const VideoPlayer = observer(() => {
  return (
    <div className="mx-auto w-3/5">
      <div className="bg-white py-4 flex flex-col items-center mx-auto inset-x-0 z-[2]">
        <h1 className="text-2xl font-bold">4k Video Player</h1>
      </div>
      <video controls>
        <source
          src="https://videos.pexels.com/video-files/3843103/3843103-uhd_3840_2160_30fps.mp4"
          type="video/mp4"
        />
        <track kind="captions" />
      </video>
    </div>
  )
})
export default VideoPlayer
