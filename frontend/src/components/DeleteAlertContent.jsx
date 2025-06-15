import React from "react";

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-5 space-y-5">
      <p className="text-lg text-gray-700">{content}</p>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-lg"
          onClick={onCancel}  // call the passed onCancel function here
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded bg-rose-500 text-white hover:bg-rose-600 text-lg"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};


export default DeleteAlertContent;
