"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import Terminal from "../components/Terminal";
import ServerStatus from "../components/ServerStatus";

// ========================================
// MULTI LANGUAGE DICTIONARY
// ========================================
const dict = {
  vi: {
    status: "TRẠNG_THÁI: TẤT_CẢ_HỆ_THỐNG_HOẠT_ĐỘNG_BÌNH_THƯỜNG",
    nav_home: "[01. TRANG_CHỦ]",
    nav_skills: "[02. KỸ_NĂNG]",
    nav_projects: "[03. DỰ_ÁN]",
    hello: <>XIN CHÀO!<br />TÔI LÀ</>,
    role: "Quản trị Hệ thống & Hạ tầng",
    bio: [
      "Quản trị viên hệ thống và hạ tầng CNTT với định hướng tự động hóa vận hành.",
      "Làm việc với Windows Server, Ubuntu/Linux Server, Docker, Kubernetes và Database.",
      "Triển khai, giám sát và xử lý sự cố hệ thống, mạng và hạ tầng CNTT.",
      "Có kinh nghiệm monitoring với Zabbix, Grafana, Prometheus và CheckMK."
    ],
    education_node: "[EDUCATION_NODE_VERIFIED]",
    education_title: "CỬ NHÂN MẠNG MÁY TÍNH & TRUYỀN THÔNG DỮ LIỆU",
    education_school: "Trường Đại học Công nghệ Thông tin (UIT), ĐHQG-HCM",
    education_rank: "Xếp loại tốt nghiệp: GIỎI",
    btn_cv: "> TẢI_XUỐNG_CV",
    btn_contact: "> LIÊN_HỆ",
    title_skills: "KỸ_NĂNG_HỆ_THỐNG",
    title_exp: "KINH_NGHIỆM_LÀM_VIỆC",
    title_projects: "DỰ_ÁN_HẠ_TẦNG",
    modal_title: "[KẾT_NỐI_HẠ_TẦNG_NGOẠI_VI]",
    modal_close: "[ĐÓNG_LIÊN_KẾT]",

    projects: [
      {
        title: "Hệ thống Giám sát & Phát hiện Xâm nhập SDN",
        time: "10/2025 - 12/2025",
        link: "https://github.com/KhanhLe04/NT541-idps-sdn",
        items: [
          "Phát triển hệ thống giám sát an ninh cho mạng SDN sử dụng Suricata IDS tích hợp công cụ ghi log tập trung.",
          "Xử lý dữ liệu log và cảnh báo từ Suricata, điều phối stack giám sát (Prometheus, Grafana, Loki) bằng Docker Compose.",
          "Xây dựng dashboard Grafana thời gian thực để phát hiện xâm nhập, phân tích lưu lượng và giám sát hiệu năng hệ thống."
        ],
        tech: ["Suricata", "Prometheus", "Grafana", "Loki", "Docker Compose", "Linux", "SDN/OpenFlow"]
      },
      {
        title: "Hệ thống Quản lý Nghẽn mạng SDN",
        time: "02/2025 - 05/2025",
        link: null,
        items: [
          "Xây dựng mô hình giả lập mạng SDN bằng Mininet trên môi trường Linux để giám sát hành vi lưu lượng thời gian thực.",
          "Thu thập và xử lý các số liệu mạng (metrics) phục vụ huấn luyện mô hình Machine Learning dự đoán nghẽn mạch.",
          "Đánh giá hiệu năng mô hình và tích hợp kết quả vào quy trình xử lý của SDN nhằm chủ động nhận biết nghẽn mạch."
        ],
        tech: ["Mininet", "Ryu Controller", "OpenFlow", "Python", "LSTM", "Linux"]
      },
      {
        title: "Hệ thống Giám sát Mạng Zabbix",
        time: "01/2025 - 03/2025",
        link: null,
        items: [
          "Triển khai hệ thống giám sát băng thông và thiết bị trong mạng giả lập VMware có cấu hình định tuyến inter-VLAN.",
          "Tích hợp Zabbix Server (Ubuntu 22.04) với các kịch bản script giám sát qua SSH để đo lưu lượng, CPU, RAM và kết nối hoạt động.",
          "Trực quan hóa các chỉ số hiệu năng và tối ưu hóa vận hành mạng dựa trên dữ liệu phân tích hệ thống."
        ],
        tech: ["Zabbix", "VMware", "DD-WRT", "Ubuntu Linux", "VLANs", "Shell Scripting"]
      },
      {
        title: "Thiết kế Mạng Doanh nghiệp",
        time: "10/2024 - 12/2024",
        link: "https://bit.ly/3H0hY3s",
        items: [
          "Thiết kế và triển khai kiến trúc mạng doanh nghiệp có khả năng mở rộng lớn sử dụng OSPF, HSRP, VPN, ACL, DHCP và WLAN.",
          "Tăng cường bảo mật mạng thông qua cơ chế thiết lập đường truyền mã hóa VPN tunnel và các chính sách chặn ACL.",
          "Cấu hình dự phòng độ sẵn sàng cao (High Availability) bằng giao thức HSRP để đảm bảo tính liên tục của dịch vụ hạ tầng."
        ],
        tech: ["Cisco Routers/Switches", "OSPF", "HSRP", "VPN", "ACL", "DHCP", "WLAN"]
      }
    ]
  },

  en: {
    status: "STATUS: ALL_SYSTEMS_OPERATIONAL",
    nav_home: "[01. HOME]",
    nav_skills: "[02. SKILLS]",
    nav_projects: "[03. PROJECTS]",
    hello: "HELLO, I'M",
    role: "Infrastructure & Systems Administrator",
    bio: [
      "System and infrastructure administrator with an automation-first mindset.",
      "Working with Windows Server, Ubuntu/Linux Server, Docker, Kubernetes and databases.",
      "Deploying, monitoring and troubleshooting systems, networks and IT infrastructure.",
      "Experienced with Zabbix, Grafana, Prometheus and CheckMK monitoring solutions."
    ],
    education_node: "[EDUCATION_NODE_VERIFIED]",
    education_title: "BACHELOR OF COMPUTER NETWORKS & DATA COMMUNICATION",
    education_school: "University of Information Technology (UIT), VNU-HCM",
    education_rank: "Graduation Classification: VERY GOOD DEGREE",
    btn_cv: "> DOWNLOAD_CV",
    btn_contact: "> CONTACT_ME",
    title_skills: "SYSTEM_CAPABILITIES",
    title_exp: "WORK_EXPERIENCE",
    title_projects: "INFRA_PROJECT_LOGS",
    modal_title: "[EXTERNAL_NODE_CONNECT]",
    modal_close: "[CLOSE_CONNECTION]",

    projects: [
      {
        title: "SDN Monitoring & Intrusion Detection System",
        time: "Oct 2025 - Dec 2025",
        link: "https://github.com/KhanhLe04/NT541-idps-sdn",
        items: [
          "Developed a security monitoring system for SDN using Suricata IDS integrated with centralized logging and visualization tools.",
          "Processed Suricata logs and alerts, orchestrated monitoring stack using Docker Compose (Prometheus, Grafana, Loki).",
          "Built real-time Grafana dashboards for intrusion detection, traffic analytics, and system performance monitoring."
        ],
        tech: ["Suricata", "Prometheus", "Grafana", "Loki", "Docker Compose", "Linux", "SDN/OpenFlow"]
      },
      {
        title: "SDN Congestion Management System",
        time: "Feb 2025 - May 2025",
        link: null,
        items: [
          "Built a simulated SDN network using Mininet on Linux to monitor real-time traffic behavior.",
          "Collected and processed network metrics to train Machine Learning models for congestion prediction.",
          "Evaluated model performance and integrated results into SDN workflow for proactive congestion awareness."
        ],
        tech: ["Mininet", "Ryu Controller", "OpenFlow", "Python", "LSTM", "Linux"]
      },
      {
        title: "Zabbix Network Monitoring System",
        time: "Jan 2025 - Mar 2025",
        link: null,
        items: [
          "Implemented system and bandwidth monitoring in a simulated VMware network with inter-VLAN routing.",
          "Integrated Zabbix Server (Ubuntu 22.04) with SSH-based monitoring scripts for traffic, CPU, RAM, and active connections.",
          "Visualized performance metrics and optimized network operations based on monitoring insights."
        ],
        tech: ["Zabbix", "VMware", "DD-WRT", "Ubuntu Linux", "VLANs", "Shell Scripting"]
      },
      {
        title: "Enterprise Network Design",
        time: "Oct 2024 - Dec 2024",
        link: "https://github.com/daiduoq-ng/Company-Network-Design",
        items: [
          "Designed and deployed scalable enterprise network architecture using OSPF, HSRP, VPN, ACL, DHCP, and WLAN.",
          "Enhanced network security with VPN tunneling and ACL-based access restrictions.",
          "Implemented redundancy using HSRP to ensure service continuity and high availability."
        ],
        tech: ["Cisco Routers/Switches", "OSPF", "HSRP", "VPN", "ACL", "DHCP", "WLAN"]
      }
    ]
  }
};

