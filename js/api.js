/**
 * API Client Layer for Local Authorities Project Monitoring System
 * Handles backend REST API, offline persistence, SQL Import, and Direct Excel (.xlsx/.xls) Import Engine.
 */

const SEED_LOCAL_AUTHORITIES = [
  { id: 1, name: 'රත්නපුර මහා නගර සභාව' },
  { id: 2, name: 'ඇඹිලිපිටිය නගර සභාව' },
  { id: 3, name: 'බලන්ගොඩ නගර සභාව' },
  { id: 4, name: 'රත්නපුර ප්‍රාදේශීය සභාව' },
  { id: 5, name: 'අයගම ප්‍රාදේශීය සභාව' },
  { id: 6, name: 'කලවාන ප්‍රාදේශීය සභාව' },
  { id: 7, name: 'ඇහැලියගොඩ ප්‍රාදේශීය සභාව' },
  { id: 8, name: 'නිවිතිගල ප්‍රාදේශීය සභාව' },
  { id: 9, name: 'කහවත්ත ප්‍රාදේශීය සභාව' },
  { id: 10, name: 'ගොඩකවෙල ප්‍රාදේශීය සභාව' },
  { id: 11, name: 'කොලොන්න ප්‍රාදේශීය සභාව' },
  { id: 12, name: 'ඉඹුල්පේ ප්‍රාදේශීය සභාව' },
  { id: 13, name: 'බළන්ගොඩ ප්‍රාදේශීය සභාව' },
  { id: 14, name: 'කුරුවිට ප්‍රාදේශීය සභාව' },
  { id: 15, name: 'ඇඹිලිපිටිය ප්‍රාදේශීය සභාව' },
  { id: 16, name: 'වැලිගෙපොල ප්‍රාදේශීය සභාව' },
  { id: 17, name: 'පැල්මඩුල්ල ප්‍රාදේශීය සභාව' }
];

const SEED_PROGRAMMES = [
  { id: 1, name: 'පළාත් පාලන මාර්ග' },
  { id: 2, name: 'පළාත් පාලන සේවා පොදු පහසුකම්' },
  { id: 3, name: 'ඝණ අපද්‍රව්‍ය කළමණාකරණය' },
  { id: 4, name: 'ප්‍රජා ජල සැපයීම' },
  { id: 5, name: 'වතු යටිතල පහසුකම් සංවර්ධනය' },
  { id: 6, name: 'පළාත් පාලන සේවා පුනරාවර්තන' },
  { id: 7, name: 'පරිපූරක / CBG' }
];

const INITIAL_SAMPLE_PROJECTS = [
  {
    id: 1,
    serial_no: 101,
    title: 'රත්නපුර නගර සභා සීමාවේ ප්‍රධාන කාණු පද්ධතිය ප්‍රතිසංස්කරණය කිරීම',
    la_id: 1,
    programme_id: 2,
    estimated_cost_mn: 8.500,
    estimate_requested_date: '2026-01-10',
    estimate_received_date: '2026-01-25',
    sanctioned_ref_date: 'SAB/LG/2026/RD-01 (2026-02-05)',
    procurement_stage: 'In Construction',
    awarded_status: 'Awarded'
  },
  {
    id: 2,
    serial_no: 102,
    title: 'ඇඹිලිපිටිය නගර සභා ඝණ අපද්‍රව්‍ය ප්‍රතිචක්‍රීකරණ මධ්‍යස්ථානය වැඩිදියුණු කිරීම',
    la_id: 2,
    programme_id: 3,
    estimated_cost_mn: 14.200,
    estimate_requested_date: '2026-01-15',
    estimate_received_date: '2026-02-01',
    sanctioned_ref_date: 'SAB/LG/2026/SWM-04 (2026-02-18)',
    procurement_stage: 'In Construction',
    awarded_status: 'Awarded'
  },
  {
    id: 3,
    serial_no: 103,
    title: 'බලන්ගොඩ මැද්දකන්ද ප්‍රජා ජල යෝජනා ක්‍රමය ස්ථාපිත කිරීම',
    la_id: 3,
    programme_id: 4,
    estimated_cost_mn: 6.800,
    estimate_requested_date: '2026-02-01',
    estimate_received_date: '2026-02-20',
    sanctioned_ref_date: 'SAB/LG/2026/WTR-12 (2026-03-01)',
    procurement_stage: 'Completed',
    awarded_status: 'Awarded'
  },
  {
    id: 4,
    serial_no: 104,
    title: 'පැල්මඩුල්ල ප්‍රාදේශීය සභා බලප්‍රදේශයේ කහවත්ත - පැල්මඩුල්ල සම්බන්ධක මාර්ගය කාපට් අතුරා සංවර්ධනය',
    la_id: 17,
    programme_id: 1,
    estimated_cost_mn: 18.500,
    estimate_requested_date: '2026-01-20',
    estimate_received_date: '2026-02-12',
    sanctioned_ref_date: 'SAB/LG/2026/ROADS-21 (2026-02-28)',
    procurement_stage: 'In Construction',
    awarded_status: 'Awarded'
  },
  {
    id: 5,
    serial_no: 105,
    title: 'කුරුවිට ප්‍රාදේශීය සභා සීමාවේ වතු නිවාස ප්‍රජා ශාලාව ඉදිකිරීම',
    la_id: 14,
    programme_id: 5,
    estimated_cost_mn: 5.200,
    estimate_requested_date: '2026-03-01',
    estimate_received_date: '2026-03-22',
    sanctioned_ref_date: 'SAB/LG/2026/EST-03 (2026-04-10)',
    procurement_stage: 'In Construction',
    awarded_status: 'Awarded'
  },
  {
    id: 6,
    serial_no: 106,
    title: 'ඇහැලියගොඩ ප්‍රාදේශීය සභා පොදු සතිපොළ ගොඩනැගිල්ල ප්‍රතිසංස්කරණය',
    la_id: 7,
    programme_id: 2,
    estimated_cost_mn: 7.900,
    estimate_requested_date: '2026-02-14',
    estimate_received_date: '2026-03-05',
    sanctioned_ref_date: 'SAB/LG/2026/MKT-08 (2026-03-25)',
    procurement_stage: 'Technical Evaluation',
    awarded_status: 'Pending Award'
  },
  {
    id: 7,
    serial_no: 107,
    title: 'කලවාන ප්‍රාදේශීය සභා සීමාවේ කුඩා තේ වතු ප්‍රවේශ මාර්ග කොන්ක්‍රීට් කිරීම',
    la_id: 6,
    programme_id: 1,
    estimated_cost_mn: 4.600,
    estimate_requested_date: '2026-03-10',
    estimate_received_date: '2026-03-28',
    sanctioned_ref_date: 'SAB/LG/2026/RD-44 (2026-04-15)',
    procurement_stage: 'Completed',
    awarded_status: 'Awarded'
  },
  {
    id: 8,
    serial_no: 108,
    title: 'කොලොන්න ප්‍රාදේශීය සභා ග්‍රාමීය පානීය ජල සම්පාදන ව්‍යාපෘතිය (අදියර 1)',
    la_id: 11,
    programme_id: 4,
    estimated_cost_mn: 11.300,
    estimate_requested_date: '2026-04-01',
    estimate_received_date: '2026-04-25',
    sanctioned_ref_date: 'SAB/LG/2026/WTR-19 (2026-05-12)',
    procurement_stage: 'Bidding',
    awarded_status: 'Not Started'
  }
];

