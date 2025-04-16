import React, { useState } from 'react';
import { Globe, AlertTriangle, CheckCircle, XCircle, ArrowRight, FileText, Scale, Shield, Building2, Search, Link, Clock, FileCheck, FileWarning } from 'lucide-react';

// ... [keep all the interfaces and data exactly as is]

export function InternationalInvestigationSimulator() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [requestStatus, setRequestStatus] = useState<Record<string, 'pending' | 'submitted' | 'approved' | 'denied'>>({});
  const [showResult, setShowResult] = useState(false);
  const [showJurisdiction, setShowJurisdiction] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showBestPractices, setShowBestPractices] = useState(false);

  // ... [keep all the component implementation exactly as is]
}