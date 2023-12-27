export const API_URL = 'http://localhost:8080';

export function PostBreakFast(body) {
  return {
    url: API_URL + '/api/break-fast',
    options: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  };
}

export function GetAllBreakByData(date) {
  return {
    url: API_URL + `/api/break-fast?data=${date}`,
    options: {
      method: "GET"
    }
  };
}

export function GetBreakById(id) {
  return {
    url: API_URL + `/api/break-fast/${id}`,
    options: {
      method: "GET"
    }
  };
}

export function UpdateBreakFast(id, body) {
  return {
    url: API_URL + `/api/break-fast/${id}`,
    options: {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  };
}

export function DeleteBreak(id) {
  return {
    url: API_URL + `/api/break-fast/${id}`,
    options: {
      method: "DELETE"
    }
  };
}