const INITIAL_PROGRESS_UPDATES = [
  { id: 1, project_id: 1, stage: 'PERIODIC', evaluation_date: '2026-03-15', physical_progress_pct: 35.0, expenditure_spent_mn: 2.800, progress_notes: 'මූලික කැණීම් සහ කොන්ක්‍රීට් ආවරණ සකස් කිරීම අවසන්.' },
  { id: 2, project_id: 1, stage: 'MID', evaluation_date: '2026-05-20', physical_progress_pct: 68.0, expenditure_spent_mn: 5.500, progress_notes: 'ප්‍රධාන බෝක්කු ඉදිකිරීම සහ පැති බැමි බැඳීම සාර්ථකව සිදු වෙමින් පවතී.' },
  { id: 3, project_id: 2, stage: 'MID', evaluation_date: '2026-06-10', physical_progress_pct: 55.0, expenditure_spent_mn: 7.450, progress_notes: 'යන්ත්‍රෝපකරණ සවිකිරීමේ ගොඩනැගිලි ව්‍යුහය නිම කරන ලදී.' },
  { id: 4, project_id: 3, stage: 'MID', evaluation_date: '2026-04-18', physical_progress_pct: 50.0, expenditure_spent_mn: 3.300, progress_notes: 'ජල ටැංකිය සහ ප්‍රධාන නල මාර්ගය එළීම අවසන්.' },
  { id: 5, project_id: 3, stage: 'END', evaluation_date: '2026-07-30', physical_progress_pct: 100.0, expenditure_spent_mn: 6.750, progress_notes: 'ජල සම්බන්ධතා ලබාදීම සහ පරීක්ෂණ සාර්ථකව අවසන් කර ප්‍රජාවට භාර දෙන ලදී.' },
  { id: 6, project_id: 4, stage: 'PERIODIC', evaluation_date: '2026-04-05', physical_progress_pct: 30.0, expenditure_spent_mn: 5.200, progress_notes: 'මාර්ගය පළල් කිරීම සහ ABC ස්ථරය දැමීම.' },
  { id: 7, project_id: 4, stage: 'MID', evaluation_date: '2026-07-15', physical_progress_pct: 75.0, expenditure_spent_mn: 13.800, progress_notes: 'තාර/කාපට් අතුරා අවසන් වෙමින් පවතී. කාණු පද්ධතිය ඉදිකෙරේ.' },
  { id: 8, project_id: 5, stage: 'MID', evaluation_date: '2026-06-25', physical_progress_pct: 45.0, expenditure_spent_mn: 2.150, progress_notes: 'බිත්ති බැඳීම හා වහලයේ වැඩ ආරම්භ විය.' },
  { id: 9, project_id: 7, stage: 'MID', evaluation_date: '2026-05-30', physical_progress_pct: 60.0, expenditure_spent_mn: 2.700, progress_notes: 'කොන්ක්‍රීට් දැමීම මීටර් 450ක් නිමයි.' },
  { id: 10, project_id: 7, stage: 'END', evaluation_date: '2026-08-05', physical_progress_pct: 100.0, expenditure_spent_mn: 4.550, progress_notes: 'ව්‍යාපෘතිය 100% ක් සාර්ථකව අවසන් කරන ලදී.' }
];

