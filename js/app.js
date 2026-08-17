/**
 * Main Application Logic & User Interface Controller
 * Local Authorities Project Progress & Evaluation Monitoring System
 */

// Current Application State
const AppState = {
  currentLang: 'si',
  currentTab: 'dashboard',
  allProjects: [],
  filteredProjects: [],
  localAuthorities: [],
  programmes: [],
  activeProjectForEval: null,
  dashboardStats: null
};

// Bilingual Translation Dictionary
const I18N = {
  si: {
    app_title: 'පළාත් පාලන සංවර්ධන ව්‍යාපෘති අධීක්ෂණ පද්ධතිය',
    app_subtitle: 'සබරගමුව පළාත් පාලන ආයතන ව්‍යාපෘති ප්‍රගති ඇගයීම් සහ කළමනාකරණ ද්වාරය',
    btn_new_project: 'නව ව්‍යාපෘතියක්',
    nav_dashboard: 'සාරාංශ පුවරුව (Dashboard)',
    nav_projects: 'ව්‍යාපෘති ලැයිස්තුව (Projects)',
    nav_las: 'පළාත් පාලන ආයතන (17 LAs)',
    nav_programmes: 'සංරචක / වැඩසටහන් (Components)',
    nav_reports: 'වාර්තා හා මුද්‍රණය (Reports & Export)',
    kpi_total_projects: 'මුළු ව්‍යාපෘති ගණන',
    kpi_sub_17_las: 'පළාත් පාලන ආයතන 17 තුළ',
    kpi_estimated_cost: 'මුළු ඇස්තමේන්තුගත පිරිවැය',
    kpi_sub_allocated: 'අනුමත මුළු ප්‍රතිපාදන',
    kpi_total_spent: 'මුළු වියදම් කළ මුදල',
    kpi_avg_physical: 'සාමාන්‍ය භෞතික ප්‍රගතිය',
    kpi_sub_physical: 'ක්‍රියාත්මක සියලු ව්‍යාපෘති',
    chart_la_title: 'පළාත් පාලන ආයතන මට්ටමින් ව්‍යාපෘති පිරිවැය හා ව්‍යාප්තිය',
    chart_la_sub: 'ප්‍රාදේශීය සභා සහ නගර සභා අනුව ප්‍රතිපාදන වෙන්කිරීම (රුපියල් මිලියන)',
    chart_prog_title: 'වැඩසටහන් / සංරචක අනුව පිරිවැය',
    chart_prog_sub: 'මාර්ග, ජල, අපද්‍රව්‍ය හා පොදු පහසුකම්',
    chart_stage_title: 'ප්‍රසම්පාදන හා ක්‍රියාත්මක අදියර',
    chart_stage_sub: 'Procurement Stages Breakdown',
    recent_projects_title: 'මෑතකදී යාවත්කාලීන වූ ව්‍යාපෘති',
    recent_projects_sub: 'නවතම ප්‍රගති ඇගයීම් වාර්තා සහිත ව්‍යාපෘති',
    btn_view_all_projects: 'සියලු ව්‍යාපෘති බලන්න',
    lbl_filter_la: 'පළාත් පාලන ආයතනය:',
    opt_all_las: 'සියලු පළාත් පාලන ආයතන (17)',
    lbl_filter_prog: 'සංරචකය / වැඩසටහන:',
    opt_all_programmes: 'සියලු සංරචක (7)',
    lbl_filter_stage: 'ප්‍රසම්පාදන අදියර:',
    opt_all_stages: 'සියලු අදියර',
    search_placeholder: 'ව්‍යාපෘති නම හෝ අනුක්‍රමික අංකය සොයන්න...',
    showing_projects: 'පෙන්වන ව්‍යාපෘති:',
    btn_export_csv: 'CSV බාගත කරන්න',
    la_heading: 'පළාත් පාලන ආයතන 17 සාරාංශය (Local Authorities)',
    la_subheading: 'සබරගමුව පළාතේ මහ නගර සභා, නගර සභා සහ ප්‍රාදේශීය සභා අනුව ව්‍යාපෘති හා ප්‍රතිපාදන වෙන්වීම්',
    prog_heading: 'සංරචක / වැඩසටහන් 7 (Programmes / Components)',
    prog_subheading: 'මාර්ග, ජල, ඝණ අපද්‍රව්‍ය, වතු යටිතල පහසුකම් හා සේවා ව්‍යාපෘති වර්ගීකරණය',
    report_heading: 'නිල ව්‍යාපෘති ප්‍රගති වාර්තාව (Official Progress Report)',
    report_subheading: 'මුද්‍රණය සඳහා සහ වාර්තාකරණය සඳහා සකස් කළ සවිස්තරාත්මක වාර්තාව',
    btn_export_sql: 'PostgreSQL SQL Export',
    btn_print_report: 'වාර්තාව මුද්‍රණය කරන්න (Print Report)',
    lbl_filter_by_la: 'ආයතනය අනුව වාර්තාව පෙරාගන්න:',
    modal_add_project: 'නව ව්‍යාපෘතියක් ඇතුළත් කිරීම',
    lbl_serial_no: 'අනුක්‍රමික අංකය (Serial No):',
    lbl_est_cost: 'ඇස්තමේන්තුගත පිරිවැය (Rs. Mn) *:',
    lbl_proj_title: 'ව්‍යාපෘති නාමය (Project Title) *:',
    lbl_proj_la: 'පළාත් පාලන ආයතනය (Local Authority) *:',
    lbl_proj_prog: 'සංරචකය / වැඩසටහන (Programme) *:',
    lbl_req_date: 'ඇස්තමේන්තු ඉල්ලුම් කළ දිනය:',
    lbl_rec_date: 'ඇස්තමේන්තු ලැබුණු දිනය:',
    lbl_sanctioned_ref: 'අනුමැති ලිපි අංකය හා දිනය (Sanctioned Ref & Date):',
    lbl_proc_stage: 'ප්‍රසම්පාදන අදියර (Procurement Stage):',
    lbl_award_status: 'ප්‍රදාන තත්ත්වය (Awarded Status):',
    btn_cancel: 'අවලංගු කරන්න',
    btn_save: 'සුරකින්න',
    modal_log_progress: 'ප්‍රගති ඇගයීම් සටහනක් ඇතුළත් කිරීම',
    lbl_eval_stage: 'ඇගයීම් අදියර (Evaluation Stage) *:',
    lbl_eval_date: 'ඇගයීම් දිනය (Evaluation Date) *:',
    lbl_physical_pct: 'භෞතික ප්‍රගතිය (Physical Progress %):',
    lbl_expenditure_spent: 'මේ දක්වා වියදම් කළ මුදල (Expenditure Spent - Rs. Mn) *:',
    lbl_progress_notes: 'ප්‍රගති සටහන් හා නිරීක්ෂණ (Progress Notes & Observations):',
    btn_record_eval: 'ඇගයීම සුරකින්න'
  },
  en: {
    app_title: 'Local Authorities Project Monitoring System',
    app_subtitle: 'Sabaragamuwa Local Authorities Project Progress Evaluation & Management Portal',
    btn_new_project: 'New Project',
    nav_dashboard: 'Executive Dashboard',
    nav_projects: 'Projects Directory',
    nav_las: 'Local Authorities (17)',
    nav_programmes: 'Programmes / Components',
    nav_reports: 'Reports & Export',
    kpi_total_projects: 'Total Projects',
    kpi_sub_17_las: 'Across 17 Local Authorities',
    kpi_estimated_cost: 'Total Estimated Cost',
    kpi_sub_allocated: 'Sanctioned Budget Allocation',
    kpi_total_spent: 'Total Funds Utilized',
    kpi_avg_physical: 'Avg. Physical Progress',
    kpi_sub_physical: 'Across all active projects',
    chart_la_title: 'Project Cost & Count Distribution by Local Authority',
    chart_la_sub: 'Financial allocation and volume across Municipal, Urban and Pradeshiya Sabhas (Rs. Mn)',
    chart_prog_title: 'Expenditure Allocation by Programme Component',
    chart_prog_sub: 'Roads, Water Supply, Solid Waste, and Amenities',
    chart_stage_title: 'Procurement Pipeline Status',
    chart_stage_sub: 'Current project procurement phases',
    recent_projects_title: 'Recently Updated Projects',
    recent_projects_sub: 'Projects with latest progress evaluation records',
    btn_view_all_projects: 'View All Projects',
    lbl_filter_la: 'Local Authority:',
    opt_all_las: 'All Local Authorities (17)',
    lbl_filter_prog: 'Programme / Component:',
    opt_all_programmes: 'All Programmes (7)',
    lbl_filter_stage: 'Procurement Stage:',
    opt_all_stages: 'All Stages',
    search_placeholder: 'Search by Project Title or Serial No...',
    showing_projects: 'Showing Projects:',
    btn_export_csv: 'Export CSV',
    la_heading: '17 Local Authorities Directory & Summary',
    la_subheading: 'Financial allocations, project counts and physical progress by Council',
    prog_heading: '7 Development Programmes / Components',
    prog_subheading: 'Categorization of Roads, Water, Waste Management, Estate Infrastructure and Services',
    report_heading: 'Official Project Progress Evaluation Report',
    report_subheading: 'Comprehensive report formatted for printing and official submission',
    btn_export_sql: 'Export PostgreSQL SQL',
    btn_print_report: 'Print Report (PDF)',
    lbl_filter_by_la: 'Filter Report by Local Authority:',
    modal_add_project: 'Add / Edit Development Project',
    lbl_serial_no: 'Serial Number:',
    lbl_est_cost: 'Estimated Cost (Rs. Mn) *:',
    lbl_proj_title: 'Project Title *:',
    lbl_proj_la: 'Local Authority *:',
    lbl_proj_prog: 'Programme / Component *:',
    lbl_req_date: 'Estimate Requested Date:',
    lbl_rec_date: 'Estimate Received Date:',
    lbl_sanctioned_ref: 'Sanctioned Ref & Date:',
    lbl_proc_stage: 'Procurement Stage:',
    lbl_award_status: 'Awarded Status:',
    btn_cancel: 'Cancel',
    btn_save: 'Save Project',
    modal_log_progress: 'Log Progress Evaluation Record',
    lbl_eval_stage: 'Evaluation Stage *:',
    lbl_eval_date: 'Evaluation Date *:',
    lbl_physical_pct: 'Physical Progress %:',
    lbl_expenditure_spent: 'Expenditure Spent to Date (Rs. Mn) *:',
    lbl_progress_notes: 'Progress Notes & Field Observations:',
    btn_record_eval: 'Save Evaluation'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  initEventListeners();
  await loadReferenceData();
  await refreshDashboard();
  await loadProjects();
  renderLocalAuthoritiesView();
  renderProgrammesView();
  updateReportDate();
});

