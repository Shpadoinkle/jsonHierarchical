// Obj Template
class taskObj {
  task = {
    ID: "",
    description: "",
    nextID: null,
    previousID: null,
    parentID: "",
  };
  subTasks = [];
}

const insertIntoOrderedArray = (obj, array) => {
  if (!obj.task.previousID) {
    // This is the first element -- add to front of list
    array.unshift(obj);
    // parentObjs.splice(
    //   parentObjs.findIndex((e) => e.task.ID === obj.task.ID),
    //   1
    // );
  } else if (array.findIndex((e) => e.task.ID === obj.task.previousID) > -1) {
    //insert item behind it's 'previousID'
    const index = array.findIndex((e) => e.task.ID === obj.task.previousID);
    array.splice(index + 1, 0, obj);
  } else {
    // elements 'previous' obj does not yet exist.. push to end of array
    array.push(obj);
  }
};

const fs = require("fs");
const myArgs = process.argv.slice(2);

if (myArgs.length < 2) {
  console.log("Two paths are requaired for this command");
  return;
}

const SOURCE_FILE = require(myArgs[0]);
let sourceFileInitialBuild = SOURCE_FILE.map((e) => {
  const tempObj = new taskObj();
  tempObj.task = { ...e };
  return tempObj;
});

/**
 *
 * Thoughts --> seperate base parents from all child nodes, get base foundation
 */
let parentObjs = sourceFileInitialBuild.filter((e) => !e.task.parentID);
let childObjs = sourceFileInitialBuild.filter((e) => !!e.task.parentID);

const FINAL_LIST = [];

// Build parent foundation first.. then run over child nodes.
for (var pTask of parentObjs) {
  insertIntoOrderedArray(pTask, FINAL_LIST);
}

/**
 * thoughts... work backwards?
 */
let childOfChildFound = fa;
for (const [i, v] of childObjs.entries()) {
  console.log(i, v);
}

// Run through child nodes
// while (childObjs.length) {
//   console.log("childObjs.length", childObjs.length);
//   childObjs.splice(0, 1);
//   let hasMoved = false;
// }
console.log("childObjs.length", childObjs.length);

console.log("////");
console.log("===========================");
console.log("FINAL_LIST.length", FINAL_LIST.length);
console.log("parentObjs.length", parentObjs.length);

/****
 *
 *
 * Thoughts
 *
 * clear out top parents from the initial list...
 *      ie-- push to new list.. slice from existing..
 *
 * then run a while(childlist length > 0)
 *  -- keep running through child list searching for parentId..
 *  if not found move to next.. if found, push where it needs to be then
 * delete from existing child list.
 */

/**
 *
 * Thoughts 2 --- object key method from pluss60 calendar builder?
 * array[key]
 *     --> search key?   how deep?
 */

// const THE_LIST = [];
// const TEMP_LIST = [];

// const gooby = [];

// for (let e of tempThingo) {
//   console.log(e);
//   gooby.push(e);
// }

fs.writeFile("myjsonfile.json", JSON.stringify(FINAL_LIST), function (err) {
  if (err) throw err;
  console.log("Restructure complete");
});
