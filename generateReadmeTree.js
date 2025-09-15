const fs = require("fs");
const path = require("path");

const IGNORE = ["node_modules", ".next", ".git", "dist"];

function generateTree(dirPath, prefix = "") {
  const files = fs.readdirSync(dirPath).filter((f) => !IGNORE.includes(f));

  return files
    .map((file, index) => {
      const filePath = path.join(dirPath, file);
      const isDir = fs.statSync(filePath).isDirectory();
      const isLast = index === files.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const treeLine = `${prefix}${connector}${file}`;

      if (isDir) {
        const subTree = generateTree(
          filePath,
          prefix + (isLast ? "    " : "│   ")
        );
        return [treeLine, ...subTree].join("\n");
      } else {
        return treeLine;
      }
    })
    .join("\n");
}

// Generate the tree from project root
const tree = generateTree(path.join(__dirname));

// Read README.md if exists
const readmePath = path.join(__dirname, "README.md");
let readmeContent = "";
if (fs.existsSync(readmePath)) {
  readmeContent = fs.readFileSync(readmePath, "utf-8");
}

// Add or replace folder tree section
const startTag = "<!-- FOLDER_TREE_START -->";
const endTag = "<!-- FOLDER_TREE_END -->";
const treeMarkdown = `\`\`\`\n${tree}\n\`\`\``;

const newSection = `${startTag}\n${treeMarkdown}\n${endTag}`;

if (readmeContent.includes(startTag) && readmeContent.includes(endTag)) {
  // Replace existing tree
  const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, "g");
  readmeContent = readmeContent.replace(regex, newSection);
} else {
  // Append at end
  readmeContent += `\n\n## Project Folder Structure\n${newSection}\n`;
}

// Write back to README.md
fs.writeFileSync(readmePath, readmeContent);
console.log("✅ Folder tree generated in README.md!");
