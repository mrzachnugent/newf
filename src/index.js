#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const successInfo = {};

async function main() {
  try {
    const results = await inquirer.prompt([
      {
        type: 'input',
        name: 'folderName',
        message: "Enter the new folder's name:",
        validate(str) {
          if (!str) {
            console.error(
              '\nYou must provide a name for the new folder.\nTry again'
            );
          }

          return !!str;
        },
      },
      {
        type: 'input',
        name: 'fileName',
        message: "Enter the file name with it's file extension:",
        validate(str) {
          if (!str) {
            console.error(
              "\nYou must provide a file name with it's file extension.\nTry again"
            );
          }
          if (str.split('.').length === 1) {
            console.log(
              '\nYou must provide a file extension. File name example: hello.js'
            );
            return false;
          }
          return !!str;
        },
      },
    ]);

    const { folderName, fileName } = results;

    const folder = removeSpaces(folderName);
    const file = removeSpaces(fileName);
    const ext = getIndexFileExtension(file);

    await fs.promises.mkdir(folder);
    successInfo.folderAdded = `./${folder}`;

    await fs.promises.writeFile(`./${folder}/${file}`, '');
    successInfo.fileAdded = `./${folder}/${file}`;

    await fs.promises.writeFile(
      `./${folder}/index.${ext}`,
      `export * from './${removeFileExtension(file)}'`
    );
    successInfo.addedAndExportsFile = `./${folder}/index.${ext}`;

    const currentIndexExists = fs.existsSync(`./index.${ext}`);

    await fs.promises.appendFile(
      `./index.${ext}`,
      `export * from './${folder}'`
    );

    if (currentIndexExists) {
      successInfo.modifiedAndExportsNewFolder = `./index.${ext}`;
    } else {
      successInfo.addedAndExportsNewFolder = `./index.${ext}`;
    }

    console.table(successInfo);
  } catch (error) {
    console.error({
      error,
      message:
        'If you think this is a bug, please report an issue at: https://github.com/mrzachnugent/nu-f/issues or make a pull request at: https://github.com/mrzachnugent/nu-f/pulls',
    });
  }
}

main();

function removeSpaces(str) {
  return str.replace(/\s/g, '');
}

function getIndexFileExtension(str) {
  const split = str.split('.');
  const ext = split[split.length - 1].toLowerCase();

  if (ext === 'jsx' || ext === 'tsx') {
    return ext.substring(0, ext.length - 1);
  }

  return ext;
}

function removeFileExtension(str) {
  const split = str.split('.');
  split.pop();
  return split.join('');
}
