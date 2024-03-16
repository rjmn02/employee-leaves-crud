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

  for (const type of employeeTypes) {
    await prisma.employeeType.create({ data: { name: type } });
  }

  for (const status of leaveStatuses) {
    await prisma.leaveStatus.create({ data: { name: status } });
  }

  for (const type of leaveTypes) {
    await prisma.leaveType.create({ data: { name: type } });
  }

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
