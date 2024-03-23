import { Leave } from "@prisma/client";

export async function deleteLeave(leave: Leave): Promise<boolean> {
  try {
    const response = await fetch(`/api/leaves/${leave.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete leave');
    }

    return true; // Return true if the deletion was successful
  } catch (error) {
    console.error(error);
    throw error;
  }
}