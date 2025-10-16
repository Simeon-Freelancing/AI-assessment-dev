import React, { createContext, useState, useContext } from 'react';

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [responses, setResponses] = useState({});
  const [currentDomain, setCurrentDomain] = useState(1);
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  const updateResponse = (questionId, score) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const resetAssessment = () => {
    setResponses({});
    setCurrentDomain(1);
    setAssessmentStarted(false);
  };

  const startAssessment = () => {
    setAssessmentStarted(true);
  };

  return (
    <AssessmentContext.Provider value={{
      responses,
      currentDomain,
      assessmentStarted,
      updateResponse,
      setCurrentDomain,
      resetAssessment,
      startAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