// ========================================
// EXPERIENCE DATA
// ========================================
const experiences = {
  vi: [
    {
      company: "CÔNG TY CỔ PHẦN ĐẦU TƯ Y TẾ VẠN THÀNH",
      role: "Quản trị Hệ thống",
      time: "12/2025 - Nay",
      desc: `
- Sao lưu và khôi phục dữ liệu SQL Server.
- Quản trị NAS Synology, phân quyền và lưu trữ dữ liệu.
- Giám sát và xử lý sự cố hệ thống mạng, hạ tầng CNTT.
- Quản lý domain, hosting và máy chủ vật lý.
- Hỗ trợ người dùng và xử lý sự cố hệ thống.
- Triển khai và vận hành dịch vụ Docker.
      `,
    },
    {
      company: "HQSoft",
      role: "Kỹ sư Hệ thống",
      time: "07/2025 - 11/2025",
      desc: `
- Quản lý và giám sát hạ tầng AWS, VNG Cloud và CMC Cloud.
- Triển khai CDN, SSL, Mail Server và Cloud Server.
- Monitoring hệ thống với Zabbix, Prometheus, Grafana và CheckMK.
- Quản trị Active Directory và hệ thống Database.
- Hỗ trợ backup, bảo mật và vận hành hạ tầng CNTT.
      `,
    },
    {
      company: "ITL Corporation",
      role: "Thực tập sinh Hỗ trợ CNTT",
      time: "05/2025 - 07/2025",
      desc: `
- Hỗ trợ xử lý sự cố phần cứng, phần mềm và mạng nội bộ.
- Quản lý tài sản CNTT và cài đặt thiết bị.
- Hỗ trợ quản trị tài khoản và phân quyền truy cập.
- Theo dõi hiệu năng hệ thống và hỗ trợ người dùng.
      `,
    },
  ],

  en: [
    {
      company: "VAN THANH MEDICAL INVESTMENT JSC",
      role: "System Administrator",
      time: "Dec 2025 - Present",
      desc: `
- SQL Server backup and restore operations.
- Synology NAS administration and access management.
- Infrastructure and network troubleshooting.
- Domain, hosting and physical server management.
- End-user technical support and incident handling.
- Deployed and maintained Docker-based services.
      `,
    },
    {
      company: "HQSoft",
      role: "System Engineer",
      time: "Jul 2025 - Nov 2025",
      desc: `
- Managed cloud infrastructure on AWS, VNG Cloud and CMC Cloud.
- Deployed CDN, SSL, Mail Server and Cloud services.
- Monitoring with Zabbix, Prometheus, Grafana and CheckMK.
- Active Directory and database administration.
- Supported backup, security and infrastructure operations.
      `,
    },
    {
      company: "ITL Corporation",
      role: "IT Support Intern",
      time: "May 2025 - Jul 2025",
      desc: `
- Troubleshot hardware, software and network issues.
- IT asset management and device deployment.
- User account and access control support.
- Assisted with system monitoring and user support.
      `,
    },
  ],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState("en");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = dict[lang];

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home-section");
      const skillsSection = document.getElementById("skills-section");
      const projectsSection = document.getElementById("projects-section");
      const scrollPosition = window.scrollY + 250;

      if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
        setActiveTab("projects");
      } else if (skillsSection && scrollPosition >= skillsSection.offsetTop) {
        setActiveTab("skills");
      } else if (homeSection) {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#05070a] text-green-500 font-mono">
      <div className="crt-bg" />

      {/* MATRIX BACKGROUND GRID */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(rgba(0,255,120,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,120,0.08)_1px,transparent_1px)]
            bg-[size:48px_48px]
          "
        />
      </div>

      {/* FIXED TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#05070a]/95 border-b border-green-900/60 p-3 md:p-6 shadow-md shadow-black/80">
        <header className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h1 className="glow-text text-xl font-black tracking-wider md:text-3xl">
                SYS.ADMIN_PORTFOLIO
              </h1>
              <p className="mt-0.5 animate-pulse text-[9px] text-green-700 md:text-xs">
                {t.status}
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-end md:w-auto">
              {/* LANGUAGE SELECTOR */}
              <div className="flex rounded border border-green-700 bg-green-950/20 p-0.5 text-[10px] md:text-xs">
                <button
                  onClick={() => setLang("vi")}
                  className={`px-3 py-1 transition-all duration-200 ${lang === "vi" ? "bg-green-500 font-bold text-black" : "text-green-700 hover:text-green-400"}`}
                >
                  VI
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 transition-all duration-200 ${lang === "en" ? "bg-green-500 font-bold text-black" : "text-green-700 hover:text-green-400"}`}
                >
                  EN
                </button>
              </div>

              {/* NAVIGATION */}
              <nav className="flex gap-1.5 md:gap-2">
                <button
                  onClick={() => scrollToSection("home-section", "home")}
                  className={`border-x border-t-2 px-2.5 py-1.5 text-[10px] md:text-sm font-bold uppercase transition-all duration-200 ${activeTab === "home" ? "border-green-500 bg-green-900/30 text-green-400" : "border-transparent text-green-900 hover:text-green-500"}`}
                >
                  {t.nav_home}
                </button>
                <button
                  onClick={() => scrollToSection("skills-section", "skills")}
                  className={`border-x border-t-2 px-2.5 py-1.5 text-[10px] md:text-sm font-bold uppercase transition-all duration-200 ${activeTab === "skills" ? "border-green-500 bg-green-900/30 text-green-400" : "border-transparent text-green-900 hover:text-green-500"}`}
                >
                  {t.nav_skills}
                </button>
                <button
                  onClick={() => scrollToSection("projects-section", "projects")}
                  className={`border-x border-t-2 px-2.5 py-1.5 text-[10px] md:text-sm font-bold uppercase transition-all duration-200 ${activeTab === "projects" ? "border-green-500 bg-green-900/30 text-green-400" : "border-transparent text-green-900 hover:text-green-500"}`}
                >
                  {t.nav_projects}
                </button>
              </nav>
            </div>
          </div>
        </header>
      </div>

      {/* VIEWPORT CONTENT */}
      <div className="relative z-10 p-4 md:p-8 pt-44 md:pt-48">
        <div className="mx-auto max-w-6xl space-y-32">
          
          {/* TAB 1: SECTION HOME & EXPERIENCE */}
          <section id="home-section" className="scroll-mt-48">
            {/* GIỮ KHUNG LƯỚI GRID GỐC CHO DESKTOP ĐỂ TRÁNH LỖI ĐÈ NỀN CHỮ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative">
              
              {/* CỘT TRÁI (md:col-span-7): CHỨA HERO INTRO VÀ KINH NGHIỆM ĐỂ XẾP HÀNG CHUẨN */}
              <div className="w-full md:col-span-7 space-y-16">
                
                {/* KHỐI HERO INTRO */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="relative isolate flex justify-center md:justify-start">
                    <div className="relative overflow-hidden rounded-full border-4 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.5)] z-30 w-40 h-40 md:w-44 md:h-44">
                      <Image
                        src="/portfolio/avatar.jpg"
                        alt="avatar"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <h2 className="text-3xl font-black leading-tight tracking-wide md:text-7xl">
                      {t.hello}
                      <br />
                      <span className="mt-2 inline-block bg-green-500 px-3 py-1 text-black">
                        duongnvd
                      </span>
                    </h2>
                    <h3 className="glow-text text-xl text-green-400 md:text-3xl">
                      {t.role}
                    </h3>
                  </div>

                  {/* TEXT GIỚI THIỆU LỀ TRÁI GỌN GÀNG */}
                  <ul className="max-w-xl font-mono text-base md:text-lg leading-relaxed text-green-600 text-left space-y-2 list-none pl-0">
                    {t.bio.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 select-none">-</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border border-green-900/60 bg-green-950/10 p-4 md:p-5 rounded max-w-xl font-mono text-[11px] md:text-xs space-y-1.5 shadow-[inset_0_0_10px_rgba(0,255,0,0.05)]">
                    <div className="text-green-400 font-bold flex items-center space-x-2">
                      <span className="tracking-widest">{t.education_node}</span>
                    </div>
                    <p className="text-green-300 font-black text-xs md:text-sm mt-1">{t.education_title}</p>
                    <p className="text-green-600 font-semibold">{t.education_school}</p>
                    <p className="text-yellow-500 font-bold animate-pulse tracking-wide mt-1">&gt; {t.education_rank}</p>
                  </div>

                  {/* BUTTONS */}
                 <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                    <a
                      href="/portfolio/DuongNVD_CV.pdf"
                      download="DuongNVD_CV.pdf"
                      className="
                        bg-green-600 px-5 py-3 text-sm md:text-base font-bold text-black transition-all duration-200 block text-center
                        hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] select-none
                      "
                    >
                      {t.btn_cv}
                    </a>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="border-2 border-green-600 px-5 py-3 text-sm md:text-base font-bold transition-all duration-200 hover:bg-green-900/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    >
                      {t.btn_contact}
                    </button>
                  </div>
                </div>

                {/* 1. KHỐI TERMINAL TRÊN MOBILE: Chỉ xuất hiện ở đây khi thu nhỏ di động dưới md (768px) */}
                <div className="block md:hidden w-full mt-8">
                  <Terminal />
                </div>

                {/* KHỐI KINH NGHIỆM (Luôn nằm ở dưới Hero và Terminal trên Mobile) */}
                <div className="pt-8">
                  <h3 className="mb-10 text-2xl md:text-3xl font-bold text-green-400 text-center md:text-left">
                    {t.title_exp}
                  </h3>
                  <div className="relative border-l-2 border-green-900 pl-6 md:pl-8 space-y-12">
                    {experiences[lang].map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] md:-left-[41px] top-2 h-4 w-4 rounded-full border-2 border-green-400 bg-[#05070a]" />
                        <div className="border border-green-900 bg-green-950/10 p-5 transition-all duration-300 hover:border-green-400 hover:bg-green-950/20">
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-green-400">{exp.company}</h4>
                              <p className="text-green-600 text-sm">{exp.role}</p>
                            </div>
                            <span className="text-[10px] md:text-xs text-green-700">{exp.time}</span>
                          </div>
                          <p className="mt-4 whitespace-pre-line text-xs md:text-sm leading-relaxed text-green-700">{exp.desc}</p>
                          <div className="mt-5 flex flex-wrap items-center gap-2 text-[9px] md:text-[10px] text-green-500 uppercase">
                            {["INFRA", "→", "MONITORING", "→", "SERVER", "→", "NETWORK", "→", "SECURITY"].map((tag, idx) => (
                              <span key={idx} className={tag !== "→" ? "border border-green-800 px-1.5 py-0.5 md:px-2 md:py-1" : ""}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 2. KHỐI TERMINAL TRÊN DESKTOP: Chỉ xuất hiện và chạy bám dính sticky ở cột bên phải khi màn hình >= md (768px) */}
              <div className="hidden md:block md:col-span-5 h-full relative">
                <div className="sticky top-44 w-full flex justify-center animate-in fade-in duration-1000 delay-300">
                  <Terminal />
                </div>
              </div>

            </div>
          </section>

          {/* TAB 2: SECTION SKILLS */}
          <section id="skills-section" className="scroll-mt-36 pt-16 relative z-20 bg-[#05070a]">
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold underline decoration-green-900">
                  {t.title_skills}
                </h2>
              </div>
              <ServerStatus />
            </div>
          </section>

          {/* TAB 3: SECTION PROJECTS */}
          <section id="projects-section" className="scroll-mt-36 pt-16 relative z-20 bg-[#05070a]">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold underline decoration-green-900">
                  {t.title_projects}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.projects.map((project, i) => (
                  <div 
                    key={i} 
                    className="border border-green-900 bg-green-950/5 p-6 rounded transition-all duration-300 hover:border-green-400 hover:bg-green-950/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start border-b border-green-900/60 pb-3 mb-4">
                        <div className="max-w-[80%]">
                          <h4 className="text-lg md:text-xl font-bold text-green-400 tracking-wide">
                            {project.title}
                          </h4>
                          <span className="text-[10px] md:text-xs text-green-700 font-mono block mt-1">
                            [{project.time}]
                          </span>
                        </div>
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] border border-green-500 text-black bg-green-500 font-bold px-2 py-0.5 rounded hover:bg-transparent hover:text-green-400 transition-colors duration-200"
                          >
                            LINK
                          </a>
                        )}
                      </div>

                      <ul className="space-y-3 font-mono text-[11px] md:text-sm text-green-700">
                        {project.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 font-black select-none">&gt;</span>
                            <span className="text-justify">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-dashed border-green-900/40 flex flex-wrap gap-2">
                      {project.tech.map((techItem, idx) => (
                        <span key={idx} className="text-[9px] md:text-[10px] border border-green-800/80 bg-green-950/20 text-green-400 px-2 py-0.5 rounded">
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <footer className="mx-auto mt-32 flex max-w-6xl flex-col justify-between border-t border-green-900 pt-8 pb-10 font-mono text-[10px] uppercase text-green-900 md:flex-row text-center md:text-left gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <span>UPTIME: 99.99%</span>
            <span>STATUS: STABLE</span>
            <span>MODE: PRODUCTION</span>
          </div>
          <div>
            © 2026 INFRA_NODE_CORE // BY DUONGNVD
          </div>
        </footer>
      </div>

      {/* =========================================================
          SYSTEM CONTACT MODAL
          ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0a0f0d] border-2 border-green-500 rounded p-6 font-mono text-sm relative shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            
            {/* Modal Header */}
            <div className="border-b border-green-700 pb-3 mb-6 flex justify-between items-center">
              <span className="text-green-400 font-bold tracking-wider">{t.modal_title}</span>
              <div className="flex space-x-1">
                <div className="w-2.5 h-2.5 rounded-full bg-green-900" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-green-400">
              <div className="flex items-center gap-4 border border-green-900/40 p-2.5 bg-green-950/10">
                <span className="text-xs font-bold text-black bg-green-500 px-1.5 py-0.5 select-none rounded-sm">
                  TEL
                </span>
                <div>
                  <span className="text-[10px] text-green-700 block uppercase font-bold tracking-wider">Phone Link Connection</span>
                  <a href="tel:0985373677" className="text-green-300 font-bold hover:underline tracking-wider">(+84) 985 373 677</a>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-green-900/40 p-2.5 bg-green-950/10">
                <span className="text-xs font-bold text-black bg-green-500 px-1.5 py-0.5 select-none rounded-sm">
                  MSG
                </span>
                <div>
                  <span className="text-[10px] text-green-700 block uppercase font-bold tracking-wider">Email Secure Node</span>
                  <a href="mailto:daiduongnguyen102@gmail.com" className="text-green-300 font-bold hover:underline">daiduongnguyen102@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-green-900/40 p-2.5 bg-green-950/10">
                <span className="text-xs font-bold text-black bg-green-500 px-1.5 py-0.5 select-none rounded-sm">
                  LNK
                </span>
                <div>
                  <span className="text-[10px] text-green-700 block uppercase font-bold tracking-wider">LinkedIn Directory</span>
                  <a href="https://linkedin.com/in/duongnvd24/" target="_blank" rel="noopener noreferrer" className="text-green-300 font-bold hover:underline tracking-tight break-all">linkedin.com/in/duongnvd24/</a>
                </div>
              </div>

              <div className="flex items-center gap-4 border border-green-900/40 p-2.5 bg-green-950/10">
                <span className="text-xs font-bold text-black bg-green-500 px-1.5 py-0.5 select-none rounded-sm">
                  SYS
                </span>
                <div>
                  <span className="text-[10px] text-green-700 block uppercase font-bold tracking-wider">Facebook Social Profile</span>
                  <a href="https://facebook.com/duongnv24/" target="_blank" rel="noopener noreferrer" className="text-green-300 font-bold hover:underline tracking-tight break-all">facebook.com/duongnv24/</a>
                </div>
              </div>
            </div>

            {/* Modal Close Action Button */}
            <div className="mt-8 pt-4 border-t border-green-900/40 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-green-600 text-black px-4 py-1.5 text-xs font-bold transition-all duration-150 hover:bg-green-400 hover:shadow-[0_0_10px_rgba(0,255,0,0.4)]"
              >
                {t.modal_close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}