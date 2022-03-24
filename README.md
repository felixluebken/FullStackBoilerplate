A Simple Full-Stack Boilerplate
============
This boilerplate uses React & Django to create a full-stack application, simplifying your development process. It handles all the pains, including authentication, token management, and social auth. (possibly the least fun part of full stack development) This beautiful boilerplate also comes with a rest framework, image compression, mysql packages, and any aws s3 integrations. (using /media is also an option, but impractical for a scalable production backend)

**Why am I making this?**

When starting full-stack development, there are a lot of hurdles, which basic tutorials do not teach you. The biggest one I've encountered in the past year is SECURE authentication using tokens. Although there are good medium articles, describing the process down to a pinch, they do not fully apply in a production environment. For that reason I made this as a starting point, so you don't have to worry about any of the technicalities, and just focus on implementing the features the client wants.

**Why use Django?**

Well there are plenty of reasons to use Django as supposed to a Node.js based backend, such as Express. For beginners, Django handles a whole plethera of low-level nasty work, which we won't have to worry about. This high level framework allows us to prevent things like SQL-Injections, and speed up development process without worrying about minor details.

**Why use React / React Native?**

This ones kinda self explanatory. React has become the industry standard in the past decade, and it most likely won't be changing anytime soon. Although vue is also a similar alternative, for this project we will be using React or React Native. (for mobile) 

**Heres how everything works in conjunction:**

