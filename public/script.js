async function loadGroupAndMembers() {
  try {
    const infoResponse = await fetch("/api/info");

    if (!infoResponse.ok) {
      throw new Error("API lỗi");
    }

    const info = await infoResponse.json();

    document.getElementById("group-name").textContent = info.groupName;

    const membersResponse = await fetch("/api/members");

    if (!membersResponse.ok) {
      throw new Error("API lỗi");
    }

    const membersData = await membersResponse.json();

    const memberList = document.getElementById("member-list");
    memberList.innerHTML = "";

    membersData.members.forEach((member) => {
      const li = document.createElement("li");
      li.textContent = `${member.role}: ${member.name}`;
      memberList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("group-name").textContent = "Không thể tải dữ liệu nhóm";
  }
}

async function checkSystemStatus() {
  const statusEl = document.getElementById("system-status");
  statusEl.textContent = "Đang kiểm tra...";

  try {
    const [infoResponse, membersResponse] = await Promise.all([
      fetch("/api/info"),
      fetch("/api/members"),
    ]);

    if (!infoResponse.ok || !membersResponse.ok) {
      throw new Error("API lỗi");
    }

    const info = await infoResponse.json();
    const membersData = await membersResponse.json();

    statusEl.innerHTML = `
      Thời gian server: ${new Date(info.serverTime).toLocaleString("vi-VN")}<br />
      Trạng thái app: ${info.status}<br />
      Số lượng thành viên: ${membersData.members.length}
    `;
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Không thể kết nối Backend";
  }
}

document
  .getElementById("check-status-btn")
  .addEventListener("click", checkSystemStatus);

loadGroupAndMembers();
