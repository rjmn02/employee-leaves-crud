import React, { ChangeEvent, useEffect, useState } from 'react';
import { EmployeeFormProps, Role, EmployeeType } from '@/lib/interfaces';

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  firstName,
  middleName,
  lastName,
  email,
  addressLine,
  city,
  province,
  country,
  roleId,
  employeeTypeId,
  setFirstName,
  setMiddleName,
  setLastName,
  setEmail,
  setAddressLine,
  setCity,
  setProvince,
  setCountry,
  setRoleId,
  setEmployeeTypeId
}) => {

  const [roles, setRoles] = useState([]);
  useEffect(() => {
      const fetchRoles = async () => {
        const response = await fetch('/api/roles');
        const data = await response.json();
        setRoles(data);
      };
      fetchRoles();
    }, []);

    const [employeeTypes, setEmployeeTypes] = useState([]);
    useEffect(() => {
      const fetchEmployeeTypes = async () => {
        const response = await fetch('/api/employeetypes');
        const data = await response.json();
        setEmployeeTypes(data);
      }
      fetchEmployeeTypes();
    }, []);

  return (
    <>
      <div className="form-group">
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='First Name'
          className="input input-bordered input-primary w-full p-1.5" 
          value={firstName} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='Middle Name'
          className="input input-bordered input-primary w-full p-1.5" 
          value={middleName} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMiddleName(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='Last Name'
          className="input input-bordered input-primary w-full p-1.5" 
          value={lastName} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='Email'
          className="input input-bordered input-primary w-full p-1.5" 
          value={email} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='Address'
          className="input input-bordered input-primary w-full p-1.5" 
          value={addressLine} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAddressLine(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='City'
          className="input input-bordered input-primary w-full p-1.5" 
          value={city} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='Province'
          className="input input-bordered input-primary w-full p-1.5" 
          value={province} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProvince(e.target.value)} 
        />
        <label className="block mb-2"></label>
        <input 
          type="text" 
          placeholder='Country'
          className="input input-bordered input-primary w-full p-1.5" 
          value={country} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} 
        />
        <label className="block mb-2"></label>

        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={roleId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setRoleId(Number(e.target.value))}
        >
          <option value="">Select Role</option>
          {roles.map((role: Role) => (
            <option key={role.id} value={role.id}>{role.title}</option>
          ))}
        </select>

        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={employeeTypeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setEmployeeTypeId(Number(e.target.value))}
        >
          <option value="">Select Employee Type</option>
          {employeeTypes.map((employeeType: EmployeeType) => (
            <option key={employeeType.id} value={employeeType.id}>{employeeType.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};