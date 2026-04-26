const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");
const form = document.getElementById("contract-form");
const draftOutput = document.getElementById("draft-output");
const resetButton = document.getElementById("reset-contract");
const introModal = document.getElementById("intro-modal");
const enterAppButton = document.getElementById("enter-app");
const panelLinks = document.querySelectorAll("[data-panel-target]");
const landingScreen = document.getElementById("landing-screen");
const appShell = document.getElementById("app-shell");
const openCompanyDemoButton = document.getElementById("open-company-demo");
const openPartnerDemoButton = document.getElementById("open-partner-demo");
const openWorkspaceButton = document.getElementById("open-workspace");
const startTourButton = document.getElementById("start-tour");
const tourOverlay = document.getElementById("tour-overlay");
const tourSpotlight = document.getElementById("tour-spotlight");
const tourPopover = document.getElementById("tour-popover");
const tourTitle = document.getElementById("tour-title");
const tourText = document.getElementById("tour-text");
const tourProgress = document.getElementById("tour-progress");
const tourPrev = document.getElementById("tour-prev");
const tourNext = document.getElementById("tour-next");
const tourClose = document.getElementById("tour-close");
const entryButtons = document.querySelectorAll(".entry-button");
const introTitle = document.getElementById("intro-title");
const introText = document.getElementById("intro-text");
const sidebarEyebrow = document.getElementById("sidebar-eyebrow");
const sidebarTitle = document.getElementById("sidebar-title");
const sidebarText = document.getElementById("sidebar-text");
const workspaceEyebrow = document.getElementById("workspace-eyebrow");
const workspaceTitle = document.getElementById("workspace-title");
const repositoryTitle = document.getElementById("repository-title");
const repositoryBadge = document.getElementById("repository-badge");
const repositoryCopy = document.getElementById("repository-copy");

const companyTourSteps = [
  {
    panel: "overview",
    anchor: "overview-hero",
    title: "1. Visione generale",
    text: "Qui stai vedendo il workspace aziendale: il punto non e' fare consulenza, ma dare controllo operativo su contratti, scadenze, adempimenti e rischi ricorrenti."
  },
  {
    panel: "overview",
    anchor: "overview-alerts",
    title: "2. Alert e priorita'",
    text: "In questa schermata l'azienda capisce subito cosa richiede attenzione: rinnovi taciti, documenti mancanti e clausole sbilanciate. Il valore e' la leggibilita' immediata."
  },
  {
    panel: "deadlines",
    anchor: "deadlines-timeline",
    title: "3. Scadenze e rinnovi",
    text: "Qui l'azienda presidia date che di solito si perdono: rinnovi taciti, adempimenti privacy, delibere e lettere di incarico. Per un avvocato questo e' un punto di accesso commerciale molto forte."
  },
  {
    panel: "compliance",
    anchor: "compliance-list",
    title: "4. Compliance operativa",
    text: "Questa sezione rende gestibili gli adempimenti ricorrenti con checklist semplici. L'azienda resta autonoma sul lavoro standard e capisce subito dove manca qualcosa."
  },
  {
    panel: "contract-detail",
    anchor: "contract-detail-card",
    title: "5. Scheda contratto",
    text: "Qui l'utente entra nel dettaglio di un contratto reale: stato, date chiave, clausole critiche, allegati e prossimo step. Questo rende il rischio operativo leggibile anche a chi non e' legale."
  },
  {
    panel: "contracts",
    anchor: "contracts-builder",
    title: "6. Creazione guidata",
    text: "Questo modulo serve a produrre una prima bozza standard in autonomia. L'azienda compila pochi campi, genera il documento e chiede revisione solo se emergono eccezioni."
  },
  {
    panel: "repository",
    anchor: "repository-thread",
    title: "7. Repository e thread operativi",
    text: "Qui l'azienda vede il repository documentale e le comunicazioni operative sul task: messaggi, allegati, stato della richiesta e storico completo in un unico punto."
  },
  {
    panel: "risks",
    anchor: "risks-grid",
    title: "8. Escalation selettiva",
    text: "Qui si chiude la logica del prodotto: il sistema non sostituisce il professionista, ma porta al professionista solo i casi davvero critici o negozialmente sensibili."
  },
  {
    panel: "reports",
    anchor: "reports-summary",
    title: "9. Report executive",
    text: "Il report finale rende il prodotto leggibile anche per CEO e CFO. Questo aiuta la vendita interna nell'azienda e rende il partner piu' rilevante nel rapporto con il cliente."
  },
  {
    panel: "overview",
    anchor: "company-comms",
    title: "10. Comunicazioni e documenti",
    text: "Questo blocco spiega che la piattaforma sostituisce le email sparse con un canale tracciato, collega i documenti a una repository configurabile e gestisce notifiche via mail, in-app e WhatsApp."
  }
];

