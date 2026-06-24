/**
 * Utility functions for BMI and health calculations
 */

// Metric conversions
export const LBS_TO_KG = 0.45359237;
export const INCH_TO_CM = 2.54;

/**
 * Calculates BMI based on weight, height, and unit system
 * @param {number} weight - Weight in kg or lbs
 * @param {number} height - Height in cm or total inches
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @returns {number} BMI rounded to 2 decimal places
 */
export const calculateBmi = (weight, height, unitSystem) => {
  if (!weight || !height || weight <= 0 || height <= 0) return 0;
  
  let bmi = 0;
  if (unitSystem === 'metric') {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    // Imperial formula: BMI = (weight_lbs / height_inches^2) * 703
    bmi = (weight / (height * height)) * 703;
  }
  
  return parseFloat(bmi.toFixed(1));
};

/**
 * Get category, status label, color code, and descriptions based on BMI
 * @param {number} bmi 
 * @returns {object} Details
 */
export const getBmiCategoryDetails = (bmi) => {
  if (!bmi || bmi <= 0) {
    return {
      category: 'Unknown',
      color: '#94a3b8', // slate-400
      gradient: 'from-slate-400 to-slate-500',
      percentage: 0,
      description: 'Please enter details to calculate.'
    };
  }

  // Map to gauge percentage (15 to 40 is standard range mapping)
  // min bmi = 15 (0%), max bmi = 40 (100%)
  const percentage = Math.min(Math.max(((bmi - 15) / (40 - 15)) * 100, 0), 100);

  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      color: '#38bdf8', // sky-400
      gradient: 'from-sky-400 to-blue-500',
      percentage,
      description: 'You are below the healthy weight range. It is recommended to consult a doctor or dietitian.'
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      category: 'Healthy Weight',
      color: '#4ade80', // green-400
      gradient: 'from-green-400 to-emerald-500',
      percentage,
      description: 'You have a healthy body weight. Maintain your lifestyle to sustain this balance.'
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      category: 'Overweight',
      color: '#facc15', // yellow-400
      gradient: 'from-yellow-400 to-amber-500',
      percentage,
      description: 'You are slightly above the healthy range. Small lifestyle changes can make a big difference.'
    };
  } else {
    return {
      category: 'Obesity',
      color: '#f87171', // red-400
      gradient: 'from-red-400 to-rose-600',
      percentage,
      description: 'You are in the obesity range. It is highly recommended to seek professional guidance for wellness.'
    };
  }
};

/**
 * Calculates Healthy weight range for height
 * @param {number} height - in cm or inches
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @returns {object} { minWeight, maxWeight }
 */
export const getHealthyWeightRange = (height, unitSystem) => {
  if (!height || height <= 0) return { min: 0, max: 0 };

  let min = 0;
  let max = 0;

  if (unitSystem === 'metric') {
    const hMeter = height / 100;
    min = 18.5 * hMeter * hMeter;
    max = 24.9 * hMeter * hMeter;
  } else {
    // Imperial weight from BMI: W = (BMI * H^2) / 703
    min = (18.5 * height * height) / 703;
    max = (24.9 * height * height) / 703;
  }

  return {
    min: parseFloat(min.toFixed(1)),
    max: parseFloat(max.toFixed(1))
  };
};

/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor formula
 * @param {string} gender - 'male' | 'female' | 'other'
 * @param {number} weight - weight in kg or lbs
 * @param {number} height - height in cm or inches
 * @param {number} age - age in years
 * @param {string} unitSystem - 'metric' | 'imperial'
 * @returns {number} calories/day
 */
export const calculateBmr = (gender, weight, height, age, unitSystem) => {
  if (!weight || !height || !age) return 0;

  // Convert to metric if needed
  const weightKg = unitSystem === 'metric' ? weight : weight * LBS_TO_KG;
  const heightCm = unitSystem === 'metric' ? height : height * INCH_TO_CM;

  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    // Treat 'other'/diverse or 'female' with standard female/average baseline
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  return Math.round(bmr);
};

/**
 * Calculates Total Daily Energy Expenditure (TDEE) / Calorie needs
 * @param {number} bmr 
 * @param {string} activityLevel 
 * @returns {number} calories/day
 */
