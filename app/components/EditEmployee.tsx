import React, { useState, useEffect } from 'react';
import { LeaveForm } from './LeaveForm';
import { Employee } from '@/lib/interfaces';
import { EmployeeForm } from './EmployeeForm';

export const EditEmployee = (
  { employee, onEmployeeUpdated, isDialogOpen, setIsDialogOpen }: 
  { employee: Employee, onEmployeeUpdated: () => void, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void }) => {
    const [firstName, setFirstName] = useState(employee.firstName);
    const [middleName, setMiddleName] = useState(employee.middleName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [email, setEmail] = useState(employee.email);
    const [addressLine, setAddressLine] = useState(employee.addressLine);
    const [city, setCity] = useState(employee.city);
    const [province, setProvince] = useState(employee.province);
    const [country, setCountry] = useState(employee.country);
    const [roleId, setRoleId] = useState(employee.roleId);
    const [employeeTypeId, setEmployeeTypeId] = useState(employee.employeeTypeId); 
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstName(employee.firstName);
    setMiddleName(employee.middleName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setAddressLine(employee.addressLine);
    setCity(employee.city);
    setProvince(employee.province);
    setCountry(employee.country);
    setRoleId(employee.roleId);
    setEmployeeTypeId(employee.employeeTypeId);
  }, [employee]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: 'PUT',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          addressLine,
          city,
          province,
          country,
          roleId,
          employeeTypeId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to Edit Leave');
      }
  
      const data = await response.json();
  
      resetForm();
      onEmployeeUpdated();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };
  
  const resetForm = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setEmail('');
    setAddressLine('');
    setCity('');
    setProvince('');
    setCountry('');
    setRoleId(0);
    setEmployeeTypeId(0);
  };

  return (
    <div>
      {isDialogOpen && (
        <div>
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center no-scrollbar">
              <h2 className="font-bold text-2xl mb-4" >Employee Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <EmployeeForm
                  firstName={firstName}
                  middleName={middleName}
                  lastName={lastName}
                  email={email}
                  addressLine={addressLine}
                  city={city}
                  province={province}
                  country={country}
                  roleId={roleId}
                  employeeTypeId={employeeTypeId}
                  setFirstName={setFirstName}
                  setMiddleName={setMiddleName}
                  setLastName={setLastName}
                  setEmail={setEmail}
                  setAddressLine={setAddressLine}
                  setCity={setCity}
                  setProvince={setProvince}
                  setCountry={setCountry}
                  setRoleId={setRoleId}
                  setEmployeeTypeId={setEmployeeTypeId}
                />

                <div className="modal-action">
                  <button className='btn btn-primary block ' style={{ width: '373px' }} type='submit' disabled={loading}>Edit Employee</button>
                  <button className="btn" onClick={() => setIsDialogOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}