class LocalDataService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem('la_authorities')) {
      localStorage.setItem('la_authorities', JSON.stringify(SEED_LOCAL_AUTHORITIES));
    }
    if (!localStorage.getItem('la_programmes')) {
      localStorage.setItem('la_programmes', JSON.stringify(SEED_PROGRAMMES));
    }
    if (!localStorage.getItem('la_projects')) {
      localStorage.setItem('la_projects', JSON.stringify(INITIAL_SAMPLE_PROJECTS));
    }
    if (!localStorage.getItem('la_progress_updates')) {
      localStorage.setItem('la_progress_updates', JSON.stringify(INITIAL_PROGRESS_UPDATES));
    }
  }

  getLAs() {
    const las = JSON.parse(localStorage.getItem('la_authorities') || '[]');
    const projects = this.getProjects();
    return las.map(la => {
      const laProjs = projects.filter(p => p.la_id === la.id);
      const totalCost = laProjs.reduce((s, p) => s + (parseFloat(p.estimated_cost_mn) || 0), 0);
      const progsWithUpdate = laProjs.filter(p => p.latest_physical_progress !== undefined);
      const avgProg = progsWithUpdate.length > 0 
        ? progsWithUpdate.reduce((s, p) => s + p.latest_physical_progress, 0) / progsWithUpdate.length 
        : 0;
      return {
        ...la,
        project_count: laProjs.length,
        total_estimated_cost_mn: parseFloat(totalCost.toFixed(3)),
        avg_physical_progress: parseFloat(avgProg.toFixed(1))
      };
    });
  }

  getProgrammes() {
    const progs = JSON.parse(localStorage.getItem('la_programmes') || '[]');
    const projects = this.getProjects();
    return progs.map(pr => {
      const prProjs = projects.filter(p => p.programme_id === pr.id);
      const totalCost = prProjs.reduce((s, p) => s + (parseFloat(p.estimated_cost_mn) || 0), 0);
      return {
        ...pr,
        project_count: prProjs.length,
        total_estimated_cost_mn: parseFloat(totalCost.toFixed(3))
      };
    });
  }

  getProjects(filters = {}) {
    const projects = JSON.parse(localStorage.getItem('la_projects') || '[]');
    const las = JSON.parse(localStorage.getItem('la_authorities') || '[]');
    const programmes = JSON.parse(localStorage.getItem('la_programmes') || '[]');
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');

    let results = projects.map(p => {
      const la = las.find(l => l.id === p.la_id);
      const prog = programmes.find(pr => pr.id === p.programme_id);
      const projUpdates = updates.filter(u => u.project_id === p.id);
      
      let latestProg = null;
      if (projUpdates.length > 0) {
        latestProg = projUpdates[projUpdates.length - 1];
      }

      return {
        ...p,
        la_name: la ? la.name : (p.la_name || `L.A. #${p.la_id}`),
        programme_name: prog ? prog.name : (p.programme_name || `Programme #${p.programme_id}`),
        latest_physical_progress: latestProg ? parseFloat(latestProg.physical_progress_pct) : 0,
        latest_spent_mn: latestProg ? parseFloat(latestProg.expenditure_spent_mn) : 0,
        latest_stage: latestProg ? latestProg.stage : null,
        latest_eval_date: latestProg ? latestProg.evaluation_date : null,
        latest_notes: latestProg ? latestProg.progress_notes : null
      };
    });

    if (filters.la_id) {
      results = results.filter(p => p.la_id === parseInt(filters.la_id));
    }
    if (filters.programme_id) {
      results = results.filter(p => p.programme_id === parseInt(filters.programme_id));
    }
    if (filters.procurement_stage) {
      results = results.filter(p => p.procurement_stage === filters.procurement_stage);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.serial_no && p.serial_no.toString().includes(q)) ||
        (p.la_name && p.la_name.toLowerCase().includes(q))
      );
    }

    return results.sort((a, b) => (a.serial_no || a.id) - (b.serial_no || b.id));
  }

  getProject(id) {
    const projects = this.getProjects();
    const proj = projects.find(p => p.id === parseInt(id));
    if (!proj) return null;

    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    const projUpdates = updates
      .filter(u => u.project_id === parseInt(id))
      .sort((a, b) => new Date(a.evaluation_date) - new Date(b.evaluation_date));

    return { ...proj, progress_updates: projUpdates };
  }

  saveProject(data) {
    const projects = JSON.parse(localStorage.getItem('la_projects') || '[]');
    if (data.id) {
      const index = projects.findIndex(p => p.id === parseInt(data.id));
      if (index !== -1) {
        projects[index] = {
          ...projects[index],
          serial_no: data.serial_no ? parseInt(data.serial_no) : projects[index].serial_no,
          title: data.title,
          la_id: parseInt(data.la_id),
          programme_id: parseInt(data.programme_id),
          estimated_cost_mn: parseFloat(data.estimated_cost_mn) || 0,
          estimate_requested_date: data.estimate_requested_date || null,
          estimate_received_date: data.estimate_received_date || null,
          sanctioned_ref_date: data.sanctioned_ref_date || null,
          procurement_stage: data.procurement_stage || 'Pending',
          awarded_status: data.awarded_status || 'Not Started'
        };
        localStorage.setItem('la_projects', JSON.stringify(projects));
        return { success: true, id: data.id };
      }
    } else {
      const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      const newProj = {
        id: nextId,
        serial_no: data.serial_no ? parseInt(data.serial_no) : nextId + 100,
        title: data.title,
        la_id: parseInt(data.la_id),
        programme_id: parseInt(data.programme_id),
        estimated_cost_mn: parseFloat(data.estimated_cost_mn) || 0,
        estimate_requested_date: data.estimate_requested_date || null,
        estimate_received_date: data.estimate_received_date || null,
        sanctioned_ref_date: data.sanctioned_ref_date || null,
        procurement_stage: data.procurement_stage || 'Pending',
        awarded_status: data.awarded_status || 'Not Started',
        created_at: new Date().toISOString()
      };
      projects.push(newProj);
      localStorage.setItem('la_projects', JSON.stringify(projects));
      return { success: true, id: nextId };
    }
  }

  deleteProject(id) {
    let projects = JSON.parse(localStorage.getItem('la_projects') || '[]');
    let updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    projects = projects.filter(p => p.id !== parseInt(id));
    updates = updates.filter(u => u.project_id !== parseInt(id));
    localStorage.setItem('la_projects', JSON.stringify(projects));
    localStorage.setItem('la_progress_updates', JSON.stringify(updates));
    return { success: true };
  }

  getProgressUpdates(projectId) {
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    return updates
      .filter(u => u.project_id === parseInt(projectId))
      .sort((a, b) => new Date(a.evaluation_date) - new Date(b.evaluation_date) || a.id - b.id);
  }

  getProgressUpdate(id) {
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    return updates.find(u => u.id === parseInt(id)) || null;
  }

  addProgressUpdate(projectId, updateData) {
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    const nextId = updates.length > 0 ? Math.max(...updates.map(u => u.id)) + 1 : 1;
    const newLog = {
      id: nextId,
      project_id: parseInt(projectId),
      stage: updateData.stage || 'PERIODIC',
      evaluation_date: updateData.evaluation_date || new Date().toISOString().split('T')[0],
      physical_progress_pct: parseFloat(updateData.physical_progress_pct) || 0,
      expenditure_spent_mn: parseFloat(updateData.expenditure_spent_mn) || 0,
      progress_notes: updateData.progress_notes || '',
      updated_at: new Date().toISOString()
    };
    updates.push(newLog);
    localStorage.setItem('la_progress_updates', JSON.stringify(updates));

    this.recalculateProjectStage(projectId);

    return { success: true, id: nextId, log: newLog };
  }

  updateProgressUpdate(id, updateData) {
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    const idx = updates.findIndex(u => u.id === parseInt(id));
    if (idx === -1) {
      return { success: false, error: 'Progress log not found' };
    }

    updates[idx] = {
      ...updates[idx],
      stage: updateData.stage || updates[idx].stage,
      evaluation_date: updateData.evaluation_date || updates[idx].evaluation_date,
      physical_progress_pct: updateData.physical_progress_pct !== undefined ? parseFloat(updateData.physical_progress_pct) : updates[idx].physical_progress_pct,
      expenditure_spent_mn: updateData.expenditure_spent_mn !== undefined ? parseFloat(updateData.expenditure_spent_mn) : updates[idx].expenditure_spent_mn,
      progress_notes: updateData.progress_notes !== undefined ? updateData.progress_notes : updates[idx].progress_notes,
      updated_at: new Date().toISOString()
    };

    localStorage.setItem('la_progress_updates', JSON.stringify(updates));
    this.recalculateProjectStage(updates[idx].project_id);

    return { success: true, log: updates[idx] };
  }

  deleteProgressUpdate(id) {
    let updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    const target = updates.find(u => u.id === parseInt(id));
    const projectId = target ? target.project_id : null;

    updates = updates.filter(u => u.id !== parseInt(id));
    localStorage.setItem('la_progress_updates', JSON.stringify(updates));

    if (projectId) {
      this.recalculateProjectStage(projectId);
    }
    return { success: true };
  }

  recalculateProjectStage(projectId) {
    const projects = JSON.parse(localStorage.getItem('la_projects') || '[]');
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');
    const projIdx = projects.findIndex(p => p.id === parseInt(projectId));
    if (projIdx === -1) return;

    const projLogs = updates.filter(u => u.project_id === parseInt(projectId));
    if (projLogs.length > 0) {
      const latestLog = projLogs[projLogs.length - 1];
      if (latestLog.physical_progress_pct >= 100 || latestLog.stage === 'END') {
        projects[projIdx].procurement_stage = 'Completed';
        projects[projIdx].awarded_status = 'Completed';
      } else if (latestLog.physical_progress_pct > 0) {
        if (['Pending', 'Bidding', 'Technical Evaluation'].includes(projects[projIdx].procurement_stage)) {
          projects[projIdx].procurement_stage = 'In Construction';
          projects[projIdx].awarded_status = 'Awarded';
        }
      }
    }
    localStorage.setItem('la_projects', JSON.stringify(projects));
  }

  getDashboardStats() {
    const projects = this.getProjects();
    const las = this.getLAs();
    const programmes = this.getProgrammes();

    const totalProjects = projects.length;
    const totalCost = projects.reduce((s, p) => s + (parseFloat(p.estimated_cost_mn) || 0), 0);
    const totalSpent = projects.reduce((s, p) => s + (parseFloat(p.latest_spent_mn) || 0), 0);
    const avgProgress = totalProjects > 0 
      ? projects.reduce((s, p) => s + (p.latest_physical_progress || 0), 0) / totalProjects 
      : 0;

    const stageMap = {};
    projects.forEach(p => {
      const stage = p.procurement_stage || 'Pending';
      stageMap[stage] = (stageMap[stage] || 0) + 1;
    });
    const stageBreakdown = Object.keys(stageMap).map(stage => ({ procurement_stage: stage, count: stageMap[stage] }));

    const programmeBreakdown = programmes.map(pr => ({
      name: pr.name,
      project_count: pr.project_count,
      total_cost_mn: pr.total_estimated_cost_mn
    }));

    const laBreakdown = las.map(la => ({
      name: la.name,
      project_count: la.project_count,
      total_cost_mn: la.total_estimated_cost_mn
    })).sort((a, b) => b.total_cost_mn - a.total_cost_mn);

    return {
      total_projects: totalProjects,
      total_estimated_cost_mn: parseFloat(totalCost.toFixed(3)),
      total_spent_mn: parseFloat(totalSpent.toFixed(3)),
      avg_physical_progress: parseFloat(avgProgress.toFixed(1)),
      stage_breakdown: stageBreakdown,
      programme_breakdown: programmeBreakdown,
      la_breakdown: laBreakdown
    };
  }

  generatePostgresSQL() {
    const las = JSON.parse(localStorage.getItem('la_authorities') || '[]');
    const progs = JSON.parse(localStorage.getItem('la_programmes') || '[]');
    const projs = JSON.parse(localStorage.getItem('la_projects') || '[]');
    const updates = JSON.parse(localStorage.getItem('la_progress_updates') || '[]');

    return `-- Local Authorities Project Management System Export (PostgreSQL Compatible)
-- Generated: ${new Date().toISOString()}

BEGIN;

-- Insert Local Authorities
${las.map(la => `INSERT INTO local_authorities (id, name) VALUES (${la.id}, '${(la.name || '').replace(/'/g, "''")}') ON CONFLICT (id) DO NOTHING;`).join('\n')}

