import { deleteTicket, editTicket, getTickets } from 'src/utils/api';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Badge, Button, Table, TextInput, Tooltip, Dropdown, DropdownDivider,Modal, Spinner } from 'flowbite-react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from "react-router";
import { TicketType } from 'src/types/apps/ticket';
import { TicketContext } from 'src/context/TicketContext';
import { Link } from 'react-router';

type TicketListType = {
  data: TicketType[]; // Assuming TicketType is already defined
  [key: string]: any; // For any other optional properties
};
type TicketListingProps = {
  setNeedRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  needRefresh: boolean;
  filter:any;
};

const TicketListing = ({ setNeedRefresh, needRefresh,filter }: TicketListingProps) => {
  const { tickets, searchTickets, ticketSearch }: any =
    useContext(TicketContext);
  // const [showCreateForm, setShowCreateForm] = useState(false);
  const [ticketList,setTicketList]=useState<TicketListType>({data:[],});
  const [searchParam,setSearchParam]=useState("");
  const [page,setPage]=useState(1);
  const [hasNextPage,setHasNextPage]=useState(false);
  const [openDeleteDialog,setOpenDeleteDialog]=useState(false);
  const [selectedTicket,setSelectedTicket]=useState("");
  const [isloading, setIsLoading]=useState(false);

  useEffect(()=>{
    setIsLoading(true);
    getTickets(
      (data:any)=>{
        setTicketList(data);
        setIsLoading(false)},
      ()=>{},
      searchParam,
      page,
      filter
    )
  },[searchParam,page,filter])
  const navigate = useNavigate();

  console.log(filter)
  const getVisibleTickets = (
    tickets: TicketType[],
    filter: string,
    ticketSearch: string
  ) => {
    switch (filter) {
      case "total_tickets":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Pending":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Pending" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Closed":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Closed" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Open":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Open" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  // const visibleTickets = getVisibleTickets(
  //   tickets,
  //   filter,
  //   ticketSearch.toLowerCase()
  // );

  const handleDelete:any=(ticket:any)=>{
    setSelectedTicket(ticket.id);
    setOpenDeleteDialog(true);
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete:any=()=>{
    const t=selectedTicket;
    setOpenDeleteDialog(false)
    deleteTicket(
      (data:any)=>{
        console.log(data)
      },
      ()=>{console.log("error")},
      t
    ) 
    getTickets(
      (data:any)=>{setTicketList(data)},
      ()=>{},
      searchParam,
      page
    )
    setNeedRefresh(!needRefresh)
  }
  const handleStatusChange:any =(status:string,id:string,ticket:any)=>{
    const payload={
      "area": ticket.area,
      "priority": ticket.priority,
      "status": status,
      "description": ticket.description,
      "title":ticket.title
    }
    editTicket(
      (data:any)=>{
        console.log("succes in change",data);
        getTickets(
          (data:any)=>{setTicketList(data)},
          ()=>{},
          searchParam,
          page
        )
        setNeedRefresh(!needRefresh)
      },
      (data:any)=>{console.log(data)},
      id,
      payload
    )
  }

  const ticketBadge = (ticket: any) => {
    return ticket === "Open"
      ? "success"
      : ticket === "Closed"
        ? "error"
        : ticket === "Pending"
          ? "warning"
          : ticket === "Moderate"
            ? "primary"
            : "primary";
  };

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value.length>=3 || e.target.value.length==0){
      setSearchParam(e.target.value);
      console.log(e.target.value)
    }
  }

    const nextPage=()=>{
      setPage(page+1);
       getTickets(
        // Status can be dynamic
        (data:any) => {
        //setUpcomingRaces(data?.length || 0); // Update total races
        //setLoading(false);
        console.log
        setTicketList(data);
        setHasNextPage(data.hasNextPage)
          
        },
        (error:any) => {
          console.error("Error fetching races:", error);
          //setLoading(false);
          },
          undefined,
          page+1
                
        );
  
    }
    const prevPage=()=>{
      setPage(page-1);
       getTickets(
        // Status can be dynamic
        (data:any) => {
        //setUpcomingRaces(data?.length || 0); // Update total races
        //setLoading(false);
        setTicketList(data);
        setHasNextPage(data.hasNextPage)
          
        },
        (error:any) => {
          console.error("Error fetching races:", error);
          //setLoading(false);
          },
          undefined,
          page-1
                
        );
  
    }

  return (
    <>
    {isloading?(<div className="flex justify-center items-center h-64">
        <Spinner size="xl"/>
      </div>):
      (<>
      <div className="my-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => navigate('/tickets/create')}
            color={'primary'}
          >
            Create Ticket
          </Button>
          <TextInput
            type="text"
            sizing="md"
            className="form-control sm:max-w-60 max-w-full w-full"
            onChange={handleChange}
            placeholder="Search"
            // value={searchParam}
            icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              {/* <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Id
              </Table.HeadCell> */}
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Ticket
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Created By
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Area
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Priority
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3 whitespace-nowrap">
                Status
              </Table.HeadCell>
              
              {/* <Table.HeadCell className="text-base font-semibold py-3 text-end">
                Action
              </Table.HeadCell> */}
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {ticketList?.data?.map((ticket:any) => (
                <Table.Row key={ticket.id}>
                  
                  <Table.Cell className="max-w-md">
                    <Link to={`details/${ticket.id}`}>
                      <h6 className="text-base truncate line-clamp-1">{ticket.title}</h6>
                    
                    <p className="text-sm text-darklink dark:text-bodytext truncate line-clamp-1 text-wrap sm:max-w-56">
                      {ticket.description}
                    </p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {ticket.createdBy?.firstName} {ticket.createdBy?.lastName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {/* <div className="flex items-center gap-3">
                      <div>
                        <Avatar
                          img={ticket.thumb}
                          alt={ticket.AgentName}
                          rounded
                        />
                      </div>
                      <h6 className="text-base"> {ticket.AgentName}</h6>
                    </div> */}
                    {ticket.area}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {/* <p className="text-sm text-darklink dark:text-bodytext">
                      {format(new Date(ticket.Date), "E, MMM d")}
                    </p> */}
                    {ticket.priority}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {/* <Badge
                      className={`bg-light${ticketBadge(ticket)} dark:bg-dark${ticketBadge(ticket)} text-${ticketBadge(ticket)}`}
                    >
                      {ticket.status}
                    </Badge> */}
                    <Dropdown
                      label={ticket.status=="open"?"Open":"Closed"}
                      size="sm"
                      placement="bottom-end"
                      color={ticket.status=='open'?"lightsuccess":"lighterror"}
                      
                      // onSelect={(newStatus: string) => handleStatusChange(ticket.id, newStatus)}
                    >
                      <Dropdown.Item onClick={()=>handleStatusChange("open",ticket.id,ticket)}>
                        Open
                      </Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleStatusChange("closed",ticket.id,ticket)} >
                        Closed
                      </Dropdown.Item>
                      <DropdownDivider/>
                      <Dropdown.Item onClick={()=>handleDelete(ticket)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                  
                  {/* <Table.Cell>
                    <Tooltip content="Delete Ticket" placement="bottom" arrow={false}>
                      <Button className="btn-circle ms-auto" color={"transparent"}>
                        <Icon icon="solar:trash-bin-minimalistic-outline" height="18" onClick={() => deleteTicket(ticket.Id)} />
                      </Button>
                    </Tooltip>
                  </Table.Cell> */}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex justify-between px-6 py-3">
        <Button
          color="primary"
          disabled={page === 1}
          onClick={prevPage}
        >
          Prev
        </Button>
        <span className="text-sm">
          {/* Page {currentPage} of {totalPages} */}
        </span>
        <Button
          color="primary"
          disabled={!hasNextPage}
          onClick={nextPage}
        >
          Next
        </Button>
      </div>
      </div>
      <Modal show={openDeleteDialog} onClose={handleCloseDeleteDialog} size={"md"}>
              <Modal.Body>
                <p className="text-center text-lg text-ld">
                  Are you sure you want to delete the selected ticket?
                </p>
              </Modal.Body>
              <Modal.Footer className="mx-auto">
                <Button color="lightsecondary" onClick={handleCloseDeleteDialog}>
                  Cancel
                </Button>
                <Button color="lighterror" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
      </>)}
    </>
  );
};

export default TicketListing;
