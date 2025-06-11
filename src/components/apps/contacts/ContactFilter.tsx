
import { useContext } from "react";
import { Icon } from "@iconify/react";
import ContactAdd from "./ContactAdd";
import { HR, List } from "flowbite-react";
import { ContactContext } from "src/context/Conatactcontext";



type ContactFilterProps = {
  filters: string;
  setFilters: React.Dispatch<
    React.SetStateAction<string>
  >;
  setPage:React.Dispatch<
  React.SetStateAction<number>
>;
  // filterCount:number;
};

interface DataType {
  id: number;
  name?: string;
  sort?: string;
  icon?: any;
  filterbyTitle?: string;
  devider?: boolean;
  color?: string;
}

const ContactFilter = ({ filters, setFilters,setPage }: ContactFilterProps) => {
 // const {  updateSearchTerm, selectedDepartment } = useContext(ContactContext);

  const filterData: DataType[] = [
    {
      id: 2,
      name: "All",
      sort: "show_all",
      icon: "majesticons:user-box-line",
    },
    {
      id: 3,
      name: "Guest Users",
      sort: "guest",
      icon: 'solar:user-id-broken',
    },
    {
      id: 4,
      name: "Admin Users",
      sort: "admin",
      icon: 'clarity:administrator-line',
    },
    {
      id: 5,
      name: "Inactive Users",
      sort: "admin",
      icon: 'tabler:user-x',
    },
    {
      id: 6,
      name: "Suspended Users",
      sort: "admin",
      icon: 'tabler:user-off',
    },
    {
      id: 7,
      name: "Bot Users",
      sort: "admin",
      icon: 'mage:robot',
    },
    // {
    //   id: 6,
    //   devider: true,
    // },
    // {
    //   id: 5,
    //   filterbyTitle: "Categories",
    // },
    // {
    //   id: 7,
    //   name: "Engineering",
    //   sort: "engineering_department",
    //   icon: 'solar:folder-broken',
    //   color: "primary",
    // },
    // {
    //   id: 8,
    //   name: "Support",
    //   sort: "support_department",
    //   icon: 'solar:question-circle-outline',
    //   color: "error",
    // },
    // {
    //   id: 9,
    //   name: "Sales",
    //   sort: "sales_department",
    //   icon: 'solar:sale-square-outline',
    //   color: "success",
    // },
  ];

  const handleDepartmentClick = (department: string) => {
    // setSelectedDepartment(department);
    setFilters(department);
    setPage(1);
    // updateSearchTerm("");
  };

  
  return (
    <div className="left-part max-w-[235px] h-full w-full">
      <ContactAdd />
      <List className="my-4">
        {filterData.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <h6
                className="uppercase text-xs pb-3"
                key={`filter-title-${filter.id}`}
              >
                {filter.filterbyTitle}
              </h6>
            );
          } else if (filter.devider) {
            return (
              <div
                className="my-4"
                key={`divider-${filter.id}`}
              >
                <HR className="my-6" />
              </div>
            );
          }
          return (
            <div
              key={`list-item-${filter.id}`}
              className={`py-[10px] flex items-center gap-2 px-4 hover:bg-muted dark:hover:bg-darkmuted rounded-md text-ld cursor-pointer ${filters === filter.name
                ? "text-primary bg-lighthover dark:bg-darkmuted"
                : ""
                }`}
              onClick={() => handleDepartmentClick(filter.name || '')}
            >
               <Icon
                  icon={filter.icon}
                  height={18}
                  className={`text-${filter.color}`}
                />
                {filter.name}
                {/* <span className={`${filters === filter.name?"":"hidden"}`}>{filterCount?`(${filterCount})`:"(0)"}</span> */}
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default ContactFilter;

