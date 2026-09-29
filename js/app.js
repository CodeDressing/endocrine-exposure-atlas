const state = {
  exposures: [],
  chemicals: [],
  endocrineSystems: [],
  hormones: [],
  receptors: [],
  feedbackSystems: [],
  compounds: [],
  pathways: [],
  activePathway: null,
  evidenceMeta: null,
  evidenceRecords: [],
  activeEvidenceType: "all",
  activeEvidenceRecord: null,
  reductionGuide: null
};

const els = {
  sourcePicker: document.querySelector("#sourcePicker"),
  pathwayScenarioPicker: document.querySelector("#pathwayScenarioPicker"),
  bioPathwayTitle: document.querySelector("#bioPathwayTitle"),
  bioPathwayEvidenceLabel: document.querySelector("#bioPathwayEvidenceLabel"),
  bioPathwayGrade: document.querySelector("#bioPathwayGrade"),
  bioProduct: document.querySelector("#bioProduct"),
  bioChemical: document.querySelector("#bioChemical"),
  bioChemicalClass: document.querySelector("#bioChemicalClass"),
  bioExposure: document.querySelector("#bioExposure"),
  bioTarget: document.querySelector("#bioTarget"),
  bioTargetType: document.querySelector("#bioTargetType"),
  bioSystem: document.querySelector("#bioSystem"),
  bioMechanism: document.querySelector("#bioMechanism"),
  bioCaveat: document.querySelector("#bioCaveat"),
  bioOpenExposure: document.querySelector("#bioOpenExposure"),
  bioOpenChemical: document.querySelector("#bioOpenChemical"),
  bioOpenSystem: document.querySelector("#bioOpenSystem"),
  bioSource: document.querySelector("#bioSource"),
  exposureAtlasGrid: document.querySelector("#exposureAtlasGrid"),
  exposureName: document.querySelector("#exposureName"),
  exposureSubtitle: document.querySelector("#exposureSubtitle"),
  exposureEvidence: document.querySelector("#exposureEvidence"),
  exposureSummary: document.querySelector("#exposureSummary"),
  exposureSource: document.querySelector("#exposureSource"),
  exposureChemical: document.querySelector("#exposureChemical"),
  exposureRoute: document.querySelector("#exposureRoute"),
  exposureSystem: document.querySelector("#exposureSystem"),
  exposureClasses: document.querySelector("#exposureClasses"),
  exposureExamples: document.querySelector("#exposureExamples"),
  exposureRoutes: document.querySelector("#exposureRoutes"),
  exposureDrivers: document.querySelector("#exposureDrivers"),
  exposureQuestions: document.querySelector("#exposureQuestions"),
  exposureInterpretation: document.querySelector("#exposureInterpretation"),
  exposureLimitation: document.querySelector("#exposureLimitation"),
  exposureSourceLink: document.querySelector("#exposureSourceLink"),
  chemicalGrid: document.querySelector("#chemicalGrid"),
  chemicalName: document.querySelector("#chemicalName"),
  chemicalFullName: document.querySelector("#chemicalFullName"),
  chemicalStatus: document.querySelector("#chemicalStatus"),
  chemicalSummary: document.querySelector("#chemicalSummary"),
  chemicalCompounds: document.querySelector("#chemicalCompounds"),
  chemicalContexts: document.querySelector("#chemicalContexts"),
  chemicalRoutes: document.querySelector("#chemicalRoutes"),
  chemicalSystems: document.querySelector("#chemicalSystems"),
  chemicalMechanisms: document.querySelector("#chemicalMechanisms"),
  chemicalEvidence: document.querySelector("#chemicalEvidence"),
  chemicalUncertainty: document.querySelector("#chemicalUncertainty"),
  chemicalSource: document.querySelector("#chemicalSource"),
  compoundSelect: document.querySelector("#compoundSelect"),
  compoundName: document.querySelector("#compoundName"),
  compoundFullName: document.querySelector("#compoundFullName"),
  compoundNote: document.querySelector("#compoundNote"),
  compoundSystems: document.querySelector("#compoundSystems"),
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
  feedbackSequence: document.querySelector("#feedbackSequence"),
  evidencePrinciple: document.querySelector("#evidencePrinciple"),
  evidenceTypeTabs: document.querySelector("#evidenceTypeTabs"),
  evidenceChemicalFilter: document.querySelector("#evidenceChemicalFilter"),
  evidenceGradeFilter: document.querySelector("#evidenceGradeFilter"),
  evidenceRecordList: document.querySelector("#evidenceRecordList"),
  evidenceScale: document.querySelector("#evidenceScale"),
  evidenceRecordChemical: document.querySelector("#evidenceRecordChemical"),
  evidenceRecordGrade: document.querySelector("#evidenceRecordGrade"),
  evidenceRecordClaim: document.querySelector("#evidenceRecordClaim"),
  evidenceRecordType: document.querySelector("#evidenceRecordType"),
  evidenceRecordStudy: document.querySelector("#evidenceRecordStudy"),
  evidenceRecordPopulation: document.querySelector("#evidenceRecordPopulation"),
  evidenceRecordReplication: document.querySelector("#evidenceRecordReplication"),
  evidenceRecordReviewer: document.querySelector("#evidenceRecordReviewer"),
  evidenceRecordFinding: document.querySelector("#evidenceRecordFinding"),
  evidenceRecordLimitations: document.querySelector("#evidenceRecordLimitations"),
  evidencePathwayLinks: document.querySelector("#evidencePathwayLinks"),
  evidenceRecordSource: document.querySelector("#evidenceRecordSource"),
  reductionPrinciple: document.querySelector("#reductionPrinciple"),
  reductionTierKey: document.querySelector("#reductionTierKey"),
  reductionCategoryPicker: document.querySelector("#reductionCategoryPicker"),
  reductionCategoryName: document.querySelector("#reductionCategoryName"),
  reductionCategorySummary: document.querySelector("#reductionCategorySummary"),
  reductionActionList: document.querySelector("#reductionActionList")
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}




