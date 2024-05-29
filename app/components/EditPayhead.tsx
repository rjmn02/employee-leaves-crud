import { Payhead, PayheadFormProps } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { PayheadForm } from "./PayheadForm";

export const EditPayhead = ({ payhead, onPayheadUpdated, isDialogOpen, setIsDialogOpen }: { payhead: Payhead, onPayheadUpdated: () => void, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void }) => {
  const [payheadTypeId, setPayheadTypeId] = useState(payhead.payheadTypeId);
  const [employeeId, setEmployeeId] = useState(payhead.employeeId);
  const [description, setDescription] = useState(payhead.description);
  const [amount, setAmount] = useState(payhead.amount);
  const [effectiveDate, setEffectiveDate] = useState(payhead.effectiveDate);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setPayheadTypeId(payhead.payheadTypeId);
    setEmployeeId(payhead.employeeId);
    setDescription(payhead.description);
    setAmount(payhead.amount);
    setEffectiveDate(payhead.effectiveDate);

  }, [payhead]);

  const resetForm = () => {
    setPayheadTypeId(0);
    setEmployeeId(0);
    setDescription('');
    setAmount(0);
    setEffectiveDate('');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/payheads/${payhead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payheadTypeId,
          employeeId,
          description,
          amount,
          effectiveDate
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to Edit Payhead');
      }

      const data = await response.json();

      resetForm();
      onPayheadUpdated();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  }

  return (
    <div>
      {isDialogOpen && (
        <div>
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center no-scrollbar">
              <h2 className="font-bold text-2xl mb-4" >Payhead Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="modal-action">
                  <button className='btn btn-primary block ' style={{ width: '373px' }} type='submit' disabled={loading}>Edit Leave</button>
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