# Audit implementation and verification — 2026-10-05

This records the current implementation, following source verification of the supplied UjanOS audit. The previous `DESIGN_AUDIT.md` is a historical record of an earlier pass, not the current behavior report.

## Changes

| Verified issue | Current implementation |
| --- | --- |
| Introduction separated identity/direction from evidence | Identity, concrete projects and opportunity preference appear together; MNEMA summary includes direct DER++ comparison, metric definition and allocation tradeoff on every screen size |
| Vague “Open MNEMA” action | “Explore MNEMA — learning without forgetting” is a real project link |
| No CV access | Owner’s sole CV is served unchanged at `/resume.pdf`; visible View and Download links, permanent CV navigation, correct production MIME and route exclusions |
| MNEMA attribution and parent website copy | Displayed attribution and contribution statement removed at the owner’s request; introduction, overview and sources identify MNEMA as a proof of concept for CognX and link its main website |
| Feature-only project presentations | Project-specific question, role, implementation, artifact and limits; verified repository creation dates are distinguished from project start dates |
| MNEMA comparison hidden beyond overview | Immediate MNEMA/DER++ evidence, lower forgetting/lower accuracy/4.14× arrays, report and source links; persistent evidence-provenance caveats |
| Architecture looked like serial stages | Implemented encoder/separator, parallel store/cortex, blending, controller and store-to-cortex consolidation relationships; detail disclosure |
| Retention required switching methods | Both recorded methods displayed together at a shared checkpoint on consistent 0–100% axes |
| Reproduction wording could imply recoverable original source | Recorded commit absence and current-validator rejection explained; fresh-current-revision runs distinguished from exact reproduction |
| Predictor selectors only renamed text | Removed; source-verified static case study and pipeline stages; pre-calibration accuracy separated from absent final calibrated-model evaluation |
| Chess lacked genuine output | Three safe, inspected-source local captures include FEN, move, depth, nodes, timing/environment, PV, revision and download; conceptual walkthrough/pruning/reuse remains separately labeled |
| Agent example modest | Authentic README replay retained with provenance; no invented edit, failure, transcript or new API execution |
| Redundant launcher/preset navigation | Permanent Projects/About/CV/Contact route, project index and optional labeled desktop dock; no workspace presets or desktop shortcuts |
| Focusing created history entries | Focus, dragging, expansion and arranging do not navigate; deliberate real-link navigation updates history |
| Arrange hid unrelated windows | Arrange moves visible ordinary windows and preserves active/minimized/expanded state; explicitly separate destructive desk reset |
| Long reading lost tabs / cramped chrome | Sticky project sections, larger essential labels, expanded Reading view, single document scroll on tablet/mobile, visible keyboard focus and reduced motion |
| Empty Notebook and one-project Gallery | Interests folded into About; Noted and its real repository screenshot inside Projects; legacy URLs resolve to consolidated views |
| Appearance competed with evidence | Wallpaper retained; competing credits and appearance controls removed |

## Genuine and conceptual artifacts

MNEMA uses recorded project-reported benchmark data, not independently reproduced measurements. Chess uses three actual local engine captures, not a substitute engine. Noted uses an actual original repository screenshot. The agent session is an authentic documentation example, condensed for explanation, not a fresh independent recording. Prediction Lab’s pipeline view, the chess rule walkthrough/search illustration, and MNEMA architecture diagram explain implementations; they do not simulate measured outputs. No predictions were invented.

## Verification outcome

- TypeScript and repository ESLint pass.
- Nine state/evidence tests pass: instances, focus/minimize/close, expansion, arrange/reset preservation, bounds/labeled-dock clearance, benchmark macro-mean consistency, CV identity and trace-artifact identity.
- DOM interaction suite passes seven desktop applications and fourteen tab views, real route links, Back/Forward through sections and checkpoints, direct reload, focus without URL/history changes, clipboard success/failure, arrangement preservation, expansion, reset, window minimize/restore/close, source/CV/screenshot/trace links, recorded/conceptual controls and keyboard tab navigation.
- Tablet/mobile DOM checks at 820, 390 and 320 px retain permanent labeled navigation, introduction evidence and CV links. These do not measure CSS layout.
- All six benchmark rows (means, sample SD and array allocations) and both complete retention matrices match downloaded current-source JSON.
- Original CV bytes, public bytes and served production bytes agree. PDF, screenshot and trace MIME types are correct. Root-relative public paths are excluded from Vercel’s SPA rewrite.
- Production preview serves project/section direct-link documents and bundles. The ordinary esbuild-based build is blocked by subprocess `EPERM`; an elevated retry was rejected because sandbox escalation is disabled. The documented `build:portable` alternative completes a real Vite/Rollup production build with in-process TypeScript transforms and unminified output.
- Browser screenshot verification is blocked. Playwright/Edge fails on spawn with `EPERM`; a hidden native Chrome attempt fails Windows IPC access. No rendered UjanOS desktop, tablet or mobile screenshot was obtained. Sticky geometry, touch appearance, actual browser zoom, clipping, color rendering and reduced-motion appearance remain visually unverified. The maintained browser suite covers these layouts and behavior when Edge or `CDP_URL` is available.

No deployment or remote push occurred. No costly benchmark, predictor training, MNEMA training/inference or paid API call ran. Specific optional missing artifacts and owner details are listed in `SOURCES.md`; the CV is present.
