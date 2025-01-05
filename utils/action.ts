"use server";
export async function getBalance(): Promise<any> {
  const headers = {
    Authorization: "Bearer f0d857b588c0b8acff8861c89bbaeb06",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(
      "https://apis.truemoneyservices.com/account/v1/balance",
      {
        method: "GET", // Specify the HTTP method
        headers, // Include headers
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }

    // Parse and return JSON data
    const data = await response.json();

    //cast fonr xxxx => xx.xx
    if (data.data.balance.lenght == 2 || data.data.balance.lenght == 1) {
      data.data.balance = "0." + data.data.balance;
    } else {
      data.data.balance =
        data.data.balance.slice(0, -2) + "." + data.data.balance.slice(-2);
    }

    return data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error; // Re-throw the error to handle it upstream
  }
}

export async function checkSlip(formData: FormData) {
  type rawData = {
    sender_mobile: string;
    receiver_mobile: string;
    transaction_id: string;
    amount: number;
    transaction_date: string;
  };

  // Manually create the rawData object to ensure type safety
  const rawData: rawData = {
    sender_mobile: String(formData.get("sender_mobile") ?? ""),
    receiver_mobile: String(formData.get("receiver_mobile") ?? ""),
    transaction_id: String(formData.get("transaction_id") ?? ""),
    amount: formData.get("amount") ? Number(formData.get("amount")) : 0,
    transaction_date: String(formData.get("transaction_date") ?? ""),
  };

  console.log(rawData);
  

  const url = "https://apis.truemoneyservices.com/validate/v1/p2p";
  const token = "9d5a42e7c1e86b76a4e34654c55f88ae";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(rawData),
  });

  const res = await response.json();
  console.log(res);
  
  if (res.status === 'err') {
    switch (res.err) {
      case `Invalid 'transaction_id'. Please check transaction history on TrueMoney app.`:
        return "ไม่พบเลขอ้างอิงนี้";
      case `'transaction_id' exists, but invalid 'receiver_mobile_number'`:
        return "เลขอ้างอิงถูกแต่เบอร์คนรับผิด";
      case `'transaction_id' exists, but invalid 'amount'`:
        return "เลขอ้างอิงถูกแต่จำนวนเงินผิด";
      case `'transaction_id' exists, but invalid 'transaction_date'`:
        return "เลขอ้างอิงถูกแต่เวลาทำการไม่ถูกต้อง";
      case `'receiver_mobile_number' format should be in 10 digits'`:
        return "กรอกเบอร์คนรับมา > หรือ < 10ตัว";
      case `'transaction_date' format must be yyyy-mm-dd HH:mm`:
        return "เวลาทำการต้องเป็น yyyy-mm-dd HH:mm";
      case `Invalid 'transaction_date' period. Can query up to recent 180 days.`:
        return "ข้อมูลการทำรายการต้องอยู่ในช่วง 180 วัน";
      default:
        return "บางอย่างผิดพลาดรับเงินไม่สำเร็จ";
    }
  } else {
    return "รับเงินสำเร็จ";
  }
}


