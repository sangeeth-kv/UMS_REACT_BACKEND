import React, { Suspense,useState,useRef,lazy } from "react";
import {useSelector,useDispatch} from "react-redux"
import {toggleMode} from "../../../features/toggleMode/toggleModeSlice"
import {toast} from "react-hot-toast"
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import log from "../../../utils/logger"
import updateEmail from "../../../services/updateEmailService";
import {useNavigate} from "react-router-dom";
import {clearAccessToken,clearUser, setUser} from "../../../store/authSlice"
import { getCroppedImage } from "../../../helpers/getCroppedImage";
import uploadAvathar from "../../../services/uploadAvatar";
import Spinner from "../../../components/Spinner/Spinner";
import AvatarUploadingPreview from "../../../components/ImagePreview/AvatharImagePreview";
import removeAvatar from "../../../services/handleRemoveAvatar";
const ImageCropper=lazy(()=>
    import ("../../../components/Cropper/ImageCropper")
)


export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const mode = useSelector((state) => state.toggle.mode);
  const dispatch = useDispatch();
  const [isEditEmail,setIsEditEmail]=useState(false)
  const user=useSelector((state)=>state.auth.user)
  const [isConfirmed,setIsConfirmed]=useState(false)
  const [email,setEmail]=useState("")
  const [isUploading,setIsUploading]=useState(false)
  const [showCropper,setShowCropper]=useState(false)
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteAvatar,setIsDeleteAvatar]=useState(false)

  const navigate=useNavigate( )
  console.log("issss: ",isConfirmed)

  const tabs = [
    { id: "profile", label: "Edit Profile" },
    { id: "security", label: "Security" },
    { id: "preferences", label: "Preferences" },
    { id: "notifications", label: "Notifications" },
    { id: "danger", label: "Deactivate" },
  ];



  const handleImageSelect = (e) => {
     const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPG, JPEG, PNG allowed");
        return;
    }

    if(file.size> 2 * 1024 * 1024){
        toast.error("Image must be under 2MB")
        return;
    }

    const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setShowCropper(true);
    };

    const handleCropSave=async({croppedAreaPixels,rotation})=>{
            try {
                setIsUploading(true)
                const blob=await getCroppedImage(selectedImage, croppedAreaPixels,rotation);
                const formData = new FormData();
                formData.append("avatar", blob,"avatar.jpg");
                setShowCropper(false)
                const res = await uploadAvathar(formData);
                console.log("response : ",res)
                if(res.success){
                    toast.success(res.message)
                    dispatch(setUser(res.data.user))
                }else{
                    toast.error(res.message)
                }
    
            } catch (error) {
                log.error(`error in handleCropSave: ${error}`)
            }finally{
                setIsUploading(false)
            }
        }



const handleEditEmail=async()=>{
  console.log("pressed handle email functoin")
  console.log("email is : ",email)
  try {
    const res = await updateEmail({email}) 
    console.log("response in the handle edit email : ",res)
    if(res.success){
      toast.success(res.message)
      dispatch(clearAccessToken())
      dispatch(clearUser())
      navigate("/signin")
    }else{
      toast.error(res.message)
    }
  } catch (error) {
    log.error(error)
  }
}


