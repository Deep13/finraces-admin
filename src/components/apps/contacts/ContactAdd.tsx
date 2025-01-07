
import  { useContext, useState } from "react";
import profilepic from "/src/assets/images/profile/user-5.jpg";

import {
  Modal,
  Button,
  TextInput,
  Label,
  Select,
  Textarea,
  Alert,
} from "flowbite-react";
import { Icon } from "@iconify/react";
import { ContactContext } from "src/context/Conatactcontext";
import { createNewAdmin } from "src/utils/api";


const ContactAdd = () => {
  const { addContact } = useContext(ContactContext);
  const [show, setShow] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    image: profilepic,
    password: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    department: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name!]: value });
  };

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
    
  //   const payload = {
  //     firstname: formData.firstname,
  //     lastname: formData.lastname,
  //     email: formData.email,
  //     company: formData.company, // or any other fields from formData
  //   };
  
  //   createNewAdmin(
  //     (data: any) => {
  //       // Handle success: you can show a success message or do other actions
  //       console.log("Admin created:", data);
  //       setShowAlert(true);
  //       handleClose();
        
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 5000);
  //     },
  //     (error: string) => {
  //       // Handle error
  //       console.error("Error creating admin:", error);
  //     },
  //     payload
  //   );
  // };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    const payload = {
      zipcode: "",
      city: "",
      country: "",
      address: "",
      is_guest: false,
      email: formData.email,
      password: formData.password, // Replace with a default password or input from the form
      firstName: formData.firstname,
      lastName: formData.lastname,
      // photo: { id: "" }, // Placeholder ID
      role: {id:1,name:"Admin",_entity:"RoleEntity"},   // Placeholder role ID
       status: {id: 1, name: 'Active', __entity: 'StatusEntity' }, // Placeholder status ID
    };
  
    createNewAdmin(
      (response: any) => {
        console.log("Admin created successfully:", response);
        // setShowAlert(true);
        alert("New Admin Created")
        handleClose();
      },
      (error: any) => {
        console.error("Error creating admin:", error);
        alert("Failed to create admin: " + error);
      },
      payload
    );
  };
  

  return (
    <>
      <Button className="w-full rounded-xl" color={"primary"} onClick={handleShow} >
        Add New Admin
      </Button>
      <Modal show={show} onClose={handleClose}>
        <Modal.Header className="pb-0">Add New Admin</Modal.Header>
        <Modal.Body>
          <p className="text-sm text-darklink dark:text-bodytext mb-6">
            This form creates an Admin User.
          </p>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-6">
                <div className="md:col-span-6 col-span-12">
                  <Label
                    htmlFor="firstname"
                    value="firstname"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    name="firstname"
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    value={formData.firstname}
                    required
                  />
                </div>
                <div className="md:col-span-6 col-span-12">
                  <Label
                    htmlFor="lastname"
                    value="lastname"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    name="lastname"
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    value={formData.lastname}
                    required
                  />
                </div>
                {/* <div className="md:col-span-6 col-span-12">
                  <div className="max-w-md">
                    <Label
                      htmlFor="Department"
                      value="Select department"
                      className="mb-2 block capitalize"
                    />

                    <Select
                      id="Department"
                      className="select-md"
                      name="department"
                      onChange={handleChange}
                      value={formData.department}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                    </Select>
                  </div>
                </div> */}
                <div className=" col-span-12">
                  <Label
                    htmlFor="email"
                    value="email"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    name="email"
                    className="form-control"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="md:col-span-6 col-span-12">
                  <Label
                    htmlFor="password"
                    value="password"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    name="password"
                    className="form-control"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <div className="md:col-span-6 col-span-12">
                  <Label
                    htmlFor="password"
                    value="Confirm password"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    name="confirmPassword"
                    className="form-control"
                    type="password"
                    onChange={handleChange}
                    // value={formData.email}
                  />
                </div>
                
                {/* <div className="col-span-12">
                  <Label
                    htmlFor="address"
                    value="address"
                    className="mb-2 block capitalize"
                  />
                  <Textarea
                    id="address"
                    name="address"
                    className="form-control-textarea"
                    placeholder="address..."
                    required
                    rows={4}
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>
                <div className="col-span-12">
                  <Label
                    htmlFor="notes"
                    value="notes"
                    className="mb-2 block capitalize"
                  />
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="note..."
                    className="form-control-textarea"
                    required
                    rows={4}
                    onChange={handleChange}
                    value={formData.notes}
                  />
                </div> */}
              </div>
              <Modal.Footer className="p-0 pt-6">
                <Button color={"primary"} className="bg-primary" type="submit">
                  Submit
                </Button>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {showAlert && (
        <Alert
          color="success"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit z-50"
          icon={() => (
            <Icon
              icon="solar:archive-minimalistic-broken"
              className="text-white"
              height={22}
            />
          )}
        >
          <span className="ms-2 font-medium">Contact Added successfully.</span>
          <span className="ms-2 font-medium" onClick={()=>{setShowAlert(false);console.log("clicked")}}>Ok.</span>
        </Alert>
      )}
    </>
  );
};
export default ContactAdd;