export const calculateDailyCalorieNeeds = (bmr, activityLevel) => {
  if (!bmr) return 0;

  const multipliers = {
    sedentary: 1.2,      // Little/no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    veryActive: 1.9      // Very hard exercise/physical job
  };

  const multiplier = multipliers[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

/**
 * Get tailored health tips based on BMI category
 * @param {string} category 
 * @returns {object} advice lists
 */
export const getHealthRecommendations = (category) => {
  const recommendations = {
    'Underweight': {
      nutrition: [
        'Increase calorie intake with nutrient-dense foods (nuts, avocados, seeds, whole grains).',
        'Eat smaller, more frequent meals throughout the day (5-6 times).',
        'Add healthy fats and proteins to meals (olive oil, fish, lean meat, tofu).'
      ],
      exercise: [
        'Focus on strength and resistance training to build muscle mass rather than high cardio.',
        'Begin with 2-3 sessions per week, keeping workouts under 45 minutes.',
        'Prioritize compound movements like squats, chest presses, and rows.'
      ],
      lifestyle: [
        'Prioritize quality sleep (7-9 hours) to support muscle recovery and growth.',
        'Avoid drinking water right before meals to preserve appetite.',
        'Consider keeping a food diary to track daily caloric intake.'
      ],
      risks: 'Nutrient deficiencies, weakened immune system, osteoporosis, chronic fatigue.'
    },
    'Healthy Weight': {
      nutrition: [
        'Consume a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.',
        'Stay hydrated by drinking at least 2-3 liters of water daily.',
        'Limit processed foods, refined sugars, and saturated fats.'
      ],
      exercise: [
        'Combine cardiovascular exercises (running, cycling) with strength training.',
        'Aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity weekly.',
        'Incorporate flexibility and mobility exercises like yoga or stretching.'
      ],
      lifestyle: [
        'Monitor changes in energy, sleep quality, and physical performance.',
        'Maintain a consistent sleep schedule to regulate hormones.',
        'Manage stress through meditation, breathing exercises, or hobbies.'
      ],
      risks: 'Low risk of cardiovascular or metabolic diseases. Keep up the excellent work!'
    },
    'Overweight': {
      nutrition: [
        'Create a modest, sustainable caloric deficit (approx. 300-500 kcal below TDEE).',
        'Focus on high-fiber foods (vegetables, beans) to increase satiety and fullness.',
        'Reduce intake of liquid calories (sodas, juices, alcohol) and drink more water.'
      ],
      exercise: [
        'Incorporate both cardiovascular cardio (3-4 times a week) and resistance training.',
        'Aim for 150-300 minutes of moderate-intensity activity per week.',
        'Increase daily movement (NEAT) by taking stairs, walking, or standing.'
      ],
      lifestyle: [
        'Practice mindful eating: eat slowly and pay attention to hunger/fullness cues.',
        'Track daily steps with a goal of 8,000 to 10,000 steps per day.',
        'Set small, progressive goals instead of drastic short-term changes.'
      ],
      risks: 'Increased risk of type 2 diabetes, high blood pressure, and cardiovascular strain.'
    },
    'Obesity': {
      nutrition: [
        'Consult with a registered dietitian for a personalized, medically-sound nutrition plan.',
        'Prioritize low-glycemic, whole foods and control portions carefully.',
        'Focus on lean protein and non-starchy vegetables to manage appetite.'
      ],
      exercise: [
        'Begin with low-impact exercises to protect joints (swimming, water aerobics, walking).',
        'Gradually build up exercise duration, aiming for 30 minutes a day, 5 days a week.',
        'Incorporate light bodyweight or resistance band exercises to build stability.'
      ],
      lifestyle: [
        'Track metrics beyond the scale, such as waist circumference, energy level, and sleep quality.',
        'Build a strong support system of friends, family, or health professionals.',
        'Address emotional eating triggers through therapeutic or behavioral support.'
      ],
      risks: 'High risk of coronary heart disease, sleep apnea, osteoarthritis, type 2 diabetes, and hypertension.'
    }
  };

  return recommendations[category] || recommendations['Healthy Weight'];
};
