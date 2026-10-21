---
title: "I Tried to Predict a Song's Mood From Its Notes, Audio, and Lyrics"
description: "What 32 experiments showed about music emotion recognition, and why the overall score only tells part of the story."
date: 2026-10-20
canonical: https://medium.com/@24agolwala/i-tried-to-predict-a-songs-mood-from-its-notes-audio-and-lyrics-285bcadd3414
# Friend link: lets readers through Medium's paywall while the story is metered.
# Once the story is un-metered this can be removed and canonical is enough.
readLink: https://medium.com/@24agolwala/i-tried-to-predict-a-songs-mood-from-its-notes-audio-and-lyrics-285bcadd3414?source=friends_link&sk=e4b5b90954efdb29d85f013ad7b7546f
draft: false
---

One of my audio models got about 64% of its predictions right. That sounded decent for a task with four emotion groups. Then I looked at how it performed on each group.

Its F1 score for tense or angry music was 0.025. For calm or tender music, it was 0.089. Most of the useful performance was coming from the other two groups.

That result is a good example of what this project became about. I tested whether a song's notes, recording, and lyrics could predict its mood. Across 32 experiments, I compared basic classifiers, combined audio and lyrics, fine-tuned a transformer, and tried LLMs. The useful part was seeing which changes helped, which emotions stayed difficult, and how much the evaluation setup affected the comparison.

Combining audio and lyrics gave a clear improvement within the paired dataset. The best lyrics LLM also did well on a separate test set. But getting a useful result meant looking past the highest number in the table.

## What I was trying to predict

For this project, mood means one of four groups from the circumplex model of affect. The groups use two dimensions. Valence describes how positive or negative the music feels. Arousal describes how energetic or calm it feels.

| Group | Valence | Arousal | Feels like |
| --- | --- | --- | --- |
| Q1 | high | high | upbeat, joyful, energetic |
| Q2 | low | high | tense, angry, aggressive |
| Q3 | low | low | sad, gloomy, tired |
| Q4 | high | low | calm, tender, content |

This gives the models a consistent target, even though four labels leave out a lot. A song can feel bittersweet, change mood halfway through, or affect two listeners differently. The scores here measure agreement with the dataset labels. They do not measure how well a model understands someone's personal reaction to a song.

I used three datasets. EMOPIA provides pop piano clips with audio, MIDI, and emotion labels. DEAM provides recordings with valence and arousal annotations. MERGE provides audio, lyrics, and paired audio and lyrics collections.

The saved experiments used the following inputs. These counts describe the evaluated data in this project, rather than the full size of every original release.

| Dataset | Input | Evaluated samples | Features | Evaluation |
| --- | --- | --- | --- | --- |
| EMOPIA | piano clips, MIDI | 1,071 clips | 48 MIDI features | 5-fold, grouped by song |
| DEAM | recordings | 1,802 | 260 openSMILE features | 5-fold |
| MERGE Lyrics | lyrics | 2,568 | TF-IDF, words and characters | 5-fold |
| MERGE Bimodal | audio and lyrics | 2,216 | TF-IDF and 101 librosa features | 5-fold |
| MERGE Lyrics, official split | lyrics | 384 in the test set | raw text | 70/15/15 split |

The datasets matter when reading the results. A score on piano clips and a score on a lyrics collection answer different questions. I would not use those two numbers to decide which input is universally better.

## How I compared the models

I focused on macro-F1, which calculates F1 for each emotion group and gives the four scores equal weight. F1 accounts for both how often a predicted label is right and how many examples of that group the model finds. This makes weak performance on a smaller group easier to see than overall accuracy does. The [scikit-learn definition](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html) describes the calculation.

Most experiments used five-fold cross-validation. The EMOPIA runs grouped clips by song, keeping clips from the same song together. Several tuning experiments used nested cross-validation, with an inner set of folds for choosing settings and outer folds for evaluation.

The transformer and LLM runs used MERGE's official 70/15/15 split, with 384 lyrics in the test set. I kept that comparison separate from the cross-validation results.

## The notes gave a useful baseline

For the symbolic experiments, the models used 48 features extracted from MIDI. They worked from note information rather than the recorded sound or lyrics.

Balanced logistic regression had the highest mean macro-F1 at 0.639. The original logistic regression baseline scored 0.632, random forest scored 0.630, and tuned gradient boosting reached 0.636.

Those results were pretty close. The best model's standard deviation across folds was about 0.040, much larger than its lead over the alternatives. That does not prove the models are equivalent, but it gives me little reason to make a big deal out of the ordering.

