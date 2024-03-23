import React, { useState, useRef, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { useRouter } from 'next/navigation'
import { ErrorModal, SuccessModal } from './Modal';
import { LeaveForm } from './LeaveForm';


export function AddLeave({onLeaveAdded}: {onLeaveAdded: () => void}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [LeaveTypes, setLeaveTypes] = useState('');
  const [LeaveStatus, setLeaveStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter()

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let successModalTimeout: NodeJS.Timeout;
    let errorModalTimeout: NodeJS.Timeout;

    if (showSuccessModal) {
      successModalTimeout = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000); // 10 seconds
    }

    if (showErrorModal) {
      errorModalTimeout = setTimeout(() => {
        setShowErrorModal(false);
      }, 3000); // 10 seconds
    }

    return () => {
      clearTimeout(successModalTimeout);
      clearTimeout(errorModalTimeout);
    };
  }, [showSuccessModal, showErrorModal]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setIsDialogOpen(false);

    if (!firstName || !middleName || !lastName || !start_date || !end_date || !LeaveStatus || !LeaveTypes ) {
       setError(null);
       setShowErrorModal(true);
       setLoading(false);
    return;
    }

    try {
      const response = await fetch('/api/leaves', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          start_date,
          end_date,
          LeaveStatus,
          LeaveTypes
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
  
      const data = await response.json();
  
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setStartDate(new Date());
      setEndDate(new Date());
      setLeaveStatus('');
      setLeaveTypes('');
      setSuccess(true);
      dialogRef.current?.close();
      setShowSuccessModal(true);
      onLeaveAdded(); // Call the function passed as a prop

    } catch (error: any) {
      setError(error.message);
      dialogRef.current?.close();
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }

  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <button className="btn btn-primary w-full mb-5 text-base 100 text-xl" onClick={openDialog}> Add Leave
        <LuPlus />
      </button>

      {isDialogOpen && (
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
            leaveStatus={LeaveStatus}
            leaveTypes={LeaveTypes}

            setFirstName={setFirstName}
            setMiddleName={setMiddleName}
            setLastName={setLastName}
            setStartDate={(value: string) => setStartDate(new Date(value))}
            setEndDate={(value: string) => setEndDate(new Date(value))}
            setLeaveStatus={setLeaveStatus}
            setLeaveTypes={setLeaveTypes}
          />

              <div className="modal-action">
                <button className='btn btn-primary block ' style={{ width: '373px' }} type='submit' disabled={loading}>Add Leave</button>
                <button className="btn" onClick={() => setIsDialogOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      <SuccessModal show={showSuccessModal} message="Leave was successfully Added." />
      <ErrorModal show={showErrorModal} message="Error: Failed To Add Leave"/>
    </div>
  );
}