![chart](https://miro.medium.com/max/1400/1*lAMsvtB6afHwTQYCNM1xvw.png)
This chart is from a neat little article by Bennett Garner on medium. Contains some very useful info to get started.
[Click here to read!](https://bennettgarner.medium.com/react-on-django-getting-started-f30de8d23504)


---

Setting up Backend
============
This section includes the setup of our Django backend module. This is meant as a baseline to build on top of.

Start off by cloning this repository and navigating to the backend:
~~~
git clone https://github.com/felixluebken/FullStackBoilerplate 
cd FullStackBoilerplate/backend
~~~

Make sure you have the latest version of Python and PIP installed and create a virtualenv:
~~~
pip install virtualenv          # install virtualenv
python -m venv venv             # set up virtual environment

# now activate your virtualenv
.\venv\Scripts\activate.bat     # windows
source venv/bin/activate        # use this for linux / mac
~~~

Now were gonna install any dependencies for our backend:
~~~
pip install -r requirements.txt
~~~

This will take a moment as quite a few large packages are included to make this backend framework run.

Lets see if the backend runs!
~~~
cd src                          # navigate to the source of your backend
python manage.py makemigrations # migrate all items to database
python manage.py migrate        # commmit migrations
python manage.py runserver      # run the server at port 8000
~~~
NOTE: 
  * you need to run makemigrations & migrate when changing a model.
  * you need to run makemigrations & migrate when importing INSTALLED_APPS.
  * ensure youre in the venv before running server

Now you can navigate to http://localhost:8000/admin/ - if you see a django login screen you did not mess anything up! Congrats. 

You do not need to rerun Django on a file change or a migration, as it dynamically updates the server as you are working on it.

You can open a secondary terminal window to create a superuser. Ensure that you have have activated your virtual env similar to the previous steps.

To be able to log into this panel run:

~~~
python manage.py createsuperuser
~~~
Once you created a superuser you can log in, and see a clean view of everything going on in the backend. Note: this is not the staff interface the client will be using. A staff user will be a regular user, with the is_staff set to true. This is mainly for security, as a superuser can delete the clients database, revoke staff status, and more. For this reason only YOU, the beautiful developer will have access to the proper Django backend.

Navigate to http://localhost:8000/auth/user/signup to see all the parameters for creating an account
Navigate to http://localhost:8000/auth/user/signin to see all the parameters for signin

In order to have access to the staff frontend, create an account using the http://localhost:8000/auth/user/signup endpoint, then log into the Django admin panel at http://localhost:8000/admin to set is_staff as true in the UserProfiles.

---

Setting up Frontend
============
This section includes the frontend React module, which your client will use. You can use a staff account created previously to log in here.

Start by navigating to the staff frontend directory:
~~~
cd frontend-staff
~~~
Ensure you have Node.js installed and your backend is running. To start your staff frontend run:
~~~
npm i
npm start
~~~
You can also use yarn like a man lol.

Now you can use the staff account (not superuser) to sign into the staff panel and start playing around!



---
Additional Info
============

When you get to building the regular user frontend in React JS, account creation will look something like this:
    NOTE: *I am using FormData instead of JSON to transfer image data for the avatar*
~~~
var bodyFormData = new FormData()

bodyFormData.append('email',EMAIL)
bodyFormData.append('password',PASSWORD)
bodyFormData.append('profile.gender',GENDER)
bodyFormData.append('profile.phone_number',PHONE)
bodyFormData.append('profile.first_name',FIRST_NAME)
bodyFormData.append('profile.last_name',LAST_NAME)
bodyFormData.append('profile.birthday',FORMATTED_BIRTHDAY)

if(AVATAR !== "null" || AVATAR !== null) bodyFormData.append('profile.avatar',AVATAR);
else bodyFormData.append('profile.avatar',"null");

axios.post("https://localhost:8000/auth/user/signup/",
    bodyFormData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    )
    .then((res) => {
        // ON SUCCESS RETRIEVE TOKEN & LOG IN 
    .catch((res) => {
        // ERROR HANDLING
    })
~~~
Now that the account is created, we want to log in the user. Now we dont want the user to type their email and password every time, or even worse, store the password locally (a huge security issue). To solve this we have to power of JSON Web Tokens! This boilerplate comes prepackaged with this. Heres how you would retrieve your tokens:
~~~
axios.post("https://localhost:8000/oauth2/token/",
        {
            // create client_id in django admin panel in django oath toolkit > applications
            "client_id":CLIENT_ID,     
            "grant_type":"password",
            "username":EMAIL,
            "password":PASSWORD
        }
    )
    .then((res) => {
        localStorage.setItem('access_token',res.data.access_token)      // store locally
        localStorage.setItem('refresh_token',res.data.refresh_token)    // store locally
    })
    .catch((res) => {
        // ERROR HANDLING
    })
~~~
After this we have our refresh and access token stored in the users browser. The user can now remained logged in seamlessly, without having to relogin at every page refresh. We will now include every subsequent request with these tokens as headers, so our backend knows that it is the user, and not someone impersonating our user. In this case were logging out the user:
~~~
axios.get("https://localhost:8000/auth/user/signout",
        {
            headers: {
                'Authorization': localStorage.getItem('access_token')
                    ? 'Bearer ' + localStorage.getItem('access_token')
                    : null,
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        }
    )
    .then((res) => {
        // DO WHATEVER
    })
    .catch((err) => {
        // ERROR HANDLING
    })
~~~
If youre using google authentication it would look something like this:
~~~
axios.post("https://localhost:8000/oauth2/convert-token/",
        {
            token:ACCESS_TOKEN,             // OBTAINED FROM GOOGLE
            backend:'google-oauth2',
            grant_type: "convert_token",
            // create client_id in django admin panel in django oath toolkit > applications
            client_id: CLIENT_ID,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    .then((res) => {
        localStorage.setItem('access_token',res.data.access_token)      // store locally
        localStorage.setItem('refresh_token',res.data.refresh_token)    // store locally
    })
    .catch((res) => {
       
    })
~~~
*you can also use POSTMAN to simulate all of these requests*

Now authentication is taken care of! You can modify the user profile to you liking, depending on what the client needs to store. I recommend not editing the user itself. I've taken liberty in including a user tracker, tracking the users ip, ua, etc.

Now direct your attention to /src/settings.py - give this a good read as all configurations, from social auth to production is described down here.








