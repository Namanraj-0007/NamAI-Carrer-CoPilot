import { createContext, useContext, useReducer } from 'react';

const AnalysisContext = createContext();

const initialState = {
  analysis: null,
  loading: false,
  error: null,
  jobMatches: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'ANALYSIS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        analysis: action.payload,
        error: null 
      };
    case 'JOB_MATCHES_SUCCESS':
      return { ...state, jobMatches: action.payload, loading: false };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AnalysisProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider');
  }
  return context;
}
