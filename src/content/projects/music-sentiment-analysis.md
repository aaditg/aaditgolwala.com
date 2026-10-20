---
title: "Multimodal music emotion recognition"
blurb: "Thirty-two experiments on whether a song's notes, recording, or lyrics predict its mood — and why the top score only tells part of the story."
role: "Solo"
period: "2026"
stack: ["Python", "scikit-learn", "PyTorch", "DistilBERT", "OpenAI API"]
status: "active"
group: "research"
featured: true
order: 1
description:
  - >-
    Can you tell how a song feels from its notes, its lyrics, or its recording,
    and which of the three actually knows? Every model predicts one of four
    emotion groups — valence crossed with arousal — so results stay comparable
    across inputs that share nothing else.
  - >-
    Thirty-two experiments on three datasets: symbolic features from MIDI,
    TF-IDF lyrics into an SVM, acoustic features from audio, early and
    weighted late fusion where both exist, and DistilBERT fine-tuning against
    two LLMs. Cross-validation and the official test split are reported
    separately, because they answer different questions.
highlights:
  - >-
    Combining audio and lyrics on matched samples helped every emotion group:
    0.677 lyrics alone, 0.625 audio alone, 0.743 fused. Q1 gained the most,
    Q4 the least and stayed the hardest.
  - >-
    The LLM's 0.764 and fusion's 0.743 are not compared head to head. One is
    a held-out lyrics split, the other cross-validation on paired data; a
    shared test set would be needed first.
  - >-
    Few-shot prompting lowered both LLMs' scores. That says the tested setups
    did worse, not that examples hurt in general.
caseStudy: true
repo: "https://github.com/aaditg/MusicSentimentAnalysis"
# TODO: Medium URL for the writeup, as a pill next to Code:
# links:
#   - { label: "Medium", href: "https://medium.com/@.../..." }
hardPart: "An audio model that was 64% accurate scored 0.025 F1 on tense music and 0.089 on calm music — the accuracy number hid it. Rebalancing with SMOTE took macro-F1 from 0.395 to 0.494 and cost three points of accuracy, a trade worth making when all four moods matter."
metrics: ["32 experiments", "0.743 macro-F1 · audio + lyrics, cross-validated", "0.764 · GPT-5.5 zero-shot, held-out lyrics"]
draft: false
---

## The problem

"What emotion is this song?" is a bad question to ask a model directly — the
labels are fuzzy and nobody agrees on them. So instead of predicting a mood
word, every model here predicts one of four quadrants from the circumplex
model: valence (how positive) crossed with arousal (how energetic). That keeps
results comparable across inputs that have nothing else in common.

## What I built

Five approaches over the same four-label problem, each on its own dataset:

- **Symbolic** — pitch range, note density, velocity, key and mode, and rhythm
  statistics pulled from EMOPIA's MIDI piano performances.
- **Lyrics** — TF-IDF over word and character n-grams into a linear SVM, on the
  MERGE lyrics set.
- **Audio** — acoustic features from DEAM.
- **Fusion** — weighted late fusion over MERGE's bimodal set, where audio and
  lyrics exist for the same songs.
- **Neural and LLM** — DistilBERT fine-tuned on the lyrics split, and GPT-5.5
  and gpt-4.1-mini prompted zero-shot with nothing but the four definitions.

Everything is scored with nested cross-validation on held-out splits, so the
numbers below compare fairly.

## The hard part

Audio was where it broke. A plain classifier scored 0.395 macro-F1 and got
there by quietly refusing to predict Q2 (angry) and Q4 (calm) at all — the two
quadrants where valence and arousal point in different directions. Loud and
fast is audible; happy versus sad is not.

Papering over that with a better classifier did not work. What did: stop
predicting the quadrant. Train two regressors, one for valence and one for
arousal, and derive the quadrant from their outputs. Add SMOTE to rebalance the
minority classes. Macro-F1 went to 0.494, and more importantly the hard classes
stopped being ignored.

It is still the weakest modality, and that is the honest finding: you cannot
reliably hear valence from acoustic features alone.

## Results

Two tables, because they are two evaluation setups and should not be ranked
together.

Cross-validated, each on its own dataset:

| Approach | Dataset | Macro-F1 |
| --- | --- | --- |
| Audio, random forest + SMOTE | DEAM, 1,802 | 0.494 |
| Symbolic, balanced logistic regression | EMOPIA, 1,071 clips | 0.639 |
| Lyrics, LinearSVC tuned | MERGE Lyrics, 2,568 | 0.690 |
| Audio + lyrics, weighted late fusion | MERGE Bimodal, 2,216 | 0.743 |

Lyrics only, on MERGE's official 384-sample test split:

| Model | Macro-F1 |
| --- | --- |
| LinearSVC reference | 0.665 |
| DistilBERT, fine-tuned | 0.716 |
| GPT-5.5, zero-shot | 0.764 |

Fusion beat either half on the same songs, and the gain showed up in all
four groups. On the lyrics split the ranking reads as a history of the
field — TF-IDF SVM, fine-tuned transformer, prompted model — but 0.764 is
not "better than" 0.743; they were never measured on the same test set.

## What did not work

Worth as much as what did.

I roughly doubled the symbolic feature set — pitch-class histograms, melodic
direction, articulation, polyphony — expecting a jump, and got almost nothing.
Song-level key and mode already carried the separable signal. The exercise did
surface a real bug: tempo was hardcoded, so every duration feature had been
computed at the wrong speed. Fixing it changed the accuracy by essentially
zero, which was its own lesson.

Learning the valence/arousal thresholds per fold instead of splitting at the
midpoint slightly hurt. And adding few-shot examples to the LLM prompts made
both models *worse* — their prior on emotion in language is strong enough that
four hand-picked examples just add noise.

Across every approach, classical or neural or prompted, Q4 — calm and content —
is the hardest quadrant. It is the quietest emotion and the easiest to confuse.

**Full writeup:** [I tried to predict a song's mood from its notes, audio, and lyrics](/writing/predict-a-songs-mood)
