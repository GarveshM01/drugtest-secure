import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TEST_RECORDS } from '../services/mockData';

const TestContext = createContext(null);

const DEFAULT_TEST_STATE = {
  kit: '',
  category: '',
  caseId: '',
  sampleId: '',
  referenceNumber: '',
  sampleType: 'Powder',
  batchNumber: '',
  expiryDate: '',
  testType: 'Colorimetric Screening',
  instructionsConfirmed: false,
  imageCaptured: null, // Data URL or File
  imageBlob: null,
  analysisResult: null, // { result, confidence, status, calibratedRGB, analyzedAt }
  digitalRecord: null
};

export function TestProvider({ children }) {
  const [currentTest, setCurrentTest] = useState(DEFAULT_TEST_STATE);

  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('drugtest_history');
    return saved ? JSON.parse(saved) : INITIAL_TEST_RECORDS;
  });

  useEffect(() => {
    localStorage.setItem('drugtest_history', JSON.stringify(testHistory));
  }, [testHistory]);

  const updateTestData = (fields) => {
    setCurrentTest((prev) => ({ ...prev, ...fields }));
  };

  const resetTest = () => {
    setCurrentTest(DEFAULT_TEST_STATE);
  };

  const addTestRecord = (record) => {
    setTestHistory((prev) => [record, ...prev]);
  };

  const getRecordById = (recordId) => {
    return testHistory.find((r) => r.recordId === recordId || r.caseId === recordId);
  };

  return (
    <TestContext.Provider
      value={{
        currentTest,
        updateTestData,
        resetTest,
        testHistory,
        addTestRecord,
        getRecordById
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