function reductionTierMeta(tierId) {
  return state.reductionGuide?.tiers?.find(item => item.id === tierId);
}

function renderReductionGuide() {
  const guide = state.reductionGuide;
  if (!guide) return;

  els.reductionPrinciple.textContent = guide.principle;
  els.reductionTierKey.innerHTML = guide.tiers.map(item => `
    <div class="reduction-tier reduction-tier-${item.id}">
      <strong>${item.label}</strong>
      <span>${item.definition}</span>
    </div>
  `).join("");

  els.reductionCategoryPicker.innerHTML = "";
  guide.categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "reduction-category-button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.innerHTML = `<strong>${category.title}</strong><small>${category.actions.length} actions</small>`;
    button.addEventListener("click", () => {
      els.reductionCategoryPicker.querySelectorAll(".reduction-category-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderReductionCategory(category);
    });
    els.reductionCategoryPicker.appendChild(button);
  });

  if (guide.categories[0]) renderReductionCategory(guide.categories[0]);
}

function renderReductionCategory(category) {
  els.reductionCategoryName.textContent = category.title;
  els.reductionCategorySummary.textContent = category.summary;
  els.reductionActionList.innerHTML = category.actions.map((item, index) => {
    const tier = reductionTierMeta(item.tier);
    return `
      <section class="reduction-action-card reduction-action-${item.tier}">
        <div class="reduction-action-top">
          <span class="reduction-action-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="reduction-tier-badge">${tier?.label || item.tier}</span>
        </div>
        <h4>${item.action}</h4>
        <div class="reduction-action-detail">
          <div>
            <strong>Why it may help</strong>
            <p>${item.rationale}</p>
          </div>
          <div>
            <strong>Limitation</strong>
            <p>${item.limitation}</p>
          </div>
        </div>
        <a class="source-inline" href="${item.source_url}" target="_blank" rel="noopener noreferrer">${item.source_label} ↗</a>
      </section>
    `;
  }).join("");
}

