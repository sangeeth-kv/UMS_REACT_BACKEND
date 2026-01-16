import {lazy,Suspense,useState,useRef} from "react";
import { useSelector,useDispatch } from "react-redux"
import Spinner from "../../../components/Spinner/Spinner";
import Tooltip from "../../../components/ToolTip/ToolTip";
import {toast} from "react-hot-toast"
import RequestButton from "../../../components/Buttons/RequestButton";
import log from "../../../utils/logger"
import { getCroppedImage } from "../../../helpers/getCroppedImage";
import uploadAvathar from "../../../services/uploadAvatar";
import  {setUser } from "../../../store/authSlice";
import AvatarUploadingPreview from "../../../components/ImagePreview/AvatharImagePreview";

const UserDetailsModal = lazy(() =>
  import("../../../components/UserDetailsModal/UserDetailsModal")
);

const AddUserDetailsModal = lazy(() =>
  import("../../../components/UserDetailsModal/AddUserDetailsModal")
);

const EditUserDetailsModal = lazy(() =>
  import("../../../components/UserDetailsModal/EditUserDetailsModal")
);

const ImageCropper=lazy(()=>
    import ("../../../components/Cropper/ImageCropper")
)


// import addUserDetails from "../../../services/addUserDetails";
// import log from "../../../utils/logger"



function DashBoard(){
    const user=useSelector((state)=>state.auth.user)
    const isProfileCompleted=useSelector((state)=>state.auth.user.isProfileCompleted)
    const [isMore,setIsMore]=useState(false)
    const [isAddDetails,setAddDetails]=useState(false)
    const [isEditDetails,setEditDetails]=useState(false)
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [isUploading,setIsUploading]=useState(false)
    const dispatch=useDispatch()
    
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


    if (!user) {
        return <Spinner/>;  // or spinner
    }

    // if(isUploading){
    //     return <Spinner/>;
    // }


    

    return(
      
        //  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        // <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-6 pb-6">


            

      <div className="max-w-4xl mx-auto">

        <Suspense fallback={<Spinner />}>
                {isMore && <UserDetailsModal setAddDetails={()=>setAddDetails(true)}onClick={() => setIsMore(false)} />}
                {isAddDetails && <AddUserDetailsModal onClose={() => setAddDetails(false)} />}
                {isEditDetails && <EditUserDetailsModal onClose={() => setEditDetails(false)} />}
                { showCropper && <ImageCropper image={selectedImage} onClose={()=>setShowCropper(false)} onSave={handleCropSave} shape="round"/>}
            </Suspense>
        
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Dashboard
        </h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center gap-6">
          
          {/* Avatar */}
          <div
  onClick={() => !isUploading && fileInputRef.current.click()}
  className="cursor-pointer"
>
 {isUploading && selectedImage ? (
  <AvatarUploadingPreview src={selectedImage} />
) : user?.avatarThumbStatus === "ready" && user?.avatar.thumbnailUrl ? (
  <div className="w-20 h-20 rounded-full overflow-hidden">
    <img
      src={user.avatar.thumbnailUrl}
      alt="avatar thumbnail"
      className="w-full h-full object-cover"
    />
  </div>
) : user?.avatar.url ? (
  <div className="w-20 h-20 rounded-full overflow-hidden">
    <img
      src={user.avatar.url}
      alt="avatar"
      className="w-full h-full object-cover"
    />
  </div>
) : (
  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
    {user?.fullname?.charAt(0)?.toUpperCase()}
  </div>
)}

</div>


        <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            ref={fileInputRef}
            hidden
            onChange={handleImageSelect}
        />



          {/* User Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {user.fullname}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
            <Tooltip position="bottom" content={`view more details about ${user.fullname} `}>
                <span onClick={()=>setIsMore(true)} className=" cursor-pointer inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    View More details
                </span>
            </Tooltip>
            {isProfileCompleted ? <Tooltip position="bottom" content="Edit the current details"><span onClick={()=>setEditDetails(true)} className="inline-block mt-2 px-3 py-1 ml-2 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              Edit details
            </span> </Tooltip> :<Tooltip position="bottom" content="Add more details"> <span onClick={()=>setAddDetails(true)} className="inline-block mt-2 px-3 py-1 ml-2 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-blue-300">
              Add more details
            </span></Tooltip>} 

          </div>
        </div>

        {/* Extra Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Account Status
            </h4>

            <p className={`font-medium ${
                user.isVerified === "verified"
                    ? "text-green-600 dark:text-green-400"
                    : user.isVerified === "requested"
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
            }`}>

                
            

              {user.isVerified === "verified"? "User is verified by Admin": user.isVerified === "requested"? "Verification request sent": "User is not verified by Admin"}
            </p>


                {user.isVerified === "not_verified" && (<Tooltip position="bottom" content="Request for user verification through email "><RequestButton title="Request Verification"/></Tooltip>)}

            
        </div>
        


          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Account Created
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
  {new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</p>
          </div>

        </div>
      </div>
    // {/* </div> */}
    )
}

export default DashBoard