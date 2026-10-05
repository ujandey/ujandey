> Historical audit of an earlier implementation. See [current implementation and verification](IMPLEMENTATION_VERIFICATION.md) for the changes completed after verifying these findings.

# UjanOS design audit

Audited and refined on 2026-10-05. The final shell retains the coordinated Sonoma/Sequoia direction. This work concentrated on the owner's identity, editorial hierarchy, project-specific content, application reading layouts, and navigation correctness.

## Evidence and limits

Read the implementation, README, content sources, application registry, window reducer, shared UI primitives, and every application. No applicable AGENTS.md was found in the workspace or its parent.

The development server and production preview ran successfully. Browser review was attempted with Playwright/Edge and a direct hidden Chrome launch. Playwright fails with `spawn EPERM`; Chrome fails on Windows IPC with access denied. **No website screenshots were obtained.** Visual symptoms below are derived from the original source and CSS, rather than claimed observations of rendered pixels. DOM interaction checks verify behavior, not layout, hover appearance, glyph rendering, or animation quality.

The final typography and shell colors reflect the concurrent, explicitly requested native OS direction. Earlier experiments with self-hosted type and a paper schematic were superseded; their unused font files were removed. MNEMA evidence updates supplied during the audit were retained, including authorship, report links, recorded benchmark results, and their provenance limits.

## Findings and implemented replacements

P0 means navigation or behavioral correctness; P1 means identity, hierarchy, or reading quality; P2 means supporting detail.

| Priority | Exact location | Original symptom | Why it weakens UjanOS | Implemented replacement |
| --- | --- | --- | --- | --- |
| P1 | `Welcome.tsx`, main heading and `.hello-mark` | â€œHi, Iâ€™m Ujanâ€ with an ornamental star | A reusable portfolio greeting occupies the primary visual position while the actual research direction sits below | Owner's full name, physics undergraduate status, NIT Agartala, and a direct continual-learning description; removed the star |
| P1 | `Welcome.tsx`, lead and description | Repeated â€œsearch, predict, and learnâ€ / â€œcurrent focusâ€ phrases | The introduction summarizes categories without helping someone choose a project | State the physics degree and research direction; explain learning new tasks without forgetting earlier ones |
| P1 | `Welcome.tsx`, primary action | â€œExplore workâ€ opens only Memory Lab | The label suggests a collection but delivers one application | â€œOpen MNEMAâ€, followed by a numbered index for the predictor, chess engine, and CLI agent |
| P1 | `Welcome.tsx`, secondary action | â€œRÃ©sumÃ© & backgroundâ€ when no rÃ©sumÃ© file exists | The label raises an expectation the app cannot satisfy | â€œAbout meâ€; rÃ©sumÃ© availability and an email request remain in About |
| P1 | `styles.css`, type system | Repeated sans/italic-serif switches, spaced monospace labels, 7â€“10 px captions | Technical decoration competes with research content and makes small windows harder to read | A consistent native OS interface family, fewer type treatments, larger reading text, and monospace reserved mainly for code, indices, and notation |
| P1 | `MemoryLab.tsx`, Overview | â€œLearning changes. What stays?â€ as the main title | The project's name and authorship lose priority to an interchangeable rhetorical headline | MNEMA is the title; explain the continual-learning problem, credit Ujan Dey and Swapnil, and retain the recorded evidence added during this work |
| P1 | `MemoryLab.tsx`, `TraceArtwork` | Smooth decorative curves resembling plotted results | An ambiguous wave illustration distracts from sparse representations and memory, even with a disclaimer | Task/trace schematic with discrete marks and an explicit illustration caption; recorded task retention remains a separate data view |
| P1 | `MemoryLab.tsx`, Architecture / Findings / Sources headings | â€œMore than one way to rememberâ€, â€œMemory has a cost, tooâ€, â€œThe work, in the openâ€ | Repeated editorial formulas delay the useful information | â€œThe memory architectureâ€, â€œRetention, accuracy & resourcesâ€, and â€œMNEMA is a collaborationâ€ |
| P1 | `memory-lab.css`, architecture and source sections | Nested tinted boxes surrounding nearly every concept | The four components and source links receive similar visual weight regardless of their role | Four explicit component nodes, numbered explanatory rows, and source sections separated by rules; native shell surface styling preserved |
| P1 | `PredictionLab.tsx`, Matchup heading and worksheet | â€œPredict the possibilitiesâ€ above team selectors without live outputs | The headline and controls can overpromise model execution | â€œFrom match results to probabilitiesâ€; identify an interactive case study and state exactly what team selection does |
| P1 | `PredictionLab.tsx`, Pipeline heading | â€œFive steps. One forecastâ€ | A generic cadence supplies no extra technical meaning | â€œHow the forecast is builtâ€; preserve the actual pipeline and calibration caveat |
| P1 | `ChessLab.tsx`, Board / Search / Implementation | â€œThink a few moves aheadâ€, â€œSearch, prune, rememberâ€, â€œCorrectness comes firstâ€ | Broad chess and engineering slogans take space from what visitors can inspect | â€œInspect a positionâ€, â€œSearching the move treeâ€, and â€œBoard state, notation & interfacesâ€; prepared positions remain labeled |
| P1 | `AgentConsole.tsx`, example introduction | Abstract â€œrequest to actionâ€ headline and general explanation of agents | Any agent project could use the same introduction | Name the calculator example, reading a file, calling Python, and returning the result; retain documentation-replay provenance |
| P1 | `About.tsx`, intro and columns | â€œCurious builderâ€, a stock atom illustration, â€œIdeas into working systemsâ€ | A generic personality claim and physics symbol stand in for the owner's actual background | Degree, institution, research direction, and named software projects; remove the atom artwork |
| P1 | `Contact.tsx`, heading and copy | â€œGood questions start a conversationâ€ | An extra slogan delays the email address and purpose of the page | â€œWrite to meâ€; concise project and collaboration context, direct email and copy controls |
| P1 | `Notebook.tsx`, intro and empty state | â€œA map of my curiosityâ€ and â€œA place for the work in progressâ€ | The language could suggest a research record or imply content that is absent | â€œFour questions to work onâ€ and â€œNo public notes yetâ€; retain the distinction between interests and completed work |
| P1 | `Archive.tsx`, covers | Both projects use large monograms and the same diagonal rules | A drawing application and a music fan website appear interchangeable | Distinct native SVG artwork: note sheets and a pencil for Noted; typographic and music-line artwork for the fan hub. Still explicitly artwork, not screenshots |
| P1 | `supporting.css` and `project-apps.css`, reading layouts | Many bordered pastel panels, small body text, repeated serif subheadings | Long descriptions feel like a set of unrelated cards rather than a case study | Rules and continuous reading sections, clearer subheadings, bounded line lengths, and project controls separated from explanatory prose |
| P0 | `App.tsx`, mobile header | No application switcher available while reading an app | Moving between projects requires returning to the home index | Persistent mobile Apps button; all applications remain reachable inside each app |
| P1 | `App.tsx`, mobile home | A uniform two-column grid repeats projects already introduced above | Research projects and supporting pages compete with identical tiles | Primary projects in the introduction; supporting pages in a compact list with titles and subtitles |
| P0 | `windowState.ts`, `bounds` | Vertical clamping keeps only title controls reachable | A dragged window can cover the dock and obscure its own bottom content | Clamp using the full window height and reserve space above the dock; regression tested at desktop and narrow laptop dimensions |
| P0 | `App.tsx`, focus effect | A delayed focus callback can run after another application opens | A previous window can steal focus and become active again | Cancel the scheduled animation frame when the effect is superseded |
| P0 | `App.tsx`, close/minimize focus restoration | The first matching launcher can be hidden on mobile | Focus restoration can target a non-visible footer control | Choose a visible launcher; otherwise focus the desktop or active launcher control |
| P0 | `App.tsx`, launcher | Opening does not move focus into the launcher; outside clicks do not dismiss it | Keyboard and pointer behavior feels disconnected from the window system | Focus the first application, retain Escape and close-button restoration, and dismiss on outside pointer interaction |
| P0 | `App.tsx`, mobile open | Document scroll can carry over from a long app | The next application can open halfway down its content | Reset document scroll when opening a mobile app |
| P2 | `Contact.tsx`, clipboard fallback | Says the address is â€œbelowâ€ the button although it is above | The failure message sends the reader to the wrong place | Correct the direction and retain a selectable email address |
| P2 | `index.html`, metadata and no-script fallback | Repeats â€œpersistent curiosityâ€ and broad portfolio slogans | The site's identity becomes less specific when shared or viewed without JavaScript | Degree, institution, research direction, project descriptions, and collaborative MNEMA credit |

