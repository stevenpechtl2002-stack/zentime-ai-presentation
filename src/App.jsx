import './index.css'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Compare from './components/Compare'
import Industries from './components/Industries'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'

export default function App() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Benefits />
        <Compare />
        <Industries />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
    </>
  )
}
