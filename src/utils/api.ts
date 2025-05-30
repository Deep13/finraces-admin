import axios from 'axios';
import { API_URL } from '../config.ts';

export const Login = async (
  email: string,
  password: string,
  onSuccess: (data: any) => void = (data) => console.log('Success:', data),
  onError: (error: any) => void = (error) => console.error('Error:', error),
) => {
  const payload = { email, password };

  try {
    console.log('Login Payload:', payload);

    const response = await fetch(`${API_URL}/auth/email/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);

    if (data.user.role.id !== 1) {
      throw new Error('User does not have admin access');
    }

    // Save authentication details in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);

    const loginUserDetails = {
      userName: data.user.firstName,
      userId: data.user.id,
      photo: data.user.photo,
      role: data.user.role,
    };

    localStorage.setItem('userDetails', btoa(JSON.stringify(loginUserDetails)));
    localStorage.removeItem('guest_details');

    onSuccess(data);
  } catch (error) {
    console.error('Login Error:', error);
    onError(error);
  }
};

export const getUserDetails = async (onSuccess: any, onError: any) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    // Make the GET request with the authorization header
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, adjust if needed
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    // Parse and return the JSON data
    const data = await response.json();
    console.log('user', data);
    onSuccess(data);
  } catch (error: any) {
    // Handle and log errors
    console.error('Error fetching data:', error.message);
    // throw error; // Re-throw to allow further handling if needed
    onError(error);
  }
};

// export const getTotalRaces= async (onSuccess:any, onError:any) => {
//     const response = await fetch('https://www.missionatal.com/api/race/count', {
//         method: 'GET',
//     }
//     )
//     if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
//     }
//     console.log(response)
// }

export const updatePhoto = async (
  photoId: any,
  userId: any,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated. Token is missing.');
    }

    // Define the API endpoint
    const url = `${API_URL}/users/${userId}`;

    // Create the payload
    const payload = {
      photo: {
        id: photoId,
      },
    };

    // Make the PATCH request
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    const data = await response.json();
    console.log('Photo updated successfully:', data);

    // Call onSuccess if it's defined
    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error: any) {
    console.error('Error updating photo:', error.message);
    // Call onError if it's defined
    if (onError) {
      onError(error);
    }
  }
};

export const uploadProfilePicture = async (file: any, onSuccess: any, onError: any) => {
  const UPLOAD_URL = `${API_URL}/files/upload`; // Replace with your upload endpoint
  const token = localStorage.getItem('token');
  let storedUserDetails = localStorage.getItem('userDetails');
  let userDetails = storedUserDetails ? JSON.parse(atob(storedUserDetails)) : null;

  // console.log(JSON.parse(atob(userDetails)))

  try {
    // Create FormData object and append file
    const formData = new FormData();
    formData.append('file', file);

    // Make the fetch request with Authorization header
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token
      },
    });

    // Check if the response is OK(status in the range 200 - 299)
    if (!response.ok) {
      const errorText = await response.text(); // Extract error message from server if any
      console.error('Server error:', errorText);
      throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
    }

    // Parse response JSON
    const data = await response.json();
    console.log('File uploaded successfully:', data);
    // userDetails.profilePic = data.file
    // console.log(userDetails)
    // localStorage.setItem('userDetails', btoa(JSON.stringify(loginUserDetails)))
    onSuccess(data);
  } catch (error: any) {
    // Catch network or other unexpected errors
    console.error('Upload failed:', error.message || error);
    // throw new Error(`An error occurred while uploading: ${error.message}`);
    onError(error);
  }
};

export const getRaceDataByMonths = async (onSuccess: any, onError: any, months?: number) => {
  let token = localStorage.getItem('token');
  let URL = `${API_URL}/races/month-count-summary?months=${months}`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Original Data:', responseData);

    // Define the month order
    const monthOrder = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Sort the object based on year and month
    const sortedResponseData = Object.entries(responseData)
      .sort((a, b) => {
        const [monthA, yearA] = a[0].split(' '); // Month and Year from the key
        const [monthB, yearB] = b[0].split(' '); // Month and Year from the key

        const yearCompare = yearA === yearB ? 0 : yearA < yearB ? -1 : 1;

        if (yearCompare === 0) {
          // If the years are the same, sort by month
          return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
        }

        return yearCompare; // Sort by year first
      })
      .reduce((acc: any, [month, value]) => {
        acc[month] = value; // Rebuild the object
        return acc;
      }, {});

    console.log('Sorted Data:', sortedResponseData);

    // Pass the sorted data to onSuccess
    onSuccess(sortedResponseData);
  } catch (error) {
    onError(error);
  }
};

export const getRaceList = async (
  onSuccess = (data: any) => {},
  onError = (data: any) => {},
  status?: string,
  page?: any,
) => {
  let token = localStorage.getItem('token');
  try {
    let URL = `${API_URL}/races?limit=30&`;
    if (status) {
      URL += `statuses=${status}&`;
    }
    if (page) {
      URL += `page=${page}`;
    }
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const data: any = await responseData.data;
    console.log('racelist', responseData);
    onSuccess(responseData);
  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error);
  }
};

export const createDummyRace = async (onSuccess: any, onError: any, formData: any) => {
  try {
    const { startDate, startTime, endDate, endTime, raceName, numUsers, numStocks } = formData;

    // Directly use `Date()` conversion like `createRaceAndJoinUser`
    const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${endDate}T${endTime}`).toISOString();

    const apiBody = {
      name: raceName,
      numUsers,
      numStocks,
      start_date: startDateTime,
      end_date: endDateTime,
    };

    let token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/race-users/race-simulation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(apiBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    onSuccess(responseData);
  } catch (error) {
    console.error('Error Creating Race:', error);
    onError(error);
  }
};

export const deleteRace = async (onSuccess: any, onError: any, id: string) => {
  let token = localStorage.getItem('token'); // Retrieve the token from localStorage

  try {
    let URL = `${API_URL}/races/${id}`;
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    if (response.ok) {
      // const data = await response.json();
      const data = 'ok';
      onSuccess(data); // Call the success callback with the response data
    }
  } catch (error: any) {
    onError(error);
  }
};

export const editRace = async (onSuccess: any, onError: any, id: string, status: string) => {
  let token = localStorage.getItem('token'); // Retrieve the token from localStorage

  try {
    let URL = `${API_URL}/races/${id}`;
    const response = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
      body: JSON.stringify({ status: status }),
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data); // Call the success callback with the response data
    }
  } catch (error: any) {
    onError(error);
  }
};

