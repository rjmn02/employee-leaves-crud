import { useFetch } from '@/lib/fetchHandler';
import { SignatoryFormProps, Employee, Leave, PayheadFormProps, PayheadType } from '@/lib/interfaces';
import React, { ChangeEvent, useEffect, useState } from 'react';

export const PayheadForm: React.FC<PayheadFormProps> = ({
  payheadTypeId,
  employeeId,
  description,
  amount,
  effectiveDate,
  setPayheadTypeId,
  setEmployeeId,
  setDescription,
  setAmount,
  setEffectiveDate
}) => {
  
  const {data: employees, fetchData: fetchEmployees} = useFetch('/api/employees');
  const {data: payheadType, fetchData: fetchPayheadTypes} = useFetch('/api/payheadtypes');
  useEffect(() => {
    fetchEmployees();
    fetchPayheadTypes();
  }, []);

  return(
    <>
      <div className="form-group">
        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={employeeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setEmployeeId(Number(e.target.value))}
        >
          <option value="">Select Employee</option>
          {employees.map((employee: Employee) => (
            <option key={employee.id} value={employee.id}>{employee.firstName} {employee?.middleName} {employee.lastName}</option>
          ))}
        </select>

        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={payheadTypeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setPayheadTypeId(Number(e.target.value))}
        >
          <option value="">Select Payhead Type</option>
          {payheadType.map((type: PayheadType) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>))}
        </select>

        <label className="block mt-2"></label>
        <input 
          type="text"
          placeholder='Description' 
          className="input input-bordered input-primary w-full p-1.5" 
          value={description} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} 
        />

        <label className="block mb-2"></label>
        <input
          type="text"
          placeholder='Amount (PHP)'
          className="input input-bordered input-primary w-full p-1.5"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setAmount(value);
            }
          }}
        />

        <label className="block mt-2">Effective Date</label>
        <input 
          type="date" 
          className="input input-bordered input-primary w-full p-1.5" 
          value={effectiveDate} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEffectiveDate(e.target.value)} 
        />
      </div>
    </>
  )
}