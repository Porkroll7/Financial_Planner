# Retirement Financial Planner

A comprehensive, interactive web-based financial planning calculator that helps users estimate their retirement savings based on contributions to 401(k), Roth IRA, HSA, and investment returns.

## Features

- **Multiple Account Types**: Calculate projections for 401(k), Roth IRA, and HSA accounts
- **Employer Matching**: Factor in employer 401(k) matching contributions
- **Customizable Returns**: Adjust average market return rates to see different scenarios
- **Inflation Adjustment**: View retirement savings in today's dollars
- **Interactive Chart**: Visualize compound interest effects with an interactive growth chart
- **Real-time Updates**: Calculations update automatically as you adjust inputs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Account Contribution Limits**: Helpful reminders of 2025 IRS contribution limits

## How to Use

1. Open `index.html` in any modern web browser
2. Enter your financial information:
   - Current salary
   - Current age and retirement age
   - Annual contributions to 401(k), Roth IRA, and HSA
   - Employer 401(k) match
   - Expected market return rate
   - Current savings balance
3. The calculator automatically updates your retirement projections
4. View detailed breakdowns and an interactive chart showing growth over time

## Key Calculations

The calculator uses compound interest formulas:

- **Future Value of Principal**: FV = PV × (1 + r)^n
- **Future Value of Annuity**: FV = PMT × [(1 + r)^n - 1] / r

Where:
- PV = Present Value (current balance)
- PMT = Annual Payment (contributions)
- r = Annual return rate
- n = Number of years

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with gradients, animations, and responsive grid layouts
- **JavaScript (ES6+)**: Calculation logic and interactivity
- **Chart.js**: Interactive data visualization

## 2025 Contribution Limits

The calculator includes helpful reminders of IRS limits:

- **401(k)**: $23,500 (under 50), $31,000 (50+)
- **Roth IRA**: $7,000 (under 50), $8,000 (50+)
- **HSA**: $4,150 (individual), $8,300 (family)

## Features Breakdown

### Input Section
- Current financial information
- Annual contribution amounts
- Investment assumptions
- Starting balance

### Results Section
- Total retirement savings projection
- Breakdown by account type (401k, Roth IRA, HSA)
- Total contributions vs. investment gains
- Inflation-adjusted purchasing power
- Interactive growth chart

### Visual Chart
- Year-by-year balance projection
- Comparison of total balance vs. contributions
- Hover tooltips showing detailed information
- Demonstrates the power of compound interest

## Disclaimer

This calculator provides estimates based on your inputs and assumptions. Actual investment returns can vary significantly. Markets can be volatile, and past performance doesn't guarantee future results. Please consult with a qualified financial advisor for personalized advice tailored to your specific situation.

## License

This project is open source and available for personal and educational use.

## Future Enhancements

Potential features for future versions:
- Multiple market scenarios (bull, bear, average)
- Social Security benefit estimates
- Withdrawal strategies in retirement
- Tax implications calculator
- Monte Carlo simulations for risk analysis
- Save/load user profiles
- Print-friendly reports
- Additional account types (taxable brokerage, etc.)