Q3, the gloomy or sad group, was the weakest class for the best model at 0.551 F1. The other three groups were between 0.652 and 0.680. There was useful emotion information in the MIDI features, but the models were less consistent on the sad clips. Changing the classifier did not produce a large improvement with this feature set.

## Audio showed why accuracy was not enough

The DEAM random forest baseline reached 64.0% accuracy and only 0.395 macro-F1. Its class scores explain the gap.

| | Random forest, baseline | Random forest + SMOTE |
| --- | --- | --- |
| Q1 | 0.726 | 0.714 |
| Q2 | 0.025 | 0.259 |
| Q3 | 0.741 | 0.721 |
| Q4 | 0.089 | 0.282 |
| Macro-F1 | 0.395 | 0.494 |
| Accuracy | 64.0% | 61.4% |

*Mean F1 for each emotion group across five folds. All values come from the saved DEAM experiments.*

Q1 and Q3 scored 0.726 and 0.741. Q2 and Q4 scored 0.025 and 0.089. So the accuracy number hid how uneven the predictions were.

Adding SMOTE, which creates synthetic examples to increase representation of underrepresented classes, improved macro-F1 to 0.494. Accuracy dropped to 61.4%. For a task where all four emotion groups matter, I would take that tradeoff.

Q2 improved to 0.259 and Q4 to 0.282. Q1 and Q3 dropped slightly. The model became more balanced across the groups, although the two difficult groups were still weak.

Other approaches came close. Scaled logistic regression using the top 80 features reached 0.484 macro-F1. Predicting valence and arousal first, then converting those predictions into quadrants, reached 0.483. Tuning the thresholds for that conversion lowered the score to 0.472.

The best audio result was still limited. SMOTE helped this random forest, but the remaining gap was too large to treat the problem as solved. The experiments also gave no reason to assume that more tuning would automatically help.

## Lyrics worked well with a fairly simple model

The first lyrics model used TF-IDF features with logistic regression and reached 0.659 macro-F1. TF-IDF represents text using weighted word counts. Later runs also included character sequences.

A LinearSVC model with word and character features reached 0.671. Tuning it with nested cross-validation brought that to 0.690. Class balancing alone made a smaller change, moving the logistic regression result from 0.659 to 0.662.

The tuned model was strongest on Q2 at 0.848 F1. Q4 was lowest at 0.615, with Q1 and Q3 in between. The language in this collection gave the model useful information, especially for tense or angry songs. These scores do not show which words drove the predictions or whether the model handled things like sarcasm well. That would require looking at individual outputs.

This was a useful baseline before trying a pretrained language model. A relatively simple text representation already got a lot of the way there.

## Combining audio and lyrics gave the clearest improvement

The fusion experiments used 2,216 MERGE samples with both audio and lyrics. This made the comparison more useful because the inputs were evaluated on the same collection.

| Approach | Macro-F1 |
| --- | --- |
| Audio only | 0.625 |
| Lyrics only | 0.677 |
| Early fusion, text compressed to 300 dimensions | 0.730 |
| Early fusion | 0.738 |
| Weighted late fusion, nested tuning | 0.743 |

*Mean macro-F1 across five folds. Fold standard deviations for early and late fusion were about 0.018 and 0.015 — not confidence intervals.*

Lyrics alone scored 0.677 macro-F1, while audio alone scored 0.625. Joining the two sets of features before classification, called early fusion, raised the score to 0.738.

Weighted late fusion reached 0.743. This approach trained separate classifiers for audio and lyrics, standardized their scores, and combined them using a tuned weight. The most common selected lyrics weight was 0.6. That is a weight on the model scores, not a claim that lyrics explain 60% of musical emotion.

Compared with lyrics alone, late fusion improved macro-F1 by about 0.066. Compared with audio alone, the improvement was about 0.118. Both differences come from the unrounded experiment logs.

The gain also showed up across all four groups.

| Group | Lyrics only | Weighted late fusion | Gain |
| --- | --- | --- | --- |
| Q1 | 0.652 | 0.751 | +0.099 |
| Q2 | 0.848 | 0.928 | +0.080 |
| Q3 | 0.615 | 0.673 | +0.058 |
| Q4 | 0.593 | 0.621 | +0.028 |

Q1 gained the most, while Q4 improved the least and remained the hardest group. My reading is that audio added useful information beyond what the lyrics model could use on its own. The per-class results support that interpretation, although I would still want to inspect individual songs to understand exactly how the inputs helped each other.

