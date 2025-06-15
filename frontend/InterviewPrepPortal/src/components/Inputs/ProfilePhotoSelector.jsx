// import React, { useState, useRef } from "react";
// import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
//   const inputRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   // const handleImageChange = (event) => {
//   //   const file = event.target.files[0];

//   //   if (file) {
//   //   // Update the image state
//   //     setImage(file);
//   //     // Generate preview URL from the file
//   //     const preview = URL.createObjectURL(file);

//   //     if (setPreview) {
//   //       setPreview(preview);
//   //     }

//   //     setPreviewUrl(preview);
//   //   }
//   // };
//   const handleImageChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setImage(file);
//     const preview = URL.createObjectURL(file);
//     if (setPreview) setPreview(preview);
//     setPreviewUrl(preview);

//     // Reset input so same file can be selected again
//     event.target.value = null;
//   }
// };


//   const handleRemoveImage = () => {
//     setImage(null);
//     setPreviewUrl(null);
//     if (setPreview) {
//       setPreview(null);
//     }
//   };

//   const onChooseFile = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div className="flex justify-center mb-6">
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {!image ? (
//         <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
//             <LuUser className="text-4xl text-orange-500"/>
//           <button
//             type="button"
//             className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
//             onClick={onChooseFile}
//           >
//             <LuUpload />
//           </button>
//         </div>
//       ) : (
//         <div className="relative">
//           <img
//             src={preview || previewUrl}
//             alt="profile photo"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <button
//             type="button"
//             className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
//             onClick={handleRemoveImage}
//           >
//             <LuTrash />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePhotoSelector;






  import React, { useState, useRef, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (preview) {
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null); // clear previewUrl if no preview
    }
  }, [preview]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      if (setPreview) setPreview(preview);
      event.target.value = null; // reset input value
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative w-20 h-20">
        {previewUrl ? (
          <img
            src={previewUrl}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full overflow-hidden">
            <LuUser className="text-4xl text-orange-500" />
          </div>
        )}

        <button
          type="button"
          onClick={previewUrl ? handleRemoveImage : onChooseFile}
          title={previewUrl ? "Remove Picture" : "Upload Picture"}
          className={`absolute -bottom-1 -right-1 rounded-full w-7 h-7 flex items-center justify-center text-white ${
            previewUrl
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-orange-500/85 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          }`}
        >
          {previewUrl ? <LuTrash size={16} /> : <LuUpload size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
