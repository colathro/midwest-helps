## API DOCS

Unique Identifiers are GUIDs and will be generated server side on POST. Cosmos PartitionKey is set server side.

## Get Single Record

Get record by ID:
https://localhost:5000/api/listing/db8298af-6f7a-4ab4-9255-48112243a702

Output
```json
{
    "id": "db8298af-6f7a-4ab4-9255-48112243a702",
    "partitionKey": "ND",
    "businessName": null,
    "businessType": 0,
    "phoneNumber": null,
    "livestreamURL": null,
    "orderURL": null,
    "messageToCustomer": null,
    "curbSide": false,
    "takeOut": false,
    "driveThru": false,
    "delivery": false,
    "liveStream": false,
    "appointmentOnly": false
}
```
--------------------

## Get Page of Records
Get Page of Records:
https://localhost:5000/api/listing/page/1

Output:
```json
[
    {
        "id": "db8298af-6f7a-4ab4-9255-48112243a702",
        "partitionKey": "ND",
        "businessName": null,
        "businessType": 0,
        "phoneNumber": null,
        "livestreamURL": null,
        "orderURL": null,
        "messageToCustomer": null,
        "curbSide": false,
        "takeOut": false,
        "driveThru": false,
        "delivery": false,
        "liveStream": false,
        "appointmentOnly": false
    },
    {
        "id": "db8298af-6f7a-4ab4-9255-48112243a702",
        "partitionKey": "ND",
        "businessName": null,
        "businessType": 0,
        "phoneNumber": null,
        "livestreamURL": null,
        "orderURL": null,
        "messageToCustomer": null,
        "curbSide": false,
        "takeOut": false,
        "driveThru": false,
        "delivery": false,
        "liveStream": false,
        "appointmentOnly": false
    }
]
```
--------------------

## Post New Listing
Post New Business Listing
https://localhost:5000/api/listing/

Content-Type:application/json
```json
{
    "BusinessName": "TacoBell",
    "BusinessType": 1,
    "PhoneNumber": "7014910059",
    "LiveStreamUrl": "Twitch.tv/colathro",
    "OrderUrl": "Grubhub.com",
    "MessageToCustomer": "WE ARE OPEN PLEAS ECOME EAT.",
    "CurbSide": true,
    "TakeOut": true,
    "DriveThru": true,
    "Deliverry": true,
    "LiveStream": true,
    "AppointmentOnly": true,
    "UberEats": true,
    "Grubhub": true,
    "DoorDash": true,
    "Postmates": true,
    "FoodDudes": true,
    "BiteSquad": true
}
```
Output: 
200 OK
