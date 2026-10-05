"""Capture small real searches after reviewing the source at the stated revision.
No model training, external API, benchmark suite, or opening book is used.
Usage: py scripts/capture-chess.py --repo .research/portfolio/chess-engine
"""
import argparse
import datetime
import json
import platform
import sys
import time
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--repo', type=Path, required=True)
parser.add_argument('--output', type=Path, default=Path('public/evidence/chess-traces.json'))
args = parser.parse_args()
sys.path.insert(0, str(args.repo.resolve()))
from engine.board import Board
from engine.move_generator import MoveGenerator
from engine.uci import move_to_uci
from engine.notation import move_to_san

positions = [
 ('start', 'Starting position', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
 ('scotch', 'Scotch opening', 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3'),
 ('mate', 'Back-rank tactic', '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1'),
]
record = {
 'engine': 'ujandey/chess-engine',
 'sourceRevision': 'ab9bdec8b42fcbbfd6b84ef30416a53325918146',
 'capturedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
 'environment': {'python': platform.python_version(), 'os': platform.platform(), 'architecture': platform.machine(), 'processor': platform.processor()},
 'settings': {'requestedDepth': 3, 'maxTimeSeconds': 0.75, 'hashMiB': 16, 'openingBook': False},
 'scope': 'One local capture per position; timing is host-specific, not a strength or performance benchmark.',
 'traces': [],
}
for key, name, fen in positions:
 board = Board()
 board.set_fen(fen)
 mg = MoveGenerator(board)
 mg.in_opening = False
 mg.set_hash_size(16)
 before = board.to_fen()
 checkpoints = []
 def on_depth(depth, score, pv):
  checkpoints.append({'depth': depth, 'nodes': mg.node_count, 'elapsedSeconds': time.perf_counter() - started, 'pv': [move_to_uci(move) for move in pv]})
 started = time.perf_counter()
 move, score = mg.find_best_move(3, True, max_time=0.75, verbose=False, on_depth_complete=on_depth)
 elapsed = time.perf_counter() - started
 assert board.to_fen() == before, 'Search changed the root board'
 assert move in mg.generate_all_legal_moves(True), 'Search returned an illegal root move'
 pv = checkpoints[-1]['pv'] if checkpoints else []
 assert pv and pv[0] == move_to_uci(move)
 trace = {'id':key,'name':name,'fen':fen,'board':[''.join(row) for row in board.board], 'selectedMove':move_to_uci(move),'selectedSAN':move_to_san(board,mg,*move),'completedDepth':mg.last_completed_depth,'nodes':mg.node_count,'elapsedSeconds':elapsed,'principalVariation':pv,'depthRecords':checkpoints,'rootBoardRestored':True}
 record['traces'].append(trace)
 print(name, trace['selectedMove'], 'depth', trace['completedDepth'], 'nodes',trace['nodes'], 'time',round(elapsed,4), 'PV', ' '.join(pv))
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps(record, indent=2)+'\n',encoding='utf8')
