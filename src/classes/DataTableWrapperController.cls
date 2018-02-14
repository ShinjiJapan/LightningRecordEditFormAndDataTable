public with sharing class DataTableWrapperController {

    @AuraEnabled public static List<sObject> getRecords(String SObjectName,List<String> fields, String relationField, String parentId){
        String queryString = 'Select '+ String.escapeSingleQuotes(String.join(fields,','))
        + ' from '+ String.escapeSingleQuotes(SObjectName)
        + ' WHERE ' + String.escapeSingleQuotes(relationField) + '=\''+ String.escapeSingleQuotes(parentId) + '\'';
       return database.query(queryString);
    }
    static final List<String> allowedDataTypes = new List<string>{
        'number','currency','percent','date','email','phone','url','location'
    };
    @AuraEnabled public static List<columnDefinition> getDescribe(String SObjectName,List<String> fields){
        List<columnDefinition> colDefs = new list<columnDefinition> ();
         Map<String, Schema.SObjectField> fieldmap = Schema.getGlobalDescribe().get(SObjectName).getDescribe().fields.getMap();

        for(String field : fields){
            columnDefinition colDef = new columnDefinition();
            DescribeFieldResult fieldResult = fieldmap.get(field).getDescribe();
            colDef.label = fieldResult.getLabel();
            colDef.fieldName = fieldResult.getName();
            colDef.sortable = true;
            colDef.type = String.valueof(fieldResult.getType()).toLowerCase();
            if(!allowedDataTypes.contains(colDef.type)){
                colDef.type = 'text';
            }
            colDefs.add(colDef);
        }
        return colDefs;
    }
     public class columnDefinition {
        @AuraEnabled
        public String fieldName {get;set;}
        @AuraEnabled
        public string label {get;set;}
        @AuraEnabled
        public string type {get;set;}
        @AuraEnabled
        public boolean sortable {get;set;}
    }
}