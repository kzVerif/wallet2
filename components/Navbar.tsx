import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center p-4">
      <Button variant="secondary" className="mx-3 shadow border">
        <Link href="/">Balance</Link>
      </Button>
      <Button variant="secondary" className="mx-3 shadow border">
        <Link href="/checkslip">Check Slip</Link>
      </Button>
    </div>
  );
}
