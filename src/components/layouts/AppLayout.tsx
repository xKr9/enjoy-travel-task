import React from "react";

type Props = {
  children: React.ReactNode;
  classNames?: string;
};

export default function AppLayout({ children, classNames = "" }: Props) {
  return (
    <div
      className={`w-full p-10 min-h-screen flex flex-col bg-slate-200 ${classNames}`}
    >
      {children}
    </div>
  );
}
