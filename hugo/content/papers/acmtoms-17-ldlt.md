---
section: papers
tags:
- numerical analysis
title: "SYM-ILDL: Incomplete $LDL^T$ Factorization of Symmetric Indefinite and Skew-Symmetric Matrices"
abstract: "SYM-ILDL is a numerical software package that computes incomplete $LDL^T$ (or `ILDL') factorizations of symmetric indefinite and real skew-symmetric matrices. The core of the algorithm is a Crout variant of incomplete LU (ILU), originally introduced and implemented for symmetric matrices by [Li and Saad, Crout versions of ILU factorization with pivoting for sparse symmetric matrices, Transactions on Numerical Analysis 20, pp. 75--85, 2005]. Our code is economical in terms of storage and it deals with real skew-symmetric matrices as well, in addition to symmetric ones. The package is written in C++ and it is templated, open source, and includes a MATLAB interface. The code includes built-in RCM and AMD reordering, two equilibration strategies, threshold Bunch-Kaufman pivoting and rook pivoting, as well as a wrapper to MC64, a popular matching based equilibration and reordering algorithm. We also include two built-in iterative solvers: SQMR preconditioned with ILDL, or MINRES preconditioned with a symmetric positive definite preconditioner based on the ILDL factorization."
figure: matrix-coloured.png
file: https://arxiv.org/pdf/1505.07589.pdf
code: https://github.com/where-is-paul/matrix-factor
date: 2017-01-01
venue: ACM Trans. Math. Softw.
authors: Chen Greif, Paul Liu, Shiwen He
---
