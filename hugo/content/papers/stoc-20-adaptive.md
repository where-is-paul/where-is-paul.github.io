---
section: papers
tags:
- submodular optimization
- adaptive model
title: A Polynomial Lower Bound on Adaptive Complexity of Submodular Maximization
abstract: "Informally, the adaptive model measures complexity by the longest chain of sequentially dependent calls to $f$ in the algorithm. The focus of the adaptive model is to reward highly parallel algorithms, and penalize algorithms that have high 'sequentiality'. Much work has been devoted recently to creating efficient algorithms for submodular optimization (SUBMOD) in the adaptive model. We focus instead on the lower bound, and provide the first lower bound showing that any approximation for monotone SUBMOD takes polynomially many rounds as the approximation factor approaches $1-1/e$.

For the unconstrained non-monotone maximization problem, we
show a positive result. For every instance, and every $\\delta> 0$, either
we obtain a $(1/2-\\delta)$-approximation in 1 round, or a $(1/2 + \\Omega(\\delta^2))$-approximation in $O(1/\\delta^2)$ rounds. Unlike the cardinality-constrained case, there cannot be an instance
where (i) it is impossible to achieve an approximation factor better
than $1/2$ regardless of the number of rounds, and (ii) it takes $r$
rounds to achieve a factor of $1/2 − O(1/r)$."
figure: stoc-2020.png
file: stoc-2020.pdf
slides: stoc-2020-slides.pdf
video: https://www.youtube.com/watch?v=rXc2a36OznU
date: 2020-01-01
venue: STOC
authors: Wenzheng Li, Paul Liu, Jan Vondrák
---