// Event Listeners setup
function initEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Language Toggles
  document.getElementById('lang-si').addEventListener('click', () => setLanguage('si'));
  document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

  // Theme Toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Project Modals
  document.getElementById('btn-add-project').addEventListener('click', () => openProjectModal());
  document.getElementById('btn-add-project-table').addEventListener('click', () => openProjectModal());
  document.getElementById('form-project').addEventListener('submit', handleSaveProject);

  // Progress Evaluation Modal
  document.getElementById('form-progress').addEventListener('submit', handleSaveProgress);
  
  // Progress Range Slider sync
  const slider = document.getElementById('prog-physical-pct');
  const sliderDisplay = document.getElementById('prog-slider-val');
  slider.addEventListener('input', (e) => {
    sliderDisplay.textContent = `${e.target.value}%`;
    const val = parseInt(e.target.value);
    if (val < 30) sliderDisplay.style.color = 'var(--accent-rose)';
    else if (val < 70) sliderDisplay.style.color = 'var(--accent-amber)';
    else sliderDisplay.style.color = 'var(--accent-emerald)';
  });

  // Filter Listeners
  document.getElementById('filter-search').addEventListener('input', handleFilterChange);
  document.getElementById('filter-la').addEventListener('change', handleFilterChange);
  document.getElementById('filter-programme').addEventListener('change', handleFilterChange);
  document.getElementById('filter-stage').addEventListener('change', handleFilterChange);
  document.getElementById('btn-reset-filters').addEventListener('click', resetFilters);

  // Report LA Filter
  document.getElementById('report-filter-la').addEventListener('change', (e) => {
    renderPrintableReport(e.target.value);
  });

  // Export Buttons
  document.getElementById('btn-export-csv').addEventListener('click', exportProjectsToCSV);
  document.getElementById('btn-export-report-csv').addEventListener('click', exportProjectsToCSV);
  document.getElementById('btn-export-sql-pg').addEventListener('click', exportPostgreSQLDump);
}

