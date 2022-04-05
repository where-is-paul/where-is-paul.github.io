---
section: papers
tags:
- streaming
- random order
- submodular
title: Cardinality constrained submodular maximization for random streams
abstract: "We consider the problem of maximizing submodular functions in single-pass streaming and secretaries-with-shortlists models, both with random arrival order. For cardinality constrained monotone functions, Agrawal, Shadravan, and Stein gave a single-pass $(1-1/e-\\varepsilon)$-approximation algorithm using only linear memory, but their exponential dependence on $\\varepsilon$ makes it impractical even for $\\varepsilon=0.1$. We simplify both the algorithm and the analysis, obtaining an exponential improvement in the $\\varepsilon$-dependence (in particular, $O(k/\\varepsilon)$ memory). Extending these techniques, we also give a simple $(1/e-\\varepsilon)$-approximation for non-monotone functions in $O(k/\\varepsilon)$ memory. For the monotone case, we also give a corresponding unconditional hardness barrier of $1-1/e+\\varepsilon$ for single-pass algorithms in randomly ordered streams, even assuming unlimited computation. 

Finally, we show that the algorithms are simple to implement and work well on real world datasets."
figure: neurips-21.png
file: neurips-2021.pdf
date: 2021-12-01
venue: NeurIPS
code: https://github.com/where-is-paul/submodular-streaming
slides: neurips-2021-slides.pdf
poster: neurips-2021-poster.pdf
authors: Paul Liu, Aviad Rubinstein, Jan Vondrák, Junyao Zhao
---
