# NewF - newFolder and newFile creator with exports statements

## Description:

Helps implement an export/import pattern.

Creates a folder. Inside that folder, it creates a file and an index file. It exports the new file from the sibling index. It will also export the new folder from the current index.

## How it works

**Prompts you with:**

- Enter the new file name:

- Enter the file name with it's file extension:

**Then it:**

- Creates a new folder with your new file and an index file

- Adds `export * from './<fileName>'` to the new index and `export * from './<folderName>` to the current directories index (if it is not found, it will be created).

From:

```
│
└── index
```

To:

```
├── <folderName>
│   ├── <fileName>
│   └── index
└── index
```

## Usage

Install as a dev dependency, use with npx, or install globally:

```
npm i newf --save-dev

npx newf

npm i -g newf
```
