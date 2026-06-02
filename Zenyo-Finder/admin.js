const reportInbox = document.getElementById('reportInbox');
const clearReportsButton = document.getElementById('clearReports');

function loadSavedReports() {
  const stored = JSON.parse(localStorage.getItem('zenyo-reports') || '[]');
  renderReports(stored);
}

function renderReports(reports) {
  if (!reportInbox) return;
  reportInbox.innerHTML = '';
  if (reports.length === 0) {
    reportInbox.innerHTML = '<p class="empty-report">No reports found yet.</p>';
    return;
  }

  reports.reverse().forEach((report) => {
    const card = document.createElement('div');
    card.className = 'saved-report';
    card.innerHTML = `
      <div class="report-header">
        <strong>${report.name}</strong>
        <span>${new Date(report.timestamp).toLocaleString()}</span>
      </div>
      <div class="report-meta">
        <span>Device: ${report.device || 'Unknown'}</span>
        <span>Issue: ${report.issue || 'General'}</span>
      </div>
      <p>${report.message || 'No message provided.'}</p>
      <div class="report-email">Contact: ${report.email || 'No email'}</div>
    `;
    reportInbox.appendChild(card);
  });
}

function clearReports() {
  localStorage.removeItem('zenyo-reports');
  loadSavedReports();
}

if (clearReportsButton) {
  clearReportsButton.addEventListener('click', () => {
    clearReports();
  });
}

loadSavedReports();
