# Google Forms Clone With React & Firebase

{
  "apiCount": 10,
  "dbCount": 155,
  "mismatchedRecords": [
    {
      "apiRecord": {
        "typeCode": "123",
        "details": "API details",
        "snapshotKey": "SK1",
        "enteredBy": "User1",
        ...
      },
      "dbRecord": {
        "id": 1,
        "typeCode": "123",
        "details": "DB details",
        "snapshotKey": "SK2",
        "enteredBy": "User2",
        ...
      },
      "mismatchedFields": ["details", "snapshotKey", "enteredBy"]
    }
  ],
  "unmatchedDbRecords": [...],
  "unmatchedApiRecords": [...]
}


@Service
public class RecordComparisonService {

    @Autowired
    private CustomerDataRepository repository;

    public Map<String, Object> compareRecords(String cis, List<Record> apiRecords) {
        // Fetch records from the database for the given CIS
        List<Record> dbRecords = repository.findByCis(cis);

        // Initialize result containers
        List<Map<String, Object>> mismatchedRecords = new ArrayList<>();
        List<Record> unmatchedDbRecords = new ArrayList<>(dbRecords);
        List<Record> unmatchedApiRecords = new ArrayList<>();

        // Compare API records with DB records
        for (Record apiRecord : apiRecords) {
            // Find matching DB records for this typeCode
            List<Record> matchingDbRecords = dbRecords.stream()
                    .filter(dbRecord -> dbRecord.getTypeCode().equals(apiRecord.getTypeCode()))
                    .collect(Collectors.toList());

            if (matchingDbRecords.isEmpty()) {
                // API record has no match in the DB for the given typeCode
                unmatchedApiRecords.add(apiRecord);
            } else {
                // Validate other fields for mismatches
                for (Record dbRecord : matchingDbRecords) {
                    List<String> mismatchedFields = findMismatchedFields(apiRecord, dbRecord);
                    if (!mismatchedFields.isEmpty()) {
                        mismatchedRecords.add(Map.of(
                                "apiRecord", apiRecord,
                                "dbRecord", dbRecord,
                                "mismatchedFields", mismatchedFields
                        ));
                    }
                    // Remove the matched DB record from unmatched list
                    unmatchedDbRecords.remove(dbRecord);
                }
            }
        }

        // Build the result summary
        Map<String, Object> result = new HashMap<>();
        result.put("apiCount", apiRecords.size());
        result.put("dbCount", dbRecords.size());
        result.put("mismatchedRecords", mismatchedRecords);
        result.put("unmatchedDbRecords", unmatchedDbRecords);
        result.put("unmatchedApiRecords", unmatchedApiRecords);

        return result;
    }

    private List<String> findMismatchedFields(Record apiRecord, Record dbRecord) {
        List<String> mismatchedFields = new ArrayList<>();

        // Validate details as it should always match typeCode
        if (!Objects.equals(apiRecord.getDetails(), dbRecord.getDetails())) {
            mismatchedFields.add("details");
        }

        // Compare other fields for mismatches (optional based on your need)
        if (!Objects.equals(apiRecord.getSnapshotKey(), dbRecord.getSnapshotKey())) {
            mismatchedFields.add("snapshotKey");
        }
        if (!Objects.equals(apiRecord.getEnteredBy(), dbRecord.getEnteredBy())) {
            mismatchedFields.add("enteredBy");
        }
        if (!Objects.equals(apiRecord.getLastModifiedDate(), dbRecord.getLastModifiedDate())) {
            mismatchedFields.add("lastModifiedDate");
        }
        if (!Objects.equals(apiRecord.getCreationDate(), dbRecord.getCreationDate())) {
            mismatchedFields.add("creationDate");
        }

        return mismatchedFields;
    }
}



## Technologies Used
- React
- Firebase
- TailwindCSS
## Installation
Install NodeJS in your computer
If you've cloned this repository, open in terminal and typing in your terminal with command :
```
npm install
npm install craco
```

## Running
For Running :
```
npm start
```
