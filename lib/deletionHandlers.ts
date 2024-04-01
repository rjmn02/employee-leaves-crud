import { Employee, Leave, Signatory } from "./interfaces";


export const deleteEmployee = async (employee: Employee) => {
  try {
    const response = await fetch(`/api/employees/${employee.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }

  } catch (error) {
    console.error(error);
  }
}

export const deleteLeave = async (leave: Leave) => {
  try {
    const response = await fetch(`/api/leaves/${leave.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete leave');
    }

  } catch (error) {
    console.error(error);
  }
}

export const deleteSignatory = async (signatory: Signatory) => {
  try {
    const response = await fetch(`/api/signatories/${signatory.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete signatory');
    }

  } catch (error) {
    console.error(error);
  }
}