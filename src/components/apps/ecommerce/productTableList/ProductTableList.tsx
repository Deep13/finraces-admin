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
import { debounceStockSearchj, getDemoRaceData, postDemoRaceData } from 'src/utils/api';

const ProductTablelist = () => {
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [stockList, setStockList] = useState<any>([]);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getDemoRaceData(
      (data: any) => {
        setData(data.data);
        setSelectedDuration(data?.data?.[0]?.duration_minutes);
      },
      (error: any) => {
        console.log('Error while fetching demo race data', error);
      },
    );
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(data[0]?.stocks?.map((product: any) => product?.id));
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

  const handleSingleDelete = (id: string) => {
    setData((prev: any) => {
      const newData = [...prev];
      newData[0].stocks = newData[0].stocks.filter((stock: any) => stock.id !== id);
      return newData;
    });

    // Also unselect if it was selected
    setSelectedProducts((prev: any[]) => prev.filter((item) => item !== id));
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    const updatedStocks = data[0]?.stocks?.filter(
      (stock: any) => !selectedProducts.includes(stock.id),
    );

    // Update the data state immutably
    setData((prev: any) => {
      const newData = [...prev];
      newData[0].stocks = updatedStocks;
      return newData;
    });

    // Clear selected
    setSelectedProducts([]);
    setSelectAll(false);
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
    { label: '1 Min', value: 1 },
    { label: '2 Mins', value: 2 },
    { label: '5 Mins', value: 5 },
    { label: '10 Mins', value: 10 },
    { label: '30 Mins', value: 30 },
  ];

  const handleSave = () => {
    if (!selectedDuration || !data?.[0]?.stocks?.length) {
      alert('Please set duration and add at least one stock.');
      return;
    }

    const stockIds = data[0].stocks.map((stock: any) => stock.id).filter((id: string) => !!id); // remove undefined/nulls

    const payload = {
      duration_minutes: selectedDuration,
      stocks: stockIds,
    };

    console.log('Payload being sent:', JSON.stringify(payload, null, 2)); // Debug

    postDemoRaceData(
      payload,
      (res: any) => {
        setAlertMessage('Demo race configuration saved successfully.');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      },
      (error: any) => {
        console.error('Error saving demo race config:', error);
        alert('Error while saving. Please check stock IDs.');
      },
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 bg-white rounded-xl flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <div className="text-xl font-semibold text-black">Race Duration:</div>
          <Dropdown
            color="lightprimary"
            label={selectedDuration ? `${selectedDuration} Mins` : 'Select duration'}
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
        <Button color={'lightsuccess'} className="rounded-xl p-1 text-center " onClick={handleSave}>
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
              <div className="max-w-[700px] max-h-[300px] overflow-y-auto z-20 absolute top-20 left-0 border-2 rounded-xl">
                <div className="text-lg">
                  <ul className="bg-white dark:bg-darkmode p-2 rounded-md shadow-lg">
                    {stockList
                      ?.filter(
                        (stock: any) => !data[0]?.stocks?.some((s: any) => s.id === stock.id),
                      )
                      .map((stock: any) => (
                        <li
                          key={stock?.id}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-darkmode-hover cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-2 w-full">
                              <img
                                src={stock?.icon_url || stock?.logo_url}
                                alt="icon"
                                width={32}
                                height={32}
                                className="inline-block mr-2 rounded-full"
                              />
                              <div>
                                {stock?.name} ({stock?.ticker})
                              </div>
                            </div>

                            <Button
                              color={'lightsuccess'}
                              className="rounded-xl ml-5 text-center"
                              onClick={() => {
                                setData((prev: any) => {
                                  const newData = [...prev];
                                  newData[0].stocks = [...newData[0].stocks, stock];
                                  return newData;
                                });
                                setSearch('');
                              }}
                            >
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
              <Button color={'error'} className="p-0" onClick={handleDelete}>
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
                {data[0]?.stocks?.map((item: any, index: React.Key | null | undefined) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap">
                      <Checkbox
                        className="checkbox"
                        onChange={() => toggleSelectProduct(item?.id)}
                        checked={selectedProducts.includes(item?.id)}
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap lg:min-w-auto min-w-[250px]">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item?.icon_url}
                          alt="icon"
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full"
                        />
                        <div className="text-no-wrap">
                          <h6 className="text-base">{item?.name}</h6>
                          {/* <p className="text-sm text-darklink dark:text-bodytext">
                              {item.category}
                            </p> */}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <p className="text-sm text-darklink dark:text-bodytext font-medium">
                        {item?.ticker}
                      </p>
                    </Table.Cell>
                    {/* <Table.Cell className="whitespace-nowrap">
                      <div className="flex gap-2 text-sm items-center text-darklink dark:text-bodytext font-medium">
                        {item?.price} $
                      </div>
                    </Table.Cell> */}

                    <Table.Cell className="whitespace-nowrap">
                      <Button color={'lighterror'} className="btn-circle p-0 text-center">
                        <Icon
                          icon="solar:trash-bin-minimalistic-outline"
                          height={18}
                          onClick={() => {
                            handleSingleDelete(item?.id); // <-- use helper
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

      {showAlert && (
        <Alert
          color="success"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit z-[50]"
          icon={() => <Icon icon="solar:check-circle-linear" height={22} />}
        >
          <span className="ms-2">{alertMessage}</span>
        </Alert>
      )}
    </div>
  );
};

export default ProductTablelist;
