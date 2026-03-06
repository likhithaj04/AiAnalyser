import {useReducer} from 'react'
import {initialState,AnalyserReducer} from './AnalyserReducer'
import { createContext } from 'react'

   export const AnalyserContext=createContext()
  export const AnalyserProvider=({children})=>{

    const [state,dispatch]=useReducer(AnalyserReducer,initialState);
return(
    <AnalyserContext.Provider value={{state,dispatch}}>
        {children}
    </AnalyserContext.Provider>
     )
  }


