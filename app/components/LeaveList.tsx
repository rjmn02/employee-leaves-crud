import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Leave } from '@/lib/interfaces';
import { EditLeave } from './EditLeave';
import { useFetch } from '@/lib/fetchHandler';
import { deleteLeave } from '@/lib/deletionHandlers';

const LeaveList = () => {
  const { data: leaves, fetchData: fetchLeaves }  = useFetch('/api/leaves');

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState<Leave | null>(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleEditClick = (leave: Leave) => {
    setCurrentLeave(leave);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (leave: Leave) => {
    await deleteLeave(leave);
    setTimeout(async () => {
      await fetchLeaves();
    }, 500)
  };

  const handleLeaveUpdated = () => {
    fetchLeaves();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>ID</th>
            <th style={{ color: 'white' }}>Full Name</th>
            <th style={{ color: 'white' }}>Start Leave</th>
            <th style={{ color: 'white' }}>End Leave</th>
            <th style={{ color: 'white' }}>Leave Type</th>
            <th style={{ color: 'white' }}>Status</th>
            <th style={{ color: 'white' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {leaves.map((leave: Leave) => (
          <tr key={leave.id}>
            <td>{leave.id}</td>
            <td>{leave.Employee.firstName} {leave.Employee.middleName} {leave.Employee.lastName}</td>
            <td>{leave.start_date.toString()}</td> 
            <td>{leave.end_date.toString()}</td> 
            <td>{leave.LeaveType.name}</td>
            <td>{leave.LeaveStatus.name}</td>
            <td className='flex gap-4 '>              
              <FaEdit  cursor='pointer' size={20} style={{ color: 'blue', marginRight: '10px' }} onClick={() => handleEditClick(leave)} />
              <MdDelete  cursor='pointer' size={20} style={{ color: 'red' }} onClick={() => handleDeleteClick(leave)} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {currentLeave && (
        <EditLeave
          leave={currentLeave}
          onLeaveUpdated={handleLeaveUpdated}
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
        />
      )}
    </div>
  );
};

export default LeaveList;