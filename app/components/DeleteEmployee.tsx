import { Employee } from "@prisma/client";

export async function deleteEmployee(employee: Employee): Promise<boolean> {
  try {
    const response = await fetch(`/api/employees/${employee.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }

    return true; // Return true if the deletion was successful
  } catch (error) {
    console.error(error);
    throw error;
  }
}