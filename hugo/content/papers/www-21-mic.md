---
section: papers
tags:
- streaming
- determinantal point process
code: https://gitlab.com/paul.liu.ubc/streaming-mic-dpp
figure: www-2021-mic.png
title: "Diversity on the Go! Streaming Determinantal Point Processes under a Maximum Induced Cardinality Objective"
abstract: "Over the past decade, Determinantal Point Processes (DPPs) have proven to be a mathematically elegant framework for modeling diversity. Given a set of items $N$, DPPs define a probability distribution over subsets of $N$, with sets of larger diversity having greater probability. Recently, DPPs have achieved success in the domain of recommendation systems, as a method to enforce diversity of recommendations in addition to relevance. 

In large-scale recommendation applications however, the input typically comes in the form of a stream too large to fit into main memory. However, the natural greedy algorithm for DPP-based recommendations is memory intensive, and cannot be used in a streaming setting. 

In this work, we give the first streaming algorithm for optimizing DPPs under the Maximum Induced Cardinality (MIC) objective of Gillenwater et al. As noted by Gillenwater et al., the MIC objective is better suited towards recommendation systems than the classically used maximum a posteriori (MAP) DPP objective. In the insertion-only streaming model, our algorithm runs in $\\tilde{O}(k^2)$ time per update and uses $\\tilde{O}(k)$ memory, where $k$ is the number of diverse items to be selected. In the sliding window streaming model, our algorithm runs in $\\tilde{O}(\\sqrt{n}k^2)$ time per update and $\\tilde{O}(\\sqrt{n}k)$ memory where $n$ is the size of the sliding window. The approximation guarantees are simple, and depend on the largest and the $k$-th largest eigenvalues of the kernel matrix used to model diversity. We show that in practice, the algorithm often achieves close to optimal results, and meets the memory and latency requirements of production systems. Furthermore, the algorithm works well even in a non-streaming setting, and runs in a fraction of time compared to the classic greedy algorithm."
file: www-2021-mic.pdf
date: 2021-02-14
venue: WWW
authors: Paul Liu, Akshay Soni, Eun Yong Kang, Yajun Wang, Mehul Parsana
---
