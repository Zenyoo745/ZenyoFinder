const deviceSearch = document.getElementById('deviceSearch');
const deviceSelect = document.getElementById('deviceSelect');
const playstyleSelect = document.getElementById('playstyleSelect');
const findButton = document.getElementById('findButton');
const aiButton = document.getElementById('aiButton');
const resultSummary = document.getElementById('resultSummary');
const resultMeta = document.getElementById('resultMeta');
const resultValues = document.getElementById('resultValues');
const heroDeviceName = document.getElementById('heroDeviceName');
const heroDeviceDpi = document.getElementById('heroDeviceDpi');
const heroDeviceValues = document.getElementById('heroDeviceValues');
const deviceList = document.getElementById('deviceList');
const reportForm = document.getElementById('reportForm');
const reportDevice = document.getElementById('reportDevice');
const reportNotice = document.getElementById('reportNotice');

const emailConfig = {
  enabled: false,
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
  toEmail: 'admin@example.com',
};

function sendEmailReport(report) {
  if (!emailConfig.enabled || typeof emailjs === 'undefined' || !emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
    return Promise.resolve(false);
  }
  if (!window.emailjs || !emailjs.send) {
    return Promise.resolve(false);
  }
  if (emailjs.init) {
    emailjs.init(emailConfig.publicKey);
  }
  return emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
    to_email: emailConfig.toEmail,
    from_name: report.name,
    from_email: report.email,
    device_name: report.device,
    issue_type: report.issue,
    message: report.message,
    sent_at: report.timestamp,
  });
}

function saveReport(report) {
  const stored = JSON.parse(localStorage.getItem('zenyo-reports') || '[]');
  stored.push(report);
  localStorage.setItem('zenyo-reports', JSON.stringify(stored));
}

