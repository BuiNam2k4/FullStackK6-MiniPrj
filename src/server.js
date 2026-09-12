const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const GROUP_NAME = "Team 01";
const MEMBERS = [
  { role: "PM", name: "BuiNam2k4" },
  { role: "Frontend", name: "Anh Tú" },
  { role: "Backend", name: "An Khang" },
  { role: "DevOps", name: "Hiếu Lê" },
  { role: "CI/CD", name: "Minh Quốc" },
];

app.get("/", (req, res) => {
  res.json({ message: "Team mini app API is running" });
});

app.get("/api/info", (req, res) => {
  res.json({
    groupName: GROUP_NAME,
    status: "running",
    serverTime: new Date().toISOString(),
    memberCount: MEMBERS.length,
  });
});

app.get("/api/members", (req, res) => {
  res.json({ members: MEMBERS });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
