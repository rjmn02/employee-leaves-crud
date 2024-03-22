
import { AddEmployee } from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import { AddLeave } from "./AddLeave";
import LeaveList from "./LeaveList";
import SignatoryList from "./SignatoryList";

export default function Management(){
  return(
    <main className= 'max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold padding'>Employee Management System</h1>
      </div>
      <h2 className='text-2xl font-bold padding'>Employee List</h2>
      <EmployeeList/>
      <h2 className='text-2xl font-bold padding'>Employee Leave List</h2>
      <LeaveList/>
      <h2 className='text-2xl font-bold padding'>SIGNATORY List</h2>
      <SignatoryList/>
      <br />
      <h2 className='text-2xl font-bold padding'>ADD LEAVE FORM</h2>
      <AddLeave/>
      <br />
      <h2 className='text-2xl font-bold padding'>ADD EMPLOYEE FORM</h2>
      <AddEmployee/>

    </main>

  );
}
