
import { TicketProvider } from "src/context/TicketContext";
import TicketFilter from "./TicketFilter";
import TicketListing from "./TicketListing";
import CardBox from "src/components/shared/CardBox";
import { useState } from "react";



const TicketsApp = () => {
  const [filter,setFilter]=useState("");
  const [needRefresh,setNeedRefresh]=useState(false);
  return (
    <>
      <TicketProvider>
        <CardBox>
          <TicketFilter filter={filter} setFilter={setFilter} needRefresh={needRefresh} />
          <TicketListing setNeedRefresh={setNeedRefresh} needRefresh={needRefresh} filter={filter} />
        </CardBox>
      </TicketProvider>
    </>
  );
};

export default TicketsApp;