-- Insert Programmes
${progs.map(p => `INSERT INTO programmes (id, name) VALUES (${p.id}, '${(p.name || '').replace(/'/g, "''")}') ON CONFLICT (id) DO NOTHING;`).join('\n')}

-- Insert Projects
${projs.map(p => `INSERT INTO projects (id, serial_no, title, la_id, programme_id, estimated_cost_mn, estimate_requested_date, estimate_received_date, sanctioned_ref_date, procurement_stage, awarded_status) VALUES (${p.id}, ${p.serial_no || 'NULL'}, '${(p.title || '').replace(/'/g, "''")}', ${p.la_id}, ${p.programme_id}, ${p.estimated_cost_mn || 0}, ${p.estimate_requested_date ? `'${p.estimate_requested_date}'` : 'NULL'}, ${p.estimate_received_date ? `'${p.estimate_received_date}'` : 'NULL'}, ${p.sanctioned_ref_date ? `'${(p.sanctioned_ref_date || '').replace(/'/g, "''")}'` : 'NULL'}, '${p.procurement_stage || 'Pending'}', '${p.awarded_status || 'Not Started'}');`).join('\n')}

-- Insert Progress Updates
${updates.map(l => `INSERT INTO progress_updates (id, project_id, stage, evaluation_date, physical_progress_pct, expenditure_spent_mn, progress_notes) VALUES (${l.id}, ${l.project_id}, '${l.stage || 'PERIODIC'}', '${l.evaluation_date || new Date().toISOString().split('T')[0]}', ${l.physical_progress_pct || 0}, ${l.expenditure_spent_mn || 0}, '${(l.progress_notes || '').replace(/'/g, "''")}');`).join('\n')}

