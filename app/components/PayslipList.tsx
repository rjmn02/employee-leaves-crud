import { useFetch } from "@/lib/fetchHandler";
import { Employee } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { Payslip } from "@prisma/client";
import { useEffect } from "react";

export const PayslipList = ({employee, isDialogOpen, setIsDialogOpen }: 
  {employee: Employee, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void}) => {
    type PayslipType = {
      id: string;
      Payroll: {
        dateCreated: Date;
        Employee: {
          GovernmentContribution: {
            sss: number;
            philHealth: number;
            pagIbig: number;
            totalAmount: number;
          }[];
          basePay: number;
        };
      };
      totalDeduction: number;
      totalEarning: number;
      netPay: number;
    };
    
  const {data: payslips, fetchData: fetchPayslips} = useFetch(`/api/payslip/employee/${employee.id}`);
  useEffect(() => {
    if (isDialogOpen) {
      fetchPayslips();
    }
  }, [isDialogOpen]);

  
    return (
      <div>
        {isDialogOpen && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center no-scrollbar">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: 'white' }}>Payslip ID</th>
                  <th style={{ color: 'white' }}>Date Generated</th>
                  <th style={{ color: 'white' }}>SSS</th>
                  <th style={{ color: 'white' }}>PhilHealth</th>
                  <th style={{ color: 'white' }}>Pag Ibig</th>
                  <th style={{ color: 'white' }}>Total Government Contribution</th>
                  <th style={{ color: 'white' }}>Total Payhead Deduction</th>
                  <th style={{ color: 'white' }}>Total Payhead Earnings</th>
                  <th style={{ color: 'white' }}>Base Pay</th>
                  <th style={{ color: 'white' }}>Net Pay</th>


                </tr>
              </thead>
              <tbody>
              {payslips.map((payslip: PayslipType) => (
                <tr key={payslip.id}>
                  <td>{payslip.id}</td>
                  <td>{(payslip.Payroll.dateCreated.toString())}</td>
                  <td>{payslip.Payroll.Employee.GovernmentContribution[0].sss}</td>
                  <td>{payslip.Payroll.Employee.GovernmentContribution[0].philHealth}</td>
                  <td>{payslip.Payroll.Employee.GovernmentContribution[0].pagIbig}</td>
                  <td>{payslip.Payroll.Employee.GovernmentContribution[0].totalAmount}</td>
                  <td>{payslip.totalDeduction}</td>
                  <td>{payslip.totalEarning}</td>
                  <td>{payslip.Payroll.Employee.basePay}</td>
                  <td>{payslip.netPay}</td>
                </tr>
              ))}
              </tbody>
            </table>

            <div className="modal-action">
              <button className="btn" onClick={() => setIsDialogOpen(false)}>Close</button>
            </div>
            </div>
          </dialog>
        )}
      </div>
    )

}
