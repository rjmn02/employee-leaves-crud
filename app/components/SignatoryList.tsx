
import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Signatory } from '@/lib/interfaces';
import { EditSignatory } from './EditSignatory';

const SignatoryList = () => {
  const [signatories, setSignatories] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSignatory, setCurrentSignatory] = useState<Signatory | null>(null);

  const fetchSignatories = async () => {
    const response = await fetch('/api/signatories'); 
    const data = await response.json();
    setSignatories(data);
  };
  
  useEffect(() => {
    fetchSignatories();
  }, []);

  const handleEditClick = (signatory: Signatory) => {
    setCurrentSignatory(signatory);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (signatoryId: number) => {
    try {
      const response = await fetch(`/api/signatories/${signatoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete signatory');
      }

      fetchSignatories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignatoriesUpdated = () => {
    fetchSignatories();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>ID</th>
            <th style={{ color: 'white' }}>Approver</th>
            <th style={{ color: 'white' }}>Leave ID</th>
            <th style={{ color: 'white' }}>Leave Requester</th>
          </tr>
        </thead>
        <tbody>
          {signatories.map((signatory: Signatory) => (
            <tr key={signatory.id}>
              <td>{signatory.id}</td>
              <td>{signatory.Employee.firstName} {signatory.Employee?.middleName} {signatory.Employee.lastName}</td>
              <td>{signatory.Leave.id}</td>
              <td>{signatory.Leave.Employee.firstName} {signatory.Leave.Employee?.middleName} {signatory.Leave.Employee.lastName}</td> 
              <td className='flex gap-4 '>              
                <FaEdit  cursor='pointer' size={20} style={{ color: 'blue', marginRight: '10px' }} onClick={() => handleEditClick(signatory)} />
                <MdDelete  cursor='pointer' size={20} style={{ color: 'red' }} onClick={() => handleDeleteClick(signatory.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentSignatory && (
        <EditSignatory
          signatory={currentSignatory}
          onSignatoriesUpdated={handleSignatoriesUpdated}
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
        />
      )}
    </div>
  );
};

export default SignatoryList;