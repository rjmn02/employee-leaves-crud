import React, { useState, useRef, useEffect } from 'react';
import { LeaveForm } from './LeaveForm';
import { ErrorModal, SuccessModal } from './Modal';

export function EditLeave({ leaves, onLeaveUpdated, isDialogOpen, setIsDialogOpen }: { leaves: any, onLeaveUpdated: () => void, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void }) {
  const [firstName, setFirstName] = useState(leaves.firstName);
  const [lastName, setLastName] = useState(leaves.lastName);
  const [middleName, setMiddleName] = useState(leaves.middleName);
  const [leaveStatus, setleaveStatus] = useState(leaves.leaveStatus);
  const [LeaveTypes, setLeaveTypes] = useState(leaves.LeaveTypes);
  const [start_date, setStartDate] = useState(new Date(leaves.start_date));
  const [end_date, setEndDate] = useState(new Date(leaves.end_date));


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setFirstName(leaves.firstName);
    setLastName(leaves.lastName);
    setMiddleName(leaves.middleName);
    setleaveStatus(leaves.leaveStatus);
    setLeaveTypes(leaves.leaveTypes);
    setStartDate(new Date(leaves.start_date));
    setEndDate(new Date(leaves.end_date));

  
  }, [leaves]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const response = await fetch(`/api/leaves/${leaves.id}`, {
        method: 'PATCH',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          leaveStatus,
          LeaveTypes,
          start_date,
          end_date
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to Edit Leave');
      }
  
      const data = await response.json();
  
      resetForm();
      setSuccess(true);
      onLeaveUpdated();
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };
  
  const resetForm = () => {

    setFirstName('');
    setMiddleName('');
    setLastName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setleaveStatus('');
    setLeaveTypes('');




  };

  return (
    <div>
      
      <ErrorModal show={!!error} message={error || ''} />
      <SuccessModal show={success} message="Leave edited successfully!" />

      {isDialogOpen && (
        <div>
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center no-scrollbar">
              <h2 className="font-bold text-2xl mb-4" >Employee Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <LeaveForm
                 firstName={firstName}
                 middleName={middleName}
                 lastName={lastName}
                 start_date={start_date.toISOString()}
                 end_date={end_date.toISOString()}
                 leaveStatus={leaveStatus}
                 leaveTypes={LeaveTypes}
     
                 setFirstName={setFirstName}
                 setMiddleName={setMiddleName}
                 setLastName={setLastName}
                 setStartDate={(value: string) => setStartDate(new Date(value))}
                 setEndDate={(value: string) => setEndDate(new Date(value))}
                 setLeaveStatus={setleaveStatus}
                 setLeaveTypes={setLeaveTypes}
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