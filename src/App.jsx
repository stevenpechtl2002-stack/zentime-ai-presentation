import { useState } from 'react'
import './index.css'
import { LanguageProvider } from './LanguageContext'
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
import CallFlow from './components/CallFlow'
import Demo from './components/Demo'
import CTA from './components/CTA'
import TechFAQ from './components/TechFAQ'

export default function App() {
  const [calcResults, setCalcResults] = useState(null)

  return (
    <LanguageProvider>
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Problem onCalcUpdate={setCalcResults} />
        <Solution />
        <Benefits />
        <HowItWorks />
        <Demo />
        <Compare />
        <Industries />
        <Pricing calcResults={calcResults} />
        <CallFlow />
        <TechFAQ />
        <CTA />
      </main>
    </>
    </LanguageProvider>
  )
}
