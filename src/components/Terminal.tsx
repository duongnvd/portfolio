import React from "react";

export default function Terminal() {
  return (
    <div
      className="
        relative
        crt-lines

        w-full
        max-w-3xl
        overflow-hidden
        rounded-xl
        border-2
        border-green-600/70
        bg-[#0a0f0d]/90

        font-mono
        text-sm
        backdrop-blur-md

        shadow-[0_0_20px_rgba(34,197,94,0.15)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-green-400
        hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]

        animate-[terminalFloat_6s_ease-in-out_infinite]
      "
    >
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none rounded-xl border border-green-400/10 animate-pulse" />

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-green-700 bg-[#142417] px-4 py-1.5">
        <span className="text-xs font-bold text-green-400">
          [ROOT@INFRA-CORE]: ~
        </span>

        <div className="flex space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full border border-green-600 bg-green-900" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
      </div>

      {/* BODY */}
      <div className="space-y-4 p-6 text-green-400">
        <div>
          <p>
            <span className="text-green-600">
              guest@sysadmin-node:~$
            </span>{" "}
            ./fetch_profile.sh --verbose
          </p>

          <p className="text-xs text-green-700">
            &gt; Connecting to infrastructure services... [OK]
          </p>

          <p className="text-xs text-green-700">
            &gt; Loading deployment metadata... [OK]
          </p>

          <p className="text-xs text-green-700">
            &gt; Initializing monitoring modules... [OK]
          </p>
        </div>

        <div className="space-y-1 border-l-2 border-green-900 pl-4 text-green-300">
          <p>
            <span className="font-bold text-green-500">NAME:</span>{" "}
            Nguyễn Võ Đại Dương
          </p>

          <p>
            <span className="font-bold text-green-500">ROLE:</span>{" "}
            System & Infrastructure Administrator
          </p>

          <p>
            <span className="font-bold text-green-500">EXP:</span>{" "}
            1+ Year Infrastructure & System Admin
          </p>

          <p>
            <span className="font-bold text-green-500">EDU:</span>{" "}
            Bachelor of Computer Network & Data Communication, UIT - VNUHCM
          </p>

          <p>
            <span className="font-bold text-green-500">ENG:</span>{" "}
            English B2
          </p>

          <p>
            <span className="font-bold text-green-500">LOC:</span>{" "}
            Ho Chi Minh City, Vietnam
          </p>

          <p>
            <span className="font-bold text-green-500">CORE:</span>{" "}
            [
            Windows_Server,
            Ubuntu_Server,
            Active_Directory,
            Docker,
            Kubernetes,
            Monitoring,
            IIS,
            Networking
            ]
          </p>
        </div>

        <p>
          <span className="text-green-600">
            guest@sysadmin-node:~$
          </span>{" "}
          <span className="animate-pulse bg-green-500 px-1 text-black">
            {" "}
          </span>
        </p>
      </div>
    </div>
  );
}