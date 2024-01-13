async function addMenu() {
  const menuName = document.getElementById("menuName").value;
  const parentMenu = document.getElementById("parentMenu").value;

  await fetch("https://tekki-web-backend.onrender.com/addMenu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: menuName,
      parent: parentMenu,
    }),
  });

  getMenuList();
}

async function editMenu(menuName, parentMenu) {
  const updatedName = prompt("Enter the updated menu name:", menuName);
  const updatedParent = prompt("Enter the updated parent menu:", parentMenu);

  await fetch("https://tekki-web-backend.onrender.com/editMenu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      originalName: menuName,
      updatedName,
      updatedParent,
    }),
  });

  getMenuList();
}

async function deleteMenu(menuName) {
  const confirmDelete = confirm(`Are you sure you want to delete ${menuName}?`);

  if (confirmDelete) {
    const response = await fetch(
      `https://tekki-web-backend.onrender.com/deleteMenu/${menuName}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        alert(responseData.message);
        getMenuList();
      } else {
        alert(responseData.message);
      }
    } else {
      alert("Error deleting menu.");
    }
  }
}

async function getMenuList() {
  const response = await fetch(
    "https://tekki-web-backend.onrender.com/getMenus"
  );
  const menus = await response.json();
  const dynamicMenuList = document.getElementById("dynamicMenuList");
  dynamicMenuList.innerHTML = "";
  console.log(menus);

  // Organize menus into a hierarchy
  const menuHierarchy = organizeMenusIntoHierarchy(menus);

  // Render menus with hierarchy
  renderMenusWithHierarchy(menuHierarchy, dynamicMenuList);

  populateParentMenuDropdown();
}

function organizeMenusIntoHierarchy(menus) {
  const menuMap = new Map();

  // Create a map with menu names as keys
  menus.forEach((menu) => {
    menuMap.set(menu.name, { ...menu, children: [] });
  });

  // Populate the children array based on parent references
  menus.forEach((menu) => {
    const { name, parent } = menu;
    if (parent && menuMap.has(parent)) {
      menuMap.get(parent).children.push(menuMap.get(name));
    }
  });

  // Return the root-level menus (those without a parent)
  return Array.from(menuMap.values()).filter((menu) => !menu.parent);
}

function renderMenusWithHierarchy(menus, parentElement) {
  menus.forEach((menu) => {
    const listItem = document.createElement("div");
    listItem.className = "menu-item";
    listItem.textContent = `${menu.name} - Parent: ${menu.parent || "None"}`;

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.onclick = () => editMenu(menu.name, menu.parent);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteMenu(menu.name);

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    if (menu.children.length > 0) {
      const submenuList = document.createElement("div");
      submenuList.className = "submenu-list";
      listItem.appendChild(submenuList);
      renderMenusWithHierarchy(menu.children, submenuList);
    }

    parentElement.appendChild(listItem);
  });
}

getMenuList();
async function populateParentMenuDropdown() {
  const parentMenuDropdown = document.getElementById("parentMenu");
  parentMenuDropdown.innerHTML = '<option value="">--- All Menu ---</option>';

  const response = await fetch(
    "https://tekki-web-backend.onrender.com/getMenus"
  );
  const menus = await response.json();

  menus.forEach((menu) => {
    const option = document.createElement("option");
    option.value = menu.name;
    option.textContent = menu.name;
    parentMenuDropdown.appendChild(option);
  });
}
function showAllMenus() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  getMenuList();
}

function goBack() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "block";
}
