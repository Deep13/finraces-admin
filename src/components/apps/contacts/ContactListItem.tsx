import { useState, useEffect, ChangeEvent, useContext } from "react";
import {
  Button,
  HR,
  Select,
  TextInput,
  Label,
  Modal,
  Alert,
  Drawer,
} from "flowbite-react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import { ContactContext } from "src/context/Conatactcontext";
import { ContactType } from "src/types/apps/contact";
import { CustomizerContext } from "src/context/CustomizerContext";
import emailSv from "/src/assets/images/backgrounds/emailSv.png";
import { suspendUser, updateBotUser } from "src/utils/api";
import defaultUser from "src/assets/default.jpg"
import { updatePhoto,uploadProfilePicture } from "src/utils/api";

interface ContactListItemProps {
  openContactValue: boolean;
  onCloseContact: () => void;
  needRefresh:any,
  setNeedRefresh:any,
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  openContactValue,
  onCloseContact,
  needRefresh,
  setNeedRefresh
}) => {
  const {
    selectedContact,
    updateContact,
    openModal,
    setOpenModal,
    setSelectedContact
  }: any = useContext(ContactContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<ContactType | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const { activeDir } = useContext(CustomizerContext);
  const [openDeleteDialog,setOpenDeleteDialog]=useState(false);
  const [openBotDialog,setOpenBotDialog]=useState(false);
  const [suspendId,setSuspendId]=useState(0);
  const [userStatus,setUserStatus]=useState(0);
  const [botStatus,setBotStatus]=useState(false);
  const [fileUploadPopUp, setFileUploadPopUp]=useState(false);
  const [imageIsLoading,setImageIsLoading]= useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  useEffect(() => {
    setFormData(selectedContact);
  }, [selectedContact,needRefresh]);

  console.log(formData)
  const handleEditClick = () => setIsEditMode(!isEditMode);

  const handleSaveClick = () => {
    if (formData) {
      updateContact(formData);
    }
    setIsEditMode(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...(prevData as ContactType),
      [name]: value,
    }));
  };

  const handleDelete =(id: number,status:number)=>{
    setOpenDeleteDialog(true);
    setUserStatus(status);
    setSuspendId(id);
  }

  const botStatusConfirmation=(flag:boolean)=>{
    setOpenBotDialog(true);
    setBotStatus(flag);
  }
  const handleBotStatus=(flag:boolean)=>{
    updateBotUser(
      ()=>{
        setNeedRefresh(!needRefresh);
        setSelectedContact(null);
        setOpenBotDialog(false);
        console.log("bot created")
      },
      (error:any)=>{
        console.log(error)
      },
      selectedContact.id,
      flag)
  }
  const handleCloseBotDialog = () => {
    setOpenBotDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleDeleteClick = () => {
    const id=suspendId;
    const status=userStatus;
    suspendUser(
      () => {
        //{status==3?alert("User Suspended"):alert("Suspension removed")}
        console.log("User suspended successfully.")
        setNeedRefresh(!needRefresh);
        setSelectedContact(null);
        setOpenDeleteDialog(false);
      },
      (error:any) => console.error("Error suspending user:", error),
      id,
      status
    );
  };

  const handleDepartmentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const departmentValue = event.target.value;
    setFormData((prevData) => ({
      ...(prevData as ContactType),
      department: departmentValue,
    }));
  };

  if (!selectedContact) {
    return (
      <div className="w-full text-center p-5">
        <div className="px-6 pt-3">
          <Alert
            color="lighterror"
            icon={() => <Icon icon="solar:info-circle-broken" height={18} />}
          >
            <span className="ps-2 text-base">Please Select a Contact</span>
          </Alert>
        </div>
        <img
          src={emailSv}
          alt="Email Icon"
          width="250"
          height="250"
          className="mx-auto"
        />
      </div>
    );
  }

  // console.log("Selected Contact",selectedContact)
  return (
    <>
      <Drawer
        open={openContactValue}
        backdrop={false}
        onClose={onCloseContact}
        position={activeDir === "rtl" ? "left" : "right"}
        className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent w-full lg:z-[0]"
      >
        <div className="lg:hidden block p-6 pb-2">
          <Button
            color={"outlineprimary"}
            onClick={onCloseContact}
            className="py-0"
          >
            <Icon icon="solar:round-arrow-left-linear" height={18}></Icon>Back
          </Button>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center py-4 px-5">
            <h5 className="card-title">Contact Details</h5>
          </div>
          <HR className="my-0" />
          <SimpleBar className={`max-h-[600px] h-[calc(100vh_-_100px)]`}>
            <div className="py-5">
              <div >
                <div className="p-5">
                <div className="flex justify-center mb-4">
                    <div className="flex flex-col items-center justify-center gap-5">
                    <img
                      src={selectedContact.photo?selectedContact.photo.path : defaultUser} // Fallback to default avatar
                      alt={`${selectedContact.firstName} ${selectedContact.lastName}`}
                      className="w-24 h-24 rounded-full shadow-sm"
                    />
                   {selectedContact?.isBot &&
                    <Button
                    color={"lightprimary"}
                    onClick={() => setFileUploadPopUp(true)}
                    className="rounded-xl"
                  >
                    Upload Profile Image
                  </Button>
                   }
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-5 mt-8">
                  <div className="col-span-12">
                      <p className="text-darklink dark:text-bodytext text-sm">
                        Name
                      </p>
                      <h5 className="font-semibold mb-0.5">
                        {selectedContact.firstName} {selectedContact.lastName}
                      </h5>
                      {/* <h5 className="font-semibold mb-0.5">
                        {selectedContact.id} 
                      </h5> */}
                    </div>
                    <div className="col-span-12">
                      <p className="text-darklink dark:text-bodytext text-sm">
                        Email address
                      </p>
                      <h5 className="font-semibold mb-0.5">
                        {selectedContact.email}
                      </h5>
                    </div>
                    
                    
                    <div className="col-span-6">
                      <p className="text-darklink dark:text-bodytext text-sm">
                        Is Guest User?
                      </p>
                      <h5 className="font-semibold mb-0.5">
                        {selectedContact.is_guest?(
                          <span>True</span>
                        ):(<span>False</span>)}
                      </h5>
                    </div>
                    <div className="col-span-6">
                      <p className="text-darklink dark:text-bodytext text-sm">
                        Is Bot User?
                      </p>
                      <h5 className="font-semibold mb-0.5">
                        {selectedContact.isBot?(
                          <span>True</span>
                        ):(<span>False</span>)}
                      </h5>
                    </div>
                  </div>
                </div>
                <HR className="my-2" />
                <div className="py-4 px-10 gap-2 flex justify-between">
                {selectedContact.status.id==3?
                <Button
                    color={"lightsuccess"}
                    onClick={() => handleDelete(selectedContact.id,1)}
                    className="rounded-xl"
                  >
                    Remove Suspension
                  </Button>
                  :
                  <Button
                    color={"lighterror"}
                    onClick={() => handleDelete(selectedContact.id,3)}
                    className="rounded-xl"
                  >
                    Suspend
                  </Button>
                  }
                  {selectedContact.isBot?
                <Button
                    color={"lightsuccess"}
                    onClick={() => botStatusConfirmation(false)}
                    className="rounded-xl"
                  >
                    Remove Bot
                  </Button>
                  :
                  <Button
                    color={"lightsecondary"}
                    onClick={() => botStatusConfirmation(true)}
                    className="rounded-xl"
                  >
                    Assign as a Bot
                  </Button>
                  }
                </div>
                
              </div>
            </div>
          </SimpleBar>
        </div>
      </Drawer>
      {showAlert && (
        <Alert
          color="success"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit"
          icon={() => (
            <Icon
              icon="solar:archive-minimalistic-broken"
              className="text-white"
              height={22}
            />
          )}
        >
          <span className="ms-2 font-medium">Contact updated successfully.</span>
        </Alert>
      )}
      <Modal show={openDeleteDialog} onClose={handleCloseDeleteDialog} size={"md"}>
        <Modal.Body>
          {selectedContact.status.id==3?
          (
            <p className="text-center text-lg text-ld">
            Are you sure you want to unsuspend the selected user?
          </p>
          ):(
            <p className="text-center text-lg text-ld">
            Are you sure you want to suspend the selected user?
          </p>
          )
          }
        </Modal.Body>
        <Modal.Footer className="mx-auto">
          <Button color="lightwarning" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          {/* <Button color="error" onClick={()=>{handleDeleteClick()}}>
            Suspend
          </Button> */}
          {selectedContact.status.id==3?
                <Button
                    color={"lightsuccess"}
                    onClick={() => handleDeleteClick()}
                    className="rounded-xl"
                  >
                    Remove Suspension
                  </Button>
                  :
                  <Button
                    color={"lighterror"}
                    onClick={() => handleDeleteClick()}
                    className="rounded-xl"
                  >
                    Suspend
                  </Button>
                  }
        </Modal.Footer>
      </Modal>

      <Modal show={fileUploadPopUp} onClose={handleCloseDeleteDialog} size={"md"}>
      <Modal.Body>
    <h3 className="text-lg font-semibold text-center mb-3">Update Profile Picture</h3>

    <div className="flex flex-col items-center gap-4">
      {/* Profile Image Preview */}
      <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
        <img 
          src={selectedContact.photo?.path || defaultUser} 
          alt="Profile Preview" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (file) {
            // setSelectedImage(file);
            // setImagePreview(URL.createObjectURL(file)); // Show preview
            setSelectedImage(file)
            console.log(file)
          }
        }}
      />
    </div>
  </Modal.Body>
        <Modal.Footer className="mx-auto">
          <Button color="lightwarning" onClick={()=>setFileUploadPopUp(false)}>
            Cancel
          </Button>

          <Button color="lightwarning" onClick={() => {
    if (selectedImage) {
        uploadProfilePicture(selectedImage, (data:any) => {
            setImageIsLoading(true);

            updatePhoto(
              data.file.id,
              selectedContact.id,
              (updatedData: any) => {
                const newImagePath = updatedData?.photo?.path;
                let userData = JSON.parse(atob(localStorage.getItem("userDetails") || "{}"));
                
                if (selectedContact?.photo) {
                  selectedContact.photo.path = newImagePath;
                  // localStorage.setItem("userDetails", JSON.stringify(userData));
                }
            
                setFileUploadPopUp(false);
                setTimeout(() => setImageIsLoading(false), 2500);
                setSelectedContact(null);
                setSelectedImage(null);
              },
              (error: any) => {
                console.error("Error updating image", error);
              }
            );
            
        },(error:any)=>{console.log("Error in Profile pic upload",error)});
    }
}}
>
            Upload Image
          </Button>
                    
        </Modal.Footer>
      </Modal>
      <Modal show={openBotDialog} onClose={handleCloseBotDialog} size={"md"}>
        <Modal.Body>
          {selectedContact.isBot?
          (<p className="text-center text-lg text-ld">
            Are you sure you want to remove the selected user's status as a bot?
          </p>):(
            <p className="text-center text-lg text-ld">
            Are you sure you want to assign the selected user as a bot?
          </p>
          )
          }
        </Modal.Body>
        <Modal.Footer className="mx-auto">
          <Button color="lightwarning" onClick={handleCloseBotDialog}>
            Cancel
          </Button>
          {/* <Button color="error" onClick={()=>{handleDeleteClick()}}>
            Suspend
          </Button> */}
          {selectedContact.isBot?
                <Button
                    color={"lightsuccess"}
                    onClick={() => handleBotStatus(false)}
                    className="rounded-xl"
                  >
                    Remove Bot
                  </Button>
                  :
                  <Button
                    color={"lightsecondary"}
                    onClick={() => handleBotStatus(true)}
                    className="rounded-xl"
                  >
                    Assign as a Bot
                  </Button>
                  }
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactListItem;