## Verification completed

- Production build and TypeScript checking pass.
- ESLint passes, including the new verification scripts.
- Seven reducer tests pass: app instances, focus, minimize/restore/close, maximize/restore, workspace arrangements, viewport bounds, dock clearance, and expansion of the MNEMA preview.
- `npm run check:ui` exercises nine applications and all thirteen project tab views in jsdom. It checks team selection, pipeline stages, saved MNEMA checkpoints and method selection, prepared chess lines, search stages, agent replay, notebook interests, empty notes, clipboard status, window controls, launcher focus/Escape/reset, and mobile app switching.
- DOM tests do not load styles or perform geometric measurements. They are not screenshots or evidence that responsive composition is visually correct.
- Current text palette checks on white: primary text 16.83:1, secondary text 6.04:1, link 5.27:1, primary button text on its darker blue background 5.33:1. These checks cover selected opaque pairs, not every combination in the site or a complete accessibility audit.

## Reproducible browser review

`npm run check:browser` is supplied for an environment that can launch Edge. Set `SITE_URL` to the running local site; alternatively, set `CDP_URL` to attach to an existing Chromium browser.

The capture matrix is 1920Ã—1080, 1440Ã—900, 1366Ã—768, 800Ã—600, 390Ã—844, and 320Ã—740. It captures the overview, launcher, every application and tab, lower content and expanded details, maximized windows, primary hover/focus, and reduced motion. Images go to `.verification/design-audit/`. The script also checks page overflow and browser runtime errors. Screenshots still need human visual inspection; passing automation alone does not establish design quality.

In this environment the script fails at browser launch before any screenshot. The final composition, narrow-window wrapping, transient hover/focus appearance, and animation quality remain visually unverified. No fabricated screenshots, live inference, project outcomes, credentials, or personal anecdotes were added.

