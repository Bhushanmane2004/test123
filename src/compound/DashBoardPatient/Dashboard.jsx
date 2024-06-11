import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Assistant } from './assistant'; // Adjust the path accordingly

const Dashboard = ({ userType,location }) => {
  userType = 'patient'; // Defaulting to patient view
  console.log(location);
  const [prompt, setPrompt] = useState('');
  const [report, setReport] = useState(null);
  const [answer, setAnswer] = useState('Your answer will appear here');
  const [diagnosis, setDiagnosis] = useState('');
  const [advice, setAdvice] = useState('');
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    // Load patient list from localStorage if userType is doctor
    if (userType === 'doctor') {
      const patients = JSON.parse(localStorage.getItem('patients')) || [];
      setPatientList(patients);
    }
  }, [userType]);

  useEffect(() => {
    // Load doctors list from localStorage if available, otherwise use the default doctorsData
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    localStorage.setItem('doctors', JSON.stringify(storedDoctors));
  }, []);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleReportUpload = (e) => {
    const file = e.target.files[0];
    setReport(file);
  };

  const generateDiagnosis = async () => {
    if (report) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const reportContent = e.target.result;
        const message = `Generate Advice and Report Based on Report: ${reportContent}\n and also Your Query: Prompt: ${prompt}`;
        const response = await Assistant(message);
        setDiagnosis(`${response}`);
        setAdvice(`.`);
        setAnswer(`Processed answer for: ${report.name}`);
        suggestDoctors(response);
      };
      reader.readAsText(report);
    } else {
      setDiagnosis('');
      setAdvice('');
      setAnswer('Please upload a report to generate a diagnosis.');
    }
  };

  const suggestDoctors = (diagnosis) => {
    const keywords = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic', 'Pediatrician'];
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const matchedDoctors = storedDoctors.filter(doctor =>
      keywords.some(keyword => diagnosis.includes(keyword) && doctor.specialization.includes(keyword))
    );
    if (matchedDoctors.length === 0) {
      // If no doctors match, set a default doctor
      const defaultDoctor = {
        id: 0,
        name: 'Default Doctor',
        specialization: 'General Physician',
        location: 'Any Location',
        contact: 'default.doctor@example.com',
      };
      setSuggestedDoctors([defaultDoctor]);
    } else {
      setSuggestedDoctors(matchedDoctors);
    }
  };

  const contactDoctor = (doctor) => {
    // Save patient information to localStorage
    const patientInfo = {
      name: prompt, // assuming patient's name is entered in the prompt
      report: report.name,
      diagnosis
    };
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patientInfo);
    localStorage.setItem('patients', JSON.stringify(patients));

    // Update doctor's patient list in localStorage
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const updatedDoctors = storedDoctors.map(doc => {
      if (doc.id === doctor.id) {
        return {
          ...doc,
          patients: [...(doc.patients || []), patientInfo]
        };
      }
      return doc;
    });

    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

    alert(`Contact request sent to ${doctor.name}`);
  };

  return (
    <div className="dashboard">
     <h1>{userType === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}</h1>
      <div className="sidebar">
        {userType === 'doctor' ? (
          <ul>
            <li>Patient List</li>
            <li>Patient Details</li>
            <li>Uploaded Reports</li>
            <li>Notes / Comments on Reports</li>
            <li>Prescriptions</li>
            <li>Features for Patients</li>
          </ul>
        ) : (
          <ul>
            <li>View Personal Information</li>
            <li>View Uploaded Reports</li>
            <li>View Medical History</li>
            <li>Appointment Scheduling</li>
            <li>View Prescriptions</li>
            <li>Security and Privacy</li>
            <li>Security Features</li>
          </ul>
        )}
      </div>
      <div className="content">
        <div className="input-section">
          <label>
            Prompt:
            <input type="text" value={prompt} onChange={handlePromptChange} />
          </label>
          <label>
            Upload Report:
            <input type="file" onChange={handleReportUpload} />
          </label>
          <button onClick={generateDiagnosis}>Generate Diagnosis</button>
        </div>
        <div className="main-content">
          <div className="answer-section">
            <h2>Answer</h2>
            <p>{answer}</p>
            <h2>Diagnosis</h2>
            <p>{diagnosis}</p>
            <h2>Advice</h2>
            <p>{advice}</p>
          </div>
          <div className="suggested-doctors">
            <h2>Suggested Doctors</h2>
            {suggestedDoctors.length > 0 ? (
              <ul>
                {suggestedDoctors.map((doctor) => (
                  <li key={doctor.id}>
                    {doctor.name} - {doctor.specialization} - {doctor.location} - {doctor.contact}
                    <button onClick={() => contactDoctor(doctor)}>Contact Doctor</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No doctors available for the given diagnosis.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