// Switch View Tabs
function switchTab(tabId) {
  AppState.currentTab = tabId;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });

  if (tabId === 'dashboard') {
    refreshDashboard();
  } else if (tabId === 'projects') {
    loadProjects();
  } else if (tabId === 'local-authorities') {
    renderLocalAuthoritiesView();
  } else if (tabId === 'programmes') {
    renderProgrammesView();
  } else if (tabId === 'reports') {
    renderPrintableReport(document.getElementById('report-filter-la').value);
  }
}

// Language Switching
function setLanguage(lang) {
  AppState.currentLang = lang;
  document.documentElement.lang = lang;

  document.getElementById('lang-si').classList.toggle('active', lang === 'si');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  if (AppState.dashboardStats) {
    ChartManager.renderCharts(AppState.dashboardStats);
  }
}

// Theme Toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  
  const icon = document.querySelector('#theme-toggle i');
  if (newTheme === 'light') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }

  if (AppState.dashboardStats) {
    ChartManager.renderCharts(AppState.dashboardStats);
  }
}

// Load Reference Data (LAs & Programmes)
async function loadReferenceData() {
  AppState.localAuthorities = await API.getLocalAuthorities();
  AppState.programmes = await API.getProgrammes();

  // Populate Dropdowns
  const filterLa = document.getElementById('filter-la');
  const projLa = document.getElementById('proj-la');
  const reportLa = document.getElementById('report-filter-la');

  const filterProg = document.getElementById('filter-programme');
  const projProg = document.getElementById('proj-programme');

  // Clear existing options except default
  filterLa.innerHTML = `<option value="">${I18N[AppState.currentLang].opt_all_las}</option>`;
  reportLa.innerHTML = `<option value="">සියලු පළාත් පාලන ආයතන (17 All)</option>`;
  projLa.innerHTML = `<option value="" disabled selected>පළාත් පාලන ආයතනය තෝරන්න...</option>`;

  AppState.localAuthorities.forEach(la => {
    const opt1 = new Option(la.name, la.id);
    const opt2 = new Option(la.name, la.id);
    const opt3 = new Option(la.name, la.id);
    filterLa.add(opt1);
    reportLa.add(opt2);
    projLa.add(opt3);
  });

  filterProg.innerHTML = `<option value="">${I18N[AppState.currentLang].opt_all_programmes}</option>`;
  projProg.innerHTML = `<option value="" disabled selected>සංරචකය තෝරන්න...</option>`;

  AppState.programmes.forEach(prog => {
    const opt1 = new Option(prog.name, prog.id);
    const opt2 = new Option(prog.name, prog.id);
    filterProg.add(opt1);
    projProg.add(opt2);
  });
}

