# nu-f

## Description:

**Prompts you with:**

- Enter the new file name:

- Enter the file name with it's file extension:

Then it:

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
npm i nu-f --save-dev

npx nu-f

npm i -g nu-f
```
