
import  { useContext } from "react";
import { Button, TextInput } from "flowbite-react";
import { Icon } from "@iconify/react";
import { ContactContext } from "src/context/Conatactcontext";
import React from 'react';


type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  searchParam:string,
  setSearchParam: React.Dispatch<
  React.SetStateAction<string>>
};

const ContactSearch = ({ onClick,setSearchParam,searchParam }: Props) => {
  const { searchTerm, updateSearchTerm } = useContext(ContactContext);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(e.target.value);
    setSearchParam(e.target.value);
  };

  return (
    <>
      <div className="flex gap-3 bg-white dark:bg-transparent px-6 py-5 items-center">
        <Button
          color={"lightprimary"}
          className="btn-circle p-0 lg:hidden flex"
          onClick={onClick}
        >
          <Icon icon="solar:hamburger-menu-outline" height={18} />
        </Button>
        <TextInput
          id="search"
          value={searchParam}
          placeholder="Search User"
          className="form-control w-full"
          sizing="md"
          required
          onChange={handleSearchChange}
          icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
        />
      </div>
    </>
  );
};
export default ContactSearch;
