import {
  Table,
  Checkbox,
  TextInput,
  Button,
  Modal,
  Alert,
  Dropdown,
  DropdownItem,
} from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleBar from 'simplebar-react';
import CardBox from 'src/components/shared/CardBox';
import React from 'react';
import { debounce, set } from 'lodash';
import { debounceStockSearchj } from 'src/utils/api';

const ProductTablelist = () => {
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [stockList, setStockList] = useState<any>([]);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const dummyData = [
    {
      rank: 4,
      percent_change: '-1.40',
      stock_last_rate: '224.80',
      stock_start_rate: '227.99',
      stock: {
        icon_url:
          'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AMZN_icon.jpeg',
        logo_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/AMZN.svg',
        id: '3bd7ebff-bf79-4cfd-a2ec-e729460f187a',
        ticker: 'AMZN',
        price: 217.3999,
        name: 'Amazon.Com Inc',
      },
      race: {
        is_demo_user: false,
        is_demo_race: true,
        created_by: {
          id: 7,
          firstName: 'Blaise',
          lastName: 'Wuckert',
          isBot: true,
          gender: null,
          photo: {
            id: 'a79f029c-f8f6-4d49-af69-48bf185cf2cd',
            path: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/1/2025/3/80de31aa0d647ee522a9e.jpg',
          },
        },
        privacy: 'public',
        status: 'running',
        end_date: '2025-06-10T05:48:09.386Z',
        start_date: '2025-06-10T05:43:09.386Z',
        name: 'lumbering relationships giraffe',
        id: '7b520906-8699-4708-9c61-886943fd606c',
        isSimulation: true,
        createdAt: '2025-06-10T05:43:09.387Z',
        updatedAt: '2025-06-10T05:43:10.099Z',
      },
      id: '06ad1751-490c-4d73-84bf-523d1ade5c61',
      createdAt: '2025-06-10T05:43:09.408Z',
      updatedAt: '2025-06-10T05:44:59.993Z',
    },
    {
      rank: 1,
      percent_change: '5.61',
      stock_last_rate: '332.03',
      stock_start_rate: '314.39',
      stock: {
        icon_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA_icon.png',
        logo_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/TSLA.svg',
        id: 'c2b7f3d7-702a-4837-b4d3-a1899edcf8f9',
        ticker: 'TSLA',
        price: 314.1999,
        name: 'Tesla, Inc. Common Stock',
      },
      race: {
        is_demo_user: false,
        is_demo_race: true,
        created_by: {
          id: 7,
          firstName: 'Blaise',
          lastName: 'Wuckert',
          isBot: true,
          gender: null,
          photo: {
            id: 'a79f029c-f8f6-4d49-af69-48bf185cf2cd',
            path: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/1/2025/3/80de31aa0d647ee522a9e.jpg',
          },
        },
        privacy: 'public',
        status: 'running',
        end_date: '2025-06-10T05:48:09.386Z',
        start_date: '2025-06-10T05:43:09.386Z',
        name: 'lumbering relationships giraffe',
        id: '7b520906-8699-4708-9c61-886943fd606c',
        isSimulation: true,
        createdAt: '2025-06-10T05:43:09.387Z',
        updatedAt: '2025-06-10T05:43:10.099Z',
      },
      id: '01641785-b3c4-40d9-9740-117219ce648b',
      createdAt: '2025-06-10T05:43:09.425Z',
      updatedAt: '2025-06-10T05:44:59.959Z',
    },
    {
      rank: 5,
      percent_change: '-2.70',
      stock_last_rate: '486.99',
      stock_start_rate: '500.50',
      stock: {
        icon_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/MSFT_icon.png',
        logo_url: null,
        id: '06a438dc-fa1d-4593-ba44-7f35b20e2594',
        ticker: 'MSFT',
        price: 471.63,
        name: 'Microsoft Corp',
      },
      race: {
        is_demo_user: false,
        is_demo_race: true,
        created_by: {
          id: 7,
          firstName: 'Blaise',
          lastName: 'Wuckert',
          isBot: true,
          gender: null,
          photo: {
            id: 'a79f029c-f8f6-4d49-af69-48bf185cf2cd',
            path: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/1/2025/3/80de31aa0d647ee522a9e.jpg',
          },
        },
        privacy: 'public',
        status: 'running',
        end_date: '2025-06-10T05:48:09.386Z',
        start_date: '2025-06-10T05:43:09.386Z',
        name: 'lumbering relationships giraffe',
        id: '7b520906-8699-4708-9c61-886943fd606c',
        isSimulation: true,
        createdAt: '2025-06-10T05:43:09.387Z',
        updatedAt: '2025-06-10T05:43:10.099Z',
      },
      id: '23369ace-77e4-4436-8618-b32f054ed8b4',
      createdAt: '2025-06-10T05:43:09.452Z',
      updatedAt: '2025-06-10T05:45:00.124Z',
    },
    {
      rank: 3,
      percent_change: '-0.18',
      stock_last_rate: '706.31',
      stock_start_rate: '707.58',
      stock: {
        icon_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/META_icon.png',
        logo_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/META.svg',
        id: '2ec4bdf1-8939-4742-abac-1737d46743e7',
        ticker: 'META',
        price: 696,
        name: 'Meta Platforms, Inc. Class A Common Stock',
      },
      race: {
        is_demo_user: false,
        is_demo_race: true,
        created_by: {
          id: 7,
          firstName: 'Blaise',
          lastName: 'Wuckert',
          isBot: true,
          gender: null,
          photo: {
            id: 'a79f029c-f8f6-4d49-af69-48bf185cf2cd',
            path: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/1/2025/3/80de31aa0d647ee522a9e.jpg',
          },
        },
        privacy: 'public',
        status: 'running',
        end_date: '2025-06-10T05:48:09.386Z',
        start_date: '2025-06-10T05:43:09.386Z',
        name: 'lumbering relationships giraffe',
        id: '7b520906-8699-4708-9c61-886943fd606c',
        isSimulation: true,
        createdAt: '2025-06-10T05:43:09.387Z',
        updatedAt: '2025-06-10T05:43:10.099Z',
      },
      id: '37107448-bc99-495b-a42b-dfea82020aac',
      createdAt: '2025-06-10T05:43:09.471Z',
      updatedAt: '2025-06-10T05:44:59.981Z',
    },
    {
      rank: 2,
      percent_change: '3.84',
      stock_last_rate: '1311.20',
      stock_start_rate: '1262.76',
      stock: {
        icon_url:
          'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/NFLX_icon.jpeg',
        logo_url: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/stocks/images/NFLX.svg',
        id: '57a0e048-43de-4c41-84b7-9bea41de5fe6',
        ticker: 'NFLX',
        price: 1225.5,
        name: 'NetFlix Inc',
      },
      race: {
        is_demo_user: false,
        is_demo_race: true,
        created_by: {
          id: 7,
          firstName: 'Blaise',
          lastName: 'Wuckert',
          isBot: true,
          gender: null,
          photo: {
            id: 'a79f029c-f8f6-4d49-af69-48bf185cf2cd',
            path: 'https://finracerdev-7891.s3.us-east-1.amazonaws.com/1/2025/3/80de31aa0d647ee522a9e.jpg',
          },
        },
        privacy: 'public',
        status: 'running',
        end_date: '2025-06-10T05:48:09.386Z',
        start_date: '2025-06-10T05:43:09.386Z',
        name: 'lumbering relationships giraffe',
        id: '7b520906-8699-4708-9c61-886943fd606c',
        isSimulation: true,
        createdAt: '2025-06-10T05:43:09.387Z',
        updatedAt: '2025-06-10T05:43:10.099Z',
      },
      id: 'ffe25417-dbc8-4d4a-9872-ffff4991f5a5',
      createdAt: '2025-06-10T05:43:09.490Z',
      updatedAt: '2025-06-10T05:44:59.971Z',
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(dummyData.map((product: { stock: any }) => product?.stock?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId: number) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id: number) => id !== productId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);
  };

  //search logic
  const fetchStocks = useCallback(
    debounce(async (search) => {
      if (search.length > 2) {
        try {
          await debounceStockSearchj(
            search,
            (data: any) => {
              console.log('data', data);
              setStockList(data);
            },
            (error: any) => {
              console.error('Error fetching stocks:', error);
            },
          ); // Call API to search stocks
        } catch (error) {
          console.error('Error fetching stocks:', error);
        } finally {
          console.log('final');
        }
      } else {
        console.log('A');
        setStockList([]); // Clear stock list if search is less than 3 characters
      }
    }, 500), // Debounce to limit API calls
    [],
  );

  useEffect(() => {
    fetchStocks(search);
  }, [search]);

  // Duration options for the dropdown
  const durationOptions = [
    { label: '1 Hour', value: 1 },
    { label: '2 Hours', value: 2 },
    { label: '5 Hours', value: 5 },
    { label: '24 Hours', value: 24 },
    { label: '48 Hours', value: 48 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 bg-white rounded-xl flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <div className="text-xl font-semibold text-black">Race Duration:</div>
          <Dropdown
            color="lightprimary"
            label={selectedDuration ? `${selectedDuration} Hours` : 'Select duration'}
          >
            {durationOptions.map((opt) => (
              <DropdownItem
                key={opt.value}
                value={opt.value}
                onClick={() => setSelectedDuration(opt.value)}
              >
                {opt.label}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
        <Button color={'lightsuccess'} className="rounded-xl p-1 text-center ">
          {/* <Icon icon="solar:add-circle-linear" height={18} onClick={() => {}} /> */}
          Save
        </Button>
      </div>
      <CardBox>
        {/* Search  */}
        <div className="flex gap-3 justify-between items-center mb-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <TextInput
              id="search"
              placeholder="Search Stocks"
              className="form-control w-full sm:max-w-60 max-w-full"
              sizing="md"
              required
              onChange={handleSearch}
              value={search}
              icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
            />
            {stockList?.length > 0 && (
              <div className="max-w-[650px] max-h-[500px] overflow-y-auto z-20 absolute top-20 left-0 border-2 rounded-xl">
                <div className="text-lg">
                  <ul className="bg-white dark:bg-darkmode p-2 rounded-md shadow-lg">
                    {stockList.map((stock: any) => (
                      <li
                        key={stock?.id}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-darkmode-hover cursor-pointer"
                        onClick={() => {}}
                      >
                        <div className="flex items-center justify-between p-2">
                          <div className="flex items-center gap-2 w-full">
                            <img
                              src={stock?.icon_url}
                              alt="icon"
                              width={32}
                              height={32}
                              className="inline-block mr-2 rounded-full"
                            />
                            <div>
                              {stock?.name} ({stock?.ticker})
                            </div>
                          </div>

                          <Button color={'lightsuccess'} className="rounded-xl p-1 text-center ">
                            {/* <Icon icon="solar:add-circle-linear" height={18} onClick={() => {}} /> */}
                            Add
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            {selectedProducts?.length > 0 && (
              <Button color={'error'} className=" p-0">
                Delete Selected
              </Button>
            )}
          </div>
        </div>
        {/* Table */}
        <div className="max-h-[580px]">
          <div className="border rounded-md border-ld overflow-x-auto">
            <Table className="">
              <Table.Head>
                <Table.HeadCell className="text-base font-semibold py-3">
                  <Checkbox className="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Stock</Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Ticker</Table.HeadCell>
                {/* <Table.HeadCell className="text-base font-semibold py-3">Price</Table.HeadCell> */}
                <Table.HeadCell className="text-base font-semibold py-3">Action</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {dummyData.map((item: any, index: React.Key | null | undefined) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap">
                      <Checkbox
                        className="checkbox"
                        onChange={() => toggleSelectProduct(item?.stock.id)}
                        checked={selectedProducts.includes(item?.stock.id)}
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap lg:min-w-auto min-w-[250px]">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item?.stock?.icon_url}
                          alt="icon"
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full"
                        />
                        <div className="text-no-wrap">
                          <h6 className="text-base">{item?.stock.name}</h6>
                          {/* <p className="text-sm text-darklink dark:text-bodytext">
                              {item.category}
                            </p> */}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <p className="text-sm text-darklink dark:text-bodytext font-medium">
                        {item?.stock?.ticker}
                      </p>
                    </Table.Cell>
                    {/* <Table.Cell className="whitespace-nowrap">
                      <div className="flex gap-2 text-sm items-center text-darklink dark:text-bodytext font-medium">
                        {item?.stock.price} $
                      </div>
                    </Table.Cell> */}

                    <Table.Cell className="whitespace-nowrap">
                      <Button color={'lighterror'} className="btn-circle p-0 text-center">
                        <Icon
                          icon="solar:trash-bin-minimalistic-outline"
                          height={18}
                          onClick={() => {
                            setSelectedProducts([item?.stock.id]);
                            handleDelete();
                          }}
                        />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </CardBox>
      <Modal
        show={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title="Delete Confirmation"
        size="md"
      >
        <p className="text-center text-ld text-lg my-6">
          Are you sure you want to delete selected products?
        </p>
        <Modal.Footer className="flex justify-center">
          <Button color={'error'} onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button onClick={handleCloseDeleteDialog} color={'lighterror'}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {showAlert && (
        <Alert
          color="warning"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit z-[50]"
          icon={() => <Icon icon="solar:archive-minimalistic-broken" className="" height={22} />}
        >
          <span className="ms-2">Please select products to delete.</span>
        </Alert>
      )} */}
    </div>
  );
};

export default ProductTablelist;
