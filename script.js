let retirementChart = null;

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Calculate future value with compound interest
function calculateFutureValue(principal, annualContribution, rate, years) {
    const r = rate / 100;

    // Future value of current principal
    const fvPrincipal = principal * Math.pow(1 + r, years);

    // Future value of annuity (annual contributions)
    const fvAnnuity = annualContribution * (Math.pow(1 + r, years) - 1) / r;

    return fvPrincipal + fvAnnuity;
}

// Calculate year-by-year growth
function calculateYearlyGrowth(principal, annualContribution, rate, years) {
    const r = rate / 100;
    const yearlyData = [{year: 0, balance: principal, contributions: 0}];

    let balance = principal;
    let totalContributions = 0;

    for (let year = 1; year <= years; year++) {
        balance = balance * (1 + r) + annualContribution;
        totalContributions += annualContribution;
        yearlyData.push({
            year: year,
            balance: balance,
            contributions: totalContributions + principal
        });
    }

    return yearlyData;
}

// Main calculation function
function calculateRetirement() {
    // Get input values
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const currentAge = parseInt(document.getElementById('currentAge').value) || 30;
    const retirementAge = parseInt(document.getElementById('retirementAge').value) || 65;
    const contribution401k = parseFloat(document.getElementById('contribution401k').value) || 0;
    const employerMatch = parseFloat(document.getElementById('employerMatch').value) || 0;
    const contributionRoth = parseFloat(document.getElementById('contributionRoth').value) || 0;
    const contributionHSA = parseFloat(document.getElementById('contributionHSA').value) || 0;
    const returnRate = parseFloat(document.getElementById('returnRate').value) || 8;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) || 3;
    const currentBalance = parseFloat(document.getElementById('currentBalance').value) || 0;

    // Validate ages
    if (retirementAge <= currentAge) {
        alert('Retirement age must be greater than current age!');
        return;
    }

    const yearsToRetirement = retirementAge - currentAge;

    // Calculate total annual contribution
    const total401kContribution = contribution401k + employerMatch;
    const totalAnnualContribution = total401kContribution + contributionRoth + contributionHSA;

    // Calculate separate account balances
    const balance401k = calculateFutureValue(
        currentBalance * 0.6, // Assume 60% of current balance is in 401k
        total401kContribution,
        returnRate,
        yearsToRetirement
    );

    const balanceRoth = calculateFutureValue(
        currentBalance * 0.3, // Assume 30% of current balance is in Roth
        contributionRoth,
        returnRate,
        yearsToRetirement
    );

    const balanceHSA = calculateFutureValue(
        currentBalance * 0.1, // Assume 10% of current balance is in HSA
        contributionHSA,
        returnRate,
        yearsToRetirement
    );

    const totalAtRetirement = balance401k + balanceRoth + balanceHSA;
    const totalContributions = currentBalance + (totalAnnualContribution * yearsToRetirement);
    const investmentGains = totalAtRetirement - totalContributions;

    // Calculate inflation-adjusted value
    const inflationAdjusted = totalAtRetirement / Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Update summary cards
    document.getElementById('yearsToRetirement').textContent = yearsToRetirement;
    document.getElementById('totalAtRetirement').textContent = formatCurrency(totalAtRetirement);
    document.getElementById('totalContributions').textContent = formatCurrency(totalContributions);
    document.getElementById('investmentGains').textContent = formatCurrency(investmentGains);

    // Update breakdown
    document.getElementById('balance401k').textContent = formatCurrency(balance401k);
    document.getElementById('balanceRoth').textContent = formatCurrency(balanceRoth);
    document.getElementById('balanceHSA').textContent = formatCurrency(balanceHSA);

    // Update inflation-adjusted value
    document.getElementById('inflationAdjusted').textContent = formatCurrency(inflationAdjusted);

    // Generate chart data
    const yearlyData = calculateYearlyGrowth(
        currentBalance,
        totalAnnualContribution,
        returnRate,
        yearsToRetirement
    );

    createChart(yearlyData, currentAge);
}

// Create or update chart
function createChart(yearlyData, currentAge) {
    const canvas = document.getElementById('retirementChart');
    if (!canvas) {
        console.error('Chart canvas not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (retirementChart) {
        retirementChart.destroy();
        retirementChart = null;
    }

    const labels = yearlyData.map(d => (currentAge + d.year).toString());
    const balances = yearlyData.map(d => d.balance);
    const contributions = yearlyData.map(d => d.contributions);

    retirementChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Balance',
                    data: balances,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Total Contributions',
                    data: contributions,
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += formatCurrency(context.parsed.y);
                            return label;
                        },
                        afterLabel: function(context) {
                            if (context.datasetIndex === 0) {
                                const contrib = contributions[context.dataIndex];
                                const gains = balances[context.dataIndex] - contrib;
                                return 'Investment Gains: ' + formatCurrency(gains);
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        },
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        maxTicksLimit: 15,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Add real-time calculation on input change
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Chart.js to load
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        setTimeout(initializeCalculator, 100);
        return;
    }

    initializeCalculator();
});

function initializeCalculator() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(calculateRetirement, 500));
    });

    // Initial calculation
    calculateRetirement();
}

// Debounce function to limit calculation frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
