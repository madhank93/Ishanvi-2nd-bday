import Butterflies from './components/Butterflies.jsx'
import Hero from './components/Hero.jsx'
import Countdown from './components/Countdown.jsx'
import Details from './components/Details.jsx'
import Gallery from './components/Gallery.jsx'
import VideoFeature from './components/VideoFeature.jsx'
import RSVP from './components/RSVP.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Butterflies />
      <main>
        <Hero />
        <Countdown />
        <Details />
        <VideoFeature />
        <Gallery />
        <RSVP />
        <Footer />
      </main>
    </>
  )
}
