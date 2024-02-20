const BASE_URL = 'https://api.noroff.dev/api/v1';
const REGISTER_URL = `${BASE_URL}/holidaze/auth/register`;
const LOGIN_URL = `${BASE_URL}/holidaze/auth/login`;
const VENUES_URL = `${BASE_URL}/holidaze/venues`;
const PROFILE_URL = `${BASE_URL}/holidaze/profiles`;

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
    const response = await fetch(`${VENUES_URL}?sort=created`);
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

export const getProfileByName = async (name) => {
  const storeData = JSON.parse(localStorage.getItem('store'));
  const TOKEN = storeData.state.token;
  try {
    const response = await fetch(
      `${PROFILE_URL}/${name}?_bookings=true&_venues=true`,
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