COMMIT;
`;
  }

  resolveLAId(inputVal, las) {
    if (!inputVal) return 1;
    if (!isNaN(inputVal)) {
      const idNum = parseInt(inputVal);
      if (las.some(l => l.id === idNum)) return idNum;
    }
    const cleanStr = String(inputVal).trim().toLowerCase();
    const found = las.find(l => l.name.toLowerCase().includes(cleanStr) || cleanStr.includes(l.name.toLowerCase()));
    if (found) return found.id;
    
    // Auto-create local authority if new
    const nextId = las.length > 0 ? Math.max(...las.map(l => l.id)) + 1 : 1;
    const newLA = { id: nextId, name: String(inputVal).trim() };
    las.push(newLA);
    localStorage.setItem('la_authorities', JSON.stringify(las));
    return nextId;
  }

  resolveProgrammeId(inputVal, progs) {
    if (!inputVal) return 1;
    if (!isNaN(inputVal)) {
      const idNum = parseInt(inputVal);
      if (progs.some(p => p.id === idNum)) return idNum;
    }
    const cleanStr = String(inputVal).trim().toLowerCase();
    const found = progs.find(p => p.name.toLowerCase().includes(cleanStr) || cleanStr.includes(p.name.toLowerCase()));
    if (found) return found.id;

    // Auto-create programme if new
    const nextId = progs.length > 0 ? Math.max(...progs.map(p => p.id)) + 1 : 1;
    const newProg = { id: nextId, name: String(inputVal).trim() };
    progs.push(newProg);
    localStorage.setItem('la_programmes', JSON.stringify(progs));
    return nextId;
  }

  /**
   * Advanced PSDG Multi-Sheet & Tabular Excel Parser
   * Accurately parses PSDG (1).xlsx format across all council sheets!
   */
  importExcelWorkbook(workbook, mode = 'merge') {
    let las = JSON.parse(localStorage.getItem('la_authorities') || '[]');
    let progs = JSON.parse(localStorage.getItem('la_programmes') || '[]');
    let projs = mode === 'replace' ? [] : JSON.parse(localStorage.getItem('la_projects') || '[]');
    let updates = mode === 'replace' ? [] : JSON.parse(localStorage.getItem('la_progress_updates') || '[]');

    let projectsImported = 0;
    let updatesImported = 0;
    let serialCounter = projs.length > 0 ? Math.max(...projs.map(p => p.serial_no || p.id)) + 1 : 101;

    // Check if this is the multi-sheet PSDG official workbook
    const sheetNames = workbook.SheetNames;

    sheetNames.forEach(sheetName => {
      // Ignore reference list sheet if created by template
      if (sheetName === 'Reference_List') return;

      const worksheet = workbook.Sheets[sheetName];
      const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
      if (!rawRows || rawRows.length === 0) return;

      // Detect if sheet has structured tabular headers on row 0
      const firstRow = rawRows[0] || [];
      const hasTabularHeaders = firstRow.some(cell => {
        const s = String(cell).toLowerCase();
        return s.includes('title') || s.includes('නම') || s.includes('project') || s.includes('serial');
      });

      if (hasTabularHeaders && rawRows.length > 1) {
        // Standard Tabular Sheet
        const objects = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        const res = this.importExcelRows(objects, 'merge');
        projectsImported += res.projects_imported;
        updatesImported += res.updates_imported;
      } else {
        // Multi-Sheet PSDG Format Parser (Matches your Python algorithm exactly!)
        let laName = sheetName.trim();
        for (let r = 0; r < Math.min(6, rawRows.length); r++) {
          const row0 = rawRows[r];
          const val0 = String(row0[0] || '').trim();
          if (val0.includes('පළාත් පාලන ආයතනය')) {
            const parts = val0.split('-');
            if (parts.length >= 2) {
              laName = parts[1].trim();
            }
            break;
          }
        }

        const laId = this.resolveLAId(laName, las);
        let currentProgramme = 'පළාත් පාලන සේවා පොදු පහසුකම්';

        for (let idx = 0; idx < rawRows.length; idx++) {
          const row = rawRows[idx] || [];
          const v0 = String(row[0] || '').trim();
          const v1 = String(row[1] || '').trim();

          if (v0.includes('සංරචකය') || v1.includes('සංරචකය')) {
            const compStr = v0.includes('සංරචකය') ? v0 : v1;
            currentProgramme = compStr.replace('සංරචකය -', '').replace('සංරචකය-', '').replace('සංරචකය', '').trim();
            continue;
          }
          if (v0.startsWith('2025 Bill') || v0.startsWith('2025 Bills') || v0.startsWith('2026 Bill')) {
            currentProgramme = v0;
            continue;
          }

          if (v1 && v1 !== 'ව්යාපෘතියේ නම' && v1 !== 'ව්‍යාපෘතියේ නම' && v1 !== 'nan' && !v1.startsWith('පළාත් පාලන ආයතනය') && !v1.startsWith('Community Water')) {
            if (v0.includes('අනු අංකය') || v1.includes('ව්යාපෘතියේ නම') || v1.includes('ව්‍යාපෘතියේ නම')) {
              continue;
            }

            const progId = this.resolveProgrammeId(currentProgramme, progs);
            
            // Extract estimated cost
            let estCost = 0;
            if (row.length > 3 && row[3] !== undefined && row[3] !== '') {
              const costStr = String(row[3]).replace(/Mn/gi, '').replace(/,/g, '').trim();
              estCost = parseFloat(costStr) || 0;
            }

            // Extract Sanctioned Ref & Date
            const sanctionedRef = (row.length > 6 && row[6] !== undefined) ? String(row[6]).trim() : '';

            // Extract Expenditure Spent
            let expenditureSpent = 0;
            if (row.length > 16 && row[16] !== undefined && row[16] !== '') {
              const expStr = String(row[16]).replace(/,/g, '').trim();
              expenditureSpent = parseFloat(expStr) || 0;
            }

            // Determine Procurement Stage & Physical Progress %
            let procStage = 'Pending';
            let progressPct = 0;

            if (row.length > 15 && row[15] !== undefined && String(row[15]).trim() !== '') {
              procStage = 'Completed';
              progressPct = 100;
            } else if (row.length > 14 && row[14] !== undefined && String(row[14]).trim() !== '') {
              procStage = 'In Construction';
              progressPct = 75;
            } else if (row.length > 13 && row[13] !== undefined && String(row[13]).trim() !== '') {
              procStage = 'In Construction';
              progressPct = 38;
            } else if (row.length > 12 && row[12] !== undefined && String(row[12]).trim() !== '') {
              procStage = 'In Construction';
              progressPct = 15;
            } else if (row.length > 10 && row[10] !== undefined && String(row[10]).trim() !== '') {
              procStage = 'Awarded';
              progressPct = 0;
            } else if (row.length > 9 && row[9] !== undefined && String(row[9]).trim() !== '') {
              procStage = 'Technical Evaluation';
              progressPct = 0;
            } else if (row.length > 8 && row[8] !== undefined && String(row[8]).trim() !== '') {
              procStage = 'Bidding';
              progressPct = 0;
            } else if (row.length > 7 && row[7] !== undefined && String(row[7]).trim() !== '') {
              procStage = 'Bidding';
              progressPct = 0;
            }

            // Notes
            const notesArr = [];
            if (row.length > 17 && row[17] !== undefined && String(row[17]).trim() !== '') notesArr.push(String(row[17]).trim());
            if (row.length > 18 && row[18] !== undefined && String(row[18]).trim() !== '') notesArr.push(String(row[18]).trim());
            const notes = notesArr.join(' | ');

            const nextProjId = projs.length > 0 ? Math.max(...projs.map(p => p.id)) + 1 : 1;
            const newProject = {
              id: nextProjId,
              serial_no: serialCounter++,
              title: v1,
              la_id: laId,
              programme_id: progId,
              estimated_cost_mn: estCost,
              estimate_requested_date: null,
              estimate_received_date: null,
              sanctioned_ref_date: sanctionedRef || null,
              procurement_stage: procStage,
              awarded_status: progressPct > 0 ? 'Awarded' : 'Not Started',
              created_at: new Date().toISOString()
            };

            projs.push(newProject);
            projectsImported++;

            if (progressPct > 0 || expenditureSpent > 0 || notes) {
              const nextUpdId = updates.length > 0 ? Math.max(...updates.map(u => u.id)) + 1 : 1;
              const evalStage = progressPct >= 100 ? 'END' : (progressPct >= 50 ? 'MID' : 'PERIODIC');
              updates.push({
                id: nextUpdId,
                project_id: nextProjId,
                stage: evalStage,
                evaluation_date: new Date().toISOString().split('T')[0],
                physical_progress_pct: progressPct,
                expenditure_spent_mn: expenditureSpent,
                progress_notes: notes || '',
                updated_at: new Date().toISOString()
              });
              updatesImported++;
            }
          }
        }
      }
    });

    localStorage.setItem('la_projects', JSON.stringify(projs));
    localStorage.setItem('la_progress_updates', JSON.stringify(updates));

    return {
      success: true,
      projects_imported: projectsImported,
      updates_imported: updatesImported,
      total_projects: projs.length,
      total_updates: updates.length
    };
  }

  importExcelRows(rawRows, mode = 'merge') {
    if (!rawRows || !Array.isArray(rawRows) || rawRows.length === 0) {
      return { success: false, error: 'Excel ගොනුවේ දත්ත පේළි කිසිවක් හමු නොවීය' };
    }

    let las = JSON.parse(localStorage.getItem('la_authorities') || '[]');
    let progs = JSON.parse(localStorage.getItem('la_programmes') || '[]');
    let projs = mode === 'replace' ? [] : JSON.parse(localStorage.getItem('la_projects') || '[]');
    let updates = mode === 'replace' ? [] : JSON.parse(localStorage.getItem('la_progress_updates') || '[]');

    let projectsImported = 0;
    let updatesImported = 0;

    rawRows.forEach((row) => {
      const getVal = (...possibleKeys) => {
        for (const k of Object.keys(row)) {
          const cleanK = k.trim().toLowerCase();
          for (const pk of possibleKeys) {
            if (cleanK === pk.toLowerCase() || cleanK.includes(pk.toLowerCase())) {
              return row[k];
            }
          }
        }
        return undefined;
      };

      const title = getVal('title', 'Project Title', 'ව්‍යාපෘති නාමය', 'ව්‍යාපෘතිය', 'නම', 'Name');
      if (!title) return;

      const serialNoRaw = getVal('serial_no', 'Serial No', 'අනුක්‍රමික අංකය', 'අංකය', 'No', 'ID');
      const laRaw = getVal('la_name', 'la_id', 'Local Authority', 'පළාත් පාලන ආයතනය', 'ආයතනය', 'සභාව', 'LA');
      const progRaw = getVal('programme_name', 'programme_id', 'Programme', 'Component', 'සංරචකය', 'වැඩසටහන', 'PROG');
      const costRaw = getVal('estimated_cost_mn', 'Estimated Cost (Rs. Mn)', 'Estimated Cost', 'ඇස්තමේන්තුව', 'පිරිවැය', 'Cost', 'Budget');
      const spentRaw = getVal('expenditure_spent_mn', 'Expenditure Spent (Rs. Mn)', 'Spent', 'වැයවූ මුදල', 'වියදම');
      const progressRaw = getVal('physical_progress_pct', 'Physical Progress (%)', 'Progress', 'භෞතික ප්‍රගතිය', 'ප්‍රගතිය');
      const stageRaw = getVal('procurement_stage', 'Procurement Stage', 'ප්‍රසම්පාදන අදියර', 'අදියර', 'Status');
      const refRaw = getVal('sanctioned_ref_date', 'Sanctioned Ref', 'අනුමැති අංකය', 'ලිපි අංකය');
      const notesRaw = getVal('progress_notes', 'Notes', 'ප්‍රගති සටහන්', 'නිරීක්ෂණ');

      const laId = this.resolveLAId(laRaw, las);
      const progId = this.resolveProgrammeId(progRaw, progs);
      const costMn = parseFloat(costRaw) || 0;
      const spentMn = spentRaw !== undefined ? (parseFloat(spentRaw) || 0) : 0;
      const progPct = progressRaw !== undefined ? (parseFloat(progressRaw) || 0) : 0;

      const nextProjId = projs.length > 0 ? Math.max(...projs.map(p => p.id)) + 1 : 1;
      const projSerial = serialNoRaw ? parseInt(serialNoRaw) : (100 + nextProjId);

      const newProj = {
        id: nextProjId,
        serial_no: projSerial,
        title: String(title).trim(),
        la_id: laId,
        programme_id: progId,
        estimated_cost_mn: costMn,
        estimate_requested_date: null,
        estimate_received_date: null,
        sanctioned_ref_date: refRaw ? String(refRaw).trim() : null,
        procurement_stage: stageRaw ? String(stageRaw).trim() : (progPct >= 100 ? 'Completed' : (progPct > 0 ? 'In Construction' : 'Pending')),
        awarded_status: progPct > 0 ? 'Awarded' : 'Not Started',
        created_at: new Date().toISOString()
      };

      const existingIdx = projs.findIndex(p => (p.serial_no && p.serial_no === newProj.serial_no) || p.title === newProj.title);
      let targetProjectId = newProj.id;

      if (existingIdx !== -1) {
        projs[existingIdx] = { ...projs[existingIdx], ...newProj, id: projs[existingIdx].id };
        targetProjectId = projs[existingIdx].id;
      } else {
        projs.push(newProj);
      }
      projectsImported++;

      if (progPct > 0 || spentMn > 0 || notesRaw) {
        const nextUpdId = updates.length > 0 ? Math.max(...updates.map(u => u.id)) + 1 : 1;
        const evalStage = progPct >= 100 ? 'END' : (progPct >= 50 ? 'MID' : 'PERIODIC');
        
        updates.push({
          id: nextUpdId,
          project_id: targetProjectId,
          stage: evalStage,
          evaluation_date: new Date().toISOString().split('T')[0],
          physical_progress_pct: Math.min(100, Math.max(0, progPct)),
          expenditure_spent_mn: spentMn,
          progress_notes: notesRaw ? String(notesRaw).trim() : '',
          updated_at: new Date().toISOString()
        });

        updatesImported++;
      }
    });

    localStorage.setItem('la_projects', JSON.stringify(projs));
    localStorage.setItem('la_progress_updates', JSON.stringify(updates));

    return {
      success: true,
      projects_imported: projectsImported,
      updates_imported: updatesImported,
      total_projects: projs.length,
      total_updates: updates.length
    };
  }

  importSQL(sqlText, mode = 'merge') {
    if (!sqlText || typeof sqlText !== 'string') {
      return { success: false, error: 'හිස් හෝ වැරදි SQL ගොනුවකි' };
    }

    let las = JSON.parse(localStorage.getItem('la_authorities') || '[]');
    let progs = JSON.parse(localStorage.getItem('la_programmes') || '[]');
    let projs = mode === 'replace' ? [] : JSON.parse(localStorage.getItem('la_projects') || '[]');
    let updates = mode === 'replace' ? [] : JSON.parse(localStorage.getItem('la_progress_updates') || '[]');

    let projectsImported = 0;
    let updatesImported = 0;

    const parseValuesTuples = (valuesStr) => {
      const results = [];
      let inString = false;
      let stringChar = '';
      let currentVal = '';
      let currentTuple = [];
      let depth = 0;

      for (let i = 0; i < valuesStr.length; i++) {
        const char = valuesStr[i];
        const nextChar = valuesStr[i + 1];

        if (inString) {
          if (char === "'" && nextChar === "'") {
            currentVal += "'";
            i++;
          } else if (char === stringChar) {
            inString = false;
          } else {
            currentVal += char;
          }
        } else {
          if (char === "'" || char === '"') {
            inString = true;
            stringChar = char;
          } else if (char === '(') {
            depth++;
            if (depth === 1) {
              currentTuple = [];
              currentVal = '';
            }
          } else if (char === ')') {
            depth--;
            if (depth === 0) {
              currentTuple.push(cleanSqlVal(currentVal));
              results.push(currentTuple);
              currentTuple = [];
              currentVal = '';
            }
          } else if (char === ',' && depth === 1) {
            currentTuple.push(cleanSqlVal(currentVal));
            currentVal = '';
          } else if (depth === 1) {
            currentVal += char;
          }
        }
      }
      return results;
    };

    const cleanSqlVal = (val) => {
      const v = val.trim();
      if (v.toUpperCase() === 'NULL' || v === '') return null;
      if (!isNaN(v) && v !== '') return parseFloat(v);
      return v;
    };

    const insertRegex = /INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*(?:\(([^)]+)\))?\s*VALUES\s*([\s\S]+?);/gi;
    let match;

    while ((match = insertRegex.exec(sqlText)) !== null) {
      const tableName = match[1].toLowerCase().trim();
      const colNamesStr = match[2] ? match[2].toLowerCase().replace(/[\s`"']/g, '').split(',') : [];
      const valuesBlock = match[3];
      const tuples = parseValuesTuples(valuesBlock);

      if (tableName === 'projects') {
        tuples.forEach(t => {
          const rowObj = {};
          if (colNamesStr.length > 0) {
            colNamesStr.forEach((c, idx) => { rowObj[c] = t[idx]; });
          } else {
            rowObj.serial_no = t[0];
            rowObj.title = t[1];
            rowObj.local_authority = t[2];
            rowObj.programme = t[3];
            rowObj.estimated_cost_mn = t[4];
            rowObj.expenditure_spent_mn = t[5];
            rowObj.physical_progress_pct = t[6];
            rowObj.procurement_stage = t[7];
            rowObj.sanctioned_ref_date = t[8];
            rowObj.progress_notes = t[9];
          }

          const projectTitle = rowObj.project_title || rowObj.title;
          if (projectTitle) {
            const laId = this.resolveLAId(rowObj.local_authority || rowObj.la_id, las);
            const progId = this.resolveProgrammeId(rowObj.programme || rowObj.programme_id, progs);
            const costMn = parseFloat(rowObj.estimated_cost_rs_mn || rowObj.estimated_cost_mn || 0) || 0;
            const spentMn = parseFloat(rowObj.expenditure_spent_rs_mn || rowObj.expenditure_spent_mn || 0) || 0;
            const progPct = parseFloat(rowObj.physical_progress_percent || rowObj.physical_progress_pct || 0) || 0;

            const nextProjId = projs.length > 0 ? Math.max(...projs.map(p => p.id)) + 1 : 1;
            const formatted = {
              id: nextProjId,
              serial_no: rowObj.serial_no ? parseInt(rowObj.serial_no) : nextProjId + 100,
              title: String(projectTitle),
              la_id: laId,
              programme_id: progId,
              estimated_cost_mn: costMn,
              estimate_requested_date: null,
              estimate_received_date: null,
              sanctioned_ref_date: rowObj.sanctioned_ref || rowObj.sanctioned_ref_date || null,
              procurement_stage: rowObj.procurement_stage || (progPct >= 100 ? 'Completed' : 'Pending'),
              awarded_status: progPct > 0 ? 'Awarded' : 'Not Started'
            };

            projs.push(formatted);
            projectsImported++;

            if (progPct > 0 || spentMn > 0 || rowObj.notes || rowObj.progress_notes) {
              const nextUpdId = updates.length > 0 ? Math.max(...updates.map(u => u.id)) + 1 : 1;
              updates.push({
                id: nextUpdId,
                project_id: nextProjId,
                stage: progPct >= 100 ? 'END' : 'MID',
                evaluation_date: new Date().toISOString().split('T')[0],
                physical_progress_pct: progPct,
                expenditure_spent_mn: spentMn,
                progress_notes: rowObj.notes || rowObj.progress_notes || ''
              });
              updatesImported++;
            }
          }
        });
      }
    }

    localStorage.setItem('la_authorities', JSON.stringify(las));
    localStorage.setItem('la_programmes', JSON.stringify(progs));
    localStorage.setItem('la_projects', JSON.stringify(projs));
    localStorage.setItem('la_progress_updates', JSON.stringify(updates));

    return {
      success: true,
      projects_imported: projectsImported,
      updates_imported: updatesImported,
      total_projects: projs.length,
      total_updates: updates.length
    };
  }
}

