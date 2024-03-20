import AddLeave from "./components/AddLeave";
import LeaveList from "./components/LeaveList";

export default function Home(){
  return(

<main className= 'max-w-4xl mx-auto mt-4'>
  <div className='text-center my-5 flex flex-col gap-4'>
    <h1 className='text-4xl font-bold padding'>Employee Leave
    
    </h1>
    <AddLeave />
    </div>
    <LeaveList />
</main>

  );
  }
