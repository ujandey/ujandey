import CaseStudyFooter from '../components/CaseStudyFooter';
import type { FC } from 'react';
import type { AppProps } from '../types';
import { AppHeading, Caption, ExternalLink, Tabs, Tag } from '../components/UI';
import { predictionPipeline } from '../data/demos';
import { projects } from '../data/projects';
import { AppLink, choiceHref, useRouteChoice } from '../navigation';
import './project-apps.css';
const views=['Overview','Pipeline','Evaluation'] as const;
const PredictionLab: FC<AppProps> = () => {
 const [view,setView]=useRouteChoice('prediction','section',views,'Overview');
 const [stageChoice,setStage]=useRouteChoice('prediction','stage',['1','2','3','4','5'] as const,'1');
 const stage=Number(stageChoice)-1;
 return <div className="prediction-app"><Tabs tabs={views} value={view} onChange={setView} href={value=>choiceHref('prediction','section',value)}/><div className="app-pad">
  <div className="inline-links"><ExternalLink className="button primary" href={projects.prediction.notebook}>Open Kaggle notebook</ExternalLink><ExternalLink href={projects.prediction.repo}>GitHub companion application</ExternalLink></div>
  {view==='Overview'&&<>
   <Tag tone="moss">Football prediction notebook · case study</Tag>
   <AppHeading eyebrow="World Cup 2026 predictor" title="From match results to probabilities.">Turn historical football results into match probabilities and sample possible tournament outcomes.</AppHeading>
   <p className="project-role">The Kaggle notebook is the main artifact for this project. The GitHub repository provides the companion application.</p>
   <p className="project-role"><strong>My role:</strong> development of the football forecasting pipeline.</p>
   <p className="case-meta">Repository created June 26, 2026 · Application source checked October 5, 2026</p>
   <section className="case-section"><h3>The engineering question</h3><p>How can changing team strength and recent form become outcome probabilities, and how does uncertainty propagate through a tournament?</p></section>
   <section className="case-section"><h3>Companion application pipeline</h3><p>Matches since 1993 feed sequential Elo ratings and rolling form features from the prior five and ten games. Features are recorded before adding the current result to team history. An XGBoost classifier produces outcome probabilities, calibration adjusts them, and Monte Carlo simulation samples tournament paths. Matchup probabilities are computed in a batch before simulation. Default groups are Elo-seeded; the knockout bracket and group tie-breaks are simplified rather than a verified official draw. FastAPI and a web frontend provide the application interface.</p></section>
   <section className="case-section"><h3>Application artifacts &amp; limitations</h3><p>The companion GitHub application contains the prediction pipeline. No saved match predictions are committed in the inspected application source, and no deployed endpoint has been verified. This portfolio explains the pipeline without generating odds.</p><p>The application’s reported accuracy belongs to the pre-calibration classifier. Calibration used the same held-out period, so that score does not independently evaluate the final calibrated model. No final calibrated-model performance is claimed.</p></section>
   <AppLink className="text-link" href="/prediction?section=Pipeline">Inspect the application pipeline →</AppLink>
   <Caption>GitHub application snapshot inspected at revision 1a4684f139fbbcc70cb403808363e04551a578b0. The pipeline was not trained or run here.</Caption>
  </>}
  {view==='Pipeline'&&<>
   <AppHeading eyebrow="Companion application pipeline" title="How the forecast is built.">Inspect each stage of the GitHub application and the information it passes onward.</AppHeading>
   <div className="prediction-pipeline" aria-label="Prediction pipeline stages">{predictionPipeline.map((item,i)=><AppLink key={item.name} href={choiceHref('prediction','stage',String(i+1))} aria-current={stage===i?'true':undefined} onClick={event=>{if(!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();setStage(String(i+1) as '1'|'2'|'3'|'4'|'5');}}}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.name}</strong><span aria-hidden="true">{i<4?'↓':'○'}</span></AppLink>)}</div>
   <section className="prediction-stage" aria-live="polite"><span className="eyebrow">{predictionPipeline[stage].label}</span><h3>{predictionPipeline[stage].name}</h3><p>{predictionPipeline[stage].detail}</p></section>
   <Caption>Implementation schematic. These stages do not run inference in the portfolio.</Caption><ExternalLink href={projects.prediction.repo}>Implementation source</ExternalLink>
  </>}
  {view==='Evaluation'&&<>
   <AppHeading eyebrow="Companion application evaluation" title="Are the probabilities reliable?">Outcome accuracy and probability calibration answer different questions.</AppHeading>
   <section className="case-section"><h3>Reported accuracy precedes calibration</h3><p>The pipeline’s reported classifier accuracy was measured before calibration. Calibration was then fitted on that held-out period. This does not provide an independent evaluation of the final calibrated predictor.</p><p>The README reports about 57% accuracy on the 2020+ holdout for the pre-calibration classifier; this is a project-reported figure, not an independently reproduced score. A separate evaluation period is needed to assess calibrated probabilities. In backend/pipeline.py, train_model splits at January 1, 2020; test_accuracy is computed from the uncalibrated classifier before calibrated.fit(X_test, y_test_enc). There is no separate evaluation of the calibrated model in that function.</p></section>
   <div className="app-grid"><section className="panel"><h3>Classification</h3><p>How often does the chosen outcome match the result?</p></section><section className="panel"><h3>Calibration</h3><p>Do outcomes assigned a given probability happen at that frequency?</p></section></div><ExternalLink href="https://github.com/ujandey/wc2026predictor/blob/1a4684f139fbbcc70cb403808363e04551a578b0/backend/pipeline.py#L255">Evaluation &amp; calibration code</ExternalLink>
  </>}
 <CaseStudyFooter id="prediction"/></div></div>;
};
export default PredictionLab;