function evidenceTypeLabel(typeId) {
  const type = state.evidenceMeta?.evidence_types?.find(item => item.id === typeId);
  return type?.label || typeId;
}

function renderEvidenceEngine() {
  if (!state.evidenceMeta) return;

  els.evidencePrinciple.textContent = state.evidenceMeta.principle;

  const tabs = [{id: "all", label: "All evidence"}, ...state.evidenceMeta.evidence_types];
  els.evidenceTypeTabs.innerHTML = tabs.map((item, index) => `
    <button type="button" class="evidence-type-button" role="tab"
      aria-selected="${index === 0 ? "true" : "false"}" data-evidence-type="${item.id}">
      ${item.label}
    </button>
  `).join("");

  els.evidenceTypeTabs.querySelectorAll(".evidence-type-button").forEach(button => {
    button.addEventListener("click", () => {
      state.activeEvidenceType = button.dataset.evidenceType;
      els.evidenceTypeTabs.querySelectorAll(".evidence-type-button").forEach(b => b.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      renderEvidenceRecords();
    });
  });

  const chemicals = [...new Set(state.evidenceRecords.map(record => record.chemical))].sort();
  els.evidenceChemicalFilter.innerHTML = '<option value="all">All chemicals</option>' +
    chemicals.map(value => `<option value="${value}">${value}</option>`).join("");

  els.evidenceGradeFilter.innerHTML = '<option value="all">All grades</option>' +
    state.evidenceMeta.classes.map(item => `<option value="${item.grade}">Grade ${item.grade} — ${item.label}</option>`).join("");

  els.evidenceChemicalFilter.addEventListener("change", renderEvidenceRecords);
  els.evidenceGradeFilter.addEventListener("change", renderEvidenceRecords);

  els.evidenceScale.innerHTML = state.evidenceMeta.classes.map((item, index) => `
    <div class="evidence-row">
      <span class="grade grade-${Math.min(index + 1, 4)}">${item.grade}</span>
      <div><strong>${item.label}</strong><small>${item.definition}</small></div>
    </div>
  `).join("");

  renderEvidenceRecords();
}

function filteredEvidenceRecords() {
  const chemical = els.evidenceChemicalFilter.value;
  const grade = els.evidenceGradeFilter.value;
  return state.evidenceRecords.filter(record => {
    const typeMatch = state.activeEvidenceType === "all" || record.evidence_type === state.activeEvidenceType;
    const chemicalMatch = chemical === "all" || record.chemical === chemical;
    const gradeMatch = grade === "all" || record.evidence_class === grade;
    return typeMatch && chemicalMatch && gradeMatch;
  });
}

function renderEvidenceRecords() {
  const records = filteredEvidenceRecords();
  if (!records.length) {
    els.evidenceRecordList.innerHTML = '<p class="error-message">No evidence records match these filters.</p>';
    state.activeEvidenceRecord = null;
    return;
  }

  els.evidenceRecordList.innerHTML = records.map((record, index) => `
    <button type="button" class="evidence-record-button" data-evidence-id="${record.id}" aria-pressed="${index === 0 ? "true" : "false"}">
      <span class="record-topline">
        <span class="record-type">${evidenceTypeLabel(record.evidence_type)}</span>
        <span class="record-grade">Grade ${record.evidence_class}</span>
      </span>
      <strong>${record.chemical}</strong>
      <small>${record.claim}</small>
    </button>
  `).join("");

  els.evidenceRecordList.querySelectorAll(".evidence-record-button").forEach(button => {
    button.addEventListener("click", () => {
      els.evidenceRecordList.querySelectorAll(".evidence-record-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      const record = state.evidenceRecords.find(item => item.id === button.dataset.evidenceId);
      if (record) renderEvidenceRecordDetail(record);
    });
  });

  renderEvidenceRecordDetail(records[0]);
}

function renderEvidenceRecordDetail(record) {
  state.activeEvidenceRecord = record;
  els.evidenceRecordChemical.textContent = record.chemical;
  els.evidenceRecordGrade.textContent = record.evidence_class;
  els.evidenceRecordGrade.dataset.grade = record.evidence_class;
  els.evidenceRecordClaim.textContent = record.claim;
  els.evidenceRecordType.textContent = evidenceTypeLabel(record.evidence_type);
  els.evidenceRecordStudy.textContent = record.study_type;
  els.evidenceRecordPopulation.textContent = record.species_or_population;
  els.evidenceRecordReplication.textContent = record.replication_status;
  els.evidenceRecordReviewer.textContent = record.reviewer_status;
  els.evidenceRecordFinding.textContent = record.finding;
  els.evidenceRecordLimitations.textContent = record.limitations;
  els.evidenceRecordSource.textContent = `${record.source_label} ↗`;
  els.evidenceRecordSource.href = record.source_url;

  const pathways = (record.pathway_ids || [])
    .map(id => state.pathways.find(pathway => pathway.id === id))
    .filter(Boolean);

  els.evidencePathwayLinks.innerHTML = pathways.length
    ? pathways.map(pathway => `<button type="button" class="evidence-path-chip" data-pathway-id="${pathway.id}">${pathway.title}</button>`).join("")
    : '<span>No pathway link assigned</span>';

  els.evidencePathwayLinks.querySelectorAll(".evidence-path-chip").forEach(button => {
    button.addEventListener("click", () => {
      const pathway = state.pathways.find(item => item.id === button.dataset.pathwayId);
      if (!pathway) return;
      renderBiologicalPathway(pathway);
      document.querySelectorAll(".pathway-scenario-button").forEach(b => {
        const matches = b.textContent.includes(pathway.title);
        b.setAttribute("aria-pressed", matches ? "true" : "false");
      });
      document.querySelector("#explorer")?.scrollIntoView({behavior: "smooth", block: "start"});
    });
  });
}

function findChemicalClassForPathway(pathway) {
  return state.chemicals.find(item =>
    item.name.toLowerCase() === pathway.chemical_class.toLowerCase() ||
    item.full_name.toLowerCase() === pathway.chemical_class.toLowerCase()
  );
}

function renderPathwayScenarios() {
  els.pathwayScenarioPicker.innerHTML = "";
  state.pathways.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pathway-scenario-button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.innerHTML = `<strong>${item.title}</strong><small>${item.chemical} · ${item.endocrine_system}</small>`;
    button.addEventListener("click", () => {
      document.querySelectorAll(".pathway-scenario-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderBiologicalPathway(item);
    });
    els.pathwayScenarioPicker.appendChild(button);
  });
  if (state.pathways[0]) renderBiologicalPathway(state.pathways[0]);
}

function renderBiologicalPathway(item) {
  state.activePathway = item;
  els.bioPathwayTitle.textContent = item.title;
  els.bioPathwayEvidenceLabel.textContent = item.evidence_label;
  els.bioPathwayGrade.textContent = item.evidence_grade;
  els.bioProduct.textContent = item.product;
  els.bioChemical.textContent = item.chemical;
  els.bioChemicalClass.textContent = item.chemical_class;
  els.bioExposure.textContent = item.exposure;
  els.bioTarget.textContent = item.molecular_target;
  els.bioTargetType.textContent = item.target_type;
  els.bioSystem.textContent = item.endocrine_system;
  els.bioMechanism.textContent = item.mechanism;
  els.bioCaveat.textContent = item.caveat;
  els.bioSource.textContent = `${item.source_label} ↗`;
  els.bioSource.href = item.source_url;

  els.bioOpenExposure.disabled = !state.exposures.some(x => x.id === item.linked_exposure_id);
  els.bioOpenChemical.disabled = !findChemicalClassForPathway(item);
  els.bioOpenSystem.disabled = !state.endocrineSystems.some(x => x.id === item.linked_system_id);
}

function selectButtonByDataset(selector, attr, value) {
  const buttons = [...document.querySelectorAll(selector)];
  const target = buttons.find(button => button.dataset[attr] === value);
  if (!target) return;
  buttons.forEach(button => button.setAttribute("aria-pressed", "false"));
  target.setAttribute("aria-pressed", "true");
  target.scrollIntoView({block: "nearest", inline: "nearest"});
  target.click();
}

function setupPathwayDeepLinks() {
  els.bioOpenExposure.addEventListener("click", () => {
    const item = state.activePathway;
    if (!item) return;
    const exposure = state.exposures.find(x => x.id === item.linked_exposure_id);
    if (!exposure) return;
    renderExposureProfile(exposure);
    const buttons = [...document.querySelectorAll(".exposure-atlas-button")];
    buttons.forEach((button, index) => button.setAttribute("aria-pressed", state.exposures[index]?.id === exposure.id ? "true" : "false"));
    document.querySelector("#exposure-atlas")?.scrollIntoView({behavior: "smooth", block: "start"});
  });

  els.bioOpenChemical.addEventListener("click", () => {
    const item = state.activePathway;
    if (!item) return;
    const chemical = findChemicalClassForPathway(item);
    if (!chemical) return;
    renderChemicalProfile(chemical);
    const buttons = [...document.querySelectorAll(".chemical-class-button")];
    buttons.forEach((button, index) => button.setAttribute("aria-pressed", state.chemicals[index]?.id === chemical.id ? "true" : "false"));
    document.querySelector("#chemicals")?.scrollIntoView({behavior: "smooth", block: "start"});
  });

  els.bioOpenSystem.addEventListener("click", () => {
    const item = state.activePathway;
    if (!item) return;
    const system = state.endocrineSystems.find(x => x.id === item.linked_system_id);
    if (!system) return;
    renderAxis(system);
    const buttons = [...document.querySelectorAll(".axis-button")];
    buttons.forEach((button, index) => button.setAttribute("aria-pressed", state.endocrineSystems[index]?.id === system.id ? "true" : "false"));
    document.querySelector("#endocrine")?.scrollIntoView({behavior: "smooth", block: "start"});
  });
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


function renderExposureAtlas() {
  els.exposureAtlasGrid.innerHTML = "";
  state.exposures.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "exposure-atlas-button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.innerHTML = `<span class="exposure-icon">${item.icon || "EXP"}</span><strong>${item.title}</strong><small>${item.subtitle}</small>`;
    button.addEventListener("click", () => {
      document.querySelectorAll(".exposure-atlas-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderExposureProfile(item);
    });
    els.exposureAtlasGrid.appendChild(button);
  });
  if (state.exposures[0]) renderExposureProfile(state.exposures[0]);
}

function renderExposureProfile(item) {
  els.exposureName.textContent = item.title;
  els.exposureSubtitle.textContent = item.subtitle;
  els.exposureEvidence.textContent = item.evidenceLabel;
  els.exposureSummary.textContent = item.summary;
  els.exposureSource.textContent = item.source;
  els.exposureChemical.textContent = item.chemical;
  els.exposureRoute.textContent = item.route;
  els.exposureSystem.textContent = item.system;
  els.exposureClasses.innerHTML = chips(item.chemical_classes || []);
  els.exposureExamples.innerHTML = chips(item.example_contexts || []);
  els.exposureRoutes.innerHTML = chips(item.exposure_routes || []);
  els.exposureDrivers.innerHTML = chips(item.exposure_drivers || []);
  els.exposureQuestions.innerHTML = (item.practical_questions || []).map(q => `<li>${q}</li>`).join("");
  els.exposureInterpretation.textContent = item.summary;
  els.exposureLimitation.textContent = item.limitation;
  els.exposureSourceLink.textContent = `${item.source_label || "Source"} ↗`;
  els.exposureSourceLink.href = item.source_url || "#";
}

function renderChemicals() {
  els.chemicalGrid.innerHTML = "";
  state.chemicals.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chemical-class-button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.innerHTML = `<strong>${item.name}</strong><small>${item.scope}</small>`;
    button.addEventListener("click", () => {
      document.querySelectorAll(".chemical-class-button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderChemicalProfile(item);
    });
    els.chemicalGrid.appendChild(button);
  });
  if (state.chemicals[0]) renderChemicalProfile(state.chemicals[0]);
}

