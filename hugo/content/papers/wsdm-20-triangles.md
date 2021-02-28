---
section: papers
tags:
- graph algorithms
- big data
title: Retrieving Top Weighted Triangles in Graphs
abstract: "Pattern counting in graphs is a fundamental primitive for many network analysis tasks, and a number of methods have been developed
for scaling subgraph counting to large graphs. Many real-world
networks carry a natural notion of strength of connection between
nodes, which are often modeled by a weighted graph, but existing scalable graph algorithms for pattern mining are designed for
unweighted graphs. Here, we develop a suite of deterministic and
random sampling algorithms that enable the fast discovery of the 3-
cliques (triangles) with the largest weight in a graph, where weight
is measured by a generalized mean of a triangle’s edges. For example, one of our proposed algorithms can find the top-1000 weighted
triangles of a weighted graph with billions of edges in thirty seconds on a commodity server, which is orders of magnitude faster
than existing “fast” enumeration schemes. Our methods thus open
the door towards scalable pattern mining in weighted graphs."
figure: topk.png
file: wsdm2020.pdf
date: 2020-01-01
venue: WSDM, SIAMNS
code: https://github.com/raunakkmr/Retrieving-top-weighted-triangles-in-graphs
slides: wsdm2020-slides.pdf
poster: wsdm2020-poster.pdf
authors: Raunak Kumar*, Paul Liu*, Moses Charikar, Austin Benson
---
