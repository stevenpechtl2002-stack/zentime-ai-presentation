import { useState } from 'react'
import './index.css'
import { INDUSTRIES } from './data/industries'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import IndustrySelector from './components/IndustrySelector'
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
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0])

  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <IndustrySelector selected={selectedIndustry} onChange={setSelectedIndustry} />
        <Problem industry={selectedIndustry} />
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
