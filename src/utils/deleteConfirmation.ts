import Swal from "sweetalert2";

interface DeleteConfirmationOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const showDeleteConfirmation = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmButtonText = "Yes, delete it!",
  cancelButtonText = "Cancel",
}: DeleteConfirmationOptions = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626", // red-600
    cancelButtonColor: "#6b7280", // gray-500
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};

export const showDeleteSuccess = async () => {
  await Swal.fire({
    title: "Deleted!",
    text: "The item has been deleted.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};