const partnerTourSteps = [
  {
    panel: "partner",
    anchor: "partner-workspace",
    title: "1. Workspace aggregata",
    text: "Questa e' la scrivania del partner: comunicazioni in ingresso, urgenze, priorita' e attivita' aperte su tutte le aziende in una vista unica."
  },
  {
    panel: "partner",
    anchor: "partner-projects",
    title: "2. Aziende come progetti",
    text: "Ogni azienda e' un progetto selezionabile. Da qui il partner entra nel contesto della singola azienda e vede tutto cio' che la riguarda."
  },
  {
    panel: "repository",
    anchor: "repository-thread",
    title: "3. Repository per azienda selezionata",
    text: "Qui il partner lavora sul repository della singola azienda scelta nel portafoglio: thread, allegati, stato della comunicazione, repository documentale e storico completamente tracciato."
  },
  {
    panel: "risks",
    anchor: "risks-grid",
    title: "4. Escalation utili",
    text: "Qui emergono i casi su cui il professionista entra davvero: penali, responsabilita', rinnovi taciti e negoziazioni fuori standard."
  },
  {
    panel: "contract-detail",
    anchor: "contract-detail-card",
    title: "5. Caso attivo",
    text: "Il partner entra nella scheda contratto per leggere rischio, storia, allegati e prossimo passo. Questo evita analisi disperse via mail o telefono."
  },
  {
    panel: "reports",
    anchor: "reports-summary",
    title: "6. Report verso il cliente",
    text: "Il report executive aiuta il professionista a parlare con CEO e CFO in modo ordinato, trasformando il lavoro legale in presidio continuativo."
  },
  {
    panel: "partner",
    anchor: "partner-comms",
    title: "7. Comunicazioni partner-cliente",
    text: "Qui il partner vede il valore operativo del workspace condiviso: niente email sparse, repository documentale configurabile, notifiche multicanale e conversazioni tutte registrate e tracciate."
  }
];

let currentMode = "company";
let activeTourSteps = companyTourSteps;

let currentTourStep = 0;

const defaultDraft = () => `Bozza pronta per l’uso

Tipo: Contratto di servizi
Controparte: Beta Logistics S.r.l.
Durata: 24 mesi
Foro competente: Milano

Oggetto
Servizi logistici e gestione trasporto merci sul territorio nazionale con SLA di consegna e obblighi di riservatezza commerciale.

Clausole incluse
- Rinnovo automatico annuale salvo disdetta.
- Penali per ritardi superiori a 10 giorni.
- Obbligo di riservatezza rafforzata su dati tecnici e commerciali.
- Recesso anticipato con preavviso di 30 giorni.

Azioni suggerite
1. Esportare in Word/PDF.
2. Inviare ad acquisti e operations per validazione.
3. Richiedere revisione specialistica solo se la controparte negozia clausole critiche.`;

const renderDraft = (formData) => {
  const clauses = [];

  if (formData.get("autoRenew")) {
    clauses.push("Rinnovo automatico salvo disdetta entro 30 giorni.");
  }
  if (formData.get("penalties")) {
    clauses.push("Penali applicabili in caso di ritardo o inadempimento.");
  }
  if (formData.get("confidentiality")) {
    clauses.push("Obblighi di riservatezza estesi a dati, documenti e know-how.");
  }
  if (formData.get("termination")) {
    clauses.push("Recesso anticipato con preavviso concordato.");
  }

  draftOutput.textContent = `Bozza pronta per l’uso

Tipo: ${formData.get("contractType")}
Controparte: ${formData.get("counterparty")}
Durata: ${formData.get("duration")}
Foro competente: ${formData.get("jurisdiction")}

Oggetto
${formData.get("scope")}

Clausole incluse
${clauses.map((clause) => `- ${clause}`).join("\n")}

Azioni suggerite
1. Salva la bozza in archivio.
2. Condividila con amministrazione o acquisti.
3. Attiva consulenza solo se servono modifiche fuori standard.`;
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    openPanel(item.dataset.panel);
  });
});

const openPanel = (panelId) => {
  navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
};

