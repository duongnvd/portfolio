import React from 'react';

const METRICS = [
  {
    service: 'WIN_SERVER_AD',
    status: 'ONLINE',
    desc: 'Domain Controller, Group Policy, User/Computer Management'
  },

  {
    service: 'IIS_FTP_SSL',
    status: 'ONLINE',
    desc: 'Isolation Mode, Cert Management, Reverse Proxy, Web App Hosting, FTP Services, SSL/TLS'
  },

  {
    service: 'MONITOR_STACK',
    status: 'OPTIMIZED',
    desc: 'CheckMK, Grafana, Prometheus, Zabbix, Elastic Stack (ELK)'
  },

  {
    service: 'NET_ROUTING',
    status: 'ONLINE',
    desc: 'DNS, DDNS, WAN/LAN Routing, Firewall (pfSense), VPN, Port Forwarding, NAT, VLAN, Subnetting, QoS'
  },

  {
    service: 'LINUX_DOCKER',
    status: 'STABLE',
    desc: 'Containerization, Basic Bash Script, Ubuntu Server, Linux Server Management'
  },
  {
    service: 'CLOUD_SERVICES',
    status: 'STABLE',
    desc: 'AWS EC2, S3, RDS, Azure VM, Google Cloud Compute Engine'
  },  
];

export default function ServerStatus() {
  const renderProgressBar = (percentage: number) => {
    const totalBlocks = 20;
    const activeBlocks = Math.round((percentage / 100) * totalBlocks);
    return (
      <span className="font-mono tracking-widest">
        <span className="text-green-400">{'█'.repeat(activeBlocks)}</span>
        <span className="text-green-950">{'░'.repeat(totalBlocks - activeBlocks)}</span>
      </span>
    );
  };

  return (
    <div className="w-full max-w-3xl space-y-4">
      {METRICS.map((metric, index) => (
        <div key={index} className="bg-[#070b08] border border-green-800 p-4 rounded shadow-[inset_0_0_10px_rgba(0,200,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold font-mono">[{metric.service}]</span>
              <span className="text-[10px] bg-green-950 text-green-400 border border-green-700 px-1.5 py-0.2 rounded font-mono">
                {metric.status}
              </span>
            </div>
            <p className="text-xs text-green-600 font-mono">/ {metric.desc}</p>
          </div>
          
          <div className="flex items-center space-x-3 self-end md:self-auto">
           
          </div>
        </div>
      ))}
    </div>
  );
}