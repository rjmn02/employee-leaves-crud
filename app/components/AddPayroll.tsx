import { useFetch } from "@/lib/fetchHandler";
import { useEffect, useState } from "react";
import { PayrollForm } from "./PayrollForm";
import { Payhead } from "@prisma/client";
import prisma from "@/lib/prisma";

export const AddPayroll = () => {
  const [payrollTypeId, setPayrollTypeId] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [cutoffStartDate, setCutoffStartDate] = useState('');
  const [cutoffEndDate, setCutoffEndDate] = useState('');
  const [dateCreated, setDateCreated] = useState('');

  const {data: employees, fetchData: fetchEmployees} = useFetch('/api/employees');
  const {data: payrollTypes, fetchData: fetchPayrollTypes} = useFetch('/api/payrolltypes');
  useEffect(() => {
    fetchEmployees();
    fetchPayrollTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const genPayroll = await fetch('/api/payroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payrollTypeId,
          employeeId,
          cutoffStartDate: `${cutoffStartDate}T00:00:00.000Z`,
          cutoffEndDate: `${cutoffEndDate}T00:00:00.000Z`,
          dateCreated: `${dateCreated}T00:00:00.000Z`
        })
      });

      if(genPayroll.ok){
        alert('Payroll Generated');
      }
      
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <PayrollForm
        payrollTypeId={payrollTypeId}
        employeeId={employeeId}
        cutoffStartDate={cutoffStartDate}
        cutoffEndDate={cutoffEndDate}
        dateCreated={dateCreated}
        setPayrollTypeId={setPayrollTypeId}
        setEmployeeId={setEmployeeId}
        setCutoffStartDate={setCutoffStartDate}
        setCutoffEndDate={setCutoffEndDate}
        setDateCreated={setDateCreated}
      />

      <button type="submit" className="btn btn-primary mt-4">
        Generate Payroll
      </button>
    </form>
  )
};