const fallbackPresets = {
  headshot: { general: 46, redDot: 51, scope2x: 33, scope4x: 23, awm: 11, freeLook: 90 },
  sniper: { general: 42, redDot: 47, scope2x: 30, scope4x: 20, awm: 10, freeLook: 86 },
  rush: { general: 60, redDot: 65, scope2x: 44, scope4x: 28, awm: 14, freeLook: 98 },
  balanced: { general: 52, redDot: 56, scope2x: 37, scope4x: 26, awm: 12, freeLook: 93 },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomOffset(value, range) {
  return clamp(value + Math.round((Math.random() - 0.5) * range), 1, 100);
}

function generateAISensitivity(device, playstyle) {
  const base = device ? device.playstyles[playstyle] || device.playstyles.headshot : fallbackPresets[playstyle];
  const dpiFactor = device && device.dpi ? Math.max(1, Math.min(12, Math.round(device.dpi / 40))) : 8;
  return {
    general: randomOffset(base.general + Math.round((dpiFactor - 8) / 2), 10),
    redDot: randomOffset(base.redDot + Math.round((dpiFactor - 8) / 2), 10),
    scope2x: randomOffset(base.scope2x + Math.round((dpiFactor - 8) / 2), 10),
    scope4x: randomOffset(base.scope4x + Math.round((dpiFactor - 8) / 2), 10),
    awm: randomOffset(base.awm + Math.round((dpiFactor - 8) / 2), 8),
    freeLook: randomOffset(base.freeLook + Math.round((dpiFactor - 8) / 2), 12),
  };
}

function renderHeroDevice(device) {
  if (!device || (!device.brand && !device.model)) {
    heroDeviceName.textContent = 'Search your phone';
    heroDeviceDpi.textContent = 'DPI: --';
    return;
  }

  heroDeviceName.textContent = device.brand ? `${device.brand} ${device.model}` : `${device.model}`;
  heroDeviceDpi.textContent = `DPI: ${device.dpi || '--'}`;
}

function renderDeviceMatches(matches) {
  deviceList.innerHTML = '';
  if (matches.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No device found. Try another model or spelling.';
    deviceList.appendChild(li);
    return;
  }
  matches.slice(0, 7).forEach((device) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${device.brand} ${device.model}</span><span>${device.dpi || '--'} DPI</span>`;
    deviceList.appendChild(li);
  });
}

function populateDeviceSelectors() {
  deviceDatabase.forEach((device) => {
    const label = `${device.brand} ${device.model}`;
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    deviceSelect.appendChild(option);

    const reportOption = option.cloneNode(true);
    reportDevice.appendChild(reportOption);
  });
}

function setResultValues(values) {
  resultValues.innerHTML = '';
  const entries = [
    ['General', values.general],
    ['Red Dot', values.redDot],
    ['2x Scope', values.scope2x],
    ['4x Scope', values.scope4x],
    ['AWM', values.awm],
    ['Free Look', values.freeLook],
  ];
  entries.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    resultValues.appendChild(row);
  });

  if (heroDeviceValues) {
    heroDeviceValues.innerHTML = '';
    const heroEntries = [
      ['General', 'general'],
      ['Red Dot', 'redDot'],
      ['2x Scope', 'scope2x'],
    ];
    heroEntries.forEach(([label, key]) => {
      const value = values[key] || '--';
      const row = document.createElement('div');
      row.innerHTML = `<strong>${label}</strong><span>${value}</span>`;
      heroDeviceValues.appendChild(row);
    });
  }
}

function findDeviceProfile() {
  const query = deviceSearch.value.trim().toLowerCase();
  const playstyle = playstyleSelect.value;
  const found = deviceDatabase.find((device) => `${device.brand} ${device.model}`.toLowerCase() === query || device.model.toLowerCase() === query || device.brand.toLowerCase() === query);

  const matches = deviceDatabase.filter((device) => `${device.brand} ${device.model}`.toLowerCase().includes(query) || device.brand.toLowerCase().includes(query) || device.model.toLowerCase().includes(query));
  renderDeviceMatches(matches);

  if (!found) {
    resultSummary.textContent = 'Not found yet — try another phone model or a nearby match from the device library.';
    resultMeta.textContent = 'No exact match, but Zenyo AI can still suggest a great sensitivity set.';
    setResultValues({ general: '--', redDot: '--', scope2x: '--', scope4x: '--', awm: '--', freeLook: '--' });
    renderHeroDevice(null);
    return;
  }

  const preset = found.playstyles[playstyle] || found.playstyles.headshot;
  resultSummary.textContent = `Best ${playstyle} sensitivity for ${found.brand} ${found.model}.`;
  resultMeta.textContent = `Device DPI: ${found.dpi || '--'} · found ${Object.keys(found.playstyles).length} presets.`;
  setResultValues(preset);
  renderHeroDevice(found);
}

function makeAISensitivity() {
  const query = deviceSearch.value.trim().toLowerCase();
  const playstyle = playstyleSelect.value;
  const found = deviceDatabase.find((device) => `${device.brand} ${device.model}`.toLowerCase() === query || device.model.toLowerCase() === query || device.brand.toLowerCase() === query);
  const aiPreset = generateAISensitivity(found, playstyle);
  const deviceLabel = found ? `${found.brand} ${found.model}` : deviceSearch.value.trim() || 'your phone';

  resultSummary.textContent = `AI Sensi Maker suggests a ${playstyle} build for ${deviceLabel}.`;
  resultMeta.textContent = found ? `AI-tuned for ${found.brand} ${found.model} · ${found.dpi} DPI` : 'AI-tuned fallback values for an unknown device.';
  setResultValues(aiPreset);
  renderHeroDevice(found || { brand: '', model: deviceLabel, dpi: '--' });
}

function saveReport(report) {
  const stored = JSON.parse(localStorage.getItem('zenyo-reports') || '[]');
  stored.push(report);
  localStorage.setItem('zenyo-reports', JSON.stringify(stored));
}

function initialize() {
  populateDeviceSelectors();

  deviceSearch.addEventListener('input', () => {
    const query = deviceSearch.value.trim().toLowerCase();
    const matches = deviceDatabase.filter((device) => `${device.brand} ${device.model}`.toLowerCase().includes(query) || device.brand.toLowerCase().includes(query) || device.model.toLowerCase().includes(query));
    renderDeviceMatches(matches);
    const exact = deviceDatabase.find((device) => `${device.brand} ${device.model}`.toLowerCase() === query);
    deviceSelect.value = exact ? `${exact.brand} ${exact.model}` : '';
  });

  deviceSelect.addEventListener('change', () => {
    if (!deviceSelect.value) return;
    deviceSearch.value = deviceSelect.value;
    findDeviceProfile();
  });

  reportForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const report = {
      name: reportForm.reportName.value.trim(),
      email: reportForm.reportEmail.value.trim(),
      device: reportDevice.value,
      issue: reportForm.reportIssue.value,
      message: reportForm.reportMessage.value.trim(),
      timestamp: new Date().toISOString(),
    };
    saveReport(report);

    let emailSent = false;
    try {
      emailSent = await sendEmailReport(report);
    } catch (error) {
      console.warn('EmailJS send failed:', error);
      emailSent = false;
    }

    if (emailSent) {
      reportNotice.textContent = 'Thanks! Your report was saved and sent to your inbox.';
      reportNotice.style.color = '#8ff1a4';
    } else {
      reportNotice.textContent = 'Thanks! Your report was saved locally. Enable EmailJS in script.js to email it automatically.';
      reportNotice.style.color = '#ffd48a';
    }

    reportForm.reset();
    deviceSelect.value = '';
    console.log('Zenyo Finder report saved:', report);
  });

  findButton.addEventListener('click', findDeviceProfile);
  aiButton.addEventListener('click', makeAISensitivity);
  renderDeviceMatches(deviceDatabase.slice(0, 7));
}

initialize();
