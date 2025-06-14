import { useState, useContext, useEffect } from 'react';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router';
import { InvoiceContext } from 'src/context/InvoiceContext';
import { createDummyRace } from 'src/utils/api';
import { Icon } from '@iconify/react';

function CreateInvoice() {
  const { invoices } = useContext(InvoiceContext);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const generateRandomStockRaceName = () => {
    // Get user details from localStorage
    let encodedUserDetails = localStorage.getItem('userDetails');
    if (!encodedUserDetails) {
      // throw new Error("User details not found in localStorage");
      // probably be guest
      encodedUserDetails = localStorage.getItem('guest_details');
      if (!encodedUserDetails) {
        throw new Error('User details not found in localStorage');
      }
    }

    // Decode and parse user details
    const decodedUserDetails = JSON.parse(atob(encodedUserDetails));
    const userName = decodedUserDetails.userName;

    if (!userName) {
      throw new Error('Username not found in userDetails');
    }

    // Creative stock-related phrases
    const stockPhrases = [
      'Charge of the Bulls',
      "Bear's Retreat",
      'Portfolio Blitz',
      "Trader's Triumph",
      'Capital Crusade',
      'Equity Escapade',
      'Stock Surge Showdown',
      "Investor's Arena",
      'Exchange Frenzy',
      'Market Mayhem',
    ];

    // Generate a random phrase
    const randomPhrase = stockPhrases[Math.floor(Math.random() * stockPhrases.length)];
    let today = Date.now();
    // Generate the race name
    return `${userName}'s ${randomPhrase} ${today}`;
  };
  const [formData, setFormData] = useState({
    id: 0,
    raceName: generateRandomStockRaceName(),
    numUsers: 0,
    numStocks: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    // const name=generateRandomStockRaceName();
    // console.log(name)
    if (invoices.length > 0) {
      const lastId = invoices[invoices.length - 1].id;
      setFormData((prevData) => ({
        ...prevData,
        id: lastId + 1,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        id: 1,
      }));
    }
  }, [invoices]);

  const validateTimes = (
    startTime: string,
    endTime: string,
    startDate: string,
    endDate: string,
  ) => {
    if (startDate === endDate) {
      if (startTime && endTime) {
        if (startTime >= endTime) {
          setStartTimeError('Start time should be less than End time for a race on the same day.');
          setEndTimeError('End time should be greater than Start time for a race on the same day.');
        } else {
          setStartTimeError('');
          setEndTimeError('');
        }
      }
    } else {
      // clear errors if dates differ
      setStartTimeError('');
      setEndTimeError('');
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'startTime' || name === 'endTime') {
      validateTimes(
        name === 'startTime' ? value : formData.startTime,
        name === 'endTime' ? value : formData.endTime,
        formData.startDate,
        formData.endDate,
      );
    }
  };

  const [alertMsg, setAlertMsg] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { startDate, endDate, startTime, endTime } = formData;
    const now = new Date();

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const today = new Date(now.toISOString().split('T')[0]);

    // Start date in past
    if (new Date(startDate) < today) {
      setAlertMsg('Start date cannot be in the past');
      setShowAlert(true);
      hideAlertAfterDelay();
      return;
    }

    // End date before start date
    if (new Date(endDate) < new Date(startDate)) {
      setAlertMsg('End date cannot be before start date');
      setShowAlert(true);
      hideAlertAfterDelay();
      return;
    }

    // Start time must be before end time if same date
    if (startDate === endDate && startTime >= endTime) {
      setAlertMsg('On the same day, start time must be before end time');
      setShowAlert(true);
      hideAlertAfterDelay();
      return;
    }

    // ✅ If all good, proceed
    createDummyRace(
      (data: any) => {
        setAlertMsg('Race created successfully');
        setShowAlert(true);
        hideAlertAfterDelay();
        navigate('/raceManagement');
      },
      (error: any) => {
        setAlertMsg('Error creating race. Please try again.');
        setShowAlert(true);
        hideAlertAfterDelay();
      },
      formData,
    );
  };

  const hideAlertAfterDelay = () => {
    setTimeout(() => {
      setShowAlert(false);
      setAlertMsg('');
    }, 5000);
  };

  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');

  return (
    <div>
      <h2 className="text-xl mb-6">Dummy Race Details</h2>
      <form>
        <div className="bg-lightgray dark:bg-gray-800/70 p-6 my-6 rounded-md">
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-12 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="raceName" value="Race Name" />
              </div>
              <TextInput
                id="raceName"
                name="raceName"
                value={formData.raceName}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>

            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="startDate" value="Start Date" />
              </div>
              <TextInput
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                type="date"
                className="form-control"
                min={new Date().toISOString().split('T')[0]} // 🟢 Prevent past date selection
              />
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="startTime" value="Start Time" />
              </div>
              <TextInput
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                type="time"
                className="form-control"
                style={{ appearance: 'none', MozAppearance: 'textfield' }}
                //rightIcon={()=><Icon icon="tabler:clock-pin" height={25} />}
              />
              {startTimeError && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  {startTimeError}
                </p>
              )}
            </div>

            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="endDate" value="End Date" />
              </div>
              <TextInput
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                type="date"
                className="form-control"
                min={formData.startDate}
              />
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="endTime" value="End Time" />
              </div>
              <TextInput
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                type="time"
                className="form-control"
              />
              {endTimeError && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">{endTimeError}</p>
              )}
            </div>

            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="numStocks" value="Number of Stocks" />
              </div>
              <TextInput
                id="numStocks"
                name="numStocks"
                value={formData.numStocks}
                onChange={handleChange}
                type="number"
                className="form-control"
                max={10}
                min={0}
              />
            </div>

            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="numUsers" value="Number of Users" />
              </div>
              <TextInput
                id="numUsers"
                name="numUsers"
                value={formData.numUsers}
                onChange={handleChange}
                type="number"
                className="form-control"
                max={5}
                min={0}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex justify-end gap-3 mt-2">
            <Button color="primary" className="mt-6" onClick={handleSubmit}>
              Create Race
            </Button>

            <Button
              color="error"
              className="mt-6"
              onClick={() => {
                navigate('/raceManagement');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        {showAlert && (
          <Alert color="error" rounded className="fixed top-3 z-50">
            {alertMsg}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default CreateInvoice;
