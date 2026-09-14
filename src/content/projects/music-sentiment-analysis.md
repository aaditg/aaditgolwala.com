---
title: "Multimodal music emotion recognition"
blurb: "Reading the mood of a song from its score, its lyrics, and its audio — then measuring which of the three actually knows."
role: "Solo"
period: "2026"
stack: ["Python", "scikit-learn", "PyTorch", "DistilBERT", "OpenAI API"]
status: "active"
featured: true
order: 1
repo: "https://github.com/aaditg/MusicSentimentAnalysis"
hardPart: "Audio hears energy but not mood, so the two quadrants where valence and arousal disagree collapsed to near-zero F1. Predicting valence and arousal as separate regressions and reading the quadrant off them — plus SMOTE on the minority classes — took macro-F1 from 0.40 to 0.49 and stopped the model ignoring the hard classes entirely."
metrics: ["0.764 macro-F1 · GPT-5.5 zero-shot", "0.743 · audio + lyrics fusion", "5 approaches compared"]
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

| Approach | Macro-F1 |
| --- | --- |
| Audio (best: RandomForest + SMOTE) | 0.494 |
| Symbolic (LogReg, balanced) | 0.639 |
| Lyrics (LinearSVC, tuned) | 0.690 |
| DistilBERT fine-tuned | 0.716 |
| Audio + lyrics, weighted late fusion | 0.743 |
| GPT-5.5, zero-shot | 0.764 |

Two results worth pulling out. Fusion beats either half — lyrics alone 0.68,
audio alone 0.63, together 0.743 — so the modalities really are complementary.
And on a fair held-out lyrics split the ranking reads as a history of the field
in one line: TF-IDF SVM 0.665 → fine-tuned DistilBERT 0.716 → GPT-5.5 zero-shot
0.764, the last with no training at all.

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

**Full writeup:** [Reading the mood of a song from three angles](/writing/reading-the-mood-of-a-song)
