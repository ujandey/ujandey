import CaseStudyFooter from '../components/CaseStudyFooter';
import { type FC } from 'react';
import type { AppProps } from '../types';
import { AppHeading, Caption, ExternalLink, Tabs, Tag } from '../components/UI';
import { agentExample } from '../data/demos';
import { projects } from '../data/projects';
import { choiceHref, useRouteChoice } from '../navigation';
import './project-apps.css';

const views = ['Example replay', 'Implementation'] as const;
const AgentConsole: FC<AppProps> = () => {
  const [view,setView]=useRouteChoice('agent','section',views,views[0]);
  const [stepChoice,setStepChoice]=useRouteChoice('agent','step',['1','2','3'] as const,'1');
  const step=Number(stepChoice)-1;
  const setStep=(i:number)=>setStepChoice(String(i+1) as '1'|'2'|'3');
  const current = agentExample.steps[step];
  return <div className="agent-app"><Tabs tabs={views} value={view} onChange={setView} href={value=>choiceHref('agent','section',value)}/><div className="app-pad">
    {view === 'Example replay' && <>
      <Tag tone="amber">Documentation example · explanatory replay</Tag><AppHeading eyebrow="Gemini CLI agent" title="Inspect a calculator. Run an expression.">Step through the repository’s calculator example to see how the agent reads a file, calls Python, and returns a result.</AppHeading>
      <p className="project-role"><strong>My role:</strong> development of this Gemini-powered CLI tool.</p><section className="case-section"><h3>The engineering question</h3><p>How can a conversation dispatch file and Python tools, then use their returned results to check a user’s assumption?</p><p>The implementation maintains conversation history, exposes four tool schemas and loops through structured calls with a 20-iteration limit. In this documented calculator example, reading and execution show the expression already returns 17; no successful edit is demonstrated.</p></section>
      <p className="case-meta">Repository created February 28, 2026 · CLI implementation with a documented example</p>
      <section className="agent-request"><span className="section-label">Example request</span><p>“{agentExample.request}”</p></section>
      <div className="agent-replay-layout"><nav className="agent-steps" aria-label="Example replay steps">{agentExample.steps.map((item, i) => <button key={item.label} aria-pressed={step === i} onClick={() => setStep(i)}><span className="agent-step-number">{String(i + 1).padStart(2, '0')}</span><span>{item.label}<small>{item.tool}</small></span><span aria-hidden="true">→</span></button>)}</nav>
        <section className="agent-operation" aria-live="polite"><span className="eyebrow">{step < 2 ? 'Tool call' : 'Response'}</span><h3>{current.tool}</h3><div className="agent-operation-target"><span className="tiny-label">Operation</span><code>{current.operation}</code></div><p>{current.explanation}</p><div className="agent-result"><span className="tiny-label">{step < 2 ? 'Returned result' : 'Answer'}</span><code>{current.result}</code></div></section>
      </div>
      <div className="agent-replay-controls"><span>{step + 1} of {agentExample.steps.length}</span><button className="button secondary" onClick={() => setStep(step === 2 ? 0 : step + 1)}>{step === 2 ? 'Replay from start' : 'Next step'} <span aria-hidden="true">→</span></button></div>
      <Caption>{agentExample.provenance} No tools execute in this portfolio.</Caption><ExternalLink href={agentExample.source}>Read the original example</ExternalLink>
    </>}
    {view === 'Implementation' && <>
      <AppHeading eyebrow="Implementation / four tools" title="Conversation and tool calls.">The Gemini-powered CLI maintains a conversation, dispatches structured function calls, and returns tool results to the model.</AppHeading>
      <div className="agent-loop" role="img" aria-label="Agent loop: user request to model, model to tool dispatcher, tool result back to model, and final response to user."><span>Request</span><span aria-hidden="true">→</span><span>Model</span><span aria-hidden="true">⇄</span><span>Tools</span><span aria-hidden="true">→</span><span>Response</span></div>
      <div className="agent-tool-grid">{[
        ['get_files_info', 'List files and directories.'], ['get_file_content', 'Read an existing file.'], ['write_file', 'Create or update a file.'], ['run_python_file', 'Execute a Python script.'],
      ].map(([name, description]) => <section key={name}><code>{name}</code><p>{description}</p></section>)}</div>
      <div className="note-box">This example does not establish reliability on arbitrary coding tasks. The local project can run Python and write files. This portfolio replays a documented example and accepts no executable visitor input.</div><ExternalLink href={projects.agent.repo}>Inspect the source</ExternalLink>
    </>}
  <CaseStudyFooter id="agent"/></div></div>;
};
export default AgentConsole;
