import React, { ChangeEvent, useEffect, useState } from 'react';
import { LeaveForm } from "./LeaveForm";
import { SignatoryForm } from './SignatoryForm';

export const AddSignatory = () => {
  const [approverId, setApproverId] = useState(0);
  const [leaveId, setLeaveId] = useState(0);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees');
    const data = await response.json();
    setEmployees(data);
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      
    e.preventDefault();
    if (!approverId || !leaveId) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const res = await fetch('/api/signatories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          approverId,
          leaveId
        })
      });
      if (res.ok) {
        alert('Signatory added successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  return(
    <form onSubmit={handleSubmit} className="form-group">
      <SignatoryForm
        approverId={approverId}
        leaveId={leaveId}
        setApproverId={setApproverId}
        setLeaveId={setLeaveId}
      />

      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  )
}