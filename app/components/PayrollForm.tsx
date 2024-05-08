import { useFetch } from "@/lib/fetchHandler";
import { Employee, PayrollFormProps, PayrollType } from "@/lib/interfaces";
import { ChangeEvent, useEffect } from "react";

export const PayrollForm: React.FC<PayrollFormProps> = ({
  payrollTypeId,
  employeeId,
  cutoffStartDate,
  cutoffEndDate,
  dateCreated,
  setPayrollTypeId,
  setEmployeeId,
  setCutoffStartDate,
  setCutoffEndDate,
  setDateCreated

}) => {
  const {data: employees, fetchData: fetchEmployees} = useFetch('/api/employees');
  const {data: payrollType, fetchData: fetchPayrollTypes} = useFetch('/api/payrolltypes');
  
  useEffect(() => {
    fetchEmployees();
    fetchPayrollTypes();
  }, []);


  return (
    <>
      <div className="form-group">
      <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={employeeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setEmployeeId(Number(e.target.value))}
        >
          <option value="">Select Employee</option>
          {employees.map((emp: Employee) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp?.middleName} {emp.lastName}
            </option>
          ))}
        </select>

        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={payrollTypeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setPayrollTypeId(Number(e.target.value))}
        >
          <option value="">Select Payroll Type</option>
          {payrollType.map((type: PayrollType) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <label className="block mt-2">Cutoff Start Date</label>
        <input
          type="date"
          className="input input-bordered input-primary w-full p-1.5"
          value={cutoffStartDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCutoffStartDate(e.target.value)}
        />

        <label className="block mt-2">Cutoff End Date</label>
        <input
          type="date"
          className="input input-bordered input-primary w-full p-1.5"
          value={cutoffEndDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCutoffEndDate(e.target.value)}
        />

        <label className="block mt-2">Date Created</label>
        <input
          type="date"
          className="input input-bordered input-primary w-full p-1.5"
          value={dateCreated}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDateCreated(e.target.value)}
        />
      </div>
    </>
  )
}