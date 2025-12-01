export const QUESTIONS = {
  1: [
    {
      id: 1,
      text: "Do you maintain a central, up-to-date inventory of all data assets and their designated owners?",
      title: "Central Inventory",
    },
    {
      id: 2,
      text: "Can staff search and discover datasets using an enterprise data catalog with lineage and access controls?",
      title: "Datasets Accessibility",
    },
    {
      id: 3,
      text: "Are standardized APIs or data services available to enable cross-system interoperability?",
      title: "Standardized API Availability",
    },
    {
      id: 4,
      text: "Are your data pipelines monitored through automated observability and alerting systems?",
      title: "Data Pipelines Monitored",
    },
    {
      id: 5,
      text: "Is there a unified master data management (MDM) system ensuring consistent entity IDs across platforms?",
      title: "Data Quality Processes",
    },
    {
      id: 6,
      text: "Can customer or entity records be linked seamlessly across CRM, ERP, and analytics systems?",
      title: "Data Privacy Compliance",
    },
    {
      id: 7,
      text: "Do you support real-time or streaming data ingestion where business needs it?",
      title: "Data Sharing Governance",
    },
    {
      id: 8,
      text: "Are open, analytics-friendly data formats (e.g., Parquet, JSON, Delta Lake) standardized organization-wide?",
      title: "Master Data Consistency",
    },
    {
      id: 9,
      text: "Can every data element be traced from its source to its use in models or reports (data lineage)?",
      title: "Data Integration Workflows",
    },
    {
      id: 10,
      text: "Can authorized users access governed, self-service data without relying on IT tickets?",
      title: "Real-time Data Availability",
    },
  ],
  2: [
    {
      id: 1,
      text: "Do you measure data completeness and mandatory-field coverage for key datasets?",
      title: "Compute Resources Available",
    },
    {
      id: 2,
      text: "Are automated validation and quality rules implemented for data accuracy checks?",
      title: "Storage Infrastructure Sufficient",
    },
    {
      id: 3,
      text: "Are data values consistent across systems and reconciled automatically where conflicts occur?",
      title: "Cloud Services Utilization",
    },
    {
      id: 4,
      text: "Are data freshness and latency governed by defined SLAs?",
      title: "Scalable Architecture Design",
    },
    {
      id: 5,
      text: "Are duplicate or conflicting records detected and resolved automatically?",
      title: "Infrastructure Monitoring Tools",
    },
    {
      id: 6,
      text: "Are missing or null values handled systematically using defined imputation or default strategies?",
      title: "Disaster Recovery Preparedness",
    },
    {
      id: 7,
      text: "Is data profiling performed regularly to identify and correct quality anomalies?",
      title: "Low-latency Data Access",
    },
    {
      id: 8,
      text: "Are real-time data quality dashboards and alerts available to business teams?",
      title: "High-availability Capabilities",
    },
    {
      id: 9,
      text: "Are dedicated data stewards assigned to critical datasets?",
      title: "Edge Computing Adoption",
    },
    {
      id: 10,
      text: "Are root-cause analyses of data issues documented and tracked to resolution?",
      title: "Cost Optimization Practices",
    },
  ],
  3: [
    {
      id: 1,
      text: "Is there a formal data classification system (e.g., public, confidential, restricted) in place?",
      title: "Data Acquisition System",
    },
    {
      id: 2,
      text: "Are employees trained annually on data handling and privacy policies?",
      title: "Data Cleaning Process",
    },
    {
      id: 3,
      text: "Are access controls role-based, least-privilege, and regularly audited?",
      title: "Data Transformation Pipelines",
    },
    {
      id: 4,
      text: "Is metadata managed in a searchable, version-controlled repository?",
      title: "Metadata Handling Practices",
    },
    {
      id: 5,
      text: "Are data retention and deletion policies enforced automatically?",
      title: "Data Retention Policies",
    },
    {
      id: 6,
      text: "Are regulatory and compliance obligations mapped to relevant datasets (e.g., GDPR, NDPR, HIPAA)?",
      title: "Data Archiving Procedures",
    },
    {
      id: 7,
      text: "Is every data access or modification logged and periodically reviewed?",
      title: "Data Disposal Controls",
    },
    {
      id: 8,
      text: "Are data ownership, stewardship, and custodianship roles clearly defined?",
      title: "Data Classification Standards",
    },
    {
      id: 9,
      text: "Are AI ethics and responsible-AI guidelines formally adopted and applied to data use?",
      title: "Data Lineage Tracking",
    },
    {
      id: 10,
      text: "Is there a documented incident-response procedure for data breaches or policy violations?",
      title: "Data Workflow Automation",
    },
  ],
  4: [
    {
      id: 1,
      text: "Are GPUs, TPUs, or equivalent compute resources available for AI model training?",
      title: "Ownership Roles Defined",
    },
    {
      id: 2,
      text: "Can compute resources automatically scale up or down based on workload demands?",
      title: "Data Stewardship Assignment",
    },
    {
      id: 3,
      text: "Are workloads containerized and orchestrated (e.g., Docker, Kubernetes)?",
      title: "Data Policy Enforcement",
    },
    {
      id: 4,
      text: "Is there a CI/CD pipeline specifically designed for ML (MLOps)?",
      title: "Data Standards Adoption",
    },
    {
      id: 5,
      text: "Are SLOs/SLAs defined for AI services with DevOps or SRE support coverage?",
      title: "Governance Review Frequency",
    },
    {
      id: 6,
      text: "Is network bandwidth sufficient for large-scale data transfer and distributed training?",
      title: "Data Risk Mitigation",
    },
    {
      id: 7,
      text: "Are disaster recovery and failover strategies in place for AI workloads?",
      title: "Sensitive Data Protection",
    },
    {
      id: 8,
      text: "Are cost-optimization tools used to monitor and right-size compute resources?",
      title: "Governance Accountability Framework",
    },
    {
      id: 9,
      text: "Does your organization operate under a hybrid or multi-cloud AI strategy?",
      title: "Governance Training Programs",
    },
    {
      id: 10,
      text: "Do teams use standardized managed MLOps platforms (e.g., Vertex AI, SageMaker, Azure ML)?",
      title: "Governance KPIs Tracked",
    },
  ],
  5: [
    {
      id: 1,
      text: "Is total cost of ownership (TCO) estimated before starting any AI project?",
      title: "Business Needs Prioritized",
    },
    {
      id: 2,
      text: "Are AI compute, storage, and data costs transparently allocated to consuming teams?",
      title: "Use-case Portfolio Managed",
    },
    {
      id: 3,
      text: "Are unit economics such as cost per prediction or per customer measured?",
      title: "Use-case Feasibility Assessment",
    },
    {
      id: 4,
      text: "Is there an ROI or value threshold before approving AI investments?",
      title: "Value Proposition Defined",
    },
    {
      id: 5,
      text: "Are AI projects prioritized based on value, feasibility, and strategic alignment?",
      title: "Use-case Roadmap Alignment",
    },
    {
      id: 6,
      text: "Do finance and engineering collaborate regularly on cloud-cost management (FinOps)?",
      title: "Use-case Success Criteria",
    },
    {
      id: 7,
      text: "Are actual project costs compared against forecasts to monitor variance?",
      title: "Technical Readiness Evaluation",
    },
    {
      id: 8,
      text: "Are idle resources automatically scaled down or decommissioned?",
      title: "Operational Fit Assessment",
    },
    {
      id: 9,
      text: "Are obsolete or underperforming models retired or consolidated?",
      title: "Use-case Monitoring Metrics",
    },
    {
      id: 10,
      text: "Are teams incentivized for delivering measurable business value within budget?",
      title: "Deployment Learnings Captured",
    },
  ],
  6: [
    {
      id: 1,
      text: "Is all sensitive data encrypted at rest and in transit?",
      title: "AI Upskilling Programs",
    },
    {
      id: 2,
      text: "Are zero-trust principles implemented across users, systems, and services?",
      title: "Cross-functional Collaboration",
    },
    {
      id: 3,
      text: "Are vulnerability scans and patches conducted regularly according to defined SLAs?",
      title: "External Talent Access",
    },
    {
      id: 4,
      text: "Do you have an AI-specific incident response plan addressing data poisoning or model theft?",
      title: "Specialized Roles Available",
    },
    {
      id: 5,
      text: "Are AI models stress-tested against adversarial and bias-based attacks?",
      title: "AI Literacy Training",
    },
    {
      id: 6,
      text: "Are third-party or vendor AI systems assessed for security and compliance?",
      title: "Hiring Strategy Clarity",
    },
    {
      id: 7,
      text: "Does the organization maintain certifications such as ISO 27001, SOC 2, or NDPR compliance?",
      title: "Employee Retention Programs",
    },
    {
      id: 8,
      text: "Are secrets and credentials managed securely in encrypted vaults and rotated regularly?",
      title: "Domain Expertise Integration",
    },
    {
      id: 9,
      text: "Are personal or sensitive data anonymized or masked before training AI models?",
      title: "AI Training Resources",
    },
    {
      id: 10,
      text: "Are Data Protection Impact Assessments (DPIAs) conducted for new AI solutions?",
      title: "Talent Pipeline Development",
    },
  ],
  7: [
    {
      id: 1,
      text: "Does your organization have sufficient full-time employees in core AI roles (engineers, scientists, analysts)?",
      title: "Innovation Mindset Encouraged",
    },
    {
      id: 2,
      text: "What proportion of your AI team has experience deploying models into production?",
      title: "Leadership AI Advocacy",
    },
    {
      id: 3,
      text: "Are staff proficient in modern AI/ML frameworks (e.g., LangChain, PyTorch, Hugging Face, RAG systems)?",
      title: "AI Awareness Campaigns",
    },
    {
      id: 4,
      text: "Is there a structured budget and program for annual AI skills training?",
      title: "AI Ethics Prioritized",
    },
    {
      id: 5,
      text: "Is the time-to-hire for AI roles within your target benchmark?",
      title: "Collaboration Culture Adoption",
    },
    {
      id: 6,
      text: "Do engineers or data scientists cross-train within business units to build domain context?",
      title: "Change Management Practice",
    },
    {
      id: 7,
      text: "Does an internal community of practice exist for AI knowledge sharing?",
      title: "Experimentation Incentives Offered",
    },
    {
      id: 8,
      text: "Are project teams staffed with domain experts relevant to each AI use case?",
      title: "Failure Tolerance Level",
    },
    {
      id: 9,
      text: "Is AI talent retention actively monitored and managed through engagement programs?",
      title: "Workforce Transformation Support",
    },
    {
      id: 10,
      text: "Can you augment internal capacity using external experts, academics, or open-source contributors?",
      title: "Culture Surveys Conducted",
    },
  ],
  8: [
    {
      id: 1,
      text: "Are there dedicated AI product owners bridging business and technical goals?",
      title: "System Access Controls",
    },
    {
      id: 2,
      text: "Is there a well-maintained backlog of potential AI use cases with value and readiness scoring?",
      title: "Vulnerability Detection Tools",
    },
    {
      id: 3,
      text: "Do analytics translators or business analysts mediate between technical and business teams?",
      title: "Threat Response Framework",
    },
    {
      id: 4,
      text: "Are stakeholder discovery workshops conducted regularly to identify high-value opportunities?",
      title: "Secure Transmission Protocols",
    },
    {
      id: 5,
      text: "Do projects start with a standardized AI scoping and feasibility template?",
      title: "Security Incident Reporting",
    },
    {
      id: 6,
      text: "Is every AI project linked to one or more measurable business KPIs?",
      title: "Access Review Frequency",
    },
    {
      id: 7,
      text: "Are risk assessments (technical, ethical, data) conducted before launch?",
      title: "Credential Management Policies",
    },
    {
      id: 8,
      text: "Is there a structured playbook for scaling successful pilots into production?",
      title: "Security Compliance Monitoring",
    },
    {
      id: 9,
      text: "Are AI projects supported by a named executive sponsor?",
      title: "Breach Preparedness Testing",
    },
    {
      id: 10,
      text: "Are AI achievements communicated effectively across the organization (e.g., newsletters, town halls)?",
      title: "Security Training Programs",
    },
  ],
  9: [
    {
      id: 1,
      text: "Have executives publicly endorsed AI initiatives in the past six months?",
      title: "Model Experimentation Tools",
    },
    {
      id: 2,
      text: "Does the organization apply a formal change management framework (e.g., ADKAR, Kotter)?",
      title: "Model Evaluation Standards",
    },
    {
      id: 3,
      text: "Are employee attitudes toward AI adoption measured regularly?",
      title: "Bias Detection Mechanisms",
    },
    {
      id: 4,
      text: "Are incentives or performance metrics linked to AI adoption and innovation?",
      title: "Explainability Capabilities",
    },
    {
      id: 5,
      text: "Do teams feel psychologically safe to experiment and fail fast?",
      title: "Model Performance Monitoring",
    },
    {
      id: 6,
      text: "Are cross-functional squads or pods common in AI delivery projects?",
      title: "Model Version Governance",
    },
    {
      id: 7,
      text: "Have employees completed bias, fairness, and responsible-AI training programs?",
      title: "Model Documentation Compliance",
    },
    {
      id: 8,
      text: "Are there regular knowledge-sharing sessions (e.g., lunch-and-learns, internal wikis)?",
      title: "Deployment Workflow Management",
    },
    {
      id: 9,
      text: "Are AI project successes celebrated through internal recognition programs or events?",
      title: "Testing Sandbox Availability",
    },
    {
      id: 10,
      text: "Are lessons learned from past projects systematically fed into continuous improvement cycles?",
      title: "Model Improvement Feedback",
    },
  ],
  10: [
    {
      id: 1,
      text: "Is there a clearly documented and communicated enterprise AI vision?",
      title: "AI Strategy Reviewed",
    },
    {
      id: 2,
      text: "Are AI goals directly aligned with organizational OKRs or KPIs?",
      title: "Stakeholder Alignment Process",
    },
    {
      id: 3,
      text: "Is there a multi-year AI roadmap (12–24 months) with defined milestones?",
      title: "Strategic Objectives Prioritized",
    },
    {
      id: 4,
      text: "Does a cross-functional AI governance or steering committee meet regularly?",
      title: "Project Ownership Defined",
    },
    {
      id: 5,
      text: "Are value, complexity, and risk considered when prioritizing AI use cases?",
      title: "Execution Timeline Clarity",
    },
    {
      id: 6,
      text: "Are project funding and progression tied to defined stage-gate milestones?",
      title: "Project Funding Assigned",
    },
    {
      id: 7,
      text: "Are budgets allocated according to strategic AI priorities?",
      title: "Budgets Allocated Accordingly",
    },
    {
      id: 8,
      text: "Are pilot projects selected based on readiness of data, infrastructure, and business context?",
      title: "Pilot Projects Selected",
    },
    {
      id: 9,
      text: "Are realized benefits and impact metrics tracked post-deployment?",
      title: "Realized Benefits Tracked",
    },
    {
      id: 10,
      text: "Is the AI strategy reviewed and refreshed at least annually?",
      title: "Continuous Strategy Refresh",
    },
  ],
};
