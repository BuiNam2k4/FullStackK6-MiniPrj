# FullStackK6-MiniPrj

Backend API cho mini web app giới thiệu nhóm thực hành DevOps/Fullstack — xây dựng bằng Node.js + Express, tự động hóa build bằng GitHub Actions (CI/CD).

> Phạm vi repo hiện tại: chỉ Backend (API). Không bao gồm Frontend và Docker.

## 1. Mục tiêu

- Làm việc nhóm theo vai trò rõ ràng, đúng quy trình Git/GitHub (clone → branch → commit → push → PR → merge).
- Xây dựng API backend đơn giản, có health check.
- Có CI/CD cơ bản tự động build (hoặc tối thiểu trigger pipeline).
- Biết kiểm tra log, response, health check sau khi deploy.

## 2. Thành viên & vai trò

| Vai trò | Phụ trách | Thành viên |
|---|---|---|
| PM | Tạo repo, phân công việc, quản lý tiến độ, thống nhất quy ước branch, review PR, merge code, kiểm tra đầu ra cuối cùng, báo cáo nhóm | BuiNam2k4 |
| Frontend (FE) | (Ngoài phạm vi repo hiện tại) | Anh Tú |
| Backend (BE) | Express app, API `/api/info`, `/api/members`, `/health`, chạy ở port 3000 | An Khang |
| DevOps | Hỗ trợ deploy & vận hành server | Hiếu Lê |
| CI/CD | Workflow GitHub Actions, bước build (và deploy nếu kịp), hỗ trợ SSH key & Secrets, script deploy | Minh Quốc |

## 3. Backend API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/` | Kiểm tra API đang chạy |
| GET | `/api/info` | Thông tin nhóm + trạng thái + thời gian server |
| GET | `/api/members` | Danh sách thành viên |
| GET | `/health` | Health check |

Ví dụ response:

```json
// GET /api/info
{ "groupName": "Team 01", "status": "running", "serverTime": "2026-06-13T10:00:00Z", "memberCount": 5 }

// GET /api/members
{ "members": [{ "role": "PM", "name": "BuiNam2k4" }, ...] }

// GET /health
{ "status": "ok" }
```

## 4. Công nghệ sử dụng

- **Backend:** Node.js + Express
- **CI/CD:** GitHub Actions

## 5. Cấu trúc repo

```
team-mini-app/
├── src/
│   └── server.js
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
└── README.md
```

## 6. Quy ước branch

| Branch | Phụ trách |
|---|---|
| `main` | Nhánh chính, chỉ PM merge vào |
| `feature/api` | An Khang (BE) |
| `feature/cicd` | Minh Quốc (CI/CD) |

## 7. Quy trình Git/GitHub

1. PM tạo repo GitHub, thêm thành viên.
2. Mỗi thành viên clone repo về máy.
   ```bash
   git clone <repo-url>
   ```
3. Tạo branch riêng theo vai trò:
   ```bash
   git checkout -b feature/api   # hoặc feature/cicd
   ```
4. Làm phần việc của mình, commit rõ ràng:
   ```bash
   git add .
   git commit -m "add api info and health endpoint"
   ```
5. Push branch lên GitHub:
   ```bash
   git push origin feature/api
   ```
6. Tạo Pull Request vào `main`.
7. PM review, yêu cầu sửa nếu cần, rồi merge.
8. Sau khi merge vào `main`, chạy bước deploy/pipeline.

## 8. Chạy thử ở local

```bash
npm install
npm start
# hoặc: npm run dev (tự reload khi sửa code)

curl http://localhost:3000/health
```

## 9. Deploy lên server

```bash
git clone <repo-url>
cd team-mini-app
npm ci
npm start
curl http://localhost:3000/health
```

## 10. Mức độ CI/CD hướng tới

- **Mức 1:** Workflow chạy khi push lên `main`, cài dependency & build thành công.
- **Mức 2:** Workflow SSH vào server, pull code, cài dependency, restart app.
- **Mức 3:** Deploy xong, tự verify bằng `curl /health`.

## 11. Checklist bàn giao

- [ ] Repo tạo xong, đủ thành viên, đủ branch
- [ ] Backend đủ 4 API, chạy port 3000
- [ ] Tối thiểu 2 Pull Request, đã merge vào `main`
- [ ] Workflow GitHub Actions chạy khi push `main`
- [ ] Deploy lên server, truy cập được qua IP/domain
- [ ] Kiểm tra sau deploy: `curl /health`
