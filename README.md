# Aura Wellness Dial — Advanced BMI & Health Dashboard

A premium, interactive, and modular React 19 health diagnostic dashboard built with Vite and Tailwind CSS. The **Aura Wellness Dial** goes beyond simple calculations, providing comprehensive health metrics, dynamic gauges, caloric needs estimations, and localized record logs.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB.svg?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.5-646CFF.svg?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC.svg?style=flat&logo=tailwindcss)

---

## 🌟 Key Features

* **Dual Measurement Systems**: Smooth real-time toggles between **Metric (cm/kg)** and **Imperial (ft/in/lbs)** units with interactive range sliders and manual override fine-tuning.
* **Interactive SVG Dial Gauge**: An elegant, custom-designed gauge that sweeps colors smoothly matching standard weight classifications (Underweight, Healthy, Overweight, Obesity).
* **Clinical Health Profile**: Computes your optimal health weight range and provides advice on target weight targets (weight to gain or lose to reach normal bounds).
* **Metabolism & Daily Caloric Estimator**:
  * **BMR (Basal Metabolic Rate)**: Uses the Mifflin-St Jeor equation to estimate standard calorie burning at complete rest.
  * **TDEE (Total Daily Energy Expenditure)**: Factors in physical activity factors (Sedentary up to Extreme Athlete) to output daily active maintenance calorie levels.
* **Tailored Wellness Suggestions**: Dynamically renders custom-tailored nutritional suggestions, fitness workout goals, lifestyle advice, and health risk parameters based on diagnostic results.
* **Localized History Tracker**: Chronological log list stored locally in `localStorage` containing entries (BMI, date, weight, height, gender). Supports single entry deletion and clearing all history logs.
* **Premium Theme Design**: Features an Outfit-typeface layout, ambient neon backdrop orbs, glassmorphic card elements, custom sliders, and smooth transitions.

---

## 📁 Modular Project Structure

The project has been restructured following React modular component architecture best practices:

```
BMI/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Brand images and icons
│   │   ├── BMI.png
│   │   └── bmi1.png
│   │
│   ├── components/         # Reusable presentation views
│   │   ├── bmi/
│   │   │   ├── BmiCalculator.jsx  # Main container orchestration panel
│   │   │   ├── BmiForm.jsx        # User diagnostic input forms
│   │   │   ├── BmiGauge.jsx       # Custom animated SVG result dial
│   │   │   ├── BmiHistory.jsx     # localstorage history list manager
│   │   │   └── BmiInsights.jsx    # Tabbed metabolic & wellness insights
│   │   │
│   │   └── ui/
│   │       ├── Card.jsx           # Glassmorphism container template
│   │       └── Slider.jsx         # Synchronized inputs range slider
│   │
│   ├── hooks/
│   │   └── useBmi.js       # Consolidated state machine & calculation logic hook
│   │
│   ├── utils/
│   │   └── bmiCalculator.js # Pure helper formulas (BMI, BMR, TDEE, ranges)
│   │
│   ├── App.jsx             # Main layout, header, footer, background orbs
│   ├── index.css           # Global custom scrollbars, typography, keyframes
│   └── main.jsx            # React root mount entry point
│
├── index.html              # HTML core shell template (Outfit Font integration)
├── package.json            # Project dependencies & configurations
└── vite.config.js          # Vite plugins integration
```

---

## 🔧 Calculation Formulas

### Body Mass Index (BMI)
* **Metric**: $\text{BMI} = \frac{\text{weight (kg)}}{\left(\frac{\text{height (cm)}}{100}\right)^2}$
* **Imperial**: $\text{BMI} = \frac{\text{weight (lbs)}}{\text{height (inches)}^2} \times 703$

### Basal Metabolic Rate (BMR)
Calculated using the **Mifflin-St Jeor Equation** (based on weight converted to kg and height converted to cm):
* **Male**: $\text{BMR} = 10 \times \text{weight (kg)} + 6.25 \times \text{height (cm)} - 5 \times \text{age (y)} + 5$
* **Female / Average**: $\text{BMR} = 10 \times \text{weight (kg)} + 6.25 \times \text{height (cm)} - 5 \times \text{age (y)} - 161$

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the hot-reloading development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your web browser.

3. Compile the production bundles:
   ```bash
   npm run build
   ```
   The built distribution static files will yield in the `/dist` output directory.

---

## 🛠️ Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Starts local development server |
| `build` | `vite build` | Compiles optimized production bundle |
| `preview` | `vite preview` | Previews static compiled bundle locally |
| `lint` | `eslint .` | Runs ESLint syntax and style diagnostics |

---

## 📄 Disclaimer

**Note**: This BMI and health diagnostic dashboard is for informational and educational purposes only. It should not be used as a substitute for professional clinical medical advice, diagnostics, or treatment. Always consult with a qualified health provider for medical or wellness decisions.