const handleRemoveAvatar =async()=>{
  try {
    const res=await removeAvatar()
    console.log("response in the handleREmove avatar : ",res)
    if(res.success){
      toast.success(res.message)
      dispatch(setUser(res.data.user))
    }

  } catch (error) {
    log.error(error)
  }
}
  

  return (

    <div className="max-w-4xl mx-auto space-y-6 mb-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Settings
      </h1>

    <Suspense fallback={<Spinner/>}>
      { showCropper && <ImageCropper image={selectedImage} onClose={()=>setShowCropper(false)} onSave={handleCropSave} shape="round"/>}
    </Suspense>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar Card */}
        <aside className="md:w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition
                  ${
                    activeTab === tab.id
                      ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Card */}
        <section className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 ">

          {/* Edit Profile */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Edit Profile
              </h2>

              <div className="flex items-center gap-6">
               {isUploading && selectedImage ?  (
  <AvatarUploadingPreview src={selectedImage} />
) :user.avatarThumbStatus === "ready" && user.avatar.thumbnailUrl ? (
          <img
            src={user.avatar.thumbnailUrl}
            alt="avatar thumbnail"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : user.avatar.url ? (
          <img
            src={user.avatar.url}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>
        )}

        <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            ref={fileInputRef}
            hidden
            onChange={handleImageSelect}
        />


                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    @{user.fullname}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm font-semibold">
                    {user.avatar.url?(<button 
                    onClick={() => fileInputRef.current.click()}
                    className="text-blue-600 hover:underline">
                    
                      Change photo
                    </button>):(<button 
                    onClick={() => fileInputRef.current.click()}
                    className="text-blue-600 hover:underline">
                    
                      Upload Image
                    </button>)}
                    {user.avatar.url&&<button className="text-red-500 hover:underline"
                    onClick={()=>setIsDeleteAvatar(true)}>
                      Remove photo
                    </button>}

                    {isDeleteAvatar&&<ConfirmationModal open={isDeleteAvatar} title="Are you sure ?" message="Do you really want to remove avatar?" confirmText="Yes" cancelText="No" onConfirm={handleRemoveAvatar} onCancel={()=>setIsDeleteAvatar(false)}  danger={true} />}
                  </div>
                </div>
              </div>

              {/* Email */}
<div>
  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
    Email
  </label>

  <div className="flex items-center justify-between w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700">
    <span className="text-gray-800 dark:text-white text-sm">
      {user.email}
    </span>

    <button
      type="button"
      className="text-blue-600 hover:underline text-sm font-medium"
      title="Change Email"
      onClick={setIsEditEmail}
    >
      ✏️
    </button>
  </div>
</div>



{isEditEmail && (
  <div>
    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
      Enter new Email
    </label>

    <div className="flex items-center justify-between w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700">
      <input
      value={email}
      onChange={(e)=>setEmail(e.target.value.toLowerCase())}
        type="email"
        placeholder="Enter new email"
        className="
          w-full
          bg-transparent
          border-none
          outline-none
          text-sm
          text-gray-800
          dark:text-white
          focus:ring-0
        "
      />

      <button
       onClick={()=>setIsConfirmed(true)} 
        type="button"
        className="ml-3 text-blue-600 hover:underline text-sm font-medium whitespace-nowrap"
        title="Save"
      >
        Save
      </button>
    </div>
  </div>
)}


{isConfirmed&&<ConfirmationModal open={isConfirmed} title="Are you sure ?" message="Do you want to change the email ? After you edit email, you may sign in again and verify it!" confirmText="Yes" cancelText="No" onConfirm={handleEditEmail} onCancel={()=>setIsConfirmed(false)}  danger={true}  />}

{/* Phone */}
<div>
  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
    Phone Number
  </label>

  <div className="flex items-center justify-between w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700">
    <span className="text-gray-800 dark:text-white text-sm">
      {user.phone || "Not added"}
    </span>

    <button
      type="button"
      className="text-blue-600 hover:underline text-sm font-medium"
      title="Change Phone Number"
    >
      ✏️
    </button>
  </div>
</div>


              {/* <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                Save Changes
              </button> */}
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Security
              </h2>
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
                Change Password
              </button>
            </div>
          )}

          {/* Preferences */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Preferences
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
                <button
                  onClick={() => dispatch(toggleMode())}
                  className={`w-12 h-6 rounded-full flex items-center px-1 ${
                    mode === "dark" ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full transform transition ${
                      mode === "dark" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Notifications
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Login Alerts
                </span>
                <input type="checkbox" />
              </div>
            </div>
          )}

          {/* Danger */}
          {activeTab === "danger" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">
                Deactivate Account
              </h2>
              <button className="px-6 py-2 bg-red-600 text-white rounded-md">
                Deactivate
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
