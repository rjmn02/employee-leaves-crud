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
}