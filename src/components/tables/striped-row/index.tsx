
import { Badge, Dropdown, Table,TextInput, Spinner } from "flowbite-react";

import * as basicTable2 from "../../tables/tableData.ts";
import { IconDotsVertical } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import TitleCard from "src/components/shared/TitleBorderCard.tsx";
import { useEffect, useState } from "react";
import { getLeaderboard } from "src/utils/api.ts";
import defaultImg from "src/assets/default.jpg"


interface Photo {
  id: string;
  path: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  photo: Photo;
}

interface LeaderboardEntry {
  user: User;
  num_races_won: string;
  total_points: string | null;
}

interface LeaderboardData {
  data: LeaderboardEntry[];
  hasNextPage: boolean;
  total: number;
}

interface Self {
  total_points: number;
  rank: number | null;
  num_races_won: number;
}

interface Leaderboard {
  data: LeaderboardData;
  self: Self;
}

const handleNavigate=(id:any)=>{
  window.open(`https://finraces-app.netlify.app/userprofile/${id}`)
}



const index = () => {
  /*Table Action*/
  const tableActionData = [
    {
      icon: "tabler:plus",
      listtitle: "Add",
    },
    {
      icon: "tabler:edit",
      listtitle: "Edit",
    },
    {
      icon: "tabler:trash",
      listtitle: "Delete",
    },
  ];

  const [isLoading,setIsLoading]=useState(false);
  const [leaderboard,setLeaderboard]=useState<Leaderboard | null>(null);
  useEffect(()=>{
    setIsLoading(true);
    getLeaderboard(
      (data:any)=>{setLeaderboard(data);setIsLoading(false)},
      ()=>{})
  },[])
  return (
    <>
    {isLoading?(<div className="flex justify-center items-center h-64">
      <Spinner size="xl"/>
    </div>):
      (<TitleCard title="Leaderboard">
      <div className="sm:flex justify-between my-6">
        {/* <div>
          <TextInput
            id="dis"
            type="text"
            className="form-control"
            placeholder="search"
            //value={searchTerm}
            icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
            // onChange={handleChange}
          />
        </div> */}
        {/* <Button color={"primary"} className="sm:w-fit w-full sm:mt-0 mt-4">
          <Link to="/apps/invoice/create">Create New Race</Link>
        </Button> */}
      </div>
        <div className="border rounded-md border-ld overflow-hidden">
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Rank
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Player
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Races Won
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Total Points
                </Table.HeadCell>
                {/* <Table.HeadCell className="text-base font-semibold py-3"></Table.HeadCell> */}
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {leaderboard?.data?.data?.map((element:any,index:any) => (
                  <Table.Row key={element.user.id}>
                    <Table.Cell className="whitespace-nowrap">
                      <p className="text-bodytext text-base">{index+1}</p>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <div className="flex gap-3 items-center hover:underline hover:text-blue-400 cursor-pointer" onClick={()=>{handleNavigate(element.user.id)}}>
                        <img
                          src={element?.user?.photo?.path?element.user.photo.path:defaultImg}
                          alt="icon"
                          className="h-10 w-10 rounded-full"
                        />
                        {element.user.firstName} {element.user.lastName}
                        <div className="truncat line-clamp-2 sm:max-w-56">
                          <h6 className="text-base">{element.user.firtName}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    
                    <Table.Cell className="whitespace-nowrap">
                      {/* <div className="flex ">
                        {item.users.map((user, index) => (
                          <div className="-ms-2" key={index}>
                            <img
                              src={user.icon}
                              className="border-2 border-white dark:border-darkborder rounded-full h-10 w-10 max-w-none"
                              alt="icon"
                            />
                          </div>
                        ))}
                      </div> */}
                      {element.num_races_won}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {/* <Badge
                        color={`light${item.statuscolor}`}
                        className="capitalize"
                      >
                        {item.status}
                      </Badge> */}
                      {element.total_points?`${element.total_points}`:"0"}
                    </Table.Cell>
                    {/* <Table.Cell className="whitespace-nowrap">
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <IconDotsVertical size={22} />
                          </span>
                        )}
                      >
                        {tableActionData.map((items, index) => (
                          <Dropdown.Item key={index} className="flex gap-3">
                            <Icon icon={`${items.icon}`} height={18} />
                            <span>{items.listtitle}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </Table.Cell> */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </TitleCard>)}
    </>
  );
};

export default index;
