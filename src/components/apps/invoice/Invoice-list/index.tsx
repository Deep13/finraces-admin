import { getRaceList,searchRaces,getTotalRacesCount, deleteRace, editRace } from "src/utils/api";
import  { useContext, useState, useEffect } from "react";
import {
  Checkbox,
  Table,
  TextInput,
  Button,
  Modal,
  Badge,
  Tooltip,
  Spinner,
  Dropdown
} from "flowbite-react";
import SimpleBar from "simplebar-react";

import { Icon } from "@iconify/react";
import {FINRACES_URL} from "src/config.js"

import { Link, useNavigate } from "react-router";
import { InvoiceContext } from "src/context/InvoiceContext";

function InvoiceList() {
  const {deleteInvoice } = useContext(InvoiceContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [invoices,setInvoices]=useState([])
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [finishedRaces, setFinishedRaces] = useState(0);
  const [totalRaces,setTotalRaces]=useState(0);
  const [activeRaces, setActiveRaces] = useState(0);
  const [upcomingRaces, setUpcomingRaces] = useState(0); // State to store total races
  const [selectedRace,setSelectedRace]=useState<any>({});
  const [change,setChange]=useState(false);
  
  useEffect(()=>{
    
    getTotalRacesCount(
      (data:any)=>{  
        setFinishedRaces(data);
      },
    ()=>{},
    "finished"),
    getTotalRacesCount(
      (data:any)=>{  
        setTotalRaces(data);
      },
    ()=>{},
    ""),
      getTotalRacesCount(
      (data:any)=>{  
        setUpcomingRaces(data);
      },
    ()=>{},
    "scheduled"),
    getTotalRacesCount(
      (data:any)=>{  
        setActiveRaces(data);
      },
    ()=>{},
    "running")
    
      },[change])
  useEffect(() => {
    setLoading(true)
          // Fetch race list on component mount
      
          getRaceList(
             // Status can be dynamic
            (data:any) => {
              //setUpcomingRaces(data?.length || 0); // Update total races
              //setLoading(false);
              setInvoices(data.data);
              setHasNextPage(data.hasNextPage)
              setLoading(false)
      
            },
            (error:any) => {
              console.error("Error fetching races:", error);
              //setLoading(false);
            },
            
          );
        }, [change]);
  
  console.log("Invoices",invoices)
  // Filter invoices based on search term
  // const filteredInvoices = invoices.filter(
  //   (invoice: { name: string; created_by: any; status: string }) => {
  //     return (
  //       (invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         invoice.created_by.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  //         ||
  //         invoice.created_by.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //       (activeTab === "All" || invoice.status === activeTab)
  //     );
  //   }
  // );

  type colorsType={
    [key:string]:string
  }
  let colors:colorsType={
    "running":"lightsuccess",
    "scheduled":"lightsecondary",
    "finished":"lightwarning"
  }
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // "dd/mm/yyyy" format
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    getRaceList(
      // Status can be dynamic
      (data:any) => {
      //setUpcomingRaces(data?.length || 0); // Update total races
      //setLoading(false);
      setInvoices(data.data);
      setHasNextPage(data.hasNextPage)
        
      },
      (error:any) => {
        console.error("Error fetching races:", error);
        //setLoading(false);
        },
        tabName,
              
      );
  };

  const nextPage=()=>{
    setPage(page+1);
     getRaceList(
      // Status can be dynamic
      (data:any) => {
      //setUpcomingRaces(data?.length || 0); // Update total races
      //setLoading(false);
      console.log
      setInvoices(data.data);
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
     getRaceList(
      // Status can be dynamic
      (data:any) => {
      //setUpcomingRaces(data?.length || 0); // Update total races
      //setLoading(false);
      setInvoices(data.data);
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
  const updateRaceStatus=(id:string,selectedStatus:string)=>{
    editRace(
      ()=>{setChange(!change)},
      (error:any)=>{console.log(error)},
      id,
      selectedStatus
    )
  }

  // Calculate the counts for different statuses
  const Ongoing = invoices.filter((t: { status: string }) => t.status === "running").length;
  const Scheduled = invoices.filter((t: { status: string }) => t.status === "scheduled").length;
  const Finished = invoices.filter((t: { status: string }) => t.status === "finished").length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // setSearchTerm(query);
    if (query.trim() !== "" && e.target.value.length>=3) {
      searchRaces(
        (data:any) =>{ 
          setInvoices(data);
          setHasNextPage(data.hasNextPage)
          console.log("invoices updates")
        },
        (error:any) => console.error("Error during search:", error),
        query
      );
    } else {
      getRaceList(
        // Status can be dynamic
        (data:any) => {
        //setUpcomingRaces(data?.length || 0); // Update total races
        //setLoading(false);
        setInvoices(data.data);
        setHasNextPage(data.hasNextPage)
        console.log("invoices set up")
          
        },
        (error:any) => {
          console.error("Error fetching races:", error);
          //setLoading(false);
          },
          undefined,
          page
                
        ); // Reset to full list if search is cleared
    }
  };
  // Toggle all checkboxes
  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(invoices.map((invoice: { id: any }) => invoice.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Toggle individual product selection
  const toggleSelectProduct = (productId: any) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id: any) => id !== productId));
    }
  };

  // Handle opening delete confirmation dialog
  const handleDelete = (invoice:any) => {
    setSelectedRace(invoice);
    console.log(invoice.id)
    setOpenDeleteDialog(true);
  };

  // Handle confirming deletion of selected products
  const handleConfirmDelete = async () => {
    // for (const productId of selectedProducts) {
    //   await deleteInvoice(productId);
    // }
    // setSelectedProducts([]);
    // setSelectAll(false);
    deleteRace(
      (data:any)=>{
        console.log(data)
        setChange(!change)
      },
      (data:any)=>{console.log(data)},
      selectedRace.id    
    )
    setOpenDeleteDialog(false);
  };

  // Handle closing delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleNavigate=(invoice:any)=>{
    // const URL=process.env.REACT_APP_FINRACES_URL
    const URL=FINRACES_URL
    window.open(`${URL}/race/${invoice.id}`)
    // navigate(`https://finraces-app.netlify.app/race/${invoice.id}`)
  }

  return (
    
    <div className="overflow-x-auto">
      {loading?(<div className="flex justify-center items-center h-64">
        <Spinner size="xl"/>
      </div>):(<>
      <div className="flex justify-between overflow-x-auto mb-8 gap-6 ">
        {/* Summary sections */}
        <div
          className={`flex gap-3 items-center sm:w-3/12 w-full mb-2 cursor-pointer p-5 rounded-lg hover:bg-muted dark:hover:bg-darkmuted ${activeTab == "" ? "bg-muted dark:bg-darkmuted" : null}   `}
          onClick={() => handleTabClick("")}
        >
          <div className="h-14 w-14 rounded-full border-2 border-primary text-primary flex justify-center items-center">
            <Icon icon="mdi:format-list-numbered" height={25} />
          </div>
          <div>
            <h5 className="text-base">Total</h5>
            <p className="text-ld opacity-80">{totalRaces} Races</p>
            {/* <h6 className="text-sm">$46,218.04</h6> */}
          </div>
        </div>
        <div
          className={`flex gap-3 items-center sm:w-3/12 w-full mb-2 cursor-pointer p-5 rounded-lg hover:bg-muted dark:hover:bg-darkmuted ${activeTab == "running" ? "bg-muted dark:bg-darkmuted" : null
            }`}
          onClick={() => handleTabClick("running")}
        >
          <div className="h-14 w-14 rounded-full border-2 border-success text-success flex justify-center items-center">
            <Icon icon="mdi:play-circle-outline" height={25} />
          </div>
          <div>
            <h5 className="text-base">Running</h5>
            <p className="text-ld opacity-80">{activeRaces} Races</p>
            {/* <h6 className="text-sm">$23,110.23</h6> */}
          </div>
        </div>
        <div
          className={`flex gap-3 items-center sm:w-3/12 w-full mb-2 cursor-pointer p-5 rounded-lg hover:bg-muted dark:hover:bg-darkmuted ${activeTab == "scheduled" ? "bg-muted dark:bg-darkmuted" : null
            }`}
          onClick={() => handleTabClick("scheduled")}
        >
          <div className="h-14 w-14 rounded-full border-2 border-secondary text-secondary flex justify-center items-center">
            <Icon icon="tabler:clock-pin" height={25} />
          </div>
          <div>
            <h5 className="text-base">Scheduled</h5>
            <p className="text-ld opacity-80">{upcomingRaces} Races</p>
            {/* <h6 className="text-sm">$13,825.05</h6> */}
          </div>
        </div>
        <div
          className={`flex gap-3 items-center sm:w-3/12 w-full mb-2  cursor-pointer p-5 rounded-lg hover:bg-muted dark:hover:bg-darkmuted ${activeTab == "finished" ? "bg-muted dark:bg-darkmuted" : null
            }`}
          onClick={() => handleTabClick("finished")}
        >
          <div className="h-14 w-14 rounded-full border-2 border-warning text-warning flex justify-center items-center">
            <Icon icon="mdi:check-circle" height={25} />
          </div>
          <div>
            <h5 className="text-base">Finished</h5>
            <p className="text-ld opacity-80">{finishedRaces} Races</p>
            {/* <h6 className="text-sm">$4,655.63</h6> */}
          </div>
        </div>
      </div>
      <div className="sm:flex justify-between my-6">
        <div>
          <TextInput
            id="dis"
            type="text"
            className="form-control"
            placeholder="search"
            //value={searchTerm}
            icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
            onChange={handleChange}
          />
        </div>
        <div className="sm:flex justify-between">
        {/* <Button color={"error"} className="sm:w-fit w-full sm:mt-0 mt-4 mr-2">
         Delete Race
        </Button> */}
        <Button color={"primary"} className="sm:w-fit w-full sm:mt-0 mt-4">
          <Link to="/raceManagement/createBotRace">Create Bot Race</Link>
        </Button>
        </div> 
        {/* <Button color={"primary"} className="sm:w-fit w-full sm:mt-0 mt-4">
          <Link to="/raceManagement/createBotRace">Create Bot Race</Link>
        </Button> */}
      </div>
      <div className=" h-[70vh] custom-scrollbar">
      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox
                className="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </Table.HeadCell>
            {/* <Table.HeadCell>ID</Table.HeadCell> */}
            <Table.HeadCell>Race Name</Table.HeadCell>
            <Table.HeadCell>Created By</Table.HeadCell>
            <Table.HeadCell>Start Date</Table.HeadCell>
            <Table.HeadCell>End Date</Table.HeadCell>
            <Table.HeadCell>STATUS</Table.HeadCell>
            <Table.HeadCell className="text-center">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {invoices.map((invoice: {
              id: any;
              name: any;
              created_by: any;
              start_date: any;
              end_date:any;
              status: any;
            }) => (
              
              <Table.Row key={invoice.id}  className="cursor-pointer">
                <Table.Cell className="p-4">
                  <Checkbox
                    className="checkbox"
                    onChange={() => toggleSelectProduct(invoice.id)}
                    checked={selectedProducts.includes(invoice.id)}
                  />
                </Table.Cell>
                {/* <Table.Cell className="whitespace-nowrap">
                  <h5 className="text-sm">{invoice.id}</h5>
                </Table.Cell> */}
                <Table.Cell onClick={()=>{handleNavigate(invoice)} }>
                  <h5 className="text-sm hover:underline hover:text-blue-400">{invoice.name}</h5>
                </Table.Cell>
                <Table.Cell className="text-ld">{invoice.created_by.firstName} {invoice.created_by.lastName}</Table.Cell>
                <Table.Cell className="text-ld">{formatDate(invoice.start_date)}</Table.Cell>
                <Table.Cell className="text-ld">{formatDate(invoice.end_date)}</Table.Cell>
                <Table.Cell>
                  {/* {invoice.status === "running" ? (
                    <Badge color="success">{invoice.status}</Badge>
                  ) : invoice.status === "scheduled" ? (
                    <Badge color="secondary">{invoice.status}</Badge>
                  ) : invoice.status === "finished" ? (
                    <Badge color="warning">{invoice.status}</Badge>
                  ) : (
                    ""
                  )} */}
                  {invoice.status==="finished"?(
                    // <Badge color="warning">Finished</Badge>
                    <Dropdown
                    size="sm"
                    placement="bottom-end"
                    label={"Finished"}
                    color={colors[invoice.status]}
                    theme={{arrowIcon:"hidden"}}
                    >
                    </Dropdown>
                  ):(
                    <Dropdown
                    size="sm"
                    placement="bottom-end"
                    label={invoice.status==="scheduled"?"Scheduled":"Running"}
                    color={colors[invoice.status]}
                    
                    //color={invoice.status=="running"?"success":{invoice.status=="scheduled"?"secondary":"warning"}}
                    
                  >
                    {/* <Dropdown.Item onClick={()=>{updateRaceStatus(invoice.id, "running")}} >
                      running
                    </Dropdown.Item>
                    <Dropdown.Item onClick={()=>{updateRaceStatus(invoice.id, "scheduled")}}>
                     scheduled
                    </Dropdown.Item> */}
                    <Dropdown.Item onClick={()=>{updateRaceStatus(invoice.id, "finished")}}>
                      Finished
                    </Dropdown.Item>

                  </Dropdown>

                  )}
                  
                </Table.Cell>
                <Table.Cell className="text-center">
                  <div className="flex justify-center gap-3">
                    {/* <Tooltip content="Edit Invoice" placement="bottom">
                      <Button className="btn-circle p-0 mb-2 bg-lightsuccess  text-success hover:bg-success hover:text-white">
                        <Link to={`/apps/invoice/edit/${invoice.name}`}>
                          <Icon icon="solar:pen-outline" height={18} />
                        </Link>
                      </Button>
                    </Tooltip> */}
                    {/* <Tooltip content="View Invoice" placement="bottom">
                      <Button color={"lightprimary"} className="btn-circle p-0 mb-2">
                        <Link to={`/apps/invoice/detail/${invoice.name}`}>
                          <Icon icon="solar:eye-outline" height={18} />
                        </Link>
                      </Button>
                    </Tooltip> */}
                    <Tooltip content="Delete Race" placement="bottom">
                      <Button
                        color={"lighterror"}
                        className="btn-circle p-0 mb-2"
                        onClick={() => {
                          setSelectedProducts([invoice.id]);
                          handleDelete(invoice);
                        }}
                      >
                        <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
              
            ))}
          </Table.Body>
        </Table>
      </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button
          disabled={page === 1}
          onClick={prevPage}
        >
          Previous
        </Button>
        <Button
          disabled={!hasNextPage}
          onClick={nextPage}
        >
          Next
        </Button>
      </div>
      <Modal show={openDeleteDialog} onClose={handleCloseDeleteDialog} size={"md"}>
        <Modal.Body>
          <p className="text-center text-lg text-ld">
            Are you sure you want to delete the selected race?
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
      
      
    </div >
    // <div></div>
  );
}

export default InvoiceList;


