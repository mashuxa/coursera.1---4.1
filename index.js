function query() {


    var resultArr = arguments[0].slice();
    var queryParams = {
        select: [],
        filter: {}
    };


    if (arguments.length > 0) {
        for (var i = 1; i < arguments.length; i++) {
            var propObj = arguments[i];

            if (propObj.propType === "filter") {
                if (queryParams.filter.hasOwnProperty(propObj.fieldName)) {
                    queryParams.filter[propObj.fieldName].forEach(function (el, i) {
                        if (propObj.fieldValues.indexOf(el) === -1) {
                            queryParams.filter[propObj.fieldName].splice(i, 1);
                        }
                    });
                } else {
                    queryParams.filter[propObj.fieldName] = propObj.fieldValues;
                }


            } else if (propObj.propType === "select") {
                if (queryParams.select.length === 0) {
                    queryParams.select = queryParams.select.concat(propObj.fieldNames);
                } else {
                    queryParams.select.forEach(function (el, i) {
                        if (propObj.fieldNames.indexOf(el) === -1) {
                            queryParams.select.splice(i, 1);
                        }
                    });
                }

            }
        }
    }
    console.log(resultArr);

    resultArr.forEach(function (obj, i) {

        for (var prop in queryParams.filter) {
            if (queryParams.filter[prop].indexOf(obj[prop]) === -1) {
                resultArr.splice(i, 1);
            }
        }
    });
    resultArr.forEach(function (obj, i) {


        for (var key in obj) {
            if (queryParams.select.indexOf(key) === -1) {
                delete obj[key];
            }
        }


    });


    return resultArr;
}

function filterIn(property, values) {
    return {
        propType: "filter",
        fieldName: property,
        fieldValues: values
    }
}

function select() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
    }
    return {
        propType: "select",
        fieldNames: args
    }
}



module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
