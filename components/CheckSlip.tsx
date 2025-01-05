"use client";
import { checkSlip } from "@/utils/action";
import { Button } from "./ui/button";

export default function CheckSlip() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    const formData = new FormData(event.currentTarget); // Get form data
    const res  = await checkSlip(formData); // Call the action with form data
    alert(res)
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <p className="text-lg font-semibold text-center mb-2">
            เช็ค SLIP WALLET
          </p>
          <p>เบอร์ผู้โอน</p>
          <input
            type="text"
            name="sender_mobile"
            placeholder="กรอกเบอร์ผู้โอน"
            defaultValue=""
            className="border p-2 rounded-lg mb-2 text-sm w-full cursor-not-allowed"
            disabled
          />
          <p>เบอร์คนรับ</p>
          <input
            type="text"
            name="receiver_mobile"
            defaultValue="0957148911"
            placeholder="กรอกเบอร์คนรับ"
            className="border p-2 rounded-lg mb-2 text-sm w-full cursor-not-allowed"
            required
            disabled
          />
          <p>เลขที่อ้างอิง</p>
          <input
            type="text"
            name="transaction_id"
            placeholder="กรอกเลขอ้างอิง"
            className="border p-2 rounded-lg mb-2 text-sm w-full"
            required
          />
          <p>จำนวนเงิน</p>
          <input
            type="number" // กำหนด type เป็น number
            name="amount"
            placeholder="กรอกจำนวนเงิน"
            className="border p-2 rounded-lg mb-2 text-sm w-full"
            required
          />

          <p>เวลาทำการ</p>
          <input
            type="text"
            name="transaction_date"
            placeholder="กรอกเวลาทำการ"
            className="border p-2 rounded-lg mb-2 text-sm w-full"
            required
          />
          <p className="text-center text-sm text-red-600">คำเตือน!!</p>
          <p className=" text-sm mb-2  text-slate-500">
            formatเวลาทำการ: yyyy-mm-dd HH:mm
          </p>
          <p className=" text-sm mb-2  text-slate-500">
            formatจำนวนเงินถ้าโอน 200.00 กรอก  20000
          </p>
          <p className=" text-sm mb-2 text-slate-500">
            เบอร์ผู้โอนไม่ต้องกรอกก็ได้
          </p>
          <Button
            variant="outline"
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
