export interface Department {
  id: number;
  name: string;
  Role: Role[];
}

export interface Employee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  addressLine: string;
  city: string;
  province: string;
  country: string;
  roleId: number;
  employeeTypeId: number;
  basePay: number;
  EmployeeType: EmployeeType;
  Role: Role;
  Leave: Leave[];
  Signatory: Signatory[];
}

export interface EmployeeType {
  id: number;
  name: string;
  Employee: Employee[];
}

export interface Leave {
  id: number;
  employeeId: number;
  leaveTypeId: number;
  start_date: string;
  end_date: string;
  leaveStatusId: number;
  Employee: Employee;
  LeaveStatus: LeaveStatus;
  LeaveType: LeaveType;
  Signatory: Signatory[];
}

export interface LeaveStatus {
  id: number;
  name: string;
  Leave: Leave[];
}

export interface LeaveType {
  id: number;
  name: string;
  Leave: Leave[];
}

export interface Role {
  id: number;
  title: string;
  departmentId: number;
  Employee: Employee[];
  Department: Department;
}

export interface Signatory {
  id: number;
  approverId: number;
  leaveId: number;
  Employee: Employee;
  Leave: Leave;
}

export interface GovermentContribution {
  id: number;
  employeeId: number;
  sss: number;
  pagIbig: number;
  philHealth: number;
  totalAmount: number;
  Employee: Employee;
}

export interface LeaveFormProps {
  employeeId: number;
  leaveTypeId: number;
  start_date: string;
  end_date: string;
  leaveStatusId: number;
  setEmployeeId: (value: number) => void;
  setLeaveTypeId: (value: number) => void;
  setStartLeave: (value: string) => void;
  setEndLeave: (value: string) => void;
  setLeaveStatusId: (value: number) => void;
}

export interface SignatoryFormProps {
  approverId: number;
  leaveId: number;
  setApproverId: (value: number) => void;
  setLeaveId: (value: number) => void;

}

export interface EmployeeFormProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  addressLine: string;
  city: string;
  province: string;
  country: string;
  roleId: number;
  employeeTypeId: number;
  basePay: number;

  setFirstName: (value: string) => void;
  setMiddleName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setAddressLine: (value: string) => void;
  setCity: (value: string) => void;
  setProvince: (value: string) => void;
  setCountry: (value: string) => void;
  setRoleId: (value: number) => void;
  setEmployeeTypeId: (value: number) => void;
  setBasePay: (value: number) => void;
}

export interface GovermentContribution{
  id: number;
  employeeId: number;
  sss: number;
  pagIbig: number;
  philHealth: number;
  totalAmount: number;
  Employee: Employee;
}

export interface Payhead{
  id: number;
  payheadTypeId: number;
  employeeId: number;
  description: string;
  amount: number;
  effectiveDate: string;
  Employee: Employee;
  PayheadType: PayheadType;
}

export interface Payslip{
  id: number,
  payrollId: number,
  totalDeduction: number,
  totalEarnings: number,
  netPay: number,
  PayRoll: PayRoll;
}
export interface PayRoll {
  id: number;
  payrollTypeId: number;
  cutoffStartDate: string;
  cutoffEndDate: string;
  dateCreated: string;
  employeeId: number;
  Employee: Employee;
  PayrollType: PayrollType[];
  Payslip: Payslip[];
}

export interface PayrollType {
  id: number;
  name: string;
  Payroll: PayRoll[];
}

export interface PayheadType {
  id: number;
  name: string;
  Payhead: Payhead[];
}

export interface PayheadFormProps {
  payheadTypeId: number;
  employeeId: number;
  description: string;
  amount: number;
  effectiveDate: string;
  
  setPayheadTypeId: (value: number) => void;
  setEmployeeId: (value: number) => void;
  setDescription: (value: string) => void;
  setAmount: (value: number) => void;
  setEffectiveDate: (value: string) => void;
}

export interface PayrollFormProps {
  payrollTypeId: number,
  employeeId: number,
  cutoffStartDate: string,
  cutoffEndDate: string,
  dateCreated: string
  
  setPayrollTypeId: (value: number) => void;
  setEmployeeId: (value: number) => void;
  setCutoffStartDate: (value: string) => void;
  setCutoffEndDate: (value: string) => void;
  setDateCreated: (value: string) => void;
}
