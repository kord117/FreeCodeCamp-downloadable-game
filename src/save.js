import {
  BaseDirectory,
  readTextFile,
  writeTextFile,
  createDir,
  exists,
} from "@tauri-apps/api/fs";

function makeSaveSystem(saveFileName) {
  return {
    date: {},
    async save() {
      await writeTextFile(saveFileName, JSON.stringify(this.data), {
        dir: BaseDirectory.AppLocalData,
      });
    },
    async load() {
      try {
        this.data = JSON.parse(
          await readTextFile(saveFileName, { dir: BaseDirectory.AppLocalData })
        );
      } catch {
        this.data = {};
      }
    },
  };
}

export const saveSystem = makeSaveSystem("save.json");
