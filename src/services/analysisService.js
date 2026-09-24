/**
 * Centralized Mock Analysis Service.
 * Prototype implementation simulating colour calibration & spectral diff verification.
 * Structure designed so this function can be easily swapped with:
 * `const res = await fetch('/api/analyze', { method: 'POST', body: formData });`
 */
export async function analyzeTestImage(testData) {
  // Simulate network latency / ML processing time
  await new Promise((r) => setTimeout(r, 2200));

  // Determine a deterministic or realistic mock result based on category or random seed
  const resultsOptions = [
    { result: "Presumptive Negative", confidence: 94, status: "negative" },
    { result: "Presumptive Positive", confidence: 88, status: "positive" },
    { result: "Presumptive Negative", confidence: 92, status: "negative" },
    { result: "Inconclusive", confidence: 64, status: "inconclusive" }
  ];

  // Pick mostly Presumptive Negative or Positive for clear testing, default to Presumptive Negative
  let choice = resultsOptions[0];
  if (testData?.category === "Opioid-type Substance") {
    choice = resultsOptions[1];
  } else if (testData?.category === "Other / Unknown") {
    choice = resultsOptions[3];
  }

  return {
    success: true,
    result: choice.result,
    confidence: choice.confidence,
    status: choice.status,
    calibratedRGB: { r: 184, g: 210, b: 242 },
    referenceCardDetected: true,
    lightingQualityScore: 96,
    reactionTimeElapsedSec: 120,
    disclaimer: "This is only a presumptive field-test result and does NOT replace laboratory confirmatory testing.",
    analyzedAt: new Date().toISOString()
  };
}
