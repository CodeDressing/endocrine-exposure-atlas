# Endocrine Exposure Atlas

An interactive educational atlas of endocrine-active chemicals, everyday exposure pathways, biological mechanisms, and scientific evidence.

## Mission

The project is designed to help students and families follow the chain from:

**source → chemical → exposure route → biological interaction → endocrine system → evidence quality**

The Atlas deliberately separates exposure, biological activity, association, and demonstrated causal effect. It also avoids treating large chemical classes as if every compound has identical toxicological properties.

## Architecture

```text
endocrine-exposure-atlas/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   ├── chemicals.json
│   ├── exposures.json
│   ├── endocrine-systems.json
│   └── evidence.json
└── assets/
    ├── images/
    └── icons/
```

The site is intentionally static for Version 0.1: plain HTML, CSS, JavaScript, and JSON data. This keeps deployment fast and makes the scientific content separable from presentation logic.

## Evidence standard

Future substantive claims should carry:

- evidence class
- study type
- species or population
- year
- citation ID
- source link
- limitations
- replication status
- reviewer status

## Foundational public sources

- U.S. National Institute of Environmental Health Sciences (NIEHS): Endocrine Disruptors
- U.S. Environmental Protection Agency (EPA): PFAS Explained
- U.S. Food and Drug Administration (FDA): PFAS in Food

## Status

**Version 0.1 — Atlas architecture and functional homepage.**

Next major phase: endocrine-system knowledge objects and deeper chemical profiles.

## License

No license has been granted at this stage. The repository is public for transparency, but reuse rights have not yet been selected.
