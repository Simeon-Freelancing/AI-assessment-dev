import { EXTENDED_QUESTIONS } from './questionsExtended';
import { EXTENDED_QUESTIONS_2 } from './questionsExtended2';
import { EXTENDED_QUESTIONS_3 } from './questionsExtended3';

export const QUESTIONS = {
  1: [ // Leadership & Strategy
    { id: 1, text: 'Does your organization have a clear AI strategy aligned with business goals?', guidance: '1: No strategy | 2: Initial discussions | 3: Draft strategy | 4: Documented strategy | 5: Fully integrated strategy' },
    { id: 2, text: 'Is there executive-level sponsorship for AI initiatives?', guidance: '1: No support | 2: Minimal interest | 3: Some support | 4: Active sponsorship | 5: Champion-led initiatives' },
    { id: 3, text: 'Are AI investments prioritized in the budget?', guidance: '1: No budget | 2: Ad-hoc funding | 3: Small allocation | 4: Dedicated budget | 5: Strategic investment' },
    { id: 4, text: 'Does leadership understand AI capabilities and limitations?', guidance: '1: No knowledge | 2: Basic awareness | 3: Moderate understanding | 4: Good knowledge | 5: Expert understanding' },
    { id: 5, text: 'Is there a roadmap for AI implementation?', guidance: '1: No roadmap | 2: Conceptual ideas | 3: Draft plan | 4: Detailed roadmap | 5: Executed roadmap with milestones' },
    { id: 6, text: 'Are AI goals measurable and tracked?', guidance: '1: No goals | 2: Vague objectives | 3: Some metrics | 4: Clear KPIs | 5: Comprehensive tracking' },
    { id: 7, text: 'Is AI part of the long-term vision?', guidance: '1: Not considered | 2: Mentioned occasionally | 3: In planning | 4: Core component | 5: Central to strategy' },
    { id: 8, text: 'Are cross-functional teams involved in AI planning?', guidance: '1: No involvement | 2: Single department | 3: Few departments | 4: Most departments | 5: Full collaboration' },
    { id: 9, text: 'Is there a process for evaluating AI opportunities?', guidance: '1: No process | 2: Informal review | 3: Basic framework | 4: Structured process | 5: Rigorous evaluation' },
    { id: 10, text: 'Does the organization benchmark against AI leaders?', guidance: '1: No benchmarking | 2: Occasional research | 3: Regular monitoring | 4: Active comparison | 5: Strategic benchmarking' }
  ],
  2: [ // Data Management
    { id: 11, text: 'Does your organization maintain centralized data repositories?', guidance: '1: No repository | 2: Partial standardization | 3: Centralized but inconsistent | 4: Fully centralized | 5: Integrated analytics' },
    { id: 12, text: 'Is data quality regularly assessed and maintained?', guidance: '1: No assessment | 2: Ad-hoc checks | 3: Basic monitoring | 4: Regular audits | 5: Continuous quality management' },
    { id: 13, text: 'Are data governance policies established?', guidance: '1: No policies | 2: Draft guidelines | 3: Basic policies | 4: Comprehensive governance | 5: Mature framework' },
    { id: 14, text: 'Is data accessible across departments?', guidance: '1: Siloed data | 2: Limited sharing | 3: Some integration | 4: Good accessibility | 5: Seamless access' },
    { id: 15, text: 'Are data security measures robust?', guidance: '1: Minimal security | 2: Basic protection | 3: Standard measures | 4: Strong security | 5: Enterprise-grade' },
    { id: 16, text: 'Is historical data available for analysis?', guidance: '1: No history | 2: Limited records | 3: Some archives | 4: Good history | 5: Comprehensive archives' },
    { id: 17, text: 'Are data pipelines automated?', guidance: '1: Manual processes | 2: Some automation | 3: Partially automated | 4: Mostly automated | 5: Fully automated' },
    { id: 18, text: 'Is data labeled and categorized effectively?', guidance: '1: No labeling | 2: Minimal tags | 3: Basic categorization | 4: Good taxonomy | 5: Advanced metadata' },
    { id: 19, text: 'Can data support real-time analytics?', guidance: '1: Batch only | 2: Near real-time | 3: Some real-time | 4: Good real-time | 5: Full real-time capability' },
    { id: 20, text: 'Is data privacy compliance maintained?', guidance: '1: Non-compliant | 2: Minimal compliance | 3: Basic compliance | 4: Full compliance | 5: Exceeds standards' }
  ],
  ...EXTENDED_QUESTIONS,
  ...EXTENDED_QUESTIONS_2,
  ...EXTENDED_QUESTIONS_3
};
