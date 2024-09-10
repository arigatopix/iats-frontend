import { formatDistance, parseISO, format, add } from "date-fns";
import { differenceInDays } from "date-fns";
import { th } from "date-fns/locale";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = dateStr =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = value =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDateTH = date => {
  return format(new Date(date), "dd MMM yyyy", {
    locale: th,
  });
};

export const searchBy = (objects, field, searchString) => {
  const searched = searchString.toLowerCase();
  return objects.filter(obj => obj[field].toLowerCase().includes(searched));
};

export const fromToday = (numDays, withTime = false) => {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
};

export const parseEmployee = employeeResponse => {
  const {
    emp_id,
    title_s_desc,
    first_name,
    last_name,
    dept_sap_full,
    plans_text_full,
    eng_name_full,
    // email,
    tel_mobile,
  } = employeeResponse;

  // eng_name_full.start;

  const { title_eng, name_eng } = parseEnglishName(eng_name_full);

  const employee = {
    employee_id: emp_id.toString(),
    title: title_s_desc,
    name: `${first_name} ${last_name}`,
    title_eng: `${title_eng}`,
    name_eng,
    department: dept_sap_full,
    // email,
    position: plans_text_full,
    phone_number: tel_mobile,
  };
  return employee;
};

function parseEnglishName(eng_name_full) {
  let title_eng = "";
  let name_eng = "";

  if (eng_name_full.startsWith("MISS ")) {
    title_eng = "MISS";
    name_eng = eng_name_full.slice(5).trim();
  } else if (eng_name_full.startsWith("MR.")) {
    title_eng = "MR.";
    name_eng = eng_name_full.slice(3).trim();
  } else if (eng_name_full.startsWith("MRS.")) {
    title_eng = "MRS.";
    name_eng = eng_name_full.slice(4).trim();
  } else {
    throw new Error("Unknown title in the name");
  }

  return { title_eng, name_eng };
}

export const parseStatus = status => {
  switch (status) {
    case "confirmed":
      return "ยืนยัน";
    default:
      return "รอยืนยัน";
  }
};

export function stopEventBubble(event) {
  if (typeof event.preventDefault === "function") {
    event.preventDefault();
  }
  if (typeof event.stopPropagation === "function") {
    event.stopPropagation();
  }
}

export const allowedExtensions = ["application/pdf", "image/png", "image/jpeg"];

export const allowedFileSize = 5000000;
