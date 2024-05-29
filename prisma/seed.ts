import { computePagIbig, computePhilHealth, computeSSS } from "../lib/calculators";
import prisma from "../lib/prisma";

async function main() {
  const employeeTypes = ["Part Time", "Full Time", "Contractual"];
  const leaveStatuses = ["Approved", "Denied", "Pending"];
  const leaveTypes = ["Vacation", "Sick", "Maternity", "Paternity"];
  const departments = ["Human Resources", "Sales", "Finance", "IT", "Customer Service"];
  const hrRoles = [
    "HR Manager",
    "Recruiter",
    "Trainer",
    "Compensation Analyst",
    "Employee Relations Specialist"
  ];

  const salesRoles = [
    "Sales Manager",
    "Sales Representative",
    "Sales Analyst"
  ];

  const finRoles = [
    "Finance Manager",
    "Financial Analyst",
    "Accountant",
    "Auditor"
  ];

  const itRoles = [
    "IT Manager",
    "Network Administrator",
    "Software Engineer",
    "QA Engineer"
  ];

  const customerServiceRoles = [
    "Customer Service Manager",
    "Customer Support Representative",
    "Technical Support",
    "Quality Assurance Analyst"
  ];

  const payHeadTypes = [
    "Deduction",
    "Earnings"
  ];

  const payrollTypes = [
    "Monthly",
    "Bi-weekly"
  ]
  
  
  //placeholder values

  const employees = [
    {
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
      email: 'johnsmith@example.com',
      addressLine: '123 Street',
      city: 'Davao City',
      province: 'Davao del Sur',
      country: 'Philippines',
      roleId: 12,
      employeeTypeId: 3,
      basePay: 50000
    },
    {
      firstName: 'Mike',
      middleName: '',
      lastName: 'Tyson',
      email: 'mkty@example.com',
      addressLine: '888 Street, Apt 1, 2nd Floor',
      city: 'Tagum City',
      province: 'Davao del Norte',
      country: 'Philippines',
      roleId: 20,
      employeeTypeId: 1,
      basePay: 42000
    },
    {
      firstName: 'Kim',
      middleName: null,
      lastName: 'Chaewon',
      email: 'kcha@example.com',
      addressLine: '1992 Street, Apt 1, 6nd Floor',
      city: 'Digos City',
      province: 'Davao del Sur',
      country: 'Philippines',
      roleId: 16,
      employeeTypeId: 1,
      basePay: 40000
    },
    {
      firstName: 'Muhammad',
      middleName: null,
      lastName: 'Ali',
      email: 'champ@example.com',
      addressLine: 'B8L1, Rizal St., Poblacion',
      city: 'Panabo City',
      province: 'Davao del Norte',
      country: 'Philippines',
      roleId: 9,
      employeeTypeId: 3,
      basePay: 26890
    },
    {
      firstName: 'Manny',
      middleName: null,
      lastName: 'Pacquiao',
      email: 'box@example.com',
      addressLine: 'B9L10, Sherlock Holmes, Poblacion',
      city: 'Digos City',
      province: 'Davao del Norte',
      country: 'Philippines',
      roleId: 1,
      employeeTypeId: 1,
      basePay: 18900
    },
  ];

  const govCons = [
    {
      employeeId: 1,
      //50000
      sss: computeSSS(50000),
      pagIbig: computePagIbig(50000),
      philHealth: computePhilHealth(50000),
      totalAmount: computeSSS(50000) + computePagIbig(50000) + computePhilHealth(50000)
    },
    {
      employeeId: 2,
      //42000
      sss: computeSSS(42000),
      pagIbig: computePagIbig(42000),
      philHealth: computePhilHealth(42000),
      totalAmount: computeSSS(42000) + computePagIbig(42000) + computePhilHealth(42000)
    },
    {
      employeeId: 3,
      //40000
      sss: computeSSS(40000),
      pagIbig: computePagIbig(40000),
      philHealth: computePhilHealth(40000),
      totalAmount: computeSSS(40000) + computePagIbig(40000) + computePhilHealth(40000)
    },
    {
      employeeId: 4,
      //26890
      sss: computeSSS(26890),
      pagIbig: computePagIbig(26890),
      philHealth: computePhilHealth(26890),
      totalAmount: computeSSS(26890) + computePagIbig(26890) + computePhilHealth(26890)
    },
    {
      employeeId: 5,
      //18900
      sss: computeSSS(18900),
      pagIbig: computePagIbig(18900),
      philHealth: computePhilHealth(18900),
      totalAmount: computeSSS(18900) + computePagIbig(18900) + computePhilHealth(18900)
    },
  ];

  const leaves = [
    {
      employeeId: 1,
      leaveTypeId: 1,
      start_date: new Date('2022-01-01'),
      end_date: new Date('2022-01-15'),
      leaveStatusId: 1
    },
    {
      employeeId: 1,
      leaveTypeId: 2,
      start_date: new Date('2022-02-01'),
      end_date: new Date('2022-02-15'),
      leaveStatusId: 3
    },
    {
      employeeId: 4,
      leaveTypeId: 1,
      start_date: new Date('2022-05-01'),
      end_date: new Date('2022-05-15'),
      leaveStatusId: 2
    },
    {
      employeeId: 4,
      leaveTypeId: 2,
      start_date: new Date('2023-05-01'),
      end_date: new Date('2023-05-15'),
      leaveStatusId: 2
    },
  ];

  const signatories = [
    {
      approverId: 4,
      leaveId: 1
    },
    {
      approverId: 5,
      leaveId: 2
    },
    {
      approverId: 5,
      leaveId: 2
    },
    {
      approverId: 5,
      leaveId: 3
    },
    {
      approverId: 5,
      leaveId: 4
    },
  ];

  for (const type of payHeadTypes) {
    await prisma.payheadType.create({ data: { name: type } });
  }

  for (const type of payrollTypes) {
    await prisma.payrollType.create({ data: { name: type } });
  }
  
  for (const type of employeeTypes) {
    await prisma.employeeType.create({ data: { name: type } });
  }
  
  // Create LeaveStatus records
  for (const status of leaveStatuses) {
    await prisma.leaveStatus.create({ data: { name: status } });
  }
  
  // Create LeaveType records
  for (const type of leaveTypes) {
    await prisma.leaveType.create({ data: { name: type } });
  }
  
  // Create Department records
  for (const department of departments) {
    await prisma.department.create({ data: { name: department } });
  }

  //roles
  for (const role of hrRoles) {
    await prisma.role.create({ data: {
      title: role,
      Department: {
        connect: {
          id: 1
        }
      } 
    }});
  }

  for (const role of salesRoles) {
    await prisma.role.create({ data: {
      title: role,
      Department: {
        connect: {
          id: 2
        }
      } 
    }})
  }

  for (const role of finRoles) {
    await prisma.role.create({ data: {
      title: role,
      Department: {
        connect: {
          id: 3
        }
      } 
    }})
  }

  for (const role of itRoles) {
    await prisma.role.create({ data: {
      title: role,
      Department: {
        connect: {
          id: 4
        }
      } 
    }})
  }

  for (const role of customerServiceRoles) {
    await prisma.role.create({ data: {
      title: role,
      Department: {
        connect: {
          id: 5
        }
      } 
    }})
  }

  for (const employee of employees) {
    await prisma.employee.create({ data: employee });
  }

  for (const leave of leaves) {
    await prisma.leave.create({ data: leave });
  }

  for (const signatory of signatories) {
    await prisma.signatory.create({ data: signatory });
  }

  for (const govCon of govCons) {
    await prisma.governmentContribution.create({ data: govCon });
  }
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
