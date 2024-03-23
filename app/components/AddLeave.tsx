import React, { ChangeEvent, useEffect, useState } from 'react';
import { LeaveForm } from "./LeaveForm";

export const AddLeave = () => {
  const [employeeId, setEmployeeId] = useState(0);
  const [leaveTypeId, setLeaveTypeId] = useState(0);
  const [start_date, setStartLeave] = useState('');
  const [end_date, setEndLeave] = useState('');
  const [leaveStatusId, setLeaveStatusId] = useState(0);

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchLeaveTypes = async () => {
    const response = await fetch('/api/leavetypes');
    const data = await response.json();
    setLeaveTypes(data);
  };

  const fetchLeaveStatus = async () => {
    const response = await fetch('/api/leavestatuses');
    const data = await response.json();
    setLeaveStatus(data);
  };

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees');
    const data = await response.json();
    setEmployees(data);
  }
  
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  useEffect(() => {
    fetchLeaveStatus();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      
    e.preventDefault();
    if (!employeeId || !leaveTypeId || !start_date || !end_date || !leaveStatusId) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const res = await fetch('/api/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeId,
          leaveTypeId,
          start_date: `${start_date}T00:00:00.000Z`,
          end_date: `${end_date}T00:00:00.000Z`,
          leaveStatusId
        })
      });
      if (res.ok) {
        alert('Leave added successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  return(
    <form onSubmit={handleSubmit} className="form-group">
      <LeaveForm
        employeeId={employeeId}
        leaveTypeId={leaveTypeId}
        start_date={start_date}
        end_date={end_date}
        leaveStatusId={leaveStatusId}
        setEmployeeId={setEmployeeId}
        setLeaveTypeId={setLeaveTypeId}
        setStartLeave={setStartLeave}
        setEndLeave={setEndLeave}
        setLeaveStatusId={setLeaveStatusId}
      />

      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  )
}