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
import PersonalizationForm from './components/PersonalizationForm'
import FormModal from './components/FormModal'
import TechFAQ from './components/TechFAQ'

export default function App() {
  const [calcResults, setCalcResults] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)

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
        <CallFlow onOpenForm={() => setShowFormModal(true)} />
        <PersonalizationForm />
        <TechFAQ />
        <CTA />
      </main>
      {showFormModal && <FormModal onClose={() => setShowFormModal(false)} />}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999 }}>
        <elevenlabs-convai agent-id="agent_5101ksjdr0xgf50a587wvrd2cnrg" />
      </div>
    </>
    </LanguageProvider>
  )
}
