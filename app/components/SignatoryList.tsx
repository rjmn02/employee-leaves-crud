
import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Leave } from '@/lib/interfaces';
import { Signatory } from '@/lib/interfaces';

const SignatoryList = () => {
  const [signatories, setSignatories] = useState([]);

  useEffect(() => {
    const fetchSignatories = async () => {
      const response = await fetch('/api/signatories'); 
      const data = await response.json();
      setSignatories(data);
    };

    fetchSignatories();
  }, []);

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
            <td>
              <FaEdit size={20} />
              <br />
              <MdDelete size={20} />
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
        );
};

export default SignatoryList;