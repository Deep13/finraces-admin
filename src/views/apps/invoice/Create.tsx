import CreateInvoiceApp from "src/components/apps/invoice/Add-invoice";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";



const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Create Dummy Race',
  },
];

const CreateInvoice = () => {
  return (
    <>
       <BreadcrumbComp title=" Create Dummy Race " items={BCrumb} />
       <CreateInvoiceApp />
    </>
  );
};
export default CreateInvoice;
