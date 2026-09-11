# FullStackK6-MiniPrj

Mini web app giới thiệu nhóm thực hành DevOps/Fullstack — đóng gói bằng Docker, triển khai qua Docker Compose, tự động hóa build/deploy bằng GitHub Actions (CI/CD).

> Bài thực hành teamwork: Git/GitHub, Docker, Docker Compose, CI/CD cơ bản trong 2 tiếng.

## 1. Mục tiêu

- Làm việc nhóm theo vai trò rõ ràng, đúng quy trình Git/GitHub (clone → branch → commit → push → PR → merge).
- Đóng gói ứng dụng bằng Docker và chạy bằng Docker Compose.
- Triển khai lên server đã cấp, truy cập được qua IP/domain.
- Có CI/CD cơ bản tự động build/deploy (hoặc tối thiểu trigger pipeline).
- Biết kiểm tra log, container, response, health check sau khi deploy.

## 2. Thành viên & vai trò

| Vai trò | Phụ trách | Thành viên |
|---|---|---|
| PM | Tạo repo, phân công việc, quản lý tiến độ, thống nhất quy ước branch, review PR, merge code, kiểm tra đầu ra cuối cùng, báo cáo nhóm | BuiNam2k4 |
| Frontend (FE) | `index.html`, `style.css`, JS fetch API, hiển thị tên nhóm / danh sách thành viên / trạng thái hệ thống | Anh Tú |
| Backend (BE) | Express app, API `/api/info`, `/api/members`, `/health`, chạy ở port 3000 | An Khang |
| DevOps (Docker/Deploy) | `Dockerfile`, `docker-compose.yml`, build & chạy app trên server, hỗ trợ kiểm tra `docker compose ps/logs`, `curl` | Hiếu Lê |
| CI/CD | Workflow GitHub Actions, bước build (và deploy qua SSH nếu kịp), hỗ trợ SSH key & Secrets, script deploy | Minh Quốc |

## 3. Sản phẩm cần hoàn thành

### A. Frontend
- Tên nhóm, danh sách thành viên, mô tả ngắn mục tiêu nhóm.
- Nút "Kiểm tra trạng thái hệ thống" gọi API, hiển thị: thời gian server, trạng thái app, số lượng thành viên.

### B. Backend
API tối thiểu:

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/` | Trang chủ / static frontend |
| GET | `/api/info` | Thông tin nhóm + trạng thái + thời gian server |
| GET | `/api/members` | Danh sách thành viên |
| GET | `/health` | Health check |

Ví dụ response:

```json
// GET /api/info
{ "groupName": "Team 01", "status": "running", "serverTime": "2026-06-13T10:00:00Z" }

// GET /api/members
{ "members": ["PM", "Frontend", "Backend", "Docker", "CI/CD"] }

// GET /health
{ "status": "ok" }
```

### C. Docker
- `Dockerfile` build được image, chạy được bằng container.

### D. Docker Compose
- `docker-compose.yml` chạy được service `app`.
- (Nếu kịp) thêm `nginx` làm reverse proxy.

### E. GitHub
- Repo dùng chung, mỗi người 1 branch riêng, commit rõ ràng.
- Tối thiểu 2 pull request, PM review & merge về `main`.

### F. CI/CD
- Workflow GitHub Actions chạy khi push vào `main`.
- Tối thiểu: checkout code → build image → (nếu kịp) SSH deploy lên server.
- Nếu chưa deploy tự động được thì vẫn phải build + báo trạng thái.

### G. Kiểm tra sau deploy
```bash
docker compose ps
docker compose logs
curl http://localhost:3000
curl http://localhost:3000/health
```

## 4. Công nghệ sử dụng

- **Backend:** Node.js + Express
- **Frontend:** HTML + CSS + JS thuần
- **Container:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

## 5. Cấu trúc repo

```
team-mini-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/
│   └── server.js
├── Dockerfile
├── docker-compose.yml
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
| `feature/frontend` | Anh Tú (FE) |
| `feature/api` | An Khang (BE) |
| `feature/docker` | Hiếu Lê (DevOps) |
| `feature/cicd` | Minh Quốc (CI/CD) |

## 7. Quy trình Git/GitHub

1. PM tạo repo GitHub, thêm thành viên.
2. Mỗi thành viên clone repo về máy.
   ```bash
   git clone <repo-url>
   ```
3. Tạo branch riêng theo vai trò:
   ```bash
   git checkout -b feature/frontend   # hoặc feature/api, feature/docker, feature/cicd
   ```
4. Làm phần việc của mình, commit rõ ràng:
   ```bash
   git add .
   git commit -m "add frontend homepage"
   ```
5. Push branch lên GitHub:
   ```bash
   git push origin feature/frontend
   ```
6. Tạo Pull Request vào `main`.
7. PM review, yêu cầu sửa nếu cần, rồi merge.
8. Sau khi merge vào `main`, chạy bước deploy/pipeline.

## 8. Chạy thử ở local

```bash
# Build & chạy bằng Docker Compose
docker compose up -d --build

# Kiểm tra
docker compose ps
docker compose logs
curl http://localhost:3000/health
```

## 9. Deploy lên server

```bash
git clone <repo-url>
cd team-mini-app
docker compose up -d --build
docker compose ps
docker compose logs
curl http://localhost:3000/health
```

Nếu có nginx reverse proxy: `curl http://localhost`

## 10. Mức độ CI/CD hướng tới

- **Mức 1:** Workflow chạy khi push lên `main`, build thành công.
- **Mức 2:** Workflow SSH vào server, chạy `docker compose pull && docker compose up -d --build`.
- **Mức 3:** Deploy xong, tự verify bằng `docker compose ps` + `curl /health`.

## 11. Checklist bàn giao

- [ ] Repo tạo xong, đủ thành viên, đủ branch
- [ ] Frontend hiển thị đúng tên nhóm / thành viên / trạng thái hệ thống
- [ ] Backend đủ 4 API, chạy port 3000
- [ ] Dockerfile build & chạy container thành công
- [ ] docker-compose.yml chạy được service app
- [ ] Tối thiểu 2 Pull Request, đã merge vào `main`
- [ ] Workflow GitHub Actions chạy khi push `main`
- [ ] Deploy lên server, truy cập được qua IP/domain
- [ ] Kiểm tra sau deploy: `docker compose ps`, `logs`, `curl /health`