// export const getUsers= async(onSuccess:any, onError:any) => {
//     let token = localStorage.getItem('token')
//     const response = await fetch('https://www.missionatal.com/api/v1/public/users',{
//         method:'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//     })
//     console.log("pulic user api",response.json());
// }
export const getUsers = async (onSuccess: any, onError: any, page?: any, filter?: any) => {
  let token = localStorage.getItem('token');

  if (!token) {
    onError('Token is missing or invalid.');
    return;
  }
  let query = {};
  if (filter == 'Guest Users') {
    query = { isGuest: true };
  }
  if (filter == 'Bot Users') {
    query = { isBot: true };
  } else if (filter == 'Admin Users') {
    query = { roles: [{ id: 1 }] };
  } else if (filter == 'Inactive Users') {
    query = { status: '2' };
  } else if (filter == 'Suspended Users') {
    query = { status: '3' };
  }
  let URL = `${API_URL}/users?limit=30&`;
  if (page) {
    URL += `page=${page}&`;
  }
  if (filter) {
    console.log('filter recieved', query);
    URL += `filters=${encodeURIComponent(JSON.stringify(query))}`;
  }
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Await the JSON parsing to get the actual data
    const data = await response.json();
    console.log('Users fetched:', data);

    // Handle the response data
    onSuccess(data);
  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error); // Call error handler with the error message
  }
};
export const getUserJoined = async (onSuccess: any, onError: any) => {
  let token = localStorage.getItem('token');

  if (!token) {
    onError('Token is missing or invalid.');
    return;
  }

  let URL = `${API_URL}/users/predefined-count-summary`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Await the JSON parsing to get the actual data
    const data = await response.json();

    // Handle the response data
    onSuccess(data);
  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error); // Call error handler with the error message
  }
};

