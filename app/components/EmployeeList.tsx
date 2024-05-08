import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Employee } from '@/lib/interfaces';
import { EditEmployee } from './EditEmployee';
import { deleteEmployee } from '@/lib/deletionHandlers';
import { useFetch } from '@/lib/fetchHandler';


const EmployeeList = () => {
  const { data :employees, fetchData: fetchEmployees } = useFetch('/api/employees');
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditClick = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (employee: Employee) => {
    await deleteEmployee(employee);
    setTimeout(async () => {
      await fetchEmployees();
    }, 500)
  };

  const handleEmployeeUpdated = () => {
    fetchEmployees();
  };

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
            <th style={{ color: 'white' }}>Base Pay</th>
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
            <td>PHP {employee.basePay}</td>
            <td>{employee.EmployeeType.name}</td>
            <td className='flex gap-4 '>              
              <FaEdit  cursor='pointer' size={20} style={{ color: 'blue', marginRight: '10px' }} onClick={() => handleEditClick(employee)} />
              <MdDelete  cursor='pointer' size={20} style={{ color: 'red' }} onClick={() => handleDeleteClick(employee)} />
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        {currentEmployee && (
        <EditEmployee
          employee={currentEmployee}
          onEmployeeUpdated={handleEmployeeUpdated}
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
        />
      )}

      
        </div>
        );
}

export default EmployeeList;