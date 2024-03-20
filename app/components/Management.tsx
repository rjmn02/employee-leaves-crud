import AddEmployee from "./AddEmployee";
import AddLeave from "./AddLeave";
import EmployeeList from "./EmployeeList";
import LeaveList from "./LeaveList";

export default function Management(){
  return(

    <main className= 'max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold padding'>Employee Management System</h1>
        <AddLeave />
        <AddEmployee/>
      </div>
      <h2 className='text-2xl font-bold padding'>Employee List</h2>
      <EmployeeList/>
      <h2 className='text-2xl font-bold padding'>Employee Leave List</h2>
      <LeaveList/>
        
    </main>

  );
}
