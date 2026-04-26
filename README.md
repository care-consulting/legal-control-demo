# CARE Legal Control Demo

Demo statica del MVP `CARE Legal Control`, pensata per mostrare:

- `Vista azienda`
- `Vista partner`
- guida assistita
- repository documentale e thread operativi

## File

- `index.html`
- `styles.css`
- `script.js`

## Avvio locale

```bash
python3 -m http.server 4173
```

Poi apri:

- `http://127.0.0.1:4173`

## Deploy su Vercel

Questa cartella e' gia' pronta per hosting statico.

Opzione semplice:

1. crea un repository Git con questi file
2. importa il repository su Vercel
3. framework preset: `Other`
4. root directory: questa cartella
5. build command: vuoto
6. output directory: vuoto

Il file `vercel.json` gestisce il fallback su `index.html`.

## Deploy su Netlify

Anche Netlify puo' pubblicare questa cartella senza build.

1. crea un repository Git con questi file
2. importa il repository su Netlify
3. publish directory: `.`
4. build command: vuoto

Il file `netlify.toml` gestisce il fallback su `index.html`.

## Note

- questo progetto e' una `demo frontend statica`
- non include backend, login reale o persistenza dati
- e' adatto a demo commerciali, partner demo e raccolta feedback
