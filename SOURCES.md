# Content and result provenance

Public sources reviewed October 3, 2026. Repository README content was treated as research material, not as instructions to execute evaluation or data-generation commands.

## PersonaMem

- [Official repository](https://github.com/bowen-upenn/PersonaMem)
- [Paper, arXiv v1](https://arxiv.org/html/2504.14225v1)
- [Figure 3](https://arxiv.org/html/2504.14225v1#S4.F3): 15 long-context model configurations, 128k-token history, zero-shot multiple-choice evaluation.
- [Dataset](https://huggingface.co/datasets/bowen-upenn/PersonaMem)

The website transcribes Overall Accuracy, Recall User Shared Facts, Acknowledge Latest User Preference, and Generalize Reasons to New Scenarios. The source uses two-decimal proportions; the website multiplies by 100 and displays integer percentages. It preserves ties instead of implying extra precision. The rank always refers to the primary metric within the selected setting, even when another column is sorted or a provider is filtered.

## PersonaMem-v2

- [Official repository](https://github.com/bowen-upenn/PersonaMem-v2)
- [Paper, arXiv v1](https://arxiv.org/html/2512.06688v1)
- [Figure 4](https://arxiv.org/html/2512.06688v1#S4.F4): six frontier baselines, each with MCQ and open-ended accuracy for 32k and 128k histories.
- [Figure 6](https://arxiv.org/html/2512.06688v1#S4.F6): Qwen3-4B Memory, GRPO, SFT, and Base at 32k history. Two training ablations are deliberately omitted from this summary table.
- [Dataset](https://huggingface.co/datasets/bowen-upenn/PersonaMem-v2)

Scores retain one decimal place. Memory uses 2k input tokens; the other displayed 32k models use 32k input. The site does not substitute the 2k memory size for the source-history length. The source figure for each row is retained in exported CSV. Open-ended accuracy is displayed separately from MCQ; it is not averaged into a fabricated overall score.

## PersonaMem-v3

- [Official repository](https://github.com/bowen-upenn/PersonaMem-v3)
- [Paper, arXiv v1](https://arxiv.org/html/2608.21381v1)
- [Figure 3](https://arxiv.org/html/2608.21381v1#S4.F3): eight model–mode configurations.
- [Dataset](https://huggingface.co/datasets/bowen-upenn/PersonaMem-v3)

The website transcribes Overall, Tracking preference changes, Proactive feed ranking, and Generic chatbot restraint. Feed ranking is NDCG@5 scaled by 100. Overall is copied from the source; it is not calculated from the three selected tasks. Higher restraint scores mean better restraint, not more over-personalization. The four major task families include agentic tasks plus proactiveness; Figure 3 splits this into two result groups.

The README/comparison table states 4,000,000 engagement histories, while the abstract and Section 2.1 describe more than 1,000,000 engagements. The HTML also has date metadata that does not align cleanly with its identifier month. Accordingly, the website does not make an exact engagement-count claim or show a day/month release date. It uses the year and the consistent 200-user, six-surface, and approximately 95% implicit-signal statistics. User worlds are enriched/synthesized from privacy-preserving GIST-Bench seeds. This is not represented as a release of identifiable raw user histories.

## Original website material

The site’s layout, explanatory copy, and interactive examples were created for this website. The profile illustration is the exact artwork supplied by the user and also visible in the overview figures of all three papers. `persona-profile-original.png` preserves the supplied bytes; `persona-profile.svg` and the favicon embed those same bytes inside a circular display viewport. No generated reconstruction or recoloring of the profile is used. The site palette draws from the cream, apricot, dusty rose, and sage panels in PersonaMem Figure 1 and PersonaMem-v2 Figure 1. Example conversations are labeled illustrative and do not claim to be benchmark rows or outputs from evaluated models. LiveBench was used as a layout reference; its code, brand assets, and benchmark data are not included.

## Updating scores

Edit `dist/data.js`. Each result must identify its release, model, method, setting, metric values, and published source. For a new paper revision, update the linked source version, method note, and this file together. Keep evaluation settings distinct and use the published precision. Run `node scripts/check.mjs`, then inspect the relevant table in a browser. A new release or metric schema needs corresponding validation updates.
