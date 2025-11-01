# BMI Calculator

A modern, responsive BMI (Body Mass Index) calculator built with React and Tailwind CSS. Calculate your BMI instantly with an intuitive user interface and get immediate feedback on your health status.

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC.svg)

## ✨ Features

- **Instant BMI Calculation**: Calculate your Body Mass Index with just height and weight inputs
- **Health Status Indicators**: Get categorized feedback:
  - Underweight (BMI < 18.5)
  - Normal (BMI 18.5 - 24.9)
  - Overweight (BMI 25 - 29.9)
  - Obese (BMI ≥ 30)
- **Input Validation**: Validates numeric inputs and provides error messages
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Keyboard Support**: Press Enter to calculate BMI
- **Clear Functionality**: Reset inputs and results with one click

## 🚀 Tech Stack

- **React** (v19.1.1) - Modern UI library
- **Vite** (v7.1.2) - Fast build tool and dev server
- **Tailwind CSS** (v4.1.13) - Utility-first CSS framework
- **ESLint** - Code quality and linting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd BMI
```

2. Install dependencies:
```bash
npm install
```

## 🎯 Usage

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📁 Project Structure

```
BMI/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   │   ├── BMI.png     # Background image
│   │   └── bmi1.png    # Icon
│   ├── Components/     # React components
│   │   └── Bmi.jsx     # Main BMI calculator component
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🔧 How It Works

1. **Input Height**: Enter your height in centimeters (cm)
2. **Input Weight**: Enter your weight in kilograms (kg)
3. **Calculate**: Click the "Calculate BMI" button or press Enter
4. **View Results**: Your BMI value and health status will be displayed

### BMI Formula

The BMI is calculated using the standard formula:

```
BMI = weight (kg) / (height (m))²
```

Where height is converted from centimeters to meters.

## 🎨 Features in Detail

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Validation**: Instant feedback on invalid inputs
- **Error Handling**: Clear error messages for invalid entries
- **Visual Feedback**: Color-coded results and intuitive UI elements

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality checks |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)

---

**Note**: This BMI calculator is for informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare provider for health-related decisions.
