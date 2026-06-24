import { useState, useEffect } from 'react';
import {
  calculateBmi,
  getBmiCategoryDetails,
  getHealthyWeightRange,
  calculateBmr,
  calculateDailyCalorieNeeds
} from '../utils/bmiCalculator';

export const useBmi = () => {
  // Input states
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [unitSystem, setUnitSystem] = useState('metric');
  
  // Metric Inputs
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(65);
  
  // Imperial Inputs
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7); // 5ft 7in = 170cm approx
  const [weightLbs, setWeightLbs] = useState(143); // 143 lbs = 65kg approx
  
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [error, setError] = useState('');

  // Result states
  const [result, setResult] = useState(null);

  // History state
  const [history, setHistory] = useState([]);

  // Load history on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('bmi_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error('Error loading history', e);
    }
  }, []);

  // Save history helper
  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem('bmi_history', JSON.stringify(newHistory));
  };

  // Convert unit values when switching systems to keep UX smooth
  const toggleUnitSystem = (system) => {
    if (system === unitSystem) return;
    
    setUnitSystem(system);
    setError('');

    if (system === 'imperial') {
      // Metric -> Imperial
      // Height: cm to feet/inches
      const totalInches = heightCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inch = Math.round(totalInches % 12);
      setHeightFt(ft || 5);
      setHeightIn(inch);
      
      // Weight: kg to lbs
      const lbs = Math.round(weightKg / 0.45359237);
      setWeightLbs(lbs);
    } else {
      // Imperial -> Metric
      // Height: feet/inches to cm
      const totalInches = (heightFt * 12) + Number(heightIn);
      const cm = Math.round(totalInches * 2.54);
      setHeightCm(cm);
      
      // Weight: lbs to kg
      const kg = Math.round(weightLbs * 0.45359237);
      setWeightKg(kg);
    }
  };

  const calculate = () => {
    let currentWeight = 0;
    let currentHeight = 0; // cm for metric, total inches for imperial
    let displayHeightText = '';
    let displayWeightText = '';

    if (unitSystem === 'metric') {
      if (!heightCm || heightCm <= 30 || heightCm > 300) {
        setError('Please enter a valid height between 30 and 300 cm.');
        return;
      }
      if (!weightKg || weightKg <= 2 || weightKg > 500) {
        setError('Please enter a valid weight between 2 and 500 kg.');
        return;
      }
      currentWeight = Number(weightKg);
      currentHeight = Number(heightCm);
      displayHeightText = `${currentHeight} cm`;
      displayWeightText = `${currentWeight} kg`;
    } else {
      const totalInches = (Number(heightFt) * 12) + Number(heightIn);
      if (heightFt < 1 || heightFt > 9 || heightIn < 0 || heightIn >= 12) {
        setError('Please enter a valid height (1-9 ft, 0-11 in).');
        return;
      }
      if (!weightLbs || weightLbs <= 5 || weightLbs > 1100) {
        setError('Please enter a valid weight between 5 and 1100 lbs.');
        return;
      }
      currentWeight = Number(weightLbs);
      currentHeight = totalInches;
      displayHeightText = `${heightFt}'${heightIn}"`;
      displayWeightText = `${currentWeight} lbs`;
    }

    if (!age || age < 1 || age > 120) {
      setError('Please enter a valid age between 1 and 120.');
      return;
    }

    setError('');

    // Perform calculations
    const bmiVal = calculateBmi(currentWeight, currentHeight, unitSystem);
    const details = getBmiCategoryDetails(bmiVal);
    const healthyRange = getHealthyWeightRange(currentHeight, unitSystem);
    
    // Ideal weight difference calculation
    let weightDiff = 0;
    let weightDiffStatus = 'normal'; // 'gain', 'lose', 'normal'
    
    if (bmiVal < 18.5) {
      weightDiff = parseFloat((healthyRange.min - currentWeight).toFixed(1));
      weightDiffStatus = 'gain';
    } else if (bmiVal >= 25.0) {
      weightDiff = parseFloat((currentWeight - healthyRange.max).toFixed(1));
      weightDiffStatus = 'lose';
    }

    const bmrVal = calculateBmr(gender, currentWeight, currentHeight, Number(age), unitSystem);
    const calorieNeeds = calculateDailyCalorieNeeds(bmrVal, activityLevel);

    const resultData = {
      bmi: bmiVal,
      category: details.category,
      color: details.color,
      gradient: details.gradient,
      percentage: details.percentage,
      description: details.description,
      healthyRange,
      weightDiff,
      weightDiffStatus,
      bmr: bmrVal,
      dailyCalories: calorieNeeds,
      gender,
      age,
      displayHeight: displayHeightText,
      displayWeight: displayWeightText,
      timestamp: Date.now()
    };

    setResult(resultData);

    // Save history
    const historyItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      bmi: bmiVal,
      category: details.category,
      weightText: displayWeightText,
      heightText: displayHeightText,
      gender
    };

    const newHistory = [historyItem, ...history.slice(0, 19)]; // limit to 20 logs
    saveHistory(newHistory);
  };

  const clear = () => {
    setResult(null);
    setError('');
    
    if (unitSystem === 'metric') {
      setHeightCm(170);
      setWeightKg(65);
    } else {
      setHeightFt(5);
      setHeightIn(7);
      setWeightLbs(143);
    }
    setAge(25);
    setGender('male');
    setActivityLevel('moderate');
  };

  const deleteHistoryItem = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  return {
    gender, setGender,
    age, setAge,
    unitSystem, toggleUnitSystem,
    heightCm, setHeightCm,
    weightKg, setWeightKg,
    heightFt, setHeightFt,
    heightIn, setHeightIn,
    weightLbs, setWeightLbs,
    activityLevel, setActivityLevel,
    error,
    result,
    history,
    calculate,
    clear,
    deleteHistoryItem,
    clearHistory
  };
};
