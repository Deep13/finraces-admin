import { useEffect, useState } from "react";
import  { Dispatch, SetStateAction, useContext } from "react";
import { Icon } from "@iconify/react";
import { Alert, Button, Modal, Spinner } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { ContactContext } from "src/context/Conatactcontext";
import { ContactType } from "src/types/apps/contact";
import { getUsers, searchUsers } from "src/utils/api";

import defaultImg from "src/assets/default.jpg"

type ContactListProps = {
  openContact: Dispatch<SetStateAction<boolean>>;
  filter:string;
  searchParam:string;
  needRefresh:any;
  // setFilterCount: React.Dispatch<
  //   React.SetStateAction<number>
  // >;
  setPage:React.Dispatch<
  React.SetStateAction<number>
  >;
  page:number
};

function ContactList({ openContact,filter,searchParam,needRefresh,setPage,page}: ContactListProps) {
  const {
    selectedDepartment,
    deleteContact,
    starredContacts,
    toggleStarred,
    setSelectedContact,
    selectedContact,
    searchTerm,
    openModal,
    setOpenModal,
  }: any = useContext(ContactContext);

  // Handle click on delete contact
  const handleDeleteClick = (contactId: number | any) => {
    deleteContact(contactId);
    setOpenModal(true);
  };
  // const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [contacts,setContacts]=useState<any>([]);
  const [filterCount,setFilterCount]=useState(0);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
        // Fetch race list on component mount
        setIsLoading(true);
        getUsers(
          (data: any) => {
            // Update invoices with fetched data
            console.log("data from api", data)
            setContacts(data);
            setHasNextPage(data.hasNextPage);
            setFilterCount(data.total);
            setIsLoading(false);
          },
          (error: any) => {
            console.error("Error fetching races:", error);
          },
          page,
          filter
        );
  
        
      }, [filter,needRefresh]);
  useEffect(()=>{
    searchUsers(
      (data:any)=>{
        setContacts(data)
        setHasNextPage(data.hasNextPage)
        console.log("Data Recieved",data)
      },
      ()=>{},
      searchParam
    )
  },[searchParam])

      console.log("fetched contact list",contacts)
  
  const handleNext=()=>{
    setPage(page+1);
    getUsers((data:any)=>{
      setContacts(data)
      setHasNextPage(data.hasNextPage)
    },
    ()=>{},
    page+1,
    filter
  )
  }
  const handlePrev=()=>{
    setPage(page-1);
    getUsers((data:any)=>{
      setContacts(data)
      setHasNextPage(data.hasNextPage)
    },
    ()=>{},
    page-1,
    filter
  )
  }

  console.log(filter)
  // Filter contacts based on selected department and search query
  // const filterContacts = (
  //   contacts: ContactType[],
  //   selectedDepartment: string,
  //   search: string
  // ): ContactType[] => {
  //   let filteredContacts = [...contacts];

  //   if (selectedDepartment !== "All") {
  //     if (selectedDepartment === "Frequent") {
  //       filteredContacts = filteredContacts.filter(
  //         (contact) => contact.frequentlycontacted
  //       );
  //     } else if (selectedDepartment === "Starred") {
  //       filteredContacts = filteredContacts.filter((contact) =>
  //         starredContacts.includes(contact.id)
  //       );
  //     } else {
  //       filteredContacts = filteredContacts.filter(
  //         (contact) => contact.department === selectedDepartment
  //       );
  //     }
  //   }

  //   if (searchTerm.trim() !== "") {
  //     const searchTermLower = search.toLowerCase();
  //     filteredContacts = filteredContacts.filter(
  //       (contact) =>
  //         contact.firstname.toLowerCase().includes(searchTermLower) ||
  //         contact.lastname.toLowerCase().includes(searchTermLower)
  //     );
  //   }

  //   return filteredContacts;
  // };

  // Get filtered contacts based on selected department and search query
  // const filteredContacts = filterContacts(
  //   contacts,
  //   selectedDepartment,
  //   searchTerm
  // );

  
  // Handle click on a contact to view details
  const handleContactClick = (contact: ContactType) => {
    setSelectedContact(contact);
  };
  return (
    <>
      {isLoading?(<div className="flex justify-center items-center h-64">
        <Spinner size="xl"/>
      </div>):
    (<>
    <div className="px-6 py-4">
      <h3 className="text-lg font-semibold">
        Users: <span className="text-primary">{filterCount}</span>
      </h3>
    </div>
      <div className="max-h-[700px] min-h-[500px] h-[calc(100vh_-_70px)] overflow-y-auto custom-scrollbar">
        <div className="border-right border-color-divider  h-auto w-320">
          {/* {contacts.map((contact:any)=>{
            <div
            className={`cursor-pointer flex py-4 px-6 gap-3 items-center group bg-hover  ${selectedContact && selectedContact.id === contact.id
              ? "bg-lighthover dark:bg-darkmuted"
              : "bg-transparent"
              }`}
            onClick={() => {
              handleContactClick(contact);
              openContact(true)
            }}
          >

          </div>
          })} */}
          {/* {selectedDepartment === "Starred" && filteredContacts.length === 0 ? (
            <div className="px-6 pt-3">
              <Alert
                color="lighterror"
                icon={() => (
                  <Icon icon="solar:info-circle-broken" height={18} />
                )}
              >
                <span className="font-medium ms-3">No</span> starred contacts
                available.
              </Alert>
            </div>
          ) : searchTerm !== "" && filteredContacts.length === 0 ? (
            <div className="px-6 pt-3">
              <Alert
                color="lighterror"
                icon={() => (
                  <Icon icon="solar:info-circle-broken" height={18} />
                )}
              >
                <span className="font-medium ms-3">No</span> Contact found
              </Alert>
            </div>
          ) : ( */}
            <div>
              {contacts?.data?.map((contact:any) => (
                <div className={`${contact?.status?.id==3?"bg-red-200":""}`}>
                <div
                  // key={contact.id}
                  className={`cursor-pointer flex py-4 px-6 gap-3 items-center group bg-hover  ${selectedContact && selectedContact.status.id!=3 && selectedContact.id === contact.id
                    ? "bg-lighthover dark:bg-darkmuted"
                    : "bg-transparent"
                    } `}
                  onClick={() => {
                    handleContactClick(contact);
                    openContact(true)
                  }}
                >
                  <img
                    src={contact.photo?contact.photo.path : defaultImg}
                    width={40}
                    height={40}
                    alt="name"
                    className="rounded-full h-10 w-10"
                  />
                  <div>
                    <h6 className="text-sm group-hover:text-primary">
                      {contact.firstName} {contact.lastName}
                    </h6>
                    <p className="text-xs text-ld opacity-80 font-medium mt-0.5">
                      
                    </p>
                  </div>

                  <div className="flex ms-auto">
                    {/* <div
                      className="me-2"
                      onClick={() => toggleStarred(contact.id)}
                    >
                      {starredContacts.includes(contact.id) ? (
                        <Icon icon='solar:star-bold'
                          className="text-warning"
                          height="15"
                          fill="rgb(255, 193, 7)"
                        />
                      ) : (
                        <Icon icon='solar:star-line-duotone' height="15" />
                      )}
                    </div>
                    <div onClick={() => handleDeleteClick(contact.id)}>
                      <Icon icon="solar:trash-bin-2-outline" height={15} />
                    </div> */}
                  </div>
                </div>
                </div>
              ))}
            </div>
          {/* )} */}
        </div>
      </div>
      <div className="flex justify-between px-6 py-3">
        <Button
          color="primary"
          disabled={page === 1}
          onClick={handlePrev}
        >
          Prev
        </Button>
        <span className="text-sm">
          {/* Page {currentPage} of {totalPages} */}
        </span>
        <Button
          color="primary"
          disabled={!hasNextPage}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <Icon icon="solar:info-circle-broken" className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this contact?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='primary' onClick={() => setOpenModal(false)}>
                {"Yes"}
              </Button>
              <Button color={'error'} onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>)}
    </>
  );
}

export default ContactList;
