const setData = require("../Data/setData.json");
const themeData = require("../Data/themedata/themeData.json");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map(set => {
        const themeObj = themeData.find(theme => theme.id === set.theme_id);
        return {
          ...set,
          theme: themeObj ? themeObj.name : "Unknown Theme"
        };
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    try {
      resolve(sets);
    } catch (error) {
      reject(error);
    }
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    try {
      const foundSet = sets.find(set => set.set_num === setNum);
      if (foundSet) {
        resolve(foundSet);
      } else {
        reject(`Unable to find set with set_num: ${setNum}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    try {
      const lowercaseTheme = theme.toLowerCase();
      const matchingSets = sets.filter(set =>
        set.theme.toLowerCase().includes(lowercaseTheme)
      );
      if (matchingSets.length > 0) {
        resolve(matchingSets);
      } else {
        reject(`Unable to find sets with theme: ${theme}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}
   


module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme
};
