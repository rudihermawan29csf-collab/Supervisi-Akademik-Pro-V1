
/**
 * URL Web App dari Google Apps Script.
 * PASTIKAN ANDA MENGGUNAKAN URL HASIL DEPLOY TERBARU!
 */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1IYPC8cxgitQB6Ip_FzHNPtFEvvlXpOW1vKxfXNHzXKE3XqMQekSoN6IYypJ2Zjb3/exec";

export const syncDataToCloud = async (allData: any) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Gunakan no-cors untuk menghindari pre-flight yang sering diblokir GAS
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(allData),
    });
    
    // Karena mode no-cors, kita tidak bisa membaca response.ok
    // Tapi browser akan tetap mengirimkan datanya.
    return true;
  } catch (error) {
    console.error("Cloud Sync Error (Save):", error);
    return false;
  }
};

export const fetchDataFromCloud = async () => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`, {
      method: "GET",
      cache: "no-store",
    });
    
    if (!response.ok) throw new Error("Gagal mengambil data dari server.");
    
    const data = await response.json();
    
    // Validasi apakah data yang diterima kosong atau tidak valid
    if (!data || Object.keys(data).length === 0) {
      console.warn("Data cloud kosong.");
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Cloud Fetch Error (Load):", error);
    return null;
  }
};
