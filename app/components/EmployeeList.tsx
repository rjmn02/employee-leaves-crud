import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Employee } from '@/lib/interfaces';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);


  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>ID</th>
            <th style={{ color: 'white' }}>Full Name</th>
            <th style={{ color: 'white' }}>Email</th>
            <th style={{ color: 'white' }}>Full Address</th>
            <th style={{ color: 'white' }}>Role</th>
            <th style={{ color: 'white' }}>Employee Type</th>
            <th style={{ color: 'white' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {employees.map((employee: Employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.firstName} {employee?.middleName} {employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.addressLine}, {employee.city}, {employee.province}, {employee.country}</td>
            <td>
              {employee.Role.title}
              <br />
              <span className="badge badge-ghost  badge-sm min-w-[ch20]">{employee.Role.Department.name}</span>  
            </td>
            <td>{employee.EmployeeType.name}</td>
            <td>
              <FaEdit size={20} />
              <br />
              <MdDelete size={20} />
              <br />
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
        );
}

export default EmployeeList;