function renderChemicalProfile(item) {
  els.chemicalName.textContent = item.name;
  els.chemicalFullName.textContent = item.full_name;
  els.chemicalStatus.textContent = item.status;
  els.chemicalSummary.textContent = item.summary;
  els.chemicalCompounds.innerHTML = chips(item.representative_compounds);
  els.chemicalContexts.innerHTML = chips(item.common_contexts);
  els.chemicalRoutes.innerHTML = chips(item.exposure_routes);
  els.chemicalSystems.innerHTML = chips(item.endocrine_systems);
  els.chemicalMechanisms.innerHTML = chips(item.mechanistic_domains);
  els.chemicalEvidence.textContent = item.evidence_summary;
  els.chemicalUncertainty.textContent = item.key_uncertainty;
  els.chemicalSource.textContent = `${item.source_label} ↗`;
  els.chemicalSource.href = item.source_url;

  const matching = state.compounds.filter(compound => compound.class_id === item.id);
  els.compoundSelect.innerHTML = "";
  matching.forEach((compound, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = compound.name;
    els.compoundSelect.appendChild(option);
  });
  els.compoundSelect.onchange = () => renderCompound(matching[Number(els.compoundSelect.value)]);
  if (matching[0]) {
    renderCompound(matching[0]);
    els.compoundSelect.disabled = false;
  } else {
    els.compoundSelect.disabled = true;
    els.compoundName.textContent = "No representative compound loaded yet";
    els.compoundFullName.textContent = "";
    els.compoundNote.textContent = "This class profile is available, but the compound-level layer is still being expanded.";
    els.compoundSystems.innerHTML = "";
  }
}