export const getTotalRacesCount = async (onSuccess: any, onError: any, status?: any) => {
  const token = localStorage.getItem('token');

  try {
    let URL = `${API_URL}/races/count?`;
    if (status) {
      URL += `statuses=${status}&`;
    }
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Readable stream not found in the response.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    let done = false;

    while (!done) {
      const { value, done: isDone } = await reader.read();
      done = isDone;
      result += decoder.decode(value, { stream: !done });
    }

    console.log('Complete Count Data:', result);

    // Parse the result if it's JSON
    const parsedData = JSON.parse(result);

    // Pass the data to the onSuccess callback
    onSuccess(parsedData);
  } catch (error) {
    console.error('Error fetching total races count:', error);
    // Pass the error to the onError callback
    onError(error);
  }
};
export const getTotalUsersCount = async (onSuccess: any, onError: any, status?: any) => {
  const token = localStorage.getItem('token');

  try {
    let URL = `${API_URL}/users/count?`;
    if (status) {
      URL += `statuses=${status}&`;
    }
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Readable stream not found in the response.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    let done = false;

    while (!done) {
      const { value, done: isDone } = await reader.read();
      done = isDone;
      result += decoder.decode(value, { stream: !done });
    }

    console.log('Complete Count Data:', result);

    // Parse the result if it's JSON
    const parsedData = JSON.parse(result);

    // Pass the data to the onSuccess callback
    onSuccess(parsedData);
  } catch (error) {
    console.error('Error fetching total races count:', error);
    // Pass the error to the onError callback
    onError(error);
  }
};

export const suspendUser = async (onSuccess: any, onError: any, id: any, status: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const url = `${API_URL}/users/${id}`;
    const body = JSON.stringify({
      status: {
        id: status,
      },
    }); // Pass `status` in the request body

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
      body, // Include the `status` in the request payload
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User suspended successfully:', data);
      onSuccess(data);
    } else {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      onError(errorData);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    onError(error);
  }
};

export const updateBotUser = async (onSuccess: any, onError: any, id: any, status: boolean) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const url = `${API_URL}/users/${id}`;
    const body = JSON.stringify({
      isBot: status,
    }); // Pass `status` in the request body

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
      body, // Include the `status` in the request payload
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User suspended successfully:', data);
      onSuccess(data);
    } else {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      onError(errorData);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    onError(error);
  }
};

export const createNewAdmin = async (onSuccess: any, onError: any, payload: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    onError('Token is missing or invalid.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle non-200 HTTP responses
      const errorData = await response.json();
      onError(errorData.message || 'An error occurred while creating the admin.');
      return;
    }

    // If the request is successful, handle the success response
    const data = await response.json();
    onSuccess(data); // Call the success handler with the response data
  } catch (error: any) {
    console.error('Fetch request failed:', error);
    onError(error.message || 'An unexpected error occurred.');
  }
};

