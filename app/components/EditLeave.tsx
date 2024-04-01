import React, { useState, useEffect } from 'react';
import { LeaveFormProps, Leave } from '@/lib/interfaces';
import { LeaveForm } from './LeaveForm';

export const EditLeave = ({ leave, onLeaveUpdated, isDialogOpen, setIsDialogOpen }: { leave: Leave, onLeaveUpdated: () => void, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void }) => {
  const [employeeId, setEmployeeId] = useState(leave.employeeId);
  const [leaveTypeId, setLeaveTypeId] = useState(leave.leaveTypeId);
  const [start_date, setStartLeave] = useState(leave.start_date);
  const [end_date, setEndLeave] = useState(leave.end_date);
  const [leaveStatusId, setLeaveStatusId] = useState(leave.leaveStatusId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmployeeId(leave.employeeId);
    setLeaveTypeId(leave.leaveTypeId);
    setStartLeave(leave.start_date);
    setEndLeave(leave.end_date);
    setLeaveStatusId(leave.leaveStatusId);
  }, [leave]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`/api/leaves/${leave.id}`, {
        method: 'PUT',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          leaveTypeId,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          leaveStatusId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to Edit Leave');
      }
  
      const data = await response.json();
  
      resetForm();
      onLeaveUpdated();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };
  
  const resetForm = () => {
    setEmployeeId(0);
    setLeaveTypeId(0);
    setStartLeave('');
    setEndLeave('');
    setLeaveStatusId(0);
  };

  return (
    <div>
      {isDialogOpen && (
        <div>
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center no-scrollbar">
              <h2 className="font-bold text-2xl mb-4" >Leave Information</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <LeaveForm
                  employeeId={employeeId}
                  leaveTypeId={leaveTypeId}
                  start_date={start_date}
                  end_date={end_date}
                  leaveStatusId={leaveStatusId}
                  setEmployeeId={setEmployeeId}
                  setLeaveTypeId={setLeaveTypeId}
                  setStartLeave={setStartLeave}
                  setEndLeave={setEndLeave}
                  setLeaveStatusId={setLeaveStatusId}
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