const applyMode = (mode) => {
  currentMode = mode;
  activeTourSteps = mode === "partner" ? partnerTourSteps : companyTourSteps;

  document.querySelectorAll(".nav-company").forEach((item) => {
    item.classList.toggle("hidden", mode !== "company");
  });
  document.querySelectorAll(".nav-partner").forEach((item) => {
    item.classList.toggle("hidden", mode !== "partner");
  });

  if (mode === "partner") {
    introTitle.textContent = "La vista partner per presidiare aziende e casi qualificati.";
    introText.textContent =
      "Questa demo mostra come un avvocato puo' usare la piattaforma per seguire piu' clienti, vedere solo i casi che contano e intervenire dove genera valore.";
    sidebarEyebrow.textContent = "Vista partner";
    sidebarTitle.textContent = "Portafoglio clienti ed escalation qualificate";
    sidebarText.textContent =
      "Il professionista presidia piu' aziende, riceve richieste strutturate e interviene solo su revisione, negoziazione e casi fuori standard.";
    workspaceEyebrow.textContent = "Partner workspace";
    workspaceTitle.textContent = "Studio partner | Portafoglio aziende";
    repositoryTitle.textContent = "Repository della singola azienda: documenti, thread e stati tracciati";
    repositoryBadge.textContent = "Per azienda";
    repositoryCopy.textContent =
      "In vista partner il repository viene letto per la singola azienda selezionata nel portafoglio. Qui il professionista segue documenti, messaggi, allegati, stati e storico completo senza passare da email sparse.";
    openPanel("partner");
  } else {
    introTitle.textContent = "Il layer operativo per governare il lavoro legale ricorrente.";
    introText.textContent =
      "Contratti, scadenze, adempimenti e rischi in un unico ambiente. L’azienda presidia le attività standard in autonomia e scala solo i casi che richiedono intervento specialistico.";
    sidebarEyebrow.textContent = "Posizionamento";
    sidebarTitle.textContent = "Autonomia operativa, consulenza solo per eccezioni";
    sidebarText.textContent =
      "La piattaforma governa contratti, scadenze e adempimenti ricorrenti. Il supporto specialistico si attiva solo nei casi fuori standard.";
    workspaceEyebrow.textContent = "Company workspace";
    workspaceTitle.textContent = "CARE Manufacturing S.r.l.";
    repositoryTitle.textContent = "Documenti, messaggi e stati in un unico workspace tracciato";
    repositoryBadge.textContent = "Core workflow";
    repositoryCopy.textContent =
      "Qui l’azienda gestisce fascicoli, thread, allegati e stati di lavorazione in un unico spazio operativo. Tutto resta tracciato e sostituisce lo scambio dispersivo via mail.";
    openPanel("overview");
  }
};

