// // import React, { useContext, useState } from "react";
// // import axiosInstance from "../../utils/axiosinstance";
// // import { UserContext } from "../../context/userContext";
// // import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

// // const ProfileSettings = () => {
// //   const { user, updateUser } = useContext(UserContext);
// //   const [newImage, setNewImage] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleImageUpload = async () => {
// //     setError("");
// //     if (!newImage) return;

// //     try {
// //       setUploading(true);
// //       const formData = new FormData();
// //       formData.append("image", newImage);

// //       const response = await axiosInstance.post("/auth/upload-image", formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });

// //       const updatedImageUrl = response.data.imageUrl;

// //       // Now update user profile image URL
// //       const updateRes = await axiosInstance.put(
// //         "/users/update-profile",
// //         { profileImageUrl: updatedImageUrl }
// //       );

// //       updateUser(updateRes.data); // update context
// //       setNewImage(null); // clear selected image
// //     } catch (err) {
// //       setError("Failed to upload or update profile image.");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 w-full max-w-md mx-auto">
// //       <h2 className="text-xl font-bold mb-4">Update Profile Picture</h2>
// //       <ProfilePhotoSelector image={newImage || user?.profileImageUrl} setImage={setNewImage} />

// //       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

// //       <button
// //         onClick={handleImageUpload}
// //         className="btn-primary mt-4"
// //         disabled={uploading}
// //       >
// //         {uploading ? "Uploading..." : "Update Picture"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default ProfileSettings;

// import React, { useContext, useState } from "react";
// import axiosInstance from "../../utils/axiosinstance";
// import { UserContext } from "../../context/userContext";
// import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

// const ProfileSettings = () => {
//   const { user, updateUser } = useContext(UserContext);
//   const [newImage, setNewImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageUpload = async () => {
//     setError("");
//     if (!newImage) return;

//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("image", newImage);

//       const response = await axiosInstance.post("api/auth/upload-image", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const updatedImageUrl = response.data.imageUrl;

//       // Now update user profile image URL
//       const updateRes = await axiosInstance.put(
//         "/api/auth/update-profile",
//         { profileImageUrl: updatedImageUrl }
//       );

//       updateUser(updateRes.data); // update context
//       setNewImage(null); // clear selected image
//     } catch (err) {
//       setError("Failed to upload or update profile image.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 w-full max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Update Profile Picture</h2>
//       <ProfilePhotoSelector image={newImage || user?.profileImageUrl} setImage={setNewImage} />

//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//       <button
//         onClick={handleImageUpload}
//         className="btn-primary mt-4"
//         disabled={uploading}
//       >
//         {uploading ? "Uploading..." : "Update Picture"}
//       </button>
//     </div>
//   );
// };

// export default ProfileSettings;

import React, { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/userContext";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const ProfileSettings = ({ onSuccess }) => {
  const { user, updateUser } = useContext(UserContext);
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(user?.profileImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async () => {
    setError("");
    setUploading(true);

    try {
      let updatedImageUrl = null;

      if (newImage) {
        // Upload new image
        const formData = new FormData();
        formData.append("image", newImage);

        const response = await axiosInstance.post("api/auth/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        updatedImageUrl = response.data.imageUrl;
      }

      // Update profile with new or removed image
      const updateRes = await axiosInstance.put("/api/auth/update-profile", {
        profileImageUrl: updatedImageUrl, // null if image was deleted
      });

      updateUser(updateRes.data);
      setNewImage(null);
      setPreview(updatedImageUrl); // reset preview

      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to upload or update profile image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Profile Picture</h2>
      <ProfilePhotoSelector
        image={newImage}
        setImage={setNewImage}
        preview={preview}
        setPreview={setPreview}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleImageUpload}
        className="btn-primary mt-4"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Update Picture"}
      </button>
    </div>
  );
};

export default ProfileSettings;
