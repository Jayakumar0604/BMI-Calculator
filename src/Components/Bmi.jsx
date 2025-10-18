import React, { useState } from "react";
import Back from "../assets/BMI.png";
const Bmi = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmistatus, setBmiStatus] = useState();
  const [error, setError] = useState("");

  const BMICalc = () => {
    const validHeight = /^\d+$/.test(height);
    const validWeight = /^\d+$/.test(weight);
    if (validHeight && validWeight) {
      const hMeter = height / 100;
      const BmiValue = weight / (hMeter * hMeter);
      setBmi(BmiValue.toFixed(2));
      setError("");
      if (BmiValue < 18.5) {
        setBmiStatus("Under Weight");
      } else if (BmiValue >= 18.5 && BmiValue < 24.9) {
        setBmiStatus("Normal");
      } else if (BmiValue >= 25 && BmiValue < 29.9) {
        setBmiStatus("Over Weight");
      } else {
        setBmiStatus("Obese");
      }
    } else {
      setBmi(null);
      setBmiStatus("");
      setError("Please enter valid numeric values for height and weight");
    }
  };

  const Enter = (e) => {
    if (e.key === "Enter") {
      BMICalc();
    }
  };

  const Clear = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
  };

  return (
    <div className="bg-slate-800 w-full h-screen flex justify-center items-center">
      <div className="bg-white w-200 h-125 flex rounded-md">
        <div
          className="w-100 bg-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${Back})` }}
        ></div>
        <div className="flex-1 p-5">
          <h1 className="text-[20px] font-bold mb-[20px] text-center py-[10px] text-blue-600">
            BMI CALCULATOR
          </h1>
          <div className="mb-[15px]">
            <label htmlFor="height" className="block mb-1 text-zinc-500">
              Height (cm):
            </label>
            <input
              type="number"
              id="height"
              className="w-full p-[10px] border rounded-md mb-[10px] font-[18px] outline-green-500"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="weight" className="block mb-1 text-zinc-500">
              Weight (kg):
            </label>
            <input
              type="number"
              id="height"
              className="w-full p-[10px] border rounded-md mb-[10px] font-[18px] outline-green-500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={Enter}
            />
          </div>
          <div className="text-[15px] text-center text-red-500 m-1">
            {error}
          </div>
          <button
            className="py-2 px-3 font-[16px] bg-blue-600 text-white  hover:bg-blue-800"
            onClick={BMICalc}
          >
            Calculate BMI
          </button>
          <button
            className="py-2 ml-5 px-5 font-[16px] bg-fuchsia-600 text-white  hover:bg-fuchsia-800"
            onClick={Clear}
          >
            Clear
          </button>
          {bmi !== null && (
            <div className="mt-[20px] p-[10px] rounded-md border border-sky-500">
              <p className="mx-1 text-sky-600 font-bold">Your BMI is : {bmi}</p>
              <p className="mx-1 text-neutral-600">Status: {bmistatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bmi;
