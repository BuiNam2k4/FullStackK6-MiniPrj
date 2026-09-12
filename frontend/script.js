const API_URL = "http://localhost:8080/api";

async function loadData() {
  try {
    const response = await fetch(`${API_URL}/group`);

    if (!response.ok) {
      throw new Error("API lỗi");
    }

    const data = await response.json();

    document.getElementById("group-name").textContent = data.groupName;

    const memberList = document.getElementById("member-list");

    data.members.forEach((member) => {
      const li = document.createElement("li");
      li.textContent = member;
      memberList.appendChild(li);
    });

    document.getElementById("system-status").textContent =
      "Hệ thống đang hoạt động";
  } catch (error) {
    console.error(error);

    document.getElementById("system-status").textContent =
      "Không thể kết nối Backend";
  }
}

loadData();