panelLinks.forEach((link) => {
  link.addEventListener("click", () => {
    openPanel(link.dataset.panelTarget);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  renderDraft(formData);
});

resetButton.addEventListener("click", () => {
  form.reset();
  form.elements.contractType.value = "Servizi";
  form.elements.counterparty.value = "Beta Logistics S.r.l.";
  form.elements.duration.value = "24 mesi";
  form.elements.jurisdiction.value = "Milano";
  form.elements.scope.value =
    "Servizi logistici e gestione trasporto merci sul territorio nazionale con SLA di consegna e obblighi di riservatezza commerciale.";
  form.elements.autoRenew.checked = true;
  form.elements.penalties.checked = true;
  form.elements.confidentiality.checked = true;
  form.elements.termination.checked = true;
  draftOutput.textContent = defaultDraft();
});

draftOutput.textContent = defaultDraft();

const showWorkspace = () => {
  landingScreen.style.display = "none";
  appShell.classList.remove("app-shell-hidden");
};

const positionTourElements = (anchorName) => {
  const anchor = document.querySelector(`[data-tour-anchor="${anchorName}"]`);
  if (!anchor) return;

  const rect = anchor.getBoundingClientRect();
  const padding = 10;
  tourSpotlight.style.top = `${Math.max(12, rect.top - padding)}px`;
  tourSpotlight.style.left = `${Math.max(12, rect.left - padding)}px`;
  tourSpotlight.style.width = `${rect.width + padding * 2}px`;
  tourSpotlight.style.height = `${rect.height + padding * 2}px`;

  const margin = 16;
  const gap = 20;
  const popoverWidth = Math.min(380, window.innerWidth - margin * 2);
  const estimatedHeight = 320;

  const positions = [
    { left: rect.right + gap, top: rect.top, placement: "right" },
    { left: rect.left - popoverWidth - gap, top: rect.top, placement: "left" },
    { left: rect.left, top: rect.bottom + gap, placement: "bottom" },
    { left: rect.left, top: rect.top - estimatedHeight - gap, placement: "top" }
  ];

  const fitsHorizontally = (left) => left >= margin && left + popoverWidth <= window.innerWidth - margin;
  const fitsVertically = (top, height = estimatedHeight) =>
    top >= margin && top + height <= window.innerHeight - margin;

  let chosen =
    positions.find((pos) => fitsHorizontally(pos.left) && fitsVertically(pos.top)) ||
    positions.find((pos) => fitsHorizontally(pos.left)) ||
    positions.find((pos) => fitsVertically(pos.top)) ||
    positions[0];

  let left = chosen.left;
  let top = chosen.top;

  if (chosen.placement === "bottom" || chosen.placement === "top") {
    left = Math.min(Math.max(left, margin), window.innerWidth - popoverWidth - margin);
  }

  left = Math.min(Math.max(left, margin), window.innerWidth - popoverWidth - margin);
  top = Math.max(top, margin);

  tourPopover.style.left = `${left}px`;
  tourPopover.style.top = `${top}px`;

  requestAnimationFrame(() => {
    const popoverRect = tourPopover.getBoundingClientRect();
    let adjustedLeft = left;
    let adjustedTop = top;

    if (popoverRect.right > window.innerWidth - margin) {
      adjustedLeft -= popoverRect.right - (window.innerWidth - margin);
    }
    if (popoverRect.left < margin) {
      adjustedLeft = margin;
    }
    if (popoverRect.bottom > window.innerHeight - margin) {
      adjustedTop -= popoverRect.bottom - (window.innerHeight - margin);
    }
    if (popoverRect.top < margin) {
      adjustedTop = margin;
    }

    const overlapsHorizontally =
      adjustedLeft < rect.right + gap && adjustedLeft + popoverRect.width > rect.left - gap;
    const overlapsVertically =
      adjustedTop < rect.bottom + gap && adjustedTop + popoverRect.height > rect.top - gap;

    if (overlapsHorizontally && overlapsVertically) {
      const belowTop = rect.bottom + gap;
      const aboveTop = rect.top - popoverRect.height - gap;

      if (belowTop + popoverRect.height <= window.innerHeight - margin) {
        adjustedTop = belowTop;
      } else if (aboveTop >= margin) {
        adjustedTop = aboveTop;
      } else {
        adjustedLeft = Math.max(
          margin,
          Math.min(window.innerWidth - popoverRect.width - margin, rect.left - popoverRect.width - gap)
        );
      }
    }

    tourPopover.style.left = `${adjustedLeft}px`;
    tourPopover.style.top = `${adjustedTop}px`;
  });
};

const renderTourStep = () => {
  const step = activeTourSteps[currentTourStep];
  openPanel(step.panel);
  tourOverlay.classList.remove("hidden");
  tourTitle.textContent = step.title;
  tourText.textContent = step.text;
  tourProgress.textContent = `${currentTourStep + 1} / ${activeTourSteps.length}`;
  tourPrev.disabled = currentTourStep === 0;
  tourNext.textContent = currentTourStep === activeTourSteps.length - 1 ? "Fine" : "Avanti";
  const anchor = document.querySelector(`[data-tour-anchor="${step.anchor}"]`);
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => positionTourElements(step.anchor), 260);
  }
};

const enterMode = (mode) => {
  applyMode(mode);
  showWorkspace();
};

openCompanyDemoButton.addEventListener("click", () => {
  applyMode("company");
  showWorkspace();
});

openPartnerDemoButton.addEventListener("click", () => {
  applyMode("partner");
  showWorkspace();
});

openWorkspaceButton.addEventListener("click", () => {
  applyMode("company");
  showWorkspace();
});

entryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyMode(button.dataset.mode);
    showWorkspace();
  });
});

enterAppButton.addEventListener("click", () => {
  introModal.classList.add("hidden");
});

startTourButton.addEventListener("click", () => {
  currentTourStep = 0;
  renderTourStep();
});

tourPrev.addEventListener("click", () => {
  if (currentTourStep === 0) return;
  currentTourStep -= 1;
  renderTourStep();
});

tourNext.addEventListener("click", () => {
  if (currentTourStep === activeTourSteps.length - 1) {
    tourOverlay.classList.add("hidden");
    return;
  }
  currentTourStep += 1;
  renderTourStep();
});

tourClose.addEventListener("click", () => {
  tourOverlay.classList.add("hidden");
});

window.addEventListener("resize", () => {
  if (tourOverlay.classList.contains("hidden")) return;
  positionTourElements(activeTourSteps[currentTourStep].anchor);
});

window.addEventListener("scroll", () => {
  if (tourOverlay.classList.contains("hidden")) return;
  positionTourElements(activeTourSteps[currentTourStep].anchor);
});
