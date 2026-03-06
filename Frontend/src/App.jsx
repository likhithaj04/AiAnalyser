import './App.css'
import{Route, Routes} from 'react-router-dom'
import { AnalyserProvider } from './context/AnalyserContext'
import ResumeAnalyser from './pages/ResumeAnalyser'
import LinkedinAnalyser from './pages/LinkedinAnalyser'
import Landing from './landingpage/Landing'
import Layout from './layout/Layout'

function App() {
return (
    <>
    <AnalyserProvider>
     <Routes>
      <Route element={<Layout/>}>
      <Route path='/' element={<Landing/>}/>
       <Route path='/r' element={<ResumeAnalyser/>} />
       <Route path='/l' element={<LinkedinAnalyser/>}/>
       </Route>
     </Routes>
     </AnalyserProvider>
    </>
  )
}

export default App
