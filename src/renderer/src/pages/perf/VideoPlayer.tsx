import { observer } from 'mobx-react-lite'

const VideoPlayer = observer(() => {
  return (
    <div>
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
