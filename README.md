# Auction / Tender Responsive Website App

![auction-logo](https://github.com/mmaskati/SEI7-Project-2/assets/814205/12ffb653-23b5-48f6-9102-efe97691dd01)


![auction-app-screenshot](https://github.com/mmaskati/SEI7-Project-2/assets/814205/f3e674c6-3fda-4746-a31b-7c1d05280454)


## Developers & Collaborators Team
- Mazen Al-Maskati
- Weaam Wafeeq Ajoor 
- Noor Mahdi Abdali 
- Rajiah Hassan
  
![1](https://github.com/mmaskati/SEI7-Project-2/assets/814205/d64295ff-8a98-4bc6-83db-4407cb0b121a)

## Auction App Concept

The Auction Application is a web-based platform that facilitates the process of conducting auctions. It provides three distinct user roles: Admin, Auctioneer, and Bidder, each with specific functionalities tailored to their role.

### Admin
As an Admin, users have access to a comprehensive overview of all auctions created by users. They can add, edit, view details, and delete auctions. Additionally, they have a dedicated section to manage bids, enabling them to add, edit, view details, and delete bids made by users. The Admin view also allows them to manage user privileges, granting them the ability to adjust user roles. Furthermore, they can add new item categories to enhance the diversity of available auction items.

### Auctioneer
Auctioneers are users who can create their own auctions and submit bids to other Auctioneers' auctions. They have the capability to post and manage their own bids, as well as review logs of bids made within their auctions. By selecting their auction, Auctioneers can monitor the progress of bids and stay informed about the current highest bid. Auctioneers can also modify the end date of their auctions, enabling them to control the duration of the auction and automatically disable and remove expired auctions from the marketplace.

### Bidder
Bidder is the default user role in the Auction Application. Bidders can participate in auctions by placing bids on available items. They have access to the marketplace, where they can view and bid on auctions created by Auctioneers. The system automatically checks the end date of auctions and disables them once they expire, ensuring a fair and transparent bidding process.

The Auction Application provides a role-specific functionalities, ensuring that each user has the necessary tools to participate effectively in the auction process. Auctioneers can manage their auctions and monitor bids, while Bidders can easily find and bid on items of interest. The Admin view offers complete control over the entire auction system, enabling efficient management of auctions, bids, and user privileges.


## Entity Relationship Digram (ERD)

![ERD](https://i.imgur.com/iTNaGm2.png)


## Wireframes
![1](https://i.imgur.com/vP2K294.png)
![2](https://i.imgur.com/NeKBBfx.png)
![3](https://i.imgur.com/3h3uAJt.png)
![4](https://i.imgur.com/Lw8zzRS.png)

## Link to deployed application: 

Coming Soon! - Google Cloud: 


## Under the hood

* Express.js
* Node.js
* multer: middleware for handling multipart/form-data, which is primarily used for uploading files
* multer-cloudinary: A simple storage engine which stores the files directly on cloudinary
* dayjs: a minimalist JS library that parses, validates, manipulates, and displays dates and times
* Bootstrap 5.3 (CSS + JS + ICONS)

  # APIs Connected
  > Google Web API for for OAuth
  > Cloudinary
  > Mongoose

## Overall Requirements

### General Requirements

- Build a web application from scratch, must be your own work. ✅
- Use Express framework to build your application. ✅
- Deploy on any server so application is live on the web. ❌
- Create a `README.md` file that explains your app to the world. ✅

### Readme Requirements
- Include ERD of your project idea. ✅
- Include wireframes or link to wireframes. ✅
- Include link to your trello board. - https://trello.com/invite/b/rgn5wjMv/ATTI0a5d79459df39f0a85b3e9eeb082b75bF0D165CA/sei7-project-2  ✅
- Link to your deployed application. ❌
- List of unsolved problems:
  > Unable to retrieve list of Bids per Auction ⏳
  > Unable to End auction and/or show the Auction winner ⏳ (can be in list sorted by highest bid)
  > Delete all Bids when an Auction is finished and deleted (exist Auction Status Boolean for now)
  > Delete a Bid from Auction list if the Bid is deleted (exists Bid status as Boolean for now)
- Future enhancements: 
  > Category List in Market
  > Search capabilities
  > Multi Image Upload for Auction Items
  > Auction Groups
  > All Bidder to request Admin to become and Auctioneer & Admin to approve
  > 

### Technical Requirements

#### User resource 

 - User must have a profile. ✅
 - User must be able upload their profile image. ✅
 - User must be able to edit their profile information. ✅
 - User must be able to change password. ✅ (through Google)
 
#### Authentication

- User must be able to sign up. ✅
- User must be able to sign in. ✅
- User must be able to sign out. ✅


#### 2 extra resources of your choice (other than User)

- User must be able to create a resource. ✅ (Auction, Bid, Category)
- User must be able to edit a resource. ✅ (Auction, Bid, Category)
- User must be able to view all resources they created. ✅
- User must be able to view a single resource they created. ✅
- User must not be able to edit or delete other users' resources. ✅

#### Stretch Technical Goals (optional)

- Make application responsive. ✅
- Use a CSS library like [Bootstrap](https://getbootstrap.com/). ✅
- Add extra resources. ✅ (Used Multer, Dayjs, Cloudinary and additional Javascript intended for validation concept)
- Allow users to upload mulitple image files for one of the resource. ❌

### Team Requirements

- Every team member must have commits contributing to the project. ✅
- Pair programming is allowed and should be noted in the commit by using `@github_username` of each student pairing. ✅
- No single student should do a majority of the commits. ✅

### Necessary Deliverables

- Projects are due on Thursday, 14th of Dec, 2023 at 09.00am! 
- You have to fill the [Google Sheet](https://docs.google.com/spreadsheets/d/1hU2erJW_6y0Bkmztg9HkdXX25ekVyKAEEhzGlLtxrmM/edit#gid=1647772493) with you name, github link and deployed link.
- A **15~20 minute presentation** in which you answer the following questions:
  - What is the application about? **Auctioning & having users register to Bid and then connect with the Auctioneer to pay for the item and recieve it**
  - Is there any information you think might help us understand what you built?
  - What were the team members' contributions to the project?
  - Demo of application.
  - What features did you include?
    - Make sure to explain anything "new" (things that we didn't cover in class).
  - What was the most difficult part of the project? Time Management
  - What was your favorite part to work on?
  - What would you like to add next?


## Useful Resources

- **[Git Team Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)**
- **[Git Team Cheatsheet](https://jameschambers.co/writing/git-team-workflow-cheatsheet/)**
- **[nodeJS Example projects](https://github.com/sqreen/awesome-nodejs-projects)**
- **[MongooseJS documentation](https://mongoosejs.com/docs/index.html)**

