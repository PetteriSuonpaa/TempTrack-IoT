import React from "react";

type BoxProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;  
};

export function Box({ title, children, className = "" }: BoxProps) {
  return (
    <div
      className={`
        relative
        w-[100%] h-[28rem]
        lg:w-[100%] lg:h-[30rem]
        bg-[var(--my-box-bg)]
        rounded-xl shadow-lg mt-4
        ${className}
      `}
    >
      <h2 className="absolute top-2 left-2 text-2xl font-semibold tracking-tight text-left">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export function Box2({ title, children, className = "" }: BoxProps) {
  return (
    <div
      className={`
        relative
        w-80 h-40
        md:w-110 h-40
        lg:w-140 h-40
        bg-[var(--my-box-b2)]
        rounded-xl shadow-lg mt-4
        ${className}
      `}
    >
      <h2 className="absolute top-2 left-2 text-2xl font-semibold tracking-tight text-left">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
export function Box3({ title, children, className = "" }: BoxProps) {
  return (
    <div
      className={`
        relative
        w-[100%] h-[20rem]
        lg:w-[100%] lg:h-[20rem]
        bg-[var(--my-box-bg)]
        rounded-xl shadow-lg mt-4
        ${className}
      `}
    >
      <h2 className="absolute top-2 left-2 text-2xl font-semibold tracking-tight text-left">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}