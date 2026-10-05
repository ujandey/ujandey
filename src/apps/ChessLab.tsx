import CaseStudyFooter from '../components/CaseStudyFooter';
import { useId, type FC } from 'react';
import type { AppProps } from '../types';
import { AppHeading, Caption, ExternalLink, Tabs, Tag } from '../components/UI';
import { chessPositions } from '../data/demos';
import { projects } from '../data/projects';
import { navigateTo, choiceHref, useRouteChoice } from '../navigation';
import capturedSearches from '../data/chess-traces.json';
import './project-apps.css';

const views = ['Recorded search', 'Board', 'Search', 'Implementation'] as const;
const pieceNames: Record<string, string> = { k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' };
function Piece({ piece, x, y }: { piece: string; x: number; y: number }) {
  const white = piece === piece.toUpperCase();
  const paths: Record<string, React.ReactNode> = {
    p: <><circle cx="20" cy="10" r="5"/><path d="M16 15c1 6-1 11-4 14h16c-3-3-5-8-4-14M10 33h20l-2-4H12z"/></>,
    r: <><path d="M10 6h5v5h3V6h4v5h3V6h5v10H10zM13 16l2 12h10l2-12M10 33h20l-3-5H13z"/></>,
    n: <><path d="M11 29c0-8 5-11 11-14l-8 4-6-4L19 6l2-4 9 8-2 12 2 7zM9 33h22l-1-4H11z"/><circle cx="23" cy="10" r="1" fill={white ? 'var(--chess-black)' : 'var(--chess-white)'}/></>,
    b: <><path d="M20 3c-6 6-10 10-6 16l-3 10h18l-3-10c4-6 0-10-6-16ZM10 33h20l-1-4H11zM17 11l5 6"/></>,
    q: <><path d="m8 10 6 5 6-9 6 9 6-5-5 17H13zM10 33h20l-3-6H13z"/><circle cx="8" cy="8" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="32" cy="8" r="2"/></>,
    k: <><path d="M20 2v9m-4-5h8M13 13c-5-5-9 4-4 9l5 6h12l5-6c5-5 1-14-4-9-4-6-10-6-14 0ZM10 33h20l-4-5H14z"/></>,
  };
  return <g transform={`translate(${x + 5},${y + 5})`} fill={white ? 'var(--chess-white)' : 'var(--chess-black)'} stroke={white ? 'var(--chess-black)' : 'var(--chess-outline)'} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">{paths[piece.toLowerCase()]}</g>;
}
const coordinate = (square: string) => ({ row: 8 - Number(square[1]), col: square.charCodeAt(0) - 97 });
function ChessBoard({ position, step, recorded = false }: { position: (typeof chessPositions)[number]; step: number; recorded?: boolean }) {
  const id = useId();
  const board = position.board.map(row => row.split(''));
  for (const move of position.moves.slice(0, step)) { const from = coordinate(move.from), to = coordinate(move.to); board[to.row][to.col] = board[from.row][from.col]; board[from.row][from.col] = '.'; }
  const current = position.moves[Math.max(0, step - 1)];
  const squares = current ? [current.from, current.to] : [];
  const description = board.flatMap((row, r) => row.flatMap((piece, c) => piece === '.' ? [] : [`${piece === piece.toUpperCase() ? 'White' : 'Black'} ${pieceNames[piece.toLowerCase()]} on ${String.fromCharCode(97 + c)}${8 - r}`])).join(', ');
  return <svg className="chess-board" viewBox="0 0 440 440" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{position.name}, {step === 0 ? 'starting position' : `after ${position.moves[step - 1].san}`}</title><desc id={`${id}-desc`}>{description}. {recorded ? 'Board from a recorded local run of the Python engine.' : 'Prepared illustrative board, not an engine output.'}</desc>
    <rect x="20" y="20" width="400" height="400" fill="var(--chess-light)"/>
    {board.map((row, r) => row.map((piece, c) => <g key={`${r}-${c}`}><rect x={20 + c * 50} y={20 + r * 50} width="50" height="50" fill={(r + c) % 2 ? 'var(--chess-dark)' : 'var(--chess-light)'}/>{step > 0 && squares.includes(`${String.fromCharCode(97 + c)}${8 - r}`) && <rect x={20 + c * 50} y={20 + r * 50} width="50" height="50" fill="var(--cobalt)" opacity=".22"/>}{piece !== '.' && <Piece piece={piece} x={20 + c * 50} y={20 + r * 50}/>}</g>))}
    {Array.from({ length: 8 }, (_, i) => <g key={i} fill="var(--muted)" fontSize="10" fontFamily="monospace"><text x="7" y={50 + i * 50} textAnchor="middle">{8 - i}</text><text x={45 + i * 50} y="435" textAnchor="middle">{String.fromCharCode(97 + i)}</text></g>)}
    <rect x="20" y="20" width="400" height="400" fill="none" stroke="var(--border-strong)"/>
  </svg>;
}
const ChessLab: FC<AppProps> = () => {
  const [view,setView]=useRouteChoice('chess','section',views,views[0]);
  const [positionChoice]=useRouteChoice('chess','position',['opening','tactic','endgame'] as const,'opening');
  const positionIndex=chessPositions.findIndex(p=>p.id===positionChoice);
  const selectPosition=(i:number)=>{const query=new URLSearchParams(location.search);query.set('position',chessPositions[i].id);query.set('move','0');navigateTo(`/chess?${query}`);};
  const [stepChoice,setStepChoice]=useRouteChoice('chess','move',['0','1','2','3'] as const,'0');
  const step=Math.min(Number(stepChoice),chessPositions[positionIndex].moves.length);
  const setStep=(value:number)=>setStepChoice(String(value) as '0'|'1'|'2'|'3');
  const [searchChoice,setSearchChoice]=useRouteChoice('chess','principle',['1','2','3'] as const,'1');
  const searchStage=Number(searchChoice)-1;
  const setSearchStage=(i:number)=>setSearchChoice(String(i+1) as '1'|'2'|'3');
  const [traceChoice,setTraceChoice]=useRouteChoice('chess','trace',['start','scotch','mate'] as const,'start');
  const [played,setPlayed]=useRouteChoice('chess','played',['0','1'] as const,'0');
  const trace=capturedSearches.traces.find(item=>item.id===traceChoice)!;
  const recordedPosition={id:trace.id,name:trace.name,subtitle:'Recorded local engine search',board:trace.board,moves:[{from:trace.selectedMove.slice(0,2),to:trace.selectedMove.slice(2,4),san:trace.selectedSAN,explanation:'The selected move from this capture.'}]};
  const position = chessPositions[positionIndex];
  const search = [
    { title: 'Generate legal moves', body: 'Start with moves that obey the rules and leave the moving side’s king safe.' },
    { title: 'Look one layer deeper', body: 'Iterative deepening completes shallow searches before trying a deeper one. Alpha-beta pruning skips branches that cannot improve the decision.' },
    { title: 'Remember a position', body: 'A transposition table stores information about positions already searched. Reaching the same position through another move order can reuse that work.' },
  ];
  return <div className="chess-app"><Tabs tabs={views} value={view} onChange={setView} href={value=>choiceHref('chess','section',value)}/><div className="app-pad">
    {view === 'Recorded search' && <>
      <Tag tone="moss">Recorded local output · Python chess engine</Tag>
      <AppHeading eyebrow="Chess engine" title="A position, a search, a selected move.">The engine generates legal moves and searches their replies with iterative deepening, alpha-beta/PVS and a transposition table.</AppHeading>
      <p className="project-role"><strong>My role:</strong> development of the Python chess engine.</p>
      <p className="case-meta">Repository created April 19, 2026 · Local capture {capturedSearches.capturedAt.slice(0,10)}</p>
      <section className="case-section"><h3>The engineering question</h3><p>How can a search prune and reuse work while keeping the board reversible? These small runs use the project’s own engine with its opening book disabled and a 16 MiB hash setting.</p></section>
      <div className="chess-position-picker" aria-label="Recorded engine positions">{capturedSearches.traces.map(item=><button key={item.id} aria-pressed={trace.id===item.id} onClick={()=>setTraceChoice(item.id as 'start'|'scotch'|'mate')}>{item.name}</button>)}</div>
      <div className="chess-layout"><figure><ChessBoard position={recordedPosition} step={Number(played)} recorded/><figcaption>{trace.name} · White to move</figcaption></figure><section className="chess-inspection"><h3>{trace.selectedSAN} <small>({trace.selectedMove})</small></h3><dl className="trace-metrics"><div><dt>Completed / requested depth</dt><dd>{trace.completedDepth} / {capturedSearches.settings.requestedDepth}</dd></div><div><dt>Nodes</dt><dd>{trace.nodes.toLocaleString('en-US')}</dd></div><div><dt>Wall time</dt><dd>{(trace.elapsedSeconds*1000).toFixed(2)} ms</dd></div><div><dt>Principal variation (UCI)</dt><dd><code>{trace.principalVariation.join(' ')}</code></dd></div></dl><button className="button secondary" onClick={()=>setPlayed(played==='0'?'1':'0')}>{played==='0'?'Show selected move':'Show initial position'}</button></section></div>
      <div className="trace-fen"><span className="section-label">Initial FEN</span><code>{trace.fen}</code></div>
      <details className="memory-details"><summary>Capture provenance &amp; depth records</summary><p>Python {capturedSearches.environment.python} · {capturedSearches.environment.os} · {capturedSearches.environment.architecture}. Each search requested depth 3 with a 0.75-second ceiling. The wrapper checked that the root board was restored and the returned move was legal.</p><p>Source revision <code className="memory-source-hash">{capturedSearches.sourceRevision}</code></p><ul>{trace.depthRecords.map(row=><li key={row.depth}>Depth {row.depth}: {row.nodes} cumulative nodes · {(row.elapsedSeconds*1000).toFixed(2)} ms · PV {row.pv.join(' ')}</li>)}</ul></details>
      <Caption>One capture per position on this host. Timings are illustrative of these actual runs and do not establish engine strength or general performance. The Search tab is a separate conceptual explanation.</Caption>
      <div className="inline-links"><a className="text-link" href="/evidence/chess-traces.json" download>Download recorded outputs</a><ExternalLink href={`https://github.com/ujandey/chess-engine/tree/${capturedSearches.sourceRevision}`}>Captured source revision</ExternalLink><ExternalLink href={projects.chess.repo}>Source &amp; setup</ExternalLink></div>
    </>}
    {view === 'Board' && <>
      <div className="chess-heading"><div><span className="eyebrow">Python chess engine</span><h2>Inspect a position.</h2></div><Tag tone="moss">Illustrative legal positions</Tag></div>
      <p className="project-role"><strong>My role:</strong> development of the Python chess engine.</p><section className="case-section"><h3>The engineering question</h3><p>How can legal moves be searched efficiently while every explored move can be undone without corrupting board state?</p><p>The engine implements reversible board state, iterative deepening, alpha-beta/PVS search and a transposition table. Its UCI interface exposes analysis to chess clients; tests and perft checks are included in the source.</p></section>
      <div className="chess-position-picker" aria-label="Prepared positions">{chessPositions.map((item, i) => <button key={item.id} aria-pressed={positionIndex === i} onClick={() => selectPosition(i)}>{item.name}</button>)}</div>
      <div className="chess-layout"><figure><ChessBoard position={position} step={step}/><figcaption>{position.subtitle}</figcaption></figure><section className="chess-inspection">
        <span className="section-label">MOVE WALKTHROUGH</span><h3>{step === 0 ? 'Starting position' : position.moves[step - 1].san}</h3>
        <p aria-live="polite">{step === 0 ? 'Step through a prepared line to see how the rules, board state, and search ideas connect.' : position.moves[step - 1].explanation}</p>
        <div className="chess-move-list">{position.moves.map((move, i) => <button key={move.san} aria-pressed={step === i + 1} onClick={() => setStep(i + 1)}><span>{String(i + 1).padStart(2, '0')}</span>{move.san}<span aria-hidden="true">↗</span></button>)}</div>
        <div className="chess-navigation"><button className="button secondary" aria-label="Previous position in line" disabled={step === 0} onClick={() => setStep(step-1)}>← Back</button><button className="button secondary" aria-label="Next position in line" disabled={step === position.moves.length} onClick={() => setStep(step+1)}>Next →</button></div>
      </section></div>
      <Caption>Illustrative legal positions and explanatory lines. These moves are not recorded engine recommendations. The Python engine does not run in this browser.</Caption><ExternalLink href={projects.chess.repo}>Explore the engine</ExternalLink>
    </>}
    {view === 'Search' && <>
      <AppHeading eyebrow="Search techniques" title="Searching the move tree.">A conceptual view of the search techniques implemented by the engine.</AppHeading>
      <div className="chess-search-stages">{search.map((item, i) => <button key={item.title} aria-pressed={searchStage === i} onClick={() => setSearchStage(i)}><span>{String(i + 1).padStart(2, '0')}</span>{item.title}</button>)}</div>
      <svg className={`chess-tree principle-${searchStage}`} viewBox="0 0 620 235" role="img" aria-label="Conceptual search tree. A current position branches into legal moves and their replies; alpha-beta search may skip unhelpful branches."><g fill="none" stroke="var(--border)" strokeWidth="1.5"><path d="M310 36 140 115 65 194M140 115l75 79M310 36v79l-50 79m50-79 50 79M310 36l170 79 75 79m-75-79-75 79"/></g><path d="m310 36-170 79-75 79" stroke="var(--cobalt)" strokeWidth="2" fill="none"/><g fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.5">{[[310,36],[140,115],[310,115],[480,115],[65,194],[215,194],[260,194],[360,194],[405,194],[555,194]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i===0?15:11} fill={i===0?'var(--cobalt)':'var(--surface)'}/>)}</g>{searchStage===1&&<g className="pruning-mark" stroke="var(--error)" strokeWidth="3"><path d="m463 99 34 32m0-32-34 32"/><text x="385" y="225" fill="var(--error)" stroke="none" fontSize="14">Replies skipped</text></g>}{searchStage===2&&<g><path d="M215 194Q310 150 360 194" stroke="var(--success)" strokeDasharray="5 4" fill="none" strokeWidth="3"/><text x="240" y="225" fill="var(--success)" fontSize="14">Same position · reuse</text></g>}<g fontFamily="monospace" fontSize="12" fill="var(--muted)"><text x="338" y="40">current position</text><text x="18" y="120">legal moves</text><text x="18" y="228">possible replies</text></g></svg>
      {searchStage===1&&<div className="search-explanation"><strong>Pruning illustrated</strong><p>In this conceptual example, the shaded branch cannot improve a choice already established by another branch. Its remaining replies are skipped.</p></div>}{searchStage===2&&<div className="search-explanation"><strong>Reuse illustrated</strong><p>Two move orders converge on the same board. The dashed link represents a transposition-table lookup rather than searching that position again.</p></div>}
      <section className="chess-search-detail" aria-live="polite"><span className="eyebrow">{String(searchStage + 1).padStart(2, '0')} / SEARCH PRINCIPLE</span><h3>{search[searchStage].title}</h3><p>{search[searchStage].body}</p></section><Caption>Conceptual diagram, not a numerical search trace. No node counts, scores, or timings are simulated.</Caption>
    </>}
    {view === 'Implementation' && <>
      <AppHeading eyebrow="Python engine / implementation" title="Board state, notation & interfaces.">A Python implementation with legal move generation, iterative deepening, alpha-beta search, and a transposition table.</AppHeading>
      <div className="app-grid"><section className="panel"><h3>State & notation</h3><p>Reversible moves, SAN/PGN notation, and UCI support connect board state to interfaces and analysis tools.</p></section><section className="panel"><h3>Interface & validation</h3><p>A Tkinter interface, tests, and benchmarks support playing, inspecting, and checking the engine locally.</p></section></div>
      <div className="note-box">The portfolio uses prepared positions for a dependable walkthrough. The Recorded search tab contains actual local outputs. The separate prepared walkthrough explains chess concepts and does not establish engine strength. The engine runs locally rather than inside this portfolio.</div><ExternalLink href={projects.chess.repo}>Source and setup instructions</ExternalLink>
    </>}
  <CaseStudyFooter id="chess"/></div></div>;
};
export default ChessLab;
