import StripedRow from "src/components/tables/striped-row";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "LeaderBoard",
  },
];

const StrippedTable = () => {
  return (
    <>
      <BreadcrumbComp title="Leaderboard" items={BCrumb} />
      <StripedRow />
    </>
  );
};

export default StrippedTable;
