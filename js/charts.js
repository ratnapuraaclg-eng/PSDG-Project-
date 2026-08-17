/**
 * Charts and Data Visualization for Local Authorities Project Monitoring System
 */

let chartLA = null;
let chartProg = null;
let chartStage = null;

const ChartManager = {
  getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      textColor: isLight ? '#334155' : '#cbd5e1',
      gridColor: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.07)',
      tooltipBg: isLight ? 'rgba(15, 23, 42, 0.9)' : 'rgba(30, 41, 59, 0.95)',
      fontFamily: "'Inter', 'Noto Sans Sinhala', sans-serif"
    };
  },

  renderCharts(stats) {
    this.renderLAChart(stats.la_breakdown || []);
    this.renderProgrammeChart(stats.programme_breakdown || []);
    this.renderStageChart(stats.stage_breakdown || []);
  },

  renderLAChart(laData) {
    const ctx = document.getElementById('chartLocalAuthorities');
    if (!ctx) return;

    if (chartLA) chartLA.destroy();

    const theme = this.getThemeColors();
    // Filter only top LAs with costs or non-zero to look clean
    const labels = laData.map(item => item.name.replace(' ප්‍රාදේශීය සභාව', ' ප්‍රා.ස.').replace(' නගර සභාව', ' න.ස.').replace(' මහා නගර සභාව', ' ම.න.ස.'));
    const costs = laData.map(item => item.total_cost_mn);
    const counts = laData.map(item => item.project_count);

    chartLA = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'ප්‍රතිපාදන (Rs. Mn)',
            data: costs,
            backgroundColor: 'rgba(139, 92, 246, 0.75)',
            borderColor: '#8b5cf6',
            borderWidth: 1.5,
            borderRadius: 6,
            yAxisID: 'y'
          },
          {
            label: 'ව්‍යාපෘති ගණන (Count)',
            data: counts,
            type: 'line',
            borderColor: '#38bdf8',
            backgroundColor: '#38bdf8',
            pointBackgroundColor: '#38bdf8',
            pointRadius: 4,
            borderWidth: 2.5,
            tension: 0.3,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 12, weight: '500' },
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleFont: { family: theme.fontFamily, size: 13 },
            bodyFont: { family: theme.fontFamily, size: 12 },
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 10 },
              maxRotation: 45,
              minRotation: 25
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 11 },
              callback: value => value + ' Mn'
            },
            title: {
              display: true,
              text: 'පිරිවැය (Rs. Mn)',
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 11 }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#38bdf8',
              font: { family: theme.fontFamily, size: 11 },
              stepSize: 1
            },
            title: {
              display: true,
              text: 'ව්‍යාපෘති ගණන',
              color: '#38bdf8',
              font: { family: theme.fontFamily, size: 11 }
            }
          }
        }
      }
    });
  },

  renderProgrammeChart(programmeData) {
    const ctx = document.getElementById('chartProgrammes');
    if (!ctx) return;

    if (chartProg) chartProg.destroy();

    const theme = this.getThemeColors();
    const labels = programmeData.map(p => p.name);
    const data = programmeData.map(p => p.total_cost_mn);

    const colors = [
      '#8b5cf6', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6'
    ];

    chartProg = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: document.documentElement.getAttribute('data-theme') === 'light' ? '#fff' : '#111827'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 11 },
              boxWidth: 12,
              padding: 10
            }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            padding: 10,
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                return ` ${context.label}: Rs. ${val.toFixed(3)} Mn`;
              }
            }
          }
        }
      }
    });
  },

  renderStageChart(stageData) {
    const ctx = document.getElementById('chartProcurementStages');
    if (!ctx) return;

    if (chartStage) chartStage.destroy();

    const theme = this.getThemeColors();
    const labels = stageData.map(s => s.procurement_stage);
    const counts = stageData.map(s => s.count);

    const stageColors = {
      'Pending': '#94a3b8',
      'Bidding': '#38bdf8',
      'Technical Evaluation': '#f59e0b',
      'Awarded': '#a78bfa',
      'In Construction': '#fbbf24',
      'Completed': '#10b981'
    };

    const backgroundColors = labels.map(l => stageColors[l] || '#8b5cf6');

    chartStage = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: backgroundColors.map(c => c + 'aa'),
          borderColor: backgroundColors,
          borderWidth: 1.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: theme.textColor,
              font: { family: theme.fontFamily, size: 11 },
              boxWidth: 12,
              padding: 10
            }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            padding: 10
          }
        },
        scales: {
          r: {
            grid: { color: theme.gridColor },
            ticks: { display: false }
          }
        }
      }
    });
  }
};
