"use client";
import { getBalance } from "@/utils/action";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function CheckBalance() {
  // State to store balance data
  const [balanceData, setBalanceData] = useState<{
    balance: string;
    mobile_no: string;
    updated_at: string;
  } | null>(null);

  // State to handle reload button click
  const [click, setClick] = useState(false);

  // Fetch balance data on component mount or when reload is clicked
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance(); // Fetch balance from API
        setBalanceData(response.data); // Update state with the API response
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [click]); // Re-run when `click` state changes

  return (
    <div className="flex items-center justify-center">
      <div className="block max-w-sm p-4 border border-gray-200 rounded-lg shadow bg-white">
        {balanceData ? (
          <>
            <p className="text-lg font-semibold">
              ยอดคงเหลือ: {balanceData.balance}
            </p>
            <p className="text-gray-600">
              เวลาที่อัพเดท: {balanceData.updated_at}
            </p>
          </>
        ) : (
          <p>กำลังโหลดยอดเงินคงเหลือ</p>
        )}
        <Button
          variant="outline"
          onClick={() => {
            setClick(!click); // Trigger reload by toggling `click` state
          }}
          className="mt-4"
        >
          Reload
        </Button>
      </div>
    </div>
  );
}
