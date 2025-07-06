# Nama ERP REST API

Nama ERP provides a complete REST API for performing CRUD operations on all system entities.
For a fast introduction, watch this video: [Nama ERP Rest API Introduction](https://youtu.be/lUxZMIoxxUY)
## API Browser

You can explore all available APIs using the **API Browser** page:

```
http[s]://<server-ip-or-domain>/erp/browseapi/browseentitiesapi.html
```

![Rest API Browser Screenshot](images/rest-api-browser.png)

### Features of the API Browser

* Displays a list of all entities currently available to the logged-in customer.
* For each entity, two links are provided:

  1. **OpenAPI JSON**: A machine-readable specification that can be imported into tools like Postman or any REST client.
  2. **Swagger Page**: An interactive documentation page where you can:

    * Test API operations directly.
    * View available operations along with their request/response formats.
    * Use the **Try With Example** field to preview real data.

#### “Try With Example” Field

* Allows you to override the default example used in the API schema.
* You can enter the **code** of a specific record to show real data from the system in the example.
* If not set, the system uses the first available record by default.
* **Note**: You must be logged in to see actual system data in the examples.

---

## API Access

To use the API, you must have a valid **API Key**.

### How to Generate an API Key

The **system administrator** can generate it using the **API Credentials** master screen:

1. Open the API Credentials screen.
2. Create a new record with a suitable **code** and **name**.
3. Select the user whose permissions and audit trail will apply to this key.
4. Save the record.
5. After saving, the system will display the **API Key** once—**copy it immediately**.
6. Provide the key to the developer or integration team.

::: tip
The API Key inherits the same access permissions as the user selected in the credentials file.

To view the API Key again after it has been created:

* Open the corresponding record in the **API Credentials** screen.
* Check the option **"View API Key"**.
* Click **Save**.

Once saved, the API Key will be displayed again on the screen.

This action will also be recorded in the **API Key audit trail**, indicating that the key was re-exposed.

:::

