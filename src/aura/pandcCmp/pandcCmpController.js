({
    onSaveSuccess:function(component, event, helper){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Save Succeseed!",
            "message": "updated!",
            "type" : "success"
        });
        toastEvent.fire();
    }
})