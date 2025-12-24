
/**
 * URL Web App dari Google Apps Script.
 * Pastikan Anda telah melakukan "Deploy" -> "New Deployment" -> "Web App" 
 * Execute as: Me
 * Who has access: Anyone
 */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydktnDZkI9XPIpZzosxVPYL7fklApYFHeo1h-rlJzXmENpL4OAAAb0-EG-KLt79CYZ/exec";

export const syncDataToCloud = async (allData: any) => {
  try {
    // Kita kirim sebagai text/plain untuk menghindari Pre-flight CORS yang sering gagal di GAS
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(allData),
    });
    
    // Meskipun GAS sering redirect, kita cek statusnya
    return response.ok;
  } catch (error) {
    console.error("Cloud Sync Error (Save):", error);
    return false;
  }
};

export const fetchDataFromCloud = async () => {
  try {
    // Tambahkan timestamp agar tidak terkena cache browser (cache busting)
    const response = await fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`);
    if (!response.ok) throw new Error("Gagal mengambil data dari server.");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cloud Fetch Error (Load):", error);
    return null;
  }
};
