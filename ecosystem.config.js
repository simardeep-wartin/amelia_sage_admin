// PM2 process config for the Amelia Sage admin frontend (Next.js standalone build).
//
// This file lives on the EC2 box at /home/ubuntu/amelia-web/ecosystem.config.js
// (created once during setup). The CI/CD pipeline only ships the build bundle and
// reloads this process — it never overwrites runtime secrets.
//
// Runtime secrets (BACKEND_URL, ADMIN_API_KEY) are loaded from a persistent file at
// /home/ubuntu/amelia-web/shared.env via Node's built-in --env-file (Node 20.6+),
// so deploys never touch them.
module.exports = {
  apps: [
    {
      name: "amelia-admin-web",
      script: "server.js",
      cwd: "/home/ubuntu/amelia-web/app",
      node_args: "--env-file=/home/ubuntu/amelia-web/shared.env",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Bind to localhost only — Nginx fronts it on 80/443. Port 3000 stays closed.
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "400M",
      autorestart: true,
      instances: 1, // single instance — cluster mode would double memory on a 2GB box
    },
  ],
};