// Refresh Dashboard Stats & Visualizations
async function refreshDashboard() {
  const stats = await API.getDashboardStats();
  AppState.dashboardStats = stats;

  // Update KPI Numbers
  document.getElementById('kpi-total-projects').textContent = stats.total_projects;
  document.getElementById('kpi-total-cost').textContent = stats.total_estimated_cost_mn.toFixed(3);
  document.getElementById('kpi-total-spent').textContent = stats.total_spent_mn.toFixed(3);
  document.getElementById('kpi-avg-progress').textContent = stats.avg_physical_progress;

  // Update Mini Progress Bars
  const finPct = stats.total_estimated_cost_mn > 0 
    ? Math.min(100, (stats.total_spent_mn / stats.total_estimated_cost_mn) * 100) 
    : 0;
  document.getElementById('kpi-financial-bar').style.width = `${finPct}%`;
  document.getElementById('kpi-financial-pct-text').textContent = `මූල්‍ය ප්‍රගතිය: ${finPct.toFixed(1)}%`;
  document.getElementById('kpi-physical-bar').style.width = `${stats.avg_physical_progress}%`;

  // Render Charts
  ChartManager.renderCharts(stats);

  // Render Recent Projects in Dashboard Table
  const recentProjects = (await API.getProjects()).slice(0, 6);
  renderRecentProjectsTable(recentProjects);
}

