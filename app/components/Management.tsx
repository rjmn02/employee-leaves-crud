
import { EmployeeForm } from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { LeaveForm } from "./LeaveForm";
import LeaveList from "./LeaveList";

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
      <br />
      <h2 className='text-2xl font-bold padding'>Leave FORM</h2>
      <LeaveForm employeeId={0} leaveTypeId={0} start_date={undefined} end_date={undefined} leaveStatusId={0} setEmployeeId={function (value: number): void {
        throw new Error("Function not implemented.");
      } } setLeaveTypeId={function (value: number): void {
        throw new Error("Function not implemented.");
      } } setStartLeave={function (value: string): void {
        throw new Error("Function not implemented.");
      } } setEndLeave={function (value: string): void {
        throw new Error("Function not implemented.");
      } } setLeaveStatusId={function (value: number): void {
        throw new Error("Function not implemented.");
      } }/>

      <h2 className='text-2xl font-bold padding'>EMPLOYEE FORM</h2>

    </main>

  );
}