export const searchRaces = async (onSuccess: any, onError: any, query: string) => {
  try {
    const response = await fetch(`${API_URL}/public/search/races?nameContains=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    console.log(data.data);
    onSuccess(data.data);
  } catch (error) {
    console.log(error);
    onError();
  }
};
export const searchUsers = async (onSuccess: any, onError: any, query: string) => {
  try {
    const response = await fetch(`${API_URL}/public/search/users?nameContains=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    console.log(data.data);
    onSuccess(data);
  } catch (error) {
    console.log(error);
    onError();
  }
};

export const getTickets = async (
  onSuccess: any,
  onError: any,
  titleContains?: any,
  page?: any,
  filter?: any,
) => {
  let token = localStorage.getItem('token');
  try {
    let URL = `${API_URL}/issues?`;
    if (titleContains) {
      URL += `titleContains=${titleContains}&`;
    }

    if (page) {
      URL += `page=${page}&`;
    }
    if (filter) {
      if (filter == 'Open') {
        console.log('open');
        URL += `status=open`;
      } else if (filter == 'Closed') {
        console.log('closed');
        URL += `status=closed`;
      }
      // URL+=`page=${page}`
    }

    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('ticket response', responseData);
    onSuccess(responseData);
  } catch (error: any) {
    console.log(error);
    onError();
  }
};

export const getTicketCount = async (onSuccess: any, onError: any, status?: any) => {
  let token = localStorage.getItem('token');
  try {
    let URL = `${API_URL}/issues/count?`;
    if (status) {
      URL += `status=${status}&`;
    }
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Readable stream not found in the response.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    let done = false;

    while (!done) {
      const { value, done: isDone } = await reader.read();
      done = isDone;
      result += decoder.decode(value, { stream: !done });
    }

    console.log('Complete issue Data:', result);

    // Parse the result if it's JSON
    const parsedData = JSON.parse(result);

    // Pass the data to the onSuccess callback
    onSuccess(parsedData);
  } catch (error) {
    console.error('Error fetching total races count:', error);
    // Pass the error to the onError callback
    onError(error);
  }
};

export const createTicket = async (
  onSuccess: (response: any) => void,
  onError: (error: any) => void,
  area: string,
  title: string,
  desc: string,
  priority: string,
) => {
  let token = localStorage.getItem('token'); // Retrieve the token from localStorage

  try {
    let URL = `${API_URL}/issues`;

    // Construct the request payload
    const payload = {
      area: area,
      priority: priority,
      status: 'Open', // Default status
      description: desc,
      title: title,
    };

    // Send POST request to the API
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = await response.json();
      onSuccess(responseData); // Call the success callback with the response data
    } else {
      const errorData = await response.json();
      onError(errorData); // Call the error callback with the error data
    }
  } catch (error) {
    onError(error); // Handle any network or unexpected errors
  }
};

export const editTicket = async (onSuccess: any, onError: any, id: string, payload: any) => {
  let token = localStorage.getItem('token'); // Retrieve the token from localStorage

  try {
    let URL = `${API_URL}/issues/${id}`;
    const response = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data); // Call the success callback with the response data
    }
  } catch (error: any) {
    onError(error);
  }
};

export const deleteTicket = async (onSuccess: any, onError: any, id: string) => {
  let token = localStorage.getItem('token'); // Retrieve the token from localStorage

  try {
    let URL = `${API_URL}/issues/${id}`;
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data); // Call the success callback with the response data
    }
  } catch (error: any) {
    onError(error);
  }
};

export const getTicketDetails = async (onSuccess: any, onError: any, id: any) => {
  let token = localStorage.getItem('token');

  try {
    let URL = `${API_URL}/issues/${id}`;
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data); // Call the success callback with the response data
    }
  } catch (error: any) {
    onError(error);
  }
};

export const getTicketComments = async (onSuccess: any, onError: any, id: any) => {
  let token = localStorage.getItem('token');

  try {
    let URL = `${API_URL}/issue-comments?issue_id=${id}`;
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Response Status:", response.status);
    const textResponse = await response.text();
    // console.log("Raw Response Body:", textResponse);

    if (response.ok) {
      const data = textResponse ? JSON.parse(textResponse) : {};
      onSuccess(data);
    } else {
      onError(`Error ${response.status}: ${textResponse}`);
    }
  } catch (error) {
    console.error('Error during API call:', error);
    onError(error);
  }
};

export const postTicketComments = async (onSuccess: any, onError: any, id: any, comment: any) => {
  let token = localStorage.getItem('token');

  if (!token) {
    onError('Authorization token is missing.');
    return;
  }

  const payload = {
    comment: comment,
    issue_id: id,
  };

  try {
    const URL = `${API_URL}/issue-comments`;

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      onError(`Error ${response.status}: ${errorText}`);
      return;
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.error('Request Error:', error);
    onError(error);
  }
};

export const getLeaderboard = async (onSuccess: any, onError: any, page?: any) => {
  let token = localStorage.getItem('token');

  if (!token) {
    onError('Token is missing or invalid.');
    return;
  }
  let URL = `${API_URL}/race-results/stats?limit=30&`;

  if (page) {
    URL += `page=${page}&`;
  }

  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Await the JSON parsing to get the actual data
    const data = await response.json();
    console.log('Leaderboard fetched:', data);

    // Handle the response data
    onSuccess(data);
  } catch (error) {
    console.error('Fetch request failed:', error);
    onError(error); // Call error handler with the error message
  }
};