// Render Recent Projects Table in Dashboard
function renderRecentProjectsTable(projects) {
  const tbody = document.getElementById('tbody-recent-projects');
  if (!tbody) return;

  if (projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">ව්‍යාපෘති කිසිවක් හමු නොවීය.</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map(p => {
    const progVal = p.latest_physical_progress || 0;
    return `
      <tr>
        <td class="text-center"><strong>#${p.serial_no || p.id}</strong></td>
        <td class="project-title-cell">
          <a href="javascript:void(0)" onclick="openDetailDrawer(${p.id})">${escapeHtml(p.title)}</a>
          <span class="project-meta-sub">${p.sanctioned_ref_date || ''}</span>
        </td>
        <td>${p.la_name}</td>
        <td><span class="badge" style="background: rgba(56,189,248,0.12); color: #38bdf8;">${p.programme_name}</span></td>
        <td class="text-right"><strong>${(parseFloat(p.estimated_cost_mn) || 0).toFixed(3)}</strong></td>
        <td>
          <div class="table-progress-box">
            <div class="table-progress-bar">
              <div class="table-progress-fill" style="width: ${progVal}%; background: ${getProgressColor(progVal)};"></div>
            </div>
            <span class="table-progress-val">${progVal}%</span>
          </div>
        </td>
        <td class="text-center">${getStageBadge(p.procurement_stage)}</td>
        <td class="text-center">
          <div class="action-btn-group">
            <button class="action-btn btn-eval" title="ප්‍රගති ඇගයීමක් එක් කරන්න" onclick="openProgressModal(${p.id})">
              <i class="fa-solid fa-clipboard-check"></i>
            </button>
            <button class="action-btn" title="විස්තර බලන්න" onclick="openDetailDrawer(${p.id})">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Load Main Projects List with Filters
async function loadProjects() {
  const filters = {
    search: document.getElementById('filter-search').value.trim(),
    la_id: document.getElementById('filter-la').value,
    programme_id: document.getElementById('filter-programme').value,
    procurement_stage: document.getElementById('filter-stage').value
  };

  AppState.filteredProjects = await API.getProjects(filters);
  AppState.allProjects = await API.getProjects();

  // Update Counts
  document.getElementById('nav-project-count').textContent = AppState.allProjects.length;
  document.getElementById('count-filtered-projects').textContent = AppState.filteredProjects.length;
  document.getElementById('count-total-projects').textContent = AppState.allProjects.length;

  renderMainProjectsTable(AppState.filteredProjects);
}

// Render Main Projects Table
function renderMainProjectsTable(projects) {
  const tbody = document.getElementById('tbody-main-projects');
  if (!tbody) return;

  if (projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center py-5 text-muted" style="padding: 2.5rem 0;">පෙරහන් වලට අදාළ ව්‍යාපෘති කිසිවක් හමු නොවීය.</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map(p => {
    const progVal = p.latest_physical_progress || 0;
    const spentVal = p.latest_spent_mn || 0;
    return `
      <tr>
        <td class="text-center"><strong>#${p.serial_no || p.id}</strong></td>
        <td class="project-title-cell">
          <a href="javascript:void(0)" onclick="openDetailDrawer(${p.id})">${escapeHtml(p.title)}</a>
          <span class="project-meta-sub">${p.sanctioned_ref_date ? `<i class="fa-regular fa-file-lines"></i> ${escapeHtml(p.sanctioned_ref_date)}` : ''}</span>
        </td>
        <td>${p.la_name}</td>
        <td><span class="badge" style="background: rgba(56,189,248,0.12); color: #38bdf8;">${p.programme_name}</span></td>
        <td class="text-right"><strong>${(parseFloat(p.estimated_cost_mn) || 0).toFixed(3)}</strong></td>
        <td class="text-right" style="color: var(--accent-emerald);"><strong>${(parseFloat(spentVal) || 0).toFixed(3)}</strong></td>
        <td>
          <div class="table-progress-box">
            <div class="table-progress-bar">
              <div class="table-progress-fill" style="width: ${progVal}%; background: ${getProgressColor(progVal)};"></div>
            </div>
            <span class="table-progress-val">${progVal}%</span>
          </div>
          ${p.latest_stage ? `<span class="badge badge-stage-${p.latest_stage.toLowerCase()}" style="font-size: 0.65rem; margin-top: 3px;">${p.latest_stage} (${p.latest_eval_date || ''})</span>` : ''}
        </td>
        <td class="text-center">${getStageBadge(p.procurement_stage)}</td>
        <td class="text-center">
          <div class="action-btn-group">
            <button class="action-btn btn-eval" title="ප්‍රගති ඇගයීමක් එක් කරන්න" onclick="openProgressModal(${p.id})">
              <i class="fa-solid fa-clipboard-check"></i>
            </button>
            <button class="action-btn" title="සංස්කරණය කරන්න" onclick="openProjectModal(${p.id})">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="action-btn btn-del" title="මකා දමන්න" onclick="handleDeleteProject(${p.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Local Authorities Cards Grid
async function renderLocalAuthoritiesView() {
  const las = await API.getLocalAuthorities();
  const grid = document.getElementById('grid-local-authorities');
  if (!grid) return;

  grid.innerHTML = las.map(la => `
    <div class="glass-card la-card">
      <div>
        <h3 class="la-card-title">${la.name}</h3>
        <div class="la-card-meta-row">
          <span>ක්‍රියාත්මක ව්‍යාපෘති:</span>
          <span class="la-card-meta-val"><strong style="color: var(--accent-purple);">${la.project_count}</strong> ක්</span>
        </div>
        <div class="la-card-meta-row">
          <span>වෙන්කළ මුළු පිරිවැය:</span>
          <span class="la-card-meta-val">Rs. <strong>${la.total_estimated_cost_mn.toFixed(3)}</strong> Mn</span>
        </div>
        <div class="la-card-meta-row">
          <span>සාමාන්‍ය භෞතික ප්‍රගතිය:</span>
          <span class="la-card-meta-val"><strong style="color: ${getProgressColor(la.avg_physical_progress)}">${la.avg_physical_progress}%</strong></span>
        </div>
        <div class="progress-mini-bar mt-3">
          <div class="progress-mini-fill" style="width: ${la.avg_physical_progress}%; background: ${getProgressColor(la.avg_physical_progress)}"></div>
        </div>
      </div>
      <div class="mt-3 text-right">
        <button class="btn btn-outline btn-sm" onclick="filterByLAAndSwitch(${la.id})">
          ව්‍යාපෘති බලන්න <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Render Programmes Cards Grid
async function renderProgrammesView() {
  const progs = await API.getProgrammes();
  const grid = document.getElementById('grid-programmes');
  if (!grid) return;

  const icons = [
    'fa-road', 'fa-city', 'fa-recycle', 'fa-faucet-drip', 'fa-tree', 'fa-screwdriver-wrench', 'fa-cubes'
  ];

  grid.innerHTML = progs.map((pr, idx) => `
    <div class="glass-card programme-card">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(56,189,248,0.15); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
          <i class="fa-solid ${icons[idx % icons.length]}"></i>
        </div>
        <div>
          <h3 class="prog-card-title">${pr.name}</h3>
          <span class="project-meta-sub">සංරචක අංක 0${pr.id}</span>
        </div>
      </div>
      
      <div class="la-card-meta-row">
        <span>ව්‍යාපෘති සංඛ්‍යාව:</span>
        <span class="la-card-meta-val"><strong style="color: var(--accent-blue);">${pr.project_count}</strong> ක්</span>
      </div>
      <div class="la-card-meta-row">
        <span>වෙන්කළ සම්පූර්ණ මුදල:</span>
        <span class="la-card-meta-val">Rs. <strong>${pr.total_estimated_cost_mn.toFixed(3)}</strong> Mn</span>
      </div>

      <div class="mt-3 text-right">
        <button class="btn btn-outline btn-sm" onclick="filterByProgAndSwitch(${pr.id})">
          මෙම සංරචකයේ ව්‍යාපෘති <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Render Printable Official Report
async function renderPrintableReport(laFilterId = '') {
  let projects = await API.getProjects();
  if (laFilterId) {
    projects = projects.filter(p => p.la_id === parseInt(laFilterId));
  }

  const tbody = document.getElementById('tbody-printable-report');
  if (!tbody) return;

  const totalCost = projects.reduce((s, p) => s + (parseFloat(p.estimated_cost_mn) || 0), 0);
  const totalSpent = projects.reduce((s, p) => s + (parseFloat(p.latest_spent_mn) || 0), 0);
  const avgProg = projects.length > 0 ? projects.reduce((s, p) => s + (p.latest_physical_progress || 0), 0) / projects.length : 0;

  document.getElementById('rep-sum-projects').textContent = `${projects.length} ක්`;
  document.getElementById('rep-sum-cost').textContent = `Rs. ${totalCost.toFixed(3)} Mn`;
  document.getElementById('rep-sum-spent').textContent = `Rs. ${totalSpent.toFixed(3)} Mn`;
  document.getElementById('rep-sum-prog').textContent = `${avgProg.toFixed(1)}%`;

  if (projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center py-4">තෝරාගත් කොන්දේසි යටතේ වාර්තා දත්ත නොමැත.</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map((p, idx) => `
    <tr>
      <td class="text-center">${idx + 1}</td>
      <td class="text-center">#${p.serial_no || p.id}</td>
      <td><strong>${escapeHtml(p.title)}</strong></td>
      <td>${p.la_name}</td>
      <td>${p.programme_name}</td>
      <td class="text-right">${(parseFloat(p.estimated_cost_mn) || 0).toFixed(3)}</td>
      <td class="text-right">${(parseFloat(p.latest_spent_mn) || 0).toFixed(3)}</td>
      <td class="text-center"><strong>${p.latest_physical_progress || 0}%</strong></td>
      <td class="text-center">${p.procurement_stage || 'Pending'}</td>
      <td style="font-size: 0.75rem;">${p.latest_notes ? escapeHtml(p.latest_notes.substring(0, 70)) + '...' : '-'}</td>
    </tr>
  `).join('');
}

function updateReportDate() {
  const d = new Date();
  const dateStr = d.toISOString().split('T')[0];
  const repDateEl = document.getElementById('rep-generated-date');
  if (repDateEl) repDateEl.textContent = dateStr;
}

// Filtering helpers
function handleFilterChange() {
  loadProjects();
}

function resetFilters() {
  document.getElementById('filter-search').value = '';
  document.getElementById('filter-la').value = '';
  document.getElementById('filter-programme').value = '';
  document.getElementById('filter-stage').value = '';
  loadProjects();
}

function filterByLAAndSwitch(laId) {
  document.getElementById('filter-la').value = laId;
  switchTab('projects');
  loadProjects();
}

function filterByProgAndSwitch(progId) {
  document.getElementById('filter-programme').value = progId;
  switchTab('projects');
  loadProjects();
}

// Modal Handlers: Project
async function openProjectModal(id = null) {
  const modal = document.getElementById('modal-project');
  const title = document.getElementById('modal-project-title');
  const form = document.getElementById('form-project');

  form.reset();
  document.getElementById('proj-id').value = '';

  if (id) {
    title.innerHTML = `<i class="fa-solid fa-pen-to-square text-purple"></i> <span>ව්‍යාපෘතිය සංස්කරණය කිරීම</span>`;
    const proj = await API.getProject(id);
    if (proj) {
      document.getElementById('proj-id').value = proj.id;
      document.getElementById('proj-serial').value = proj.serial_no || '';
      document.getElementById('proj-cost').value = proj.estimated_cost_mn;
      document.getElementById('proj-title').value = proj.title;
      document.getElementById('proj-la').value = proj.la_id;
      document.getElementById('proj-programme').value = proj.programme_id;
      document.getElementById('proj-req-date').value = proj.estimate_requested_date || '';
      document.getElementById('proj-rec-date').value = proj.estimate_received_date || '';
      document.getElementById('proj-sanctioned').value = proj.sanctioned_ref_date || '';
      document.getElementById('proj-proc-stage').value = proj.procurement_stage || 'Pending';
      document.getElementById('proj-award-status').value = proj.awarded_status || 'Not Started';
    }
  } else {
    title.innerHTML = `<i class="fa-solid fa-folder-plus text-purple"></i> <span data-i18n="modal_add_project">${I18N[AppState.currentLang].modal_add_project}</span>`;
  }

  modal.style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('modal-project').style.display = 'none';
}

async function handleSaveProject(e) {
  e.preventDefault();
  const projData = {
    id: document.getElementById('proj-id').value || null,
    serial_no: document.getElementById('proj-serial').value,
    title: document.getElementById('proj-title').value.trim(),
    la_id: document.getElementById('proj-la').value,
    programme_id: document.getElementById('proj-programme').value,
    estimated_cost_mn: document.getElementById('proj-cost').value,
    estimate_requested_date: document.getElementById('proj-req-date').value,
    estimate_received_date: document.getElementById('proj-rec-date').value,
    sanctioned_ref_date: document.getElementById('proj-sanctioned').value.trim(),
    procurement_stage: document.getElementById('proj-proc-stage').value,
    awarded_status: document.getElementById('proj-award-status').value
  };

  const res = await API.saveProject(projData);
  if (res.success) {
    showToast('ව්‍යාපෘතිය සාර්ථකව සුරකින ලදී!', 'success');
    closeProjectModal();
    await loadReferenceData();
    await loadProjects();
    await refreshDashboard();
  } else {
    showToast('දෝෂයක් සිදුවිය: ' + (res.error || 'නොදන්නා දෝෂයකි'), 'error');
  }
}

async function handleDeleteProject(id) {
  if (confirm('මෙම ව්‍යාපෘතිය සහ ඊට අදාළ සියලු ප්‍රගති ඇගයීම් සටහන් මකා දැමීමට ඔබට සහතිකද?')) {
    const res = await API.deleteProject(id);
    if (res.success) {
      showToast('ව්‍යාපෘතිය සාර්ථකව මකා දමන ලදී.', 'info');
      await loadReferenceData();
      await loadProjects();
      await refreshDashboard();
    }
  }
}

// Modal Handlers: Progress Evaluation
async function openProgressModal(projectId) {
  const proj = await API.getProject(projectId);
  if (!proj) return;

  AppState.activeProjectForEval = proj;

  document.getElementById('prog-project-id').value = proj.id;
  document.getElementById('form-progress').reset();
  
  // Set default evaluation date to today
  document.getElementById('prog-date').value = new Date().toISOString().split('T')[0];

  // Set default slider value to existing or 50
  const currentProgress = proj.latest_physical_progress || 0;
  const currentSpent = proj.latest_spent_mn || 0;
  
  document.getElementById('prog-physical-pct').value = currentProgress;
  document.getElementById('prog-slider-val').textContent = `${currentProgress}%`;
  document.getElementById('prog-spent').value = currentSpent > 0 ? currentSpent : '';

  // Project Info Banner in Modal
  document.getElementById('prog-modal-project-badge').innerHTML = `
    <strong>#${proj.serial_no || proj.id}:</strong> ${escapeHtml(proj.title)}<br>
    <small class="text-muted">${proj.la_name} | ඇස්තමේන්තුව: Rs. ${(parseFloat(proj.estimated_cost_mn) || 0).toFixed(3)} Mn</small>
  `;

  document.getElementById('modal-progress').style.display = 'flex';
}

function closeProgressModal() {
  document.getElementById('modal-progress').style.display = 'none';
}

async function handleSaveProgress(e) {
  e.preventDefault();
  const projectId = document.getElementById('prog-project-id').value;
  const updateData = {
    stage: document.getElementById('prog-stage').value,
    evaluation_date: document.getElementById('prog-date').value,
    physical_progress_pct: document.getElementById('prog-physical-pct').value,
    expenditure_spent_mn: document.getElementById('prog-spent').value,
    progress_notes: document.getElementById('prog-notes').value.trim()
  };

  const res = await API.addProgressUpdate(projectId, updateData);
  if (res.success) {
    showToast('ප්‍රගති ඇගයීම් වාර්තාව සාර්ථකව සුරකින ලදී!', 'success');
    closeProgressModal();
    await loadReferenceData();
    await loadProjects();
    await refreshDashboard();
  } else {
    showToast('දෝෂයක්: ' + (res.error || 'දත්ත සුරැකීමට නොහැකි විය'), 'error');
  }
}

// Detail Drawer Handler
async function openDetailDrawer(projectId) {
  const proj = await API.getProject(projectId);
  if (!proj) return;

  document.getElementById('drawer-proj-serial').textContent = `#${proj.serial_no || proj.id}`;
  document.getElementById('drawer-proj-title').textContent = proj.title;

  const content = document.getElementById('drawer-body-content');
  
  const updates = proj.progress_updates || [];
  const updatesHtml = updates.length > 0 
    ? updates.map(u => `
      <div class="timeline-item">
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <span class="badge badge-stage-${u.stage.toLowerCase()}">${u.stage} EVALUATION</span>
            <small class="text-muted"><i class="fa-regular fa-calendar"></i> ${u.evaluation_date}</small>
          </div>
          <div class="la-card-meta-row" style="margin-top: 0.5rem;">
            <span>භෞතික ප්‍රගතිය:</span>
            <strong style="color: ${getProgressColor(u.physical_progress_pct)}">${u.physical_progress_pct}%</strong>
          </div>
          <div class="la-card-meta-row">
            <span>වැය කළ මුදල:</span>
            <strong>Rs. ${(parseFloat(u.expenditure_spent_mn) || 0).toFixed(3)} Mn</strong>
          </div>
          ${u.progress_notes ? `<p style="font-size: 0.8rem; margin-top: 0.5rem; background: rgba(255,255,255,0.02); padding: 0.5rem; border-radius: 4px;">${escapeHtml(u.progress_notes)}</p>` : ''}
          <div class="text-right mt-3">
            <button class="btn btn-outline btn-sm text-rose" onclick="deleteProgressLog(${u.id}, ${proj.id})" style="font-size: 0.7rem; padding: 2px 6px;">
              <i class="fa-solid fa-trash"></i> මකන්න
            </button>
          </div>
        </div>
      </div>
    `).join('')
    : `<p class="text-muted text-center py-4">ප්‍රගති ඇගයීම් සටහන් කිසිවක් තවම ඇතුළත් කර නොමැත.</p>`;

  content.innerHTML = `
    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.5rem;">
      <div class="la-card-meta-row">
        <span>පළාත් පාලන ආයතනය:</span>
        <strong style="color: var(--accent-purple);">${proj.la_name}</strong>
      </div>
      <div class="la-card-meta-row">
        <span>සංරචකය:</span>
        <strong style="color: var(--accent-blue);">${proj.programme_name}</strong>
      </div>
      <div class="la-card-meta-row">
        <span>ඇස්තමේන්තුගත මුළු පිරිවැය:</span>
        <strong>Rs. ${(parseFloat(proj.estimated_cost_mn) || 0).toFixed(3)} Mn</strong>
      </div>
      <div class="la-card-meta-row">
        <span>අනුමැති අංකය හා දිනය:</span>
        <span>${proj.sanctioned_ref_date || '-'}</span>
      </div>
      <div class="la-card-meta-row">
        <span>ප්‍රසම්පාදන අදියර:</span>
        <span>${getStageBadge(proj.procurement_stage)}</span>
      </div>
      <div class="la-card-meta-row">
        <span>ප්‍රදාන තත්ත්වය:</span>
        <span>${proj.awarded_status || '-'}</span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h4 style="font-size: 0.95rem; font-weight: 700;"><i class="fa-solid fa-clock-rotate-left text-emerald"></i> ප්‍රගති ඇගයීම් කාලරේඛාව (Timeline)</h4>
      <button class="btn btn-success btn-sm" onclick="openProgressModal(${proj.id})">
        <i class="fa-solid fa-plus"></i> නව ඇගයීමක්
      </button>
    </div>

    <div class="timeline">
      ${updatesHtml}
    </div>
  `;

  document.getElementById('drawer-detail').style.display = 'flex';
}

function closeDetailDrawer() {
  document.getElementById('drawer-detail').style.display = 'none';
}

async function deleteProgressLog(evalId, projectId) {
  if (confirm('මෙම ප්‍රගති ඇගයීම් සටහන මකා දැමීමට අවශ්‍යද?')) {
    const res = await API.deleteProgressUpdate(evalId);
    if (res.success) {
      showToast('ප්‍රගති සටහන මකා දමන ලදී.', 'info');
      await openDetailDrawer(projectId);
      await loadReferenceData();
      await loadProjects();
      await refreshDashboard();
    }
  }
}

// Exports
function exportProjectsToCSV() {
  const projects = AppState.filteredProjects.length > 0 ? AppState.filteredProjects : AppState.allProjects;
  if (projects.length === 0) {
    showToast('බාගත කිරීමට දත්ත නොමැත.', 'info');
    return;
  }

  const headers = ['Serial No', 'Title', 'Local Authority', 'Programme', 'Estimated Cost (Rs. Mn)', 'Expenditure Spent (Rs. Mn)', 'Physical Progress (%)', 'Procurement Stage', 'Awarded Status', 'Sanctioned Ref'];
  const rows = projects.map(p => [
    `"${p.serial_no || p.id}"`,
    `"${(p.title || '').replace(/"/g, '""')}"`,
    `"${(p.la_name || '').replace(/"/g, '""')}"`,
    `"${(p.programme_name || '').replace(/"/g, '""')}"`,
    (parseFloat(p.estimated_cost_mn) || 0).toFixed(3),
    (parseFloat(p.latest_spent_mn) || 0).toFixed(3),
    (parseFloat(p.latest_physical_progress) || 0),
    `"${p.procurement_stage || 'Pending'}"`,
    `"${p.awarded_status || 'Not Started'}"`,
    `"${(p.sanctioned_ref_date || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `local_authorities_projects_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('CSV ගොනුව සාර්ථකව බාගත විය.', 'success');
}

async function exportPostgreSQLDump() {
  const sql = await API.getPostgreSQLDump();
  const blob = new Blob([sql], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `database_export_pg_${new Date().toISOString().split('T')[0]}.sql`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('PostgreSQL SQL ගොනුව සාර්ථකව බාගත විය.', 'success');
}

// Helpers & Utilities
function getStageBadge(stage) {
  const s = stage || 'Pending';
  let badgeClass = 'badge-pending';
  if (s === 'Bidding') badgeClass = 'badge-bidding';
  else if (s === 'Technical Evaluation') badgeClass = 'badge-evaluation';
  else if (s === 'Awarded') badgeClass = 'badge-awarded';
  else if (s === 'In Construction') badgeClass = 'badge-construction';
  else if (s === 'Completed') badgeClass = 'badge-completed';
  return `<span class="badge ${badgeClass}"><i class="fa-solid fa-circle" style="font-size: 6px;"></i> ${s}</span>`;
}

function getProgressColor(pct) {
  const p = parseFloat(pct) || 0;
  if (p < 30) return '#f43f5e';
  if (p < 70) return '#f59e0b';
  return '#10b981';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle text-blue';
  if (type === 'success') icon = 'fa-circle-check text-emerald';
  if (type === 'error') icon = 'fa-triangle-exclamation text-rose';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