// Instantiate Local Data Service
const localDataService = new LocalDataService();

// Unified API Wrapper
const API = {
  async getLocalAuthorities() {
    return localDataService.getLAs();
  },

  async getProgrammes() {
    return localDataService.getProgrammes();
  },

  async getDashboardStats() {
    return localDataService.getDashboardStats();
  },

  async getProjects(filters) {
    return localDataService.getProjects(filters);
  },

  async getProject(id) {
    return localDataService.getProject(id);
  },

  async saveProject(data) {
    return localDataService.saveProject(data);
  },

  async deleteProject(id) {
    return localDataService.deleteProject(id);
  },

  async addProgressUpdate(projectId, updateData) {
    return localDataService.addProgressUpdate(projectId, updateData);
  },

  async updateProgressUpdate(id, updateData) {
    return localDataService.updateProgressUpdate(id, updateData);
  },

  async getProgressUpdate(id) {
    return localDataService.getProgressUpdate(id);
  },

  async getProgressUpdates(projectId) {
    return localDataService.getProgressUpdates(projectId);
  },

  async deleteProgressUpdate(id) {
    return localDataService.deleteProgressUpdate(id);
  },

  async getPostgreSQLDump() {
    return localDataService.generatePostgresSQL();
  },

  async importDatabaseSQL(sqlText, mode = 'merge') {
    return localDataService.importSQL(sqlText, mode);
  },

  async importExcelWorkbook(workbook, mode = 'merge') {
    return localDataService.importExcelWorkbook(workbook, mode);
  },

  async importExcelRows(rows, mode = 'merge') {
    return localDataService.importExcelRows(rows, mode);
  }
};
