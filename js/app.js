const state = {
  exposures: [],
  chemicals: [],
  endocrineSystems: [],
  hormones: [],
  receptors: [],
  feedbackSystems: []
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
  pathLimitation: document.querySelector("#pathLimitation"),
  axisPicker: document.querySelector("#axisPicker"),
  axisName: document.querySelector("#axisName"),
  axisPurpose: document.querySelector("#axisPurpose"),
  axisFeedback: document.querySelector("#axisFeedback"),
  axisChain: document.querySelector("#axisChain"),
  axisHormones: document.querySelector("#axisHormones"),
  axisReceptors: document.querySelector("#axisReceptors"),
  axisTargets: document.querySelector("#axisTargets"),
  axisEDC: document.querySelector("#axisEDC"),
  axisSignal: document.querySelector("#axisSignal"),
  axisFeedbackDetail: document.querySelector("#axisFeedbackDetail"),
  axisEvidenceNote: document.querySelector("#axisEvidenceNote"),
  axisSource: document.querySelector("#axisSource"),
  hormoneSelect: document.querySelector("#hormoneSelect"),
  hormoneName: document.querySelector("#hormoneName"),
  hormoneSource: document.querySelector("#hormoneSource"),
  hormoneClass: document.querySelector("#hormoneClass"),
  hormoneReceptor: document.querySelector("#hormoneReceptor"),
  hormoneRole: document.querySelector("#hormoneRole"),
  receptorSelect: document.querySelector("#receptorSelect"),
  receptorName: document.querySelector("#receptorName"),
  receptorType: document.querySelector("#receptorType"),
  receptorLigands: document.querySelector("#receptorLigands"),
  receptorSignaling: document.querySelector("#receptorSignaling"),
  receptorImportance: document.querySelector("#receptorImportance"),
  feedbackSelect: document.querySelector("#feedbackSelect"),
  feedbackName: document.querySelector("#feedbackName"),
  feedbackDescription: document.querySelector("#feedbackDescription"),
  feedbackSequence: document.querySelector("#feedbackSequence")
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


function chips(values) {
  return values.map(value => `<span>${value}</span>`).join("");
}

function renderAxisPicker() {
  els.axisPicker.innerHTML = "";
  state.endocrineSystems.forEach((axis, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "axis-button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.innerHTML = `<strong>${axis.short_name}</strong><small>${axis.name}</small>`;
    button.addEventListener("click", () => {
      document.querySelectorAll(".axis-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderAxis(axis);
    });
    els.axisPicker.appendChild(button);
  });
  if (state.endocrineSystems[0]) renderAxis(state.endocrineSystems[0]);
}

function renderAxis(axis) {
  els.axisName.textContent = axis.name;
  els.axisPurpose.textContent = axis.purpose;
  els.axisFeedback.textContent = axis.feedback;
  els.axisChain.innerHTML = axis.organs.map((organ, index) => `
    <div class="axis-node">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${organ}</strong>
    </div>${index < axis.organs.length - 1 ? '<div class="axis-arrow" aria-hidden="true">→</div>' : ''}
  `).join("");
  els.axisHormones.innerHTML = chips(axis.hormones);
  els.axisReceptors.innerHTML = chips(axis.receptors);
  els.axisTargets.innerHTML = chips(axis.targets);
  els.axisEDC.innerHTML = chips(axis.edc_relevance);
  els.axisSignal.textContent = axis.signal;
  els.axisFeedbackDetail.textContent = axis.feedback_detail;
  els.axisEvidenceNote.textContent = axis.evidence_note;
  els.axisSource.textContent = `${axis.source_label} ↗`;
  els.axisSource.href = axis.source_url;
}

function setupSelect(select, items, labelFn, renderFn) {
  select.innerHTML = "";
  items.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = labelFn(item);
    select.appendChild(option);
  });
  select.addEventListener("change", () => renderFn(items[Number(select.value)]));
  if (items[0]) renderFn(items[0]);
}

function renderHormone(item) {
  els.hormoneName.textContent = item.full_name;
  els.hormoneSource.textContent = item.source;
  els.hormoneClass.textContent = item.class;
  els.hormoneReceptor.textContent = item.primary_receptor;
  els.hormoneRole.textContent = item.role;
}

function renderReceptor(item) {
  els.receptorName.textContent = item.name;
  els.receptorType.textContent = item.type;
  els.receptorLigands.textContent = item.ligands.join(", ");
  els.receptorSignaling.textContent = item.signaling;
  els.receptorImportance.textContent = item.why_it_matters;
}

function renderFeedback(item) {
  els.feedbackName.textContent = `${item.name} — ${item.example}`;
  els.feedbackDescription.textContent = item.description;
  els.feedbackSequence.innerHTML = item.sequence.map(step => `<li>${step}</li>`).join("");
}


async function init() {
  try {
    const [exposures, chemicals, endocrineSystems, hormones, receptors, feedbackSystems] = await Promise.all([
      loadJson("data/exposures.json"),
      loadJson("data/chemicals.json"),
      loadJson("data/endocrine-systems.json"),
      loadJson("data/hormones.json"),
      loadJson("data/receptors.json"),
      loadJson("data/feedback-systems.json")
    ]);

    state.exposures = exposures;
    state.chemicals = chemicals;
    state.endocrineSystems = endocrineSystems;
    state.hormones = hormones;
    state.receptors = receptors;
    state.feedbackSystems = feedbackSystems;

    renderExposureButtons();
    renderChemicals();
    renderAxisPicker();
    setupSelect(els.hormoneSelect, state.hormones, item => item.name, renderHormone);
    setupSelect(els.receptorSelect, state.receptors, item => item.name, renderReceptor);
    setupSelect(els.feedbackSelect, state.feedbackSystems, item => item.name, renderFeedback);
  } catch (error) {
    console.error(error);
    els.sourcePicker.innerHTML = '<p class="error-message">Exposure data could not be loaded.</p>';
    els.chemicalGrid.innerHTML = '<p class="error-message">Chemical Atlas data could not be loaded.</p>';
  }
}

init();
