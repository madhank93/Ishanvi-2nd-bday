import { featuredVideo } from '../data/config.js'

// Big featured player. Renders nothing until a src is set in config.js.
export default function VideoFeature() {
  if (!featuredVideo.src) return null
  return (
    <section className="video-feature" id="video">
      <h2 className="section-title">{featuredVideo.title}</h2>
      <div className="card video-frame">
        <video
          src={featuredVideo.src}
          poster={featuredVideo.poster || undefined}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  )
}
