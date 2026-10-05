export const predictionPipeline = [
  { name: 'Historical matches', label: '01 / observations', detail: 'Matches since 1993 from the martj42 international football dataset are cleaned, standardized and sorted by date. The pipeline filters tournaments, removes missing or invalid scores and deduplicates date/team pairs.' },
  { name: 'Elo + rolling form', label: '02 / representation', detail: 'Elo uses ratings before each match, a home-advantage adjustment and World-Cup weighting. Form is calculated from the prior five and ten matches before recording the current result.' },
  { name: 'XGBoost', label: '03 / classification', detail: 'A class-balanced XGBoost classifier trains on pre-2020 matches with 18 ordered features. It uses 300 estimators, depth 4 and a fixed random state; the three labels are home win, draw and loss.' },
  { name: 'Calibration', label: '04 / probabilities', detail: 'Isotonic calibration fits on the 2020+ holdout after base-classifier accuracy has been calculated. That holdout is calibration data; the code supplies no independent final calibrated-model evaluation.' },
  { name: 'Tournament simulation', label: '05 / uncertainty', detail: 'All team-pair probabilities are batched and cached before sampling tournaments. The simulator uses 12 groups of four, then a 32-team knockout; draw probability is redistributed for knockout advancement. The seeded draw and tie-break rules are simplified.' },
] as const;

export interface PreparedPosition {
  id: string; name: string; subtitle: string; board: string[];
  moves: { from: string; to: string; san: string; explanation: string }[];
}
export const chessPositions: PreparedPosition[] = [
  { id: 'opening', name: 'Opening the centre', subtitle: 'Scotch Game · White to move',
    board: ['r.bqkbnr', 'pppp.ppp', '..n.....', '....p...', '....P...', '.....N..', 'PPPP.PPP', 'RNBQKB.R'],
    moves: [
      { from: 'd2', to: 'd4', san: '3. d4', explanation: 'White challenges the e5 pawn and opens the centre. A search must consider the opponent’s reply, not just the current position.' },
      { from: 'e5', to: 'd4', san: '3… exd4', explanation: 'Black captures. Making a move changes the board; undoing it accurately is essential when exploring alternative branches.' },
      { from: 'f3', to: 'd4', san: '4. Nxd4', explanation: 'White recaptures with the knight. Different move orders can lead to the same board: a transposition table helps avoid repeating the work.' },
    ] },
  { id: 'tactic', name: 'The back rank', subtitle: 'Prepared tactical position · White to move',
    board: ['......k.', 'r....ppp', '........', '........', '........', '........', '.....PPP', '....R.K.'],
    moves: [{ from: 'e1', to: 'e8', san: 'Re8#', explanation: 'The rook controls the eighth rank. Black’s own pawns block the king’s escape. Legal move generation must identify that every reply still leaves the king in check.' }] },
  { id: 'endgame', name: 'A pawn with a future', subtitle: 'Prepared endgame position · White to move',
    board: ['........', '........', '.....k..', '........', '...KP...', '........', '........', '........'],
    moves: [{ from: 'e4', to: 'e5', san: 'e5+', explanation: 'The passed pawn advances with check. Endgames change the value of king activity and pawn progress; the engine uses a tapered positional evaluation.' }] },
];

export const agentExample = {
  provenance: 'Repository README example, edited for clarity. This is a documented example, not an independently recorded execution.',
  source: 'https://github.com/ujandey/gemini-cli-agent/blob/1badc04ea0a966aa59bf76e5a6c4c8df5eedf92e/README.md#-example-session',
  request: 'Fix the bug: 3 + 7 × 2 shouldn’t be 20.',
  steps: [
    { label: 'Read the implementation', tool: 'get_file_content', operation: 'calculator/pkg/calculator.py', explanation: 'Inspect the calculator before deciding what to change.', result: 'Calculator source returned (excerpt abbreviated in the README).' },
    { label: 'Check the behaviour', tool: 'run_python_file', operation: 'calculator/main.py · args: ["3 + 7 * 2"]', explanation: 'Run the existing calculator to test the assumption in the request.', result: '{ "expression": "3 + 7 * 2", "result": 17 }' },
    { label: 'Explain the result', tool: 'final response', operation: 'No file change needed', explanation: 'Multiplication happens before addition. The observed result is already correct.', result: '3 + (7 × 2) = 17' },
  ],
};
