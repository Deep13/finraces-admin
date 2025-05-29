import { Badge, Breadcrumb, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import CardBox from '../../../../components/shared/CardBox';
import { Link } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext';

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  const { setShowModal } = useContext(AuthContext);
  return (
    <>
      <CardBox className={`mb-[30px] py-4`}>
        <Breadcrumb className="flex justify-between">
          <h6 className="text-base">{title}</h6>

          <div className="flex items-center gap-3">
            <div className="sm:flex justify-between gap-5 mr-10">
              {/* <Button color={"error"} className="sm:w-fit w-full sm:mt-0 mt-4 mr-2">
         Delete Race
        </Button> */}
              <Button
                onClick={() => {
                  setShowModal(true);
                }}
                color={'primary'}
                className="sm:w-fit w-full sm:mt-0 mt-4"
              >
                Create 30 Demo Races
              </Button>
              <Button color={'primary'} className="sm:w-fit w-full sm:mt-0 mt-4">
                <Link to="/raceManagement/createBotRace">Create Bot Race</Link>
              </Button>
            </div>
            {items
              ? items.map((item) => (
                  <div key={item.title}>
                    {item.to ? (
                      <Breadcrumb.Item href={item.to}>
                        <Icon icon="solar:home-2-line-duotone" height={20}></Icon>{' '}
                      </Breadcrumb.Item>
                    ) : (
                      <Badge color={'lightprimary'}>{item.title}</Badge>
                    )}
                  </div>
                ))
              : ''}
          </div>
        </Breadcrumb>
      </CardBox>
    </>
  );
};

export default BreadcrumbComp;
