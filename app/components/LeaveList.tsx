import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const LeaveList = ()=>{
  return (
    <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th style={{ color: 'black' }}>ID</th>
          <th style={{ color: 'black' }}>Full Name</th>
          <th style={{ color: 'black' }}>Start Leave</th>
          <th style={{ color: 'black' }}>End Leave</th>
          <th style={{ color: 'black' }}>Leave Type</th>
          <th style={{ color: 'black' }}>Signatory</th>
          <th style={{ color: 'black' }}>Status</th>
          <th style={{ color: 'black' }}>Actions</th>
         
        </tr>
      </thead>
      <tbody>

        <tr>
          <th>1</th>
          <td>Cy Ganderton Luke</td>
          <td>03-17-24</td>
          <td>03-30-24</td>
          <td>Paternity</td>
          <td>Placeholder</td>
          <td>Approved</td>
          <td className='flex gap-5' > 
          
          
          <button><FaEdit size={25} style={{ color: 'blue' }}/></button>
          <button><MdDelete size={25} style={{ color: 'blue' }}/></button> 
          
          </td>
        </tr>

      </tbody>
    </table>
  </div>
  );
};

export default LeaveList;
