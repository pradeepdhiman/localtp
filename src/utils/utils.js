
import SoftTypography from "components/SoftTypography";
import emptySplitApi from "./emptySplitApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SoftBox from "components/SoftBox";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import SoftBadge from "components/SoftBadge";
import SoftButton from "components/SoftButton";
import moment from "moment";

const createHeaders = (isForm) => {
  const user = authUser();
  const headers = {};

  if (isForm) {
    // headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (user) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }

  return headers;
};




export const userRegister = (endpoint, queryParam) => {
  const queryString = Object.entries(queryParam)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return {
    url: queryString ? `${endpoint}?${queryString}` : endpoint,
    method: "POST",
    headers: createHeaders(),
  };
};



export const createRequest = (endpoint, data) => ({
  url: `${endpoint}`,
  method: "POST",
  body: JSON.stringify(data),
  headers: createHeaders(),
});

export const postForm = (endpoint, data) => ({
  url: `${endpoint}`,
  method: "PUT",
  body: data,
  headers: createHeaders(true),
});

export const getRequest = (endpoint, queryParam) => {
  const [a, b] = Object.entries(queryParam)[0];
  return {
    url: Object.keys(queryParam).length ? `${endpoint}?${a}=${b}` : endpoint,
    headers: createHeaders(),
  };
};


export const readRequest = (endpoint, id) => ({
  url: id ? `${endpoint}/${id}` : `${endpoint}`,
  method: "GET",
  headers: createHeaders(),
});

export const updateRequest = (endpoint, data) => ({
  url: `${endpoint}`,
  method: "PUT",
  body: JSON.stringify(data),
  headers: createHeaders(),
});

export const deleteRequest = (endpoint, id) => ({
  url: `${endpoint}?id=${id}`,
  method: "DELETE",
  headers: createHeaders(),
});


export function saveObject(key = "", value = "") {
  if (window && window.localStorage) {
    window.localStorage.setItem(key, value);
  }
}

export function getObject(name) {
  if (window && window.localStorage) {
    return window.localStorage.getItem(name);
  }
  return false;
}

export function removeObject(key) {
  localStorage.removeItem(key);
}


export const crudApi = ({ entityName, baseUrl, endpoints }) => {
  const createEndpointUrl = (endpoint) => `${baseUrl}/${endpoint}`;

  return emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
      getList: build.query({
        query: () => createEndpointUrl(endpoints.list),
      }),
      filter: build.mutation({
        query: (data) => ({
          url: createEndpointUrl(endpoints.filter),
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
      create: build.mutation({
        query: (data) => ({
          url: createEndpointUrl(endpoints.create),
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
      update: build.mutation({
        query: ({ id, data }) => ({
          url: createEndpointUrl(`${endpoints.update}/${id}`),
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
      delete: build.mutation({
        query: (id) => ({
          url: createEndpointUrl(`${endpoints.delete}/${id}`),
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    }),
  });
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    for (const [rule, value] of Object.entries(fieldRules)) {
      switch (rule) {
        case 'required':
          if (value && !formData[fieldName]) {
            errors[fieldName] = 'This field is required';
          }
          break;
        case 'minLength':
          if (formData[fieldName] && formData[fieldName].length < value) {
            errors[fieldName] = `Must be at least ${value} characters`;
          }
          break;
        case 'maxLength':
          if (formData[fieldName] && formData[fieldName].length > value) {
            errors[fieldName] = `Must be at most ${value} characters`;
          }
          break;
        case 'number':
          if (value && isNaN(formData[fieldName])) {
            errors[fieldName] = 'Must be a number';
          }
          break;
        case 'email':
          if (value && !/\S+@\S+\.\S+/.test(formData[fieldName])) {
            errors[fieldName] = 'Please enter a valid email';
          }
          break;
        case 'date':
          if (value && isNaN(Date.parse(formData[fieldName]))) {
            errors[fieldName] = 'Must be a valid date';
          }
          break;
        case 'type':
          // Handle other types if needed
          break;
        default:
          break;
      }
    }
  });

  return errors;
};



export const logout = () => {
  clearTimeout(logoutTimer);
  removeObject("user")

}

export const authUser = () => {
  return JSON.parse(getObject("user"))
}



// auto log out 


let logoutTimer;

export function startAutoLogout(timeoutInMinutes = 1) {
  clearTimeout(logoutTimer);
  const timeoutInMilliseconds = timeoutInMinutes * 60 * 1000;

  logoutTimer = setTimeout(() => {
    logout()
  }, timeoutInMilliseconds);
}


export const toastHandler = (response) => {
  const { data } = response;
  if (data?.success) {
    toast.success(data?.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });
  } else {
    toast.error(data?.errors[0], {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });
  }
};



export const generateRows = (list, tableheads, orderBy, order = "asc", action) => {
  let rowArr = Array.isArray(list) ? list : (list?.data || []);

  let sortRows = rowArr.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === 'string' || typeof bValue === 'string') {
      // If values are strings, perform case-insensitive comparison
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      // If values are numbers, perform numeric comparison
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  return sortRows?.map((rowItem, rowIndex) => {
    let rowCells = {};
    let rowId = "";

    tableheads.forEach((column, colIndex) => {
      const columnName = column.name;
      const columnType = column.type;
      const columnValue = rowItem[columnName];
      rowId = colIndex === 0 ? columnValue : rowId;


      if (columnName === "statusName" || columnName === "isDeleted") {
        const badgeContent = columnValue === "Active" ? "Active" : "Deactive";
        const badgeColor = columnValue === "Active" ? "success" : "secondary";

        rowCells[columnName] = (
          <SoftBadge variant="gradient" badgeContent={badgeContent} color={badgeColor} size="xs" container />
        );
      } else if (columnName === "action" && rowItem["paymentStatusName"] === "Verified") {
        rowCells[columnName] = (
          <SoftButton
            variant="outlined"
            size="small"
            color="info"
            onClick={() => action.retest(rowItem)}
          >
            Re Test
          </SoftButton>
        );
      } else {
        rowCells[columnName] = (
          <SoftTypography variant="caption" color="inharit" fontWeight="inharit">
            {columnType === "string" ? columnValue : null}
            {columnType === "number" ? (isNaN(parseInt(columnValue)) ? "" : parseInt(columnValue)) : null}
            {columnType === "date" ? formatDateString(columnValue) : null}
          </SoftTypography>
        );
      }
    });

    return rowCells;
  });
};

const convertToDateObject = (value, type) => {
  return type === "date" ? moment(value).format("YYYY-MM-DD") : value;
};

export const formatDateFields = (activeRow, fields) => {
  if (activeRow && fields) {
    const result = {};
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        result[key] = convertToDateObject(activeRow[key], fields[key].type);
      }
    }
    return result;
  }
};