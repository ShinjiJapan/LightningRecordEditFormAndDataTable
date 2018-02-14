({
    getSfData: function async(component, event, helper) {
        var params = {
            SObjectName: component.get("v.sObject"),
            fields: component.get("v.fields"),
            relationField: "accountid",
            parentId: component.get("v.parentId")
        }

        var taskRecords = helper.callApexAsync(component.get("c.getRecords"),params);
        var taskDescribe = helper.callApexAsync(component.get("c.getDescribe"),params);

        Promise.all([taskRecords, taskDescribe]).then(result => {
            component.set("v.records", result[0]);
            
            var actions = [
                { label: 'edit', name: 'edit' },
                { label: 'delete', name: 'delete' }
            ];
            result[1].push({ type: 'action', typeAttributes: { rowActions: actions } })
            component.set("v.columns", result[1]);
        })
    },
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
    handleRowAction: function (component, event, helper, callback) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'edit':
                var editRecordEvent = $A.get("e.force:editRecord");
                editRecordEvent.setParams({
                    "recordId": row.Id
                });
                editRecordEvent.fire();
                break;
            case 'delete':
                break;
        }
    }
})