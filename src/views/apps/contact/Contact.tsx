
import ContactApp from "src/components/apps/contacts";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";


export const Contact = () => {
    const BCrumb = [
        {
          to: "/",
          title: "Home",
        },
        {
          title: "User Management",
        },
      ];
    return (
        <>
              <BreadcrumbComp title="User Management" items={BCrumb} />
              <ContactApp />
        </>
    )
}

export default Contact