
export const initialState={
    file:null,
    analysertype:null,
    loading:null,
    result:null,
    error:null
}

export function AnalyserReducer(state,action) {
  switch(action.type){
    case "SET_FILE":
        return {...state,file:action.payload};
    case "SET_RESULT":
        return {...state,result:action.payload};
    case "SET_TYPE":
        return {...state,analysertype:action.payload};
    case "SET_LOADING":
        return {...state,loading:action.payload}
    case "SET_ERROR":
        return {...state,error:action.payload}
    
        case "RESET":
            return initialState
    default:
        return state
  }
}

