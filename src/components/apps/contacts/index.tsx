

import { Drawer } from "flowbite-react";
import { useState } from "react";
import ContactFilter from "./ContactFilter";
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";
import ContactListItem from "./ContactListItem";
import { ContactContextProvider } from "src/context/Conatactcontext";
import CardBox from "src/components/shared/CardBox";

const ContactApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [isOpenContact, setIsOpenContact] = useState(false);
  const [filter,setFilter]=useState("");
  const [needRefresh,setNeedRefresh]=useState(true);
  const [searchParam,setSearchParam]=useState("");
  const [page,setPage]=useState(1);
  // const [filterCount,setFilterCount]=useState(0);

  return (
    <>
      <ContactContextProvider>
        <CardBox className="p-0 overflow-hidden">
          <div className="flex">
            {/* ------------------------------------------- */}
            {/* Left Part */}
            {/* ------------------------------------------- */}
            <Drawer
              open={isOpen}
              onClose={handleClose}
              className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent max-w-[235px] w-full lg:z-[0]"
            >
              <ContactFilter filters={filter} setFilters={setFilter} setPage={setPage}/>
            </Drawer>

            {/* ------------------------------------------- */}
            {/* Middle part */}
            {/* ------------------------------------------- */}
            <div className="left-part lg:max-w-[340px] max-w-full lg:border-e lg:border-ld border-e-0  w-full px-0 pt-0">
              <ContactSearch onClick={() => setIsOpen(true)} searchParam={searchParam} setSearchParam={setSearchParam} />
              <ContactList openContact={setIsOpenContact} filter={filter} searchParam={searchParam} needRefresh={needRefresh} page={page} setPage={setPage}/>
            </div>

            {/* ------------------------------------------- */}
            {/* Detail part */}
            {/* ------------------------------------------- */}
            <ContactListItem openContactValue={isOpenContact} onCloseContact={() => setIsOpenContact(false)} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh} />
          </div>
        </CardBox>
      </ContactContextProvider>
    </>
  )
}

export default ContactApp
