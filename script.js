const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");
const panelLinks = document.querySelectorAll("[data-panel-target]");
const landingScreen = document.getElementById("landing-screen");
const appShell = document.getElementById("app-shell");
const openCompanyDemoButton = document.getElementById("open-company-demo");
const openPartnerDemoButton = document.getElementById("open-partner-demo");
const entryButtons = document.querySelectorAll(".entry-button");

const sidebarEyebrow = document.getElementById("sidebar-eyebrow");
const sidebarTitle = document.getElementById("sidebar-title");
const sidebarText = document.getElementById("sidebar-text");
const workspaceEyebrow = document.getElementById("workspace-eyebrow");
const workspaceTitle = document.getElementById("workspace-title");
const repositoryTitle = document.getElementById("repository-title");
const repositoryBadge = document.getElementById("repository-badge");
const repositoryCopy = document.getElementById("repository-copy");

const form = document.getElementById("contract-form");
const resetButton = document.getElementById("reset-contract");
const draftOutput = document.getElementById("draft-output");
const draftTitle = document.getElementById("draft-title");
const draftStatus = document.getElementById("draft-status");
const contractsTableBody = document.getElementById("contracts-table-body");

const setText = (element, value) => {
  if (element) {
    element.textContent = value;
  }
};

const openPanel = (panelId) => {
  navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
};

const openPanelFromElement = (element) => {
  const panelId = element.dataset.panelTarget;
  const scrollTarget = element.dataset.scrollTarget;

  if (!panelId) return;

  openPanel(panelId);

  window.requestAnimationFrame(() => {
    if (scrollTarget) {
      const target = document.getElementById(scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

const showWorkspace = () => {
  if (landingScreen) {
    landingScreen.style.display = "none";
  }
  if (appShell) {
    appShell.classList.remove("app-shell-hidden");
  }
};

const applyMode = (mode) => {
  document.querySelectorAll(".nav-company").forEach((item) => {
    item.classList.toggle("hidden", mode !== "company");
  });

  document.querySelectorAll(".nav-partner").forEach((item) => {
    item.classList.toggle("hidden", mode !== "partner");
  });

  if (mode === "partner") {
    setText(sidebarEyebrow, "Vista partner");
    setText(sidebarTitle, "Dashboard, priorità e scheda cliente");
    setText(sidebarText, "Il partner parte da una vista sintetica, poi entra nella scheda del cliente e lavora sui singoli fascicoli.");
    setText(workspaceEyebrow, "Partner workspace");
    setText(workspaceTitle, "Studio partner | Portafoglio aziende");
    setText(repositoryTitle, "Priorità cross-cliente");
    setText(repositoryBadge, "Riepilogo");
    setText(repositoryCopy, "Questo tab aggrega le attività da fare e i messaggi che aspettano risposta del cliente.");
    openPanel("partner");
    return;
  }

  setText(sidebarEyebrow, "Vista azienda");
  setText(sidebarTitle, "Contratti, sofferenze, debitori e messaggi");
  setText(sidebarText, "L’azienda lavora per fascicoli. Dentro ogni fascicolo trova stato, documenti e conversazione con il partner.");
  setText(workspaceEyebrow, "Company workspace");
  setText(workspaceTitle, "CARE Manufacturing S.r.l.");
  setText(repositoryTitle, "Riepilogo messaggi");
  setText(repositoryBadge, "Condiviso");
  setText(repositoryCopy, "I messaggi restano dentro la singola pratica. Qui vedi solo quelli che aspettano risposta.");
  openPanel("overview");
};

const enterMode = (mode) => {
  applyMode(mode);
  showWorkspace();
};

const defaultDraft = () => `Bozza Sofia pronta

Tipo: Contratto di servizi
Controparte: Beta Logistics S.r.l.
Durata: 24 mesi
Foro competente: Milano

Oggetto
Servizi logistici e gestione trasporto merci sul territorio nazionale.

Stato
Bozza

Prossimo step
Invio al partner per revisione.`;

const renderDraft = (formData) => {
  const clauses = [];

  if (formData.get("autoRenew")) clauses.push("- Rinnovo automatico");
  if (formData.get("penalties")) clauses.push("- Penali per ritardo");
  if (formData.get("confidentiality")) clauses.push("- Riservatezza rafforzata");
  if (formData.get("termination")) clauses.push("- Recesso anticipato");

  const text = `Bozza Sofia pronta

Tipo: ${formData.get("contractType")}
Controparte: ${formData.get("counterparty")}
Durata: ${formData.get("duration")}
Foro competente: ${formData.get("jurisdiction")}

Oggetto
${formData.get("scope")}

Clausole
${clauses.join("\n")}

Stato
Bozza

Prossimo step
Invio al partner per revisione.`;

  draftOutput.textContent = text;
  setText(draftTitle, `${formData.get("contractType")} ${formData.get("counterparty")}`);
  setText(draftStatus, "Bozza");

  if (contractsTableBody) {
    const firstRow = contractsTableBody.querySelector("tr");
    if (firstRow) {
      firstRow.classList.remove("is-selected");
    }

    const newRow = document.createElement("tr");
    newRow.className = "is-selected";
    newRow.innerHTML = `
      <td>${formData.get("contractType")} ${formData.get("counterparty")}</td>
      <td>${formData.get("counterparty")}</td>
      <td><span class="tag">Bozza</span></td>
      <td>Oggi</td>
      <td>0</td>
    `;
    contractsTableBody.prepend(newRow);
  }
};

if (form && draftOutput) {
  draftOutput.textContent = defaultDraft();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    renderDraft(formData);
  });
}

if (resetButton && form && draftOutput) {
  resetButton.addEventListener("click", () => {
    form.reset();
    form.elements.contractType.value = "Servizi";
    form.elements.counterparty.value = "Beta Logistics S.r.l.";
    form.elements.duration.value = "24 mesi";
    form.elements.jurisdiction.value = "Milano";
    form.elements.scope.value = "Servizi logistici e gestione trasporto merci sul territorio nazionale con SLA di consegna e obblighi di riservatezza commerciale.";
    form.elements.autoRenew.checked = true;
    form.elements.penalties.checked = true;
    form.elements.confidentiality.checked = true;
    form.elements.termination.checked = true;
    draftOutput.textContent = defaultDraft();
    setText(draftTitle, "Bozza");
    setText(draftStatus, "Bozza");
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    openPanel(item.dataset.panel);
  });
});

panelLinks.forEach((link) => {
  link.addEventListener("click", () => {
    openPanelFromElement(link);
  });
});

document.addEventListener("click", (event) => {
  const row = event.target.closest(".clickable-row");
  if (!row) return;
  openPanelFromElement(row);
});

if (openCompanyDemoButton) {
  openCompanyDemoButton.addEventListener("click", () => enterMode("company"));
}

if (openPartnerDemoButton) {
  openPartnerDemoButton.addEventListener("click", () => enterMode("partner"));
}

entryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    enterMode(button.dataset.mode);
  });
});
