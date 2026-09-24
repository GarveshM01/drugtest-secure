// Centralized Mock Data for DrugTest Secure Prototype

export const DEMO_OFFICER = {
  officerId: "OFF-1023",
  name: "Officer Vikram Sharma",
  unit: "BPL-CENTRAL-01",
  pin: "1234",
  role: "Field Testing Officer",
  badgeNumber: "IND-MP-8892",
  department: "Narcotics Control & Field Verification Bureau",
  zone: "Bhopal Central Zone",
  status: "Active Duty"
};

export const TEST_KITS = [
  {
    id: "kit-colorimetric",
    name: "Colorimetric Field Test Kit",
    code: "CFTK-STD",
    description: "Standard multi-reagent colour change kit for fast field screening.",
    expiryDefaultDays: 180
  },
  {
    id: "kit-multisubstance",
    name: "Multi-Substance Field Test Kit",
    code: "MSFT-PLUS",
    description: "Multi-channel test kit for concurrent target identification.",
    expiryDefaultDays: 365
  },
  {
    id: "kit-unknown",
    name: "Unknown Substance Screening Kit",
    code: "USSK-ADV",
    description: "High-sensitivity screening kit for unidentified powder/liquid samples.",
    expiryDefaultDays: 90
  }
];

export const SUBSTANCE_CATEGORIES = [
  { id: "cannabis", name: "Cannabis", description: "THC / Cannabinoid reagents", color: "bg-emerald-100 text-emerald-800" },
  { id: "opioid", name: "Opioid-type Substance", description: "Morphine, Heroin, Synthetic opioids", color: "bg-amber-100 text-amber-800" },
  { id: "cocaine", name: "Cocaine-type Substance", description: "Cocaine HCl, Crack cocaine alkaloids", color: "bg-purple-100 text-purple-800" },
  { id: "amphetamine", name: "Amphetamine-type Substance", description: "Amphetamine, Methamphetamine, MDMA", color: "bg-blue-100 text-blue-800" },
  { id: "other", name: "Other / Unknown", description: "General non-classified or mixed chemical compound", color: "bg-slate-100 text-slate-800" }
];

export const SAMPLE_TYPES = [
  "Powder",
  "Tablet",
  "Plant Material",
  "Liquid",
  "Other"
];

