# Come utilizzare UniTeam

Una volta aperto il progetto, assicurarsi di essere dentro la cartella `/App`, da qui eseguire il comando `npm install` (o `pnpm install` o `yarn`) per installare le dipendenze.

Una volta terminata questa operazione eseguire uno dei seguenti comandi per accendere il server locale:

```bash
npm run dev

# o accendi il server e apri l'app in una nuova scheda del browser
npm run dev -- --open
```

# Come eseguire i test

Sempre dalla cartella `/App` eseguire i seguenti comandi:

Test di Unità

```bash
# per eseguire i test di unità con log su console
npx vitest

# per eseguire i test di unità con log su pagina web e/o con visualizzazione della copertura
npx vitest (--ui) (--coverage)

```

Test di Integrazione

```bash
# per eseguire i test di integrazione con log su console
npx playwright test

# per eseguire i test di integrazione con log su pagina web
npx playwright test --reporter=html
```
