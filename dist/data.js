/* Published source snapshots; see SOURCES.md for transcription and maintenance notes.
   Scores are percentages. Never combine scores across releases or protocols. */
window.PERSONAMEM_DATA = {
  v1: {
    name: 'PersonaMem', year: '2025', badge: 'COLM 2025 · THE ORIGINAL BENCHMARK',
    heading: 'Can AI keep up with a changing person?',
    description: 'Follow evolving user preferences through long, multi-session conversations. Evaluate whether a model remembers the right information and applies it to the person’s current situation.',
    stats: [['20', 'synthetic user personas'], ['180+', 'interaction histories'], ['7', 'query types'], ['1M', 'maximum context tokens']],
    paper: 'https://arxiv.org/abs/2504.14225', code: 'https://github.com/bowen-upenn/PersonaMem', data: 'https://huggingface.co/datasets/bowen-upenn/PersonaMem',
    title: 'Know Me, Respond to Me: Benchmarking LLMs for Dynamic User Profiling and Personalized Responses at Scale',
    authors: 'Bowen Jiang, Zhuoqun Hao, Young-Min Cho, Bryan Li, Yuan Yuan, Sihao Chen, Lyle Ungar, Camillo J. Taylor, and Dan Roth',
    blurb: 'Introduces dynamic user profiling and preference-aware responses across long conversation histories.',
    source: 'https://arxiv.org/html/2504.14225v1#S4.F3', sourceLabel: 'Figure 3 · 128k context',
    resultsDescription: 'Original-paper baselines across 7 query types. Selected task scores are shown alongside overall accuracy.',
    metricLabel: 'ACCURACY (%) · HIGHER IS BETTER',
    note: '128k-token context, zero-shot multiple-choice evaluation. Source: Figure 3 of the original paper (v1). Published proportions are converted to percentages; precision follows the figure.',
    methodology: 'Each question has four candidate responses. The main evaluation measures selection of the response that matches the current user profile. “Facts,” “Latest preference,” and “New scenarios” are individual query types, not separately computed averages. The overall score is transcribed directly from the paper. Other context lengths and memory settings are available in the paper but are not included in this table.',
    columns: [['score','Overall'], ['facts','Facts'], ['latest','Latest preference'], ['transfer','New scenarios']],
    settings: [['128k','128k · long context']], defaultSetting:'128k',
    rows: [
      ['Gemini 1.5 Flash','Google','Long context',52,54,59,54],
      ['GPT-4.5','OpenAI','Long context',52,61,55,46],
      ['GPT-4.1','OpenAI','Long context',52,65,50,53],
      ['o1','OpenAI','Long context',50,50,54,39],
      ['Gemini 2.0 Flash','Google','Long context',49,50,52,46],
      ['o4-mini','OpenAI','Long context',48,42,55,38],
      ['Gemini 2.0 Flash-Lite','Google','Long context',48,49,51,33],
      ['GPT-4o','OpenAI','Long context',45,41,46,32],
      ['DeepSeek R1-671B','DeepSeek','Long context',45,43,42,38],
      ['Llama 4 Maverick','Meta','Long context',43,37,43,32],
      ['o3-mini','OpenAI','Long context',39,47,39,30],
      ['GPT-4o-mini','OpenAI','Long context',39,55,34,33],
      ['Llama 3.1-405B','Meta','Long context',31,38,31,21],
      ['Claude 3.5 Haiku','Anthropic','Long context',30,29,27,20],
      ['Claude 3.7 Sonnet','Anthropic','Long context',26,25,9,29]
    ].map(([model,provider,mode,score,facts,latest,transfer])=>({model,provider,mode,score,facts,latest,transfer,setting:'128k'})),
    citation: `@article{jiang2025know,
  title={Know Me, Respond to Me: Benchmarking LLMs for Dynamic User Profiling and Personalized Responses at Scale},
  author={Jiang, Bowen and Hao, Zhuoqun and Cho, Young-Min and Li, Bryan and Yuan, Yuan and Chen, Sihao and Ungar, Lyle and Taylor, Camillo J. and Roth, Dan},
  journal={arXiv preprint arXiv:2504.14225},
  year={2025},
  url={https://arxiv.org/abs/2504.14225}
}`
  },
  v2: {
    name:'PersonaMem-v2', year:'2025', badge:'IMPLICIT PERSONALIZATION · AGENTIC MEMORY',
    heading:'Understanding what goes unsaid.',
    description:'Everyday requests — editing an email, translating a message — quietly reveal user preferences. PersonaMem-v2 tests this implicit understanding and learns a compact, human-readable memory through reinforcement learning.',
    stats:[['1,000','synthetic user personas'],['300+','everyday scenarios'],['20,000+','user preferences'],['128k','maximum context tokens']],
    paper:'https://arxiv.org/abs/2512.06688',code:'https://github.com/bowen-upenn/PersonaMem-v2',data:'https://huggingface.co/datasets/bowen-upenn/PersonaMem-v2',
    title:'PersonaMem-v2: Towards Personalized Intelligence via Learning Implicit User Personas and Agentic Memory',
    authors:'Bowen Jiang, Yuan Yuan, Maohao Shen, Zhuoqun Hao, Zhangchen Xu, Zichen Chen, Ziyi Liu, Anvesh Rao Vijjini, Jiashu He, Hanchao Yu, Radha Poovendran, Gregory Wornell, Lyle Ungar, Dan Roth, Sihao Chen, and Camillo Jose Taylor',
    blurb:'Studies implicit personalization and learns a compact agentic memory through reinforcement fine-tuning.',
    source:'https://arxiv.org/html/2512.06688v1#S4.F4',sourceLabel:'Figures 4 & 6 · 32k / 128k',
    resultsDescription:'Frontier baselines and trained Qwen3-4B variants. Select a history length to compare the same evaluation setting.',
    metricLabel:'ACCURACY (%) · MCQ AND OPEN-ENDED',
    note:'32k and 128k refer to conversation-history length. The agentic-memory model uses a 2k-token memory for the 32k history. Figures 4 and 6 report different answer formats; their scores are shown separately.',
    methodology:'MCQ accuracy measures multiple-choice response selection. Open-ended scores use the paper’s separate open-ended evaluation protocol and should not be interpreted as the same metric as MCQ. The 32k table combines frontier baselines from Figure 4 with the principal Qwen3-4B variants from Figure 6; training ablations are omitted. Only frontier baselines are reported here for 128k. The memory model’s smaller input reflects compressed memory, not a shorter source history.',
    columns:[['score','MCQ'],['open','Open-ended'],['input','Input tokens']],
    settings:[['32k','32k · history'],['128k','128k · history']],defaultSetting:'32k',
    rows:[
      ['GPT-5-mini','OpenAI','Long context',48.7,56.4,44.1,47.6],
      ['GPT-5-chat','OpenAI','Long context',45.6,46.2,41.4,40.7],
      ['o4-mini','OpenAI','Long context',39.1,52.0,38.9,43.0],
      ['GPT-4.1','OpenAI','Long context',38.7,48.5,38.2,45.6],
      ['GPT-5-nano','OpenAI','Long context',37.9,50.1,33.9,44.0],
      ['GPT-4.1-mini','OpenAI','Long context',37.6,45.3,37.5,39.8]
    ].flatMap(([model,provider,mode,score,open,score128,open128])=>[
      {model,provider,mode,score,open,input:32000,setting:'32k',figure:4},
      {model,provider,mode,score:score128,open:open128,input:128000,setting:'128k',figure:4}
    ]).concat([
      {model:'Qwen3-4B · Memory',provider:'Qwen',mode:'Agentic memory',score:55.2,open:60.7,input:2000,setting:'32k',figure:6},
      {model:'Qwen3-4B · GRPO',provider:'Qwen',mode:'RL fine-tuned',score:53.8,open:56.0,input:32000,setting:'32k',figure:6},
      {model:'Qwen3-4B · SFT',provider:'Qwen',mode:'Supervised fine-tuned',score:35.0,open:42.8,input:32000,setting:'32k',figure:6},
      {model:'Qwen3-4B · Base',provider:'Qwen',mode:'Base model',score:30.5,open:38.3,input:32000,setting:'32k',figure:6}
    ]),
    citation:`@article{jiang2025personamem2,
  title={PersonaMem-v2: Towards Personalized Intelligence via Learning Implicit User Personas and Agentic Memory},
  author={Jiang, Bowen and Yuan, Yuan and Shen, Maohao and Hao, Zhuoqun and Xu, Zhangchen and Chen, Zichen and Liu, Ziyi and Vijjini, Anvesh Rao and He, Jiashu and Yu, Hanchao and Poovendran, Radha and Wornell, Gregory and Ungar, Lyle and Roth, Dan and Chen, Sihao and Taylor, Camillo Jose},
  journal={arXiv preprint arXiv:2512.06688},
  year={2025},
  url={https://arxiv.org/abs/2512.06688}
}`
  },
  v3: {
    name:'PersonaMem-v3',year:'2026',badge:'LATEST RELEASE · OMNI-PLATFORM PERSONAL INTELLIGENCE',
    heading:'A whole-person view of personal intelligence.',
    description:'Connect evidence across social media, chatbots, companions, and calendars. Evaluate whether agents use the right context at the right time: personalizing, recommending, acting, and holding back when needed.',
    stats:[['200','GIST-Bench user seeds'],['6','connected digital surfaces'],['≈95%','implicit behavior signals'],['4','major task families']],
    paper:'https://arxiv.org/abs/2608.21381',code:'https://github.com/bowen-upenn/PersonaMem-v3',data:'https://huggingface.co/datasets/bowen-upenn/PersonaMem-v3',
    title:'PersonaMem-v3: Toward Omni-Platform Personal Intelligence for Holistic User Understanding, Recommendation, and Agentic Tasks',
    authors:'Bowen Jiang, Yuan Yuan, Zhuoqun Hao, Yuchen Liu, Maohao Shen, Sihao Chen, Gregory Wornell, Chris Callison-Burch, Lyle Ungar, Dan Roth, Qi Guo, Xiangjun Fan, Camillo J. Taylor, and Hanchao Yu',
    blurb:'Connects real-world-grounded behavioral signals to synthesized digital worlds and evaluates personalization, recommendation, restraint, and agentic behavior.',
    source:'https://arxiv.org/html/2608.21381v1#S4.F3',sourceLabel:'Figure 3 · model–mode configurations',
    resultsDescription:'Eight model–mode configurations. Compare overall performance and selected tasks from the paper.',
    metricLabel:'PAPER-REPORTED SCORES (%) · HIGHER IS BETTER',
    note:'Snapshot of Figure 3 in the v3 paper. Task columns show preference-change tracking, proactive feed ranking (NDCG@5 × 100), and generic chatbot restraint. Higher restraint scores mean better avoidance of unnecessary personalization.',
    methodology:'The overall values are reported by the authors; this site does not recompute an average of the visible columns. Individual task scores use task-specific scoring, including NDCG@5 for feed ranking. “Preference updates” and “Generic restraint” are individual tasks, not task-family averages. Four major task families include agentic tasks and proactiveness together; the results figure displays those two groups separately. Evaluation uses time-masked evidence and the paper’s judge and hard-check protocols. Each release and context-access mode should be interpreted within its own protocol.',
    columns:[['score','Overall'],['preference','Preference updates'],['ranking','Feed ranking'],['restraint','Generic restraint']],
    settings:[['all','All context-access modes'],['Long context','Long context'],['Textual memory','Textual memory'],['Mem0 / RAG','Mem0 / RAG'],['Agentic search','Agentic search']],defaultSetting:'all',
    rows:[
      ['GPT-5.5','OpenAI','Long context','Long context',53.4,73.1,33.4,85.2],
      ['GPT-5.5','OpenAI','Textual memory','Textual memory',49.4,79.7,29.8,77.9],
      ['GPT-5.5','OpenAI','Mem0 / RAG','Mem0 / RAG',48.8,56.9,25.8,74.9],
      ['GPT-5.5','OpenAI','Codex High','Agentic search',53.2,67.9,35.3,85.3],
      ['Gemini 3.5 Flash','Google','Long context','Long context',47.7,63.7,34.3,75.1],
      ['Gemini 3.5 Flash','Google','Textual memory','Textual memory',51.5,67.4,32.2,78.0],
      ['Claude Opus 4.8','Anthropic','Claude Code High','Agentic search',53.7,65.7,29.1,87.3],
      ['Claude Sonnet 4.6','Anthropic','Claude Code High','Agentic search',50.9,64.6,25.2,81.9]
    ].map(([model,provider,mode,setting,score,preference,ranking,restraint])=>({model,provider,mode,setting,score,preference,ranking,restraint})),
    citation:`@article{jiang2026personamem,
  title={PersonaMem-v3: Toward Omni-Platform Personal Intelligence for Holistic User Understanding, Recommendation, and Agentic Tasks},
  author={Jiang, Bowen and Yuan, Yuan and Hao, Zhuoqun and Liu, Yuchen and Shen, Maohao and Chen, Sihao and Wornell, Gregory and Callison-Burch, Chris and Ungar, Lyle and Roth, Dan and Guo, Qi and Fan, Xiangjun and Taylor, Camillo J. and Yu, Hanchao},
  journal={arXiv preprint arXiv:2608.21381},
  year={2026},
  url={https://arxiv.org/abs/2608.21381}
}`
  }
};
