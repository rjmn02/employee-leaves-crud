import { useFetch } from '@/lib/fetchHandler';
import { SignatoryFormProps, Employee, Leave } from '@/lib/interfaces';
import React, { ChangeEvent, useEffect, useState } from 'react';

export const SignatoryForm: React.FC<SignatoryFormProps> = ({
  approverId,
  leaveId,
  setApproverId,
  setLeaveId,
}) => {
  
  const {data: leaves, fetchData: fetctLeaves} = useFetch('/api/leaves');
  const {data: employees, fetchData: fetchEmployees} = useFetch('/api/employees');

  useEffect(() => {
    fetchEmployees();
    fetctLeaves();
  }, []);

  return(
    <>
      <div className="form-group">
        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={approverId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setApproverId(Number(e.target.value))}
        >
          <option value="">Select Approver</option>
          {employees.filter((employee: Employee) => [1, 6, 9, 13, 17].includes(employee.roleId)).map((employee: Employee) => (
            <option key={employee.id} value={employee.id}>{employee.firstName} {employee?.middleName} {employee.lastName} | {employee.Role.title}</option>
          ))}
        </select>

        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={leaveId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLeaveId(Number(e.target.value))}
        >
          <option value="">Select Leave Request</option>
          {leaves.map((leave: Leave) => (
            <option key={leave.id} value={leave.id}>
              Leave ID: {leave.id} | {leave.Employee.firstName} {leave.Employee?.middleName} {leave.Employee.lastName} | {leave.LeaveType?.name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}