const BASE_URL = 'https://api.noroff.dev/api/v1';
const REGISTER_URL = `${BASE_URL}/holidaze/auth/register`;
const LOGIN_URL = `${BASE_URL}/holidaze/auth/login`;
const VENUES_URL = `${BASE_URL}/holidaze/venues`;
const PROFILE_URL = `${BASE_URL}/holidaze/profiles`;
const BOOKINGS_URL = `${BASE_URL}/holidaze/bookings`;
const STORE_DATA = JSON.parse(localStorage.getItem('store'));
const TOKEN = STORE_DATA.state.token;

export const registerUser = async (data) => {
  try {
    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getVenues = async () => {
  try {
    const response = await fetch(
      `${VENUES_URL}?sort=created&_owner=true&_bookings=true`
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getVenueById = async (id) => {
  try {
    const response = await fetch(
      `${VENUES_URL}/${id}/?_owner=true&_bookings=true`
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getVenuesRating = async () => {
  try {
    const response = await fetch(`${VENUES_URL}?sort=rating&limit=9`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getVenuesByName = async () => {
  const NAME = STORE_DATA.state.userInfo.name;
  try {
    const response = await fetch(
      `${PROFILE_URL}/${NAME}/venues?_owner=true&_bookings=true`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getProfileByName = async (name) => {
  try {
    const response = await fetch(
      `${PROFILE_URL}/${name}?_bookings=true&_venues=true`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const reserveBooking = async (data) => {
  try {
    const response = await fetch(`${BOOKINGS_URL}?_customer=true&_venue=true`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteBookingById = async (id) => {
  try {
    const response = await fetch(`${BOOKINGS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  const NAME = STORE_DATA.state.userInfo.name;
  try {
    const response = await fetch(`${PROFILE_URL}/${NAME}/media`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createVenue = async (data) => {
  try {
    const response = await fetch(`${VENUES_URL}?_owner=true&_bookings=true`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateVenue = async (id, data) => {
  try {
    console.log(id);
    console.log(data);
    const response = await fetch(
      `${VENUES_URL}/${id}?_owner=true&_bookings=true`,
      {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteVenueById = async (id) => {
  try {
    const response = await fetch(`${VENUES_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
