import { useFetch } from "@/lib/fetchHandler";
import { useEffect, useState } from "react";
import { PayheadForm } from "./PayheadForm";

export const AddPayhead = () => {
  const [employeeId, setEmployeeId] = useState(0);
  const [payheadTypeId, setPayheadTypeId] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [effectiveDate, setEffectiveDate] = useState('');

  const {data: employees, fetchData: fetchEmployees} = useFetch('/api/employees');
  const {data: payheadType, fetchData: fetchPayheadTypes} = useFetch('/api/payheadtypes');

  useEffect(() => {
    fetchEmployees();
    fetchPayheadTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employeeId || !payheadTypeId || !description || !amount || !effectiveDate) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const res = await fetch('/api/payheads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeId,
          payheadTypeId,
          description,
          amount,
          effectiveDate: `${effectiveDate}T00:00:00.000Z`
        })
      });
      if (res.ok) {
        alert('Payhead added successfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <PayheadForm
        payheadTypeId={payheadTypeId}
        employeeId={employeeId}
        description={description}
        amount={amount}
        effectiveDate={effectiveDate}
        setPayheadTypeId={setPayheadTypeId}
        setEmployeeId={setEmployeeId}
        setDescription={setDescription}
        setAmount={setAmount}
        setEffectiveDate={setEffectiveDate}
      />
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
        
    </form>
  )
}