function renderCompound(item) {
  els.compoundName.textContent = item.name;
  els.compoundFullName.textContent = item.full_name;
  els.compoundNote.textContent = item.note;
  els.compoundSystems.innerHTML = chips(item.systems);
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
    const [exposures, chemicals, endocrineSystems, hormones, receptors, feedbackSystems, compounds, pathways, evidenceMeta, evidenceRecords, reductionGuide] = await Promise.all([
      loadJson("data/exposures.json"),
      loadJson("data/chemicals.json"),
      loadJson("data/endocrine-systems.json"),
      loadJson("data/hormones.json"),
      loadJson("data/receptors.json"),
      loadJson("data/feedback-systems.json"),
      loadJson("data/compounds.json"),
      loadJson("data/pathways.json"),
      loadJson("data/evidence.json"),
      loadJson("data/evidence-records.json"),
      loadJson("data/reduction-guide.json")
    ]);

    state.exposures = exposures;
    state.chemicals = chemicals;
    state.endocrineSystems = endocrineSystems;
    state.hormones = hormones;
    state.receptors = receptors;
    state.feedbackSystems = feedbackSystems;
    state.compounds = compounds;
    state.pathways = pathways;
    state.evidenceMeta = evidenceMeta;
    state.evidenceRecords = evidenceRecords;
    state.reductionGuide = reductionGuide;

    renderPathwayScenarios();
    renderEvidenceEngine();
    renderReductionGuide();
    setupPathwayDeepLinks();
    renderExposureButtons();
    renderExposureAtlas();
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
