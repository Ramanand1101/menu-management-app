```markdown
# Menu Management API

This is a simple Node.js API for managing hierarchical menus. It provides endpoints for adding, editing, and deleting menus, as well as retrieving organized and flattened menu structures.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Add Menu](#add-menu)
  - [Get Menus](#get-menus)
  - [Edit Menu](#edit-menu)
  - [Delete Menu](#delete-menu)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    node your-filename.js
    ```

   Replace `your-filename.js` with the name of the file where you have the provided code.

## Usage

1. **Add Menu:**

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"name":"NewMenu","parent":"ParentMenu"}' http://localhost:3000/addMenu
   ```

2. **Get Menus:**

   ```bash
   curl http://localhost:3000/getMenus
   ```

3. **Edit Menu:**

   ```bash
   curl -X PUT -H "Content-Type: application/json" -d '{"originalName":"OldMenu","updatedName":"UpdatedMenu","updatedParent":"UpdatedParentMenu"}' http://localhost:3000/editMenu
   ```

4. **Delete Menu:**

   ```bash
   curl -X DELETE http://localhost:3000/deleteMenu/MenuToDelete
   ```

Make sure to replace `http://localhost:3000` with the appropriate server URL and port.

## Endpoints

### Add Menu

- **URL**: `/addMenu`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "MenuName",
    "parent": "ParentMenuName"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Menu added successfully"
  }
  ```

### Get Menus

- **URL**: `/getMenus`
- **Method**: `GET`
- **Response**: Flattened array of menus sorted alphabetically.

### Edit Menu

- **URL**: `/editMenu`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "originalName": "MenuName",
    "updatedName": "UpdatedMenuName",
    "updatedParent": "UpdatedParentMenuName"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Menu updated successfully"
  }
  ```

### Delete Menu

- **URL**: `/deleteMenu/:name`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Menu and its children deleted successfully"
  }
  ```

## License

This project is licensed under the [MIT License](LICENSE).
```

Make sure to replace placeholder URLs, usernames, repository names, and filenames with your actual information. Additionally, update the License section with the appropriate license for your project.
