import moment from "moment";

//> USED TO CREATE ACTIVITY DATA IF FIELDS ARE CHANGED_______________________________________________________________________________________
const empty = {}

const isObject = x =>
    Object(x) === x

const diff1 = (oldVal = {}, newVal = {}, rel = "oldVal") =>
    Object.entries(oldVal)
        .map
        (([k, v]) =>
            isObject(v) && isObject(newVal[k])
                ? [k, diff1(v, newVal[k], rel)]
                : newVal[k] !== v
                    ? [k, { [rel]: v }]
                    : [k, empty]
        )
        .reduce
        ((acc, [k, v]) =>
            v === empty
                ? acc
                : { ...acc, [k]: v }
            , empty
        )

const merge = (oldVal = {}, newVal = {}) =>
    Object.entries(newVal)
        .reduce
        ((acc, [k, v]) =>
            isObject(v) && isObject(oldVal[k])
                ? { ...acc, [k]: merge(oldVal[k], v) }
                : { ...acc, [k]: v }
            , oldVal
        )

export const diff = (x = {}, y = {}) =>
    merge(diff1(x, y, "oldVal"), diff1(y, x, "newVal"))



//> USED TO CREATE ACTIVITY DATA______________________________________________________________________________________________
//# SUBTYPE 1 ->  ADDED , DELETED
//# SUBTYPE 2 ->  DELETED
//# SUBTYPE 3 ->  EDITED
export const generateActivityData = (SUBTYPE, type, newData, oldData) => {
    // console.log(SUBTYPE, newData, oldData)
    let generatedData = {};
    Object.assign(generatedData, newData);
    let date;
    let month;
    let time;
    switch (SUBTYPE) {
        case 1:
            date = moment().format('DD');
            month = moment().format('MMM');
            time = moment().format('LT');
            generatedData.time = time;
            generatedData.month = month;
            generatedData.date = date;
            generatedData.type = type
            generatedData.task = "Added";
            generatedData.subType = 1;
            break;
        case 2:
            date = moment().format('DD');
            month = moment().format('MMM');
            time = moment().format('LT');
            generatedData.time = time;
            generatedData.month = month;
            generatedData.date = date;
            generatedData.type = type;
            generatedData.task = "Deleted";
            generatedData.subType = 2;
            break;
        case 3:
            date = moment().format('DD');
            month = moment().format('MMM');
            time = moment().format('LT');
            generatedData = diff(oldData, newData);
            generatedData.time = time;
            generatedData.month = month;
            generatedData.date = date;
            generatedData.type = type;
            generatedData.task = "Edit";
            generatedData.subType = 3;
            break;

        default:
            break;
    }

    return generatedData;

}




