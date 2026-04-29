import { useState } from 'react'
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
import CallFlow from './components/CallFlow'
import Opinion from './components/Opinion'
import CTA from './components/CTA'

export default function App() {
  const [minTerm, setMinTerm] = useState(6)
  const [calcResults, setCalcResults] = useState(null)

  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Problem
          minTerm={minTerm}
          onMinTermChange={setMinTerm}
          onCalcUpdate={setCalcResults}
        />
        <Solution />
        <HowItWorks />
        <Benefits />
        <Compare />
        <CallFlow />
        <Industries />
        <Pricing minTerm={minTerm} calcResults={calcResults} />
        <Testimonials />
        <Opinion />
        <CTA />
      </main>
    </>
  )
}
