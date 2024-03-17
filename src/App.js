import "./index.css";
import { useState } from "react";

export function App() {
  return (
    <div className="bmi-calculator">
      <h1>BMI Calculator</h1>
      <BmiCalculator />
    </div>
  );
}

function BmiCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [submittedName, setSubmittedName] = useState("");
  const [age, setAge] = useState(0);

  function calculateBMI(height, weight) {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    return bmiValue.toFixed(2);
  }

  function handleSubmit(e) {
    // Prevent the default form submission
    e.preventDefault();
    // Calculate BMI
    const calculatedBMI = calculateBMI(height, weight);
    // Set the state
    setBmi(calculatedBMI);
    // Set the submitted name
    setSubmittedName(name);
    // Calculate age
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const finalAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setAge(finalAge);
    setName("");
    setDob("");
    setHeight(0);
    setWeight(0);
  }

  return (
    <div>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <label>Enter your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Enter your Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <div>
          <label>Enter your Height (in cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Enter your Weight (in kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button className="button" onClick={calculateBMI}>
          Calculate BMI
        </button>
      </form>
      {bmi > 0 && (
        <p>
          {submittedName}, You age is {age} and your BMI is {bmi}
        </p>
      )}
    </div>
  );
}

export default App;
