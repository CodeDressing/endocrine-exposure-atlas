const state = {
  exposures: [],
  chemicals: []
};

const els = {
  sourcePicker: document.querySelector("#sourcePicker"),
  chemicalGrid: document.querySelector("#chemicalGrid"),
  pathwayContext: document.querySelector("#pathwayContext"),
  pathwayEvidence: document.querySelector("#pathwayEvidence"),
  pathSource: document.querySelector("#pathSource"),
  pathChemical: document.querySelector("#pathChemical"),
  pathRoute: document.querySelector("#pathRoute"),
  pathSystem: document.querySelector("#pathSystem"),
  pathSummary: document.querySelector("#pathSummary"),
  pathLimitation: document.querySelector("#pathLimitation")
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}

function renderExposureButtons() {
  els.sourcePicker.innerHTML = "";

  state.exposures.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "source-button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.dataset.exposureId = item.id;
    button.innerHTML = `<strong>${item.title}</strong><small>${item.subtitle}</small>`;

    button.addEventListener("click", () => {
      document.querySelectorAll(".source-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderPathway(item);
    });

    els.sourcePicker.appendChild(button);
  });

  if (state.exposures[0]) renderPathway(state.exposures[0]);
}

function renderPathway(item) {
  els.pathwayContext.textContent = item.title;
  els.pathwayEvidence.textContent = item.evidenceLabel;
  els.pathSource.textContent = item.source;
  els.pathChemical.textContent = item.chemical;
  els.pathRoute.textContent = item.route;
  els.pathSystem.textContent = item.system;
  els.pathSummary.textContent = item.summary;
  els.pathLimitation.textContent = item.limitation;
}

function renderChemicals() {
  els.chemicalGrid.innerHTML = "";

  state.chemicals.forEach(item => {
    const card = document.createElement("article");
    card.className = "chemical-card";

    const tags = item.tags.map(tag => `<span>${tag}</span>`).join("");

    card.innerHTML = `
      <div class="card-top">
        <h3>${item.name}</h3>
        <span class="evidence-badge">${item.status}</span>
      </div>
      <p>${item.summary}</p>
      <div class="meta" aria-label="Research tags">${tags}</div>
    `;

    els.chemicalGrid.appendChild(card);
  });
}

async function init() {
  try {
    const [exposures, chemicals] = await Promise.all([
      loadJson("data/exposures.json"),
      loadJson("data/chemicals.json")
    ]);

    state.exposures = exposures;
    state.chemicals = chemicals;

    renderExposureButtons();
    renderChemicals();
  } catch (error) {
    console.error(error);
    els.sourcePicker.innerHTML = '<p class="error-message">Exposure data could not be loaded.</p>';
    els.chemicalGrid.innerHTML = '<p class="error-message">Chemical Atlas data could not be loaded.</p>';
  }
}

init();
