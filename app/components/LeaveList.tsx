
import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Leave } from '@/lib/interfaces';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const response = await fetch('/api/leaves'); 
      const data = await response.json();
      setLeaves(data);
    };

    fetchLeaves();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>ID</th>
            <th style={{ color: 'white' }}>Full Name</th>
            <th style={{ color: 'white' }}>Start Leave</th>
            <th style={{ color: 'white' }}>End Leave</th>
            <th style={{ color: 'white' }}>Leave Type</th>
            <th style={{ color: 'white' }}>Status</th>
            <th style={{ color: 'white' }}>Actions</th>

          </tr>
        </thead>
        <tbody>
        {leaves.map((leave: Leave) => (
          <tr key={leave.id}>
            <td>{leave.id}</td>
            <td>{leave.Employee.firstName} {leave.Employee.middleName} {leave.Employee.lastName}</td>
            <td>{leave.start_date.toString()}</td> 
            <td>{leave.end_date.toString()}</td> 
            <td>{leave.LeaveType.name}</td>
            <td>{leave.LeaveStatus.name}</td>
            <td>
              <FaEdit size={20} />
              <br />
              <MdDelete size={20} />
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
        );
};

export default LeaveList;