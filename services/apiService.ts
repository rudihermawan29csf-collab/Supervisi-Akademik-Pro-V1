
/**
 * GANTI URL DI BAWAH INI dengan URL Web App yang Anda dapatkan dari Google Apps Script.
 */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAEuReOW1hRU1d_vrVDpQ8HSW1mIPzRXfG9iDj_4BbhKPFi46tk6y8Wtx5vtrNB_7O/exec";

export const syncDataToCloud = async (allData: any) => {
  try {
    // Mode no-cors digunakan untuk menghindari blokir CORS browser saat POST ke Google Script
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allData),
    });
    return true;
  } catch (error) {
    console.error("Cloud Sync Error (Save):", error);
    return false;
  }
};

export const fetchDataFromCloud = async () => {
  try {
    const response = await fetch(APPS_SCRIPT_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cloud Fetch Error (Load):", error);
    return null;
  }
};
