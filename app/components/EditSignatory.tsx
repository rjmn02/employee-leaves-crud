import { Signatory } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { SignatoryForm } from "./SignatoryForm";

export const EditSignatory = ({ signatory, onSignatoriesUpdated, isDialogOpen, setIsDialogOpen }: { signatory: Signatory, onSignatoriesUpdated: () => void, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void }) => {
  const [approverId, setApproverId] = useState(signatory.approverId);
  const [leaveId, setLeaveId] = useState(signatory.leaveId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setApproverId(signatory.approverId);
    setLeaveId(signatory.leaveId);
  }, [signatory]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`/api/signatories/${signatory.id}`, {
        method: 'PUT',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approverId,
          leaveId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to Edit Signatory');
      }
  
      const data = await response.json();
  
      resetForm();
      onSignatoriesUpdated();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const resetForm = () => {
    setApproverId(0);
    setLeaveId(0);
  }

  return (
    <div>
      {isDialogOpen && (
        <div>
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center no-scrollbar">
              <h2 className="font-bold text-2xl mb-4" >Signatory Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <SignatoryForm
                  approverId={approverId}
                  leaveId={leaveId}
                  setApproverId={setApproverId}
                  setLeaveId={setLeaveId}
                />

                <div className="modal-action">
                  <button className='btn btn-primary block ' style={{ width: '373px' }} type='submit' disabled={loading}>Edit Signatory</button>
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