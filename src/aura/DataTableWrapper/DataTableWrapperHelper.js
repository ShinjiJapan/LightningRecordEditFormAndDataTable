({
    callApexAsync: function async (action,params) {
        return new Promise(((resolve, reject) => {
            action.setParams(params);
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state == 'SUCCESS') {
                    resolve(response.getReturnValue())
                }
                else{
                    reject(response);
                }
            });
            $A.enqueueAction(action);
        }));
    },
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.records");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.records", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})