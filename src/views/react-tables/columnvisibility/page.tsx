import ReactColumnVisibilityTable from "src/components/react-tables/column-visiblity/page";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";


const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "column visibility Table ",
    },
];
function page() {
    return (
        <>
            <BreadcrumbComp title="column visibility Table " items={BCrumb} />
            <ReactColumnVisibilityTable />
        </>
    );
}

export default page;