export const INITIAL_TEST_RECORDS = [
  {
    recordId: "DTS-2026-0089",
    caseId: "CASE-2026-00124",
    sampleId: "SMP-00124",
    referenceNumber: "REF-98721",
    kit: "Colorimetric Field Test Kit",
    category: "Cannabis",
    sampleType: "Plant Material",
    batchNumber: "KIT-BPL-2026-018",
    expiryDate: "2026-11-30",
    officerId: "OFF-1023",
    officerName: "Officer Vikram Sharma",
    unit: "BPL-CENTRAL-01",
    dateTime: "2026-09-24 14:32 IST",
    timestamp: "2026-09-24T14:32:00.000Z",
    location: "Bhopal, Madhya Pradesh (23.2599° N, 77.4126° E)",
    result: "Presumptive Negative",
    confidence: 94,
    integrity: "Verified",
    hash: "a8f2c91d7b4e9081f2356c9a8910e4b7c2a1049b1285e6790214c719852091ab",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60"
  },
  {
    recordId: "DTS-2026-0088",
    caseId: "CASE-2026-00119",
    sampleId: "SMP-00119",
    referenceNumber: "REF-88412",
    kit: "Multi-Substance Field Test Kit",
    category: "Opioid-type Substance",
    sampleType: "Powder",
    batchNumber: "KIT-BPL-2026-012",
    expiryDate: "2026-08-15",
    officerId: "OFF-1045",
    officerName: "Officer Rajesh Patel",
    unit: "BPL-CENTRAL-01",
    dateTime: "2026-09-24 11:15 IST",
    timestamp: "2026-09-24T11:15:00.000Z",
    location: "Bhopal Railway Junction, MP",
    result: "Presumptive Positive",
    confidence: 89,
    integrity: "Verified",
    hash: "f4e198b203c9d71a620e54b8109312fe490a187b543c19d28e765109b83210ef",
    imageUrl: null
  },
  {
    recordId: "DTS-2026-0087",
    caseId: "CASE-2026-00105",
    sampleId: "SMP-00105",
    referenceNumber: "REF-77290",
    kit: "Unknown Substance Screening Kit",
    category: "Other / Unknown",
    sampleType: "Liquid",
    batchNumber: "KIT-BPL-2026-005",
    expiryDate: "2026-12-01",
    officerId: "OFF-1081",
    officerName: "Officer Sunita Verma",
    unit: "BPL-EAST-02",
    dateTime: "2026-09-23 18:40 IST",
    timestamp: "2026-09-23T18:40:00.000Z",
    location: "Indore Highway Checkpoint, MP",
    result: "Inconclusive",
    confidence: 61,
    integrity: "Verified",
    hash: "7b09e24810c9d774a1209b55219e840192a83e01297d65418b76c1234901ef23",
    imageUrl: null
  },
  {
    recordId: "DTS-2026-0086",
    caseId: "CASE-2026-00098",
    sampleId: "SMP-00098",
    referenceNumber: "REF-65109",
    kit: "Colorimetric Field Test Kit",
    category: "Amphetamine-type Substance",
    sampleType: "Tablet",
    batchNumber: "KIT-BPL-2026-018",
    expiryDate: "2026-11-30",
    officerId: "OFF-1023",
    officerName: "Officer Vikram Sharma",
    unit: "BPL-CENTRAL-01",
    dateTime: "2026-09-22 09:10 IST",
    timestamp: "2026-09-22T09:10:00.000Z",
    location: "Bhopal Industrial Area, MP",
    result: "Presumptive Negative",
    confidence: 96,
    integrity: "Verified",
    hash: "3c98d27e10a56b782910c4109b82a71029e84719280d4187265bc102938471aa",
    imageUrl: null
  },
  {
    recordId: "DTS-2026-0085",
    caseId: "CASE-2026-00091",
    sampleId: "SMP-00091",
    referenceNumber: "REF-54190",
    kit: "Multi-Substance Field Test Kit",
    category: "Cocaine-type Substance",
    sampleType: "Powder",
    batchNumber: "KIT-BPL-2026-010",
    expiryDate: "2026-07-20",
    officerId: "OFF-1045",
    officerName: "Officer Rajesh Patel",
    unit: "BPL-CENTRAL-01",
    dateTime: "2026-09-21 16:55 IST",
    timestamp: "2026-09-21T16:55:00.000Z",
    location: "Habibganj Sub-post, Bhopal, MP",
    result: "Presumptive Positive",
    confidence: 91,
    integrity: "Verified",
    hash: "91e0a8276c5418b76102938471029e84719280d4187265bc102938471aa3c98d",
    imageUrl: null
  }
];

export const MOCK_SUPERVISOR_OFFICERS = [
  {
    officerId: "OFF-1023",
    name: "Officer Vikram Sharma",
    unit: "BPL-CENTRAL-01",
    totalTests: 42,
    positivesThisMonth: 8,
    status: "Active - Duty",
    lastActive: "Just now"
  },
  {
    officerId: "OFF-1045",
    name: "Officer Rajesh Patel",
    unit: "BPL-CENTRAL-01",
    totalTests: 38,
    positivesThisMonth: 12,
    status: "Active - Duty",
    lastActive: "2 hours ago"
  },
  {
    officerId: "OFF-1081",
    name: "Officer Sunita Verma",
    unit: "BPL-EAST-02",
    totalTests: 29,
    positivesThisMonth: 5,
    status: "Off - Shift",
    lastActive: "Yesterday"
  }
];