The difference between early and late fusion was much smaller, about 0.006 in the unrounded logs. Their fold standard deviations were about 0.018 and 0.015. I would not call that small lead a reliable win without more evaluation. The larger finding was that both fusion approaches beat either input alone in these runs.

Compressing the text features to 300 dimensions with SVD before early fusion gave 0.730, below the uncompressed version. It may have practical benefits, but the logs do not include timing or memory measurements to judge that tradeoff.

## The language models needed their own comparison

For the transformer and LLM experiments, I used the official MERGE lyrics test set. The LinearSVC reference scored 0.665 on this split. That is the relevant baseline for DistilBERT, rather than the 0.690 result from cross-validation.

DistilBERT, fine-tuned for three epochs with a maximum input length of 256 tokens, reached 0.716 macro-F1. It improved on the LinearSVC reference in every emotion group. The largest gains were in Q4 and Q2.

I also tested two LLMs with zero-shot and few-shot prompts. Zero-shot means the prompt supplied the task without labeled examples. Few-shot means examples were included.

| Model | Macro-F1 | Accuracy |
| --- | --- | --- |
| LinearSVC reference | 0.665 | 67.2% |
| gpt-4.1-mini, few-shot | 0.697 | 70.6% |
| gpt-4.1-mini, zero-shot | 0.712 | 71.6% |
| DistilBERT, fine-tuned for 3 epochs | 0.716 | 72.4% |
| GPT-5.5, few-shot | 0.751 | 76.3% |
| GPT-5.5, zero-shot | 0.764 | 77.3% |

*All six results use the same 384-sample lyrics test set. Model names follow the saved experiment log. These are single test-set results, with no repeated-run uncertainty estimates.*

GPT-4.1-mini scored 0.712 without examples, close to DistilBERT's 0.716. GPT-5.5 had the highest macro-F1 in this comparison at 0.764, with 77.3% accuracy.

The best overall score still did not mean the best score on every emotion. GPT-5.5 reached 0.790 F1 on Q3, compared with DistilBERT's 0.660. It also did better on Q1. DistilBERT remained slightly ahead on Q2 and Q4.

That is a useful difference if the application cares about particular moods. An overall ranking would hide it.

Giving the LLMs examples lowered both overall scores. GPT-4.1-mini went from 0.712 to 0.697, and GPT-5.5 went from 0.764 to 0.751. This only tells me that the tested few-shot setups did worse. It does not establish that examples generally hurt. Example selection, wording, and ordering would need separate tests to explain the drop.

I also would not compare the LLM's 0.764 directly with fusion's 0.743 and declare a winner. The LLM result came from the held-out lyrics split. Fusion was evaluated through cross-validation on the paired collection. They would need a common test set for that comparison.

## One label still misses how a song changes

The project also has a documented timeline workflow for moving a 30-second window across a full song. With a 15-second hop, the windows overlap, giving a closer view of how the predictions change. The output includes valence and arousal curves and the predicted quadrant for each window.

There is a limitation with the lyrics input. The lyrics are not aligned to timestamps, so they shift every window by the same amount. The changes over time come from the audio.

I would use those plots to inspect the model's behavior. The static classification results above do not establish that the curves accurately track a listener's emotions through a song. That needs a separate evaluation against labels that also change over time.

## What I would test next

The first thing I would do is compare the strongest systems on one shared test set with both audio and lyrics. That would make it possible to judge fusion against the lyrics models without mixing evaluation setups.

I would also spend more time on Q4. It remained the weakest group in the fusion results and the best overall LLM run. Looking at the actual mistakes would help show whether the models confuse calm music with sad music, upbeat music, or something else. Per-class F1 alone cannot answer that.

For the smaller score differences, I would save individual predictions and repeat the runs. The current logs contain aggregate scores and some fold standard deviations, but they are not enough to establish statistical significance or explain specific errors. A reproducibility check should also confirm that preprocessing, feature selection, and SMOTE are fitted only within training folds. The recorded configurations alone do not verify that.

For the LLMs, I would test different example sets and record exact prompts, model versions, cost, and latency. Public lyrics may also overlap with material seen during pretraining, which these experiments do not rule out. That limits what I can claim about generalization to unfamiliar songs.

The result I would build on is the improvement from combining audio and lyrics on matched samples. It helped all four emotion groups, even though the size of the gain varied. The next version would focus on understanding the remaining mistakes, especially calm songs, and checking whether those gains hold on new music.

The code, the saved experiment logs, and every number in these tables are in [the repository](https://github.com/aaditg/MusicSentimentAnalysis).
