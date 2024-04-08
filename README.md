## emergency_waitlist

This application was built with NextJS.

## Setup instructions
1. Create a PostgreSQL database and take note of the database name.
2. Navigate into the emergency_waitlist folder to access the nextJS application.
3. At the root folder of the application, create a new `.env` file, and inside, initialize a `DATABASE_URL` variable using the following pattern:
    * DATABASE_URL = "postgresql://postgres:{DB_PASSWORD}@localhost:{DB_PORTNUMBER}/{DB_NAME}"
    * Replace `DB_PASSWORD`, `DB_PORTNUMBER`, `DB_NAME` by their real values.
4. Run `npx prisma migrate dev --name init` (this generates the ORM client that is used to interact with the database)
    The database tables will be initialized based on the Prisma models already defined in the Prisma folder.
5. Run `npm install`
6. Run `npm run dev`
7. The application should be available at `localhost:3000`



 ## Rules

 The main page is for the patients but you can access the admin page by just navigating to `localhost:3000/admin`. No authorization for the admin was implemented since this was outside this application's scope.

- You can add a patient by typing in the name and severity of their injuries which ranges from 1 to 3 (1:low, 2:medium, 3:high)
- The patient will be added to the wait list and a code will be generated that can be used, along with the name, to view the waiting time from the patient page.
- The patient will be added to the wait list according to the severity of the injuries. The only exception is if a patient has been on the waiting list for 10 min or more, a new patient cannot go ahead of the existing one regardless of the severity. This ensures that no one gets stuck on the waiting list forever.
     * Example 1: Patient 1 has a severity of 2 and has been on the waitlist for 8 minutes, the admin adds patient 2 with a severity of 3. Patient 2 will go ahead of Patient 1 on the waitlist.
     * Example 2: Patient 1 has a severity of 1 and has been on the waitlist for 10 minutes, the admin adds patient 2 with a severity of 3. Patient 1 stays ahead of Patient 2 on the wailist.
- You can only clear/mark as treated only the patient at the top list.
- Position and waiting times get updated as patients get marked as treated

## Screen captures

## Admin
Admin dashboard
![admin dashboard](https://github.com/Audry300/emergency_waitlist/assets/71721639/558a5dc0-c5e6-4b83-945a-539ff08ad8b7)

Confirmation before marking a patient as treated
![admin dashboard confirmation pop up](https://github.com/Audry300/emergency_waitlist/assets/71721639/75613647-1ba2-49e0-9bd8-80df0596797d)

Adding a new patient to the waitlist
![admin dashboard add new patient](https://github.com/Audry300/emergency_waitlist/assets/71721639/7efc2b3d-efab-4103-89a3-6b334e3875b6)

Confirmation from the API that the patient has been added to the waitlist
![admin dashboard add new patient API response](https://github.com/Audry300/emergency_waitlist/assets/71721639/ba63f8d2-f357-42ce-893e-ea5e2be22790)


## Patients
Login page <br>
![login page](https://github.com/Audry300/emergency_waitlist/assets/71721639/4ea054d4-cb13-4b34-8200-d0716279322f)

Login error <br>
![login error](https://github.com/Audry300/emergency_waitlist/assets/71721639/493c5110-74d7-4140-8a2e-9e7e0628e324)

Patient view <br>
![patient info](https://github.com/Audry300/emergency_waitlist/assets/71721639/dac2ed98-d58f-46d1-9f8c-e8961fd246bd)




 
