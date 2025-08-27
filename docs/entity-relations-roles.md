## User Roles

- for administrator users (School admins and Superadmins) we use Strapi admin users with appropriate roles
  - `SuperAdmin` has access to all content
  - `SchoolAdmin` has access to content from their school
    - to enable this, school admins need to be manually linked to `School` by SuperAdmins
    - the relation will be managed on `School` collection type's side - extending admin users is not supported
- `Student` entities are linked to default `User` collection type
  - this enables us to leverage authentication and authorization already available in Strapi
  - each `Student` needs to be linked with an item in `User` collection type
    - done automatically via document middleware
    - when `Student` is created, corresponding `User` entity will be created in the background copying required information from `Student`

```mermaid
erDiagram
 StrapiAdminUser {
   string firstName
   string lastName
   string username
   string password
   string email
   string role
 }

 StrapiAdminUserRole {
   string type "superAdmin | schoolAdmin"
 }

 SuperAdmin {
   string role "superAdmin"
 }

 SchoolAdmin {
   string role "schoolAdmin"
 }

 User {
   string name
   string username
   string email
   string password
   bool confirmed
   bool blocked
   UserRole role
   School school
 }

 UserRole {
   string type "student"
 }

 Student {
   string firstName
   string lastName
   string email
   string loginCode
   enum specificRequirements
   User user
 }

 School {
   string name
   bigint schoolcode
   SchoolAdmin[] administrators
 }

 StrapiAdminUser ||--|| StrapiAdminUserRole: "has"
 StrapiAdminUser ||--|| SuperAdmin: "can be"
 StrapiAdminUser ||--|| SchoolAdmin: "can be"
 User ||--|| UserRole: "has"
 User ||--|| Student: "has"
 SuperAdmin ||--o{ School: "creates"
 SchoolAdmin ||--o{ School: "manages"
 Student ||--o{ School: "belongs to"

```
