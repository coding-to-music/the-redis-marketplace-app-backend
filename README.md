# the-redis-marketplace-app-backend

# 🚀 Contains backend for the Redis Marketplace app 🚀

https://the-redis-marketplace-app-backend.vercel.app/

https://the-redis-marketplace-app-frontend.vercel.app/

https://github.com/coding-to-music/the-redis-marketplace-app-backend

From / By https://github.com/redis-developer/the-redis-marketplace-app-backend

## Environment variables:

```java
REDIS_CONNECTION_STRING=//default:password@redis-cloud-connection-string:port
```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/the-redis-marketplace-app-backend.git
git push -u origin main
```

# Deploying Docusaurus to Cloudflare Pages

Docusaurus is a commonly used static site generator. It is built on top of react and can be used to make any kind of site (personal website, product, blog, marketing landing pages, etc).

Cloudflare Pages is a JAMstack platform for frontend developers to collaborate and deploy websites.

Head to your cloudflare pages dashboard, Signup for pages if you haven't yet.

Create an app and select your github repository.

Choose Create React App as your framework preset.

Create an environment variable NODE_VERSION with the value 16.13.2

Docusaurus requires a node version more than or equal to node v14, 16.13.2 is a LTS(Long time support) Version of Node.js

Then Click Deploy, Within 5mins your app would be ready :)

https://docusaurus-cf-pages.pages.dev/

Add a Custom Domain To Your App https://developers.cloudflare.com/pages/get-started#adding-a-custom-domain

Redirecting www to apex domain https://developers.cloudflare.com/pages/how-to/www-redirect

- staging: https://marketplace-backend-staging-a.herokuapp.com/
- production: https://marketplace-backend-production.herokuapp.com/

## Create a database

https://docs.redis.com/latest/rc/rc-quickstart/

Now that you have a subscription, you need to create a database.

If you aren’t already at the Subscription details screen, sign into the Redis Cloud admin console and select your subscription from the subscription list.

Select the New Database button.

Use the New database to create a database.
In the General section, enter a descriptive Database Name.

- You have 40 characters
- You can use letters, numbers, or a hyphen
- The name must start with a letter and end with either a letter or a number
- Spaces are not allowed

Create new database.

For this exercise, leave the remaining options at their default values. (To learn about them, see Create a fixed subscription.)

Select the Activate database button near the upper, right corner of the page.

You’re taken to the Configuration tab for your new database.

Configuration tab showing details of your new database.
In the upper corner, an icon shows the current status of the database. If the icon shows an orange clock, this means your database is still being created and its status is pending.

Pending status icon Active status icon

Once the database has been created, it becomes active and the status indicator switches to a green circle containing a checkmark.

Admin console operations are asynchronous; they operate in the background. You can continue to use the admin console for other tasks, but pending resources aren’t available until they’re active.

When your new database becomes active, you’re ready to connect to it.

## Connect to a database

At this point, you’re viewing the Configuration details for your new database.

To connect to your database, you need the following info:

- The hostname for your database
- The port number
- The database password

These are displayed in the Configuration tab.

In the General section, the Public endpoint setting shows the hostname for your database and the port number.

The Security section contains your Default user password. By default, this is masked. Select the eye icon to show or hide the password.

The Security section of the Configuration tab of the database details page.
Once you have the connection details, you can connect in a variety of ways, including:

### Using the redis-cli utility

Using a connection client for your preferred programming language

Here’s an example of each.

## Use redis-cli (via Docker)

The redis-cli utility is installed when you install Redis. It provides a command-line interface that lets you work with your database using core Redis commands.

Docker provides a convenient way to run redis-cli without the full installation experience.

Run the following commands to create a redis Docker container and connect to your database with redis-cli:

Download the redis Docker image:

```
$ docker pull redis
```

Start a container created from the image:

```
$ docker run -d --name redis1 redis
```

Connect to a bash prompt running in the container:

```
$ docker exec -it redis1 bash
```

Connect to your database with redis-cli:

```
# redis-cli -h <host> -p <port> -a <password>
```

Replace <host>, <port>, and <password> with the details copied earlier from the View Database screen.

After you connect to your database, try these basic Redis commands:

```
xxx:yyy> ping
PONG
xxx:yyy> set hello world
OK
xxx:yyy> get hello
"world"
```

## Use code (Python)

Different programming languages use different clients to interact with Redis databases.

Here’s how to connect to your database using the redis-py library for Python.

If you don’t already have the client installed:

```
sudo pip install redis
```

The specific syntax varies according to the client:

```
import redis
r = redis.Redis(host='<endpoint>', port='<port>',
                password='<password>')
r.set('hello', 'world')
print(r.get('hello'))
```

Now, run the code:

```
$ python example_redis.py
```

```
world
```

## Development

1. `npm ci`
2. `cp .env.example .env` values explained at [Project Secrets](#project-secrets)git
3. Connect to a redis instance by setting `REDIS_CONNECTION_STRING` to a valid connection string. (Optionally `docker-compose up -d --build` can be used to create a lcoal instance. In order to have a local redis image running. The `--build` flag triggers scripts in the docker file to insert seed data and configure indexing for the redis module.)

```
docker-compose up -d --build

# docker-compose up --build
```

4. `npm run dev`

To Deploy to Heroku after adding changes

- `git add -A`
- `git commit -m 'message'`

Pushing to master will deploy the app to staging:

- `git push origin master`

To deploy to production on Heroku promote the staging app: https://devcenter.heroku.com/articles/pipelines#promoting

Go to the pipeline dashboard: https://dashboard.heroku.com/pipelines/2e2b10cb-20ff-4c34-ad0a-9f58f3dfd600.

If there are changes to be deployed to production a `Promote to production` button will be visible on the staging app. Pushing it will copy the build to production.

![image](https://user-images.githubusercontent.com/6561205/117830410-e3565080-b273-11eb-84ad-b82134b0972a.png)

If test are breaking the db can be reset by running `docker-compose down` followed by `docker-compose up -d`.

## Rollback

If an needs to be reverted to a previose commit a specific build can be selected from the `Activity` tab and pressing `Roll back to here` will revert it.

https://dashboard.heroku.com/apps/marketplace-backend-production/activity

![image](https://user-images.githubusercontent.com/6561205/117831848-44caef00-b275-11eb-9e74-4385562fcde9.png)

## CI

### Setup

### GitHub Actions

The cronjob is a GitHub action workflow which is defined in the `.github` folder. It reqires the same env variables as the `production` app. These are configured in this repository at `Settings > Secretes`.

![image](https://user-images.githubusercontent.com/6561205/117833839-f7e81800-b276-11eb-9b14-f88add200c3c.png)

Actions need to be enabled in the repo at `Setting > Actions`

![image](https://user-images.githubusercontent.com/6561205/117833918-06363400-b277-11eb-973c-4024e0fc1dea.png)

The workflow can be manged at the `Actions` tab.

![image](https://user-images.githubusercontent.com/6561205/117833965-12ba8c80-b277-11eb-82c7-abb83adf2697.png)

### Configuring Heroku variables

Thes variables need to be configured in each heroku app respectively (staging and production) at `[App Name] > Setting > Config Vars > Reveal Config Vars`.

https://dashboard.heroku.com/apps/marketplace-backend-production/settings

![image](https://user-images.githubusercontent.com/6561205/117833455-a63f8d80-b276-11eb-96e7-df88cb64f1cd.png)

#### Project secrets

These secrets need to be set on the project level for the job to run.

- DOCUSAURUS_REPOSITORY: A repository with a docusaurus project
- PERSONAL_ACCESS_TOKEN_GITHUB: A GitHub token to read and write to repositories.
- PORT: A port to run the app. (`3000`)
- REDIS_CONNECTION_STRING: A redis connection to a db where the projects are to be imported.
- GITHUB_GRAPHQL_URL: https://api.github.com/graphql
- CRAWLER_LOGIN_NAME: Login name of the organisation to crawl.

### Trigger crawler on GitHub

The workflow can be manually triggered from the `Action` tab on the GitHub repository.

https://github.com/redis-developer/the-redis-marketplace-app-backend/actions/workflows/main.yml

![image](https://user-images.githubusercontent.com/6561205/117832289-a55a2c00-b275-11eb-8b61-32923fc161ac.png)

### Trigger crawler with `POST` request

```sh
curl https://api.github.com/repos/RisingStack/redislab-marketplace-backend/dispatches \
  -X POST \
  -u [username]:[personal_access_token] \
  -H 'Accept: application/vnd.github.v3+json' \
  -d '{"event_type":"trigger-crawler"}'
```

Variables:

- `username`: The user the personal access token belogns to
- `personal_access_token`: A GitHub token

## OpenAPI documentation

---

The API is documented by following the OpenAPI Specification (OAS) standard. To check the documentation navigate to the `/api-docs` enpoint.

## Querying, Full-Text Search, and Autocomplete with RediSearch

---

The marketplace consists of two major components: a React frontend, which displays the search results list, and a REST API backend that queries the RediSearch DB. On the frontend, users can filter based on multiple tags such as `language`, `redis_commands`, `redis_features`, making it easy to select the desired sample applications. Apart from the tag filter component, a full-text autocompletion feature also enables users to search any phrase every `TEXT` field of the dataset. Moreover, the API also supports pagination, highlighting, and sorting.

### Creating the metadata

The metadata of each sample application is stored as a [Redis Hash](https://redis.io/topics/data-types). Hashes are maps between string fields and string values, so they are the perfect data type to represent objects. Each hashes' id is prefixed with the `project:` phrase. This way, these values can be indexed easily using RediSearch. A sample is added to the Redis DB using the [FT.CREATE](https://oss.redis.com/redisearch/Commands/#ftcreate) command:

```
HSET "project:1" app_name "Querying with Redisearch" description "Redisearch implements a secondery index on top of Redis\\, but unlike other Redis indexing libraries\\, it does not use internal data structures like sorted sets\\." type "Building Block" contributed_by "Redis Labs" redis_commands "FT\\.SEARCH, FT\\.SUGGET"...
```

Special characters like `,.<>{}[]"':;!@#$%^&*()-+=~ ` are escaped so we will be able to query terms with such characters. For more info on see [tokenization](https://oss.redis.com/redisearch/Escaping/#the_rules_of_text_field_tokenization) in the RediSearch documentation.

### Indexing the dataset

Before we can handle any search queries, we need to index the sample applications. To do this, we use a RediSearch index definition that contains all of the fields we’ll use to search. RediSearch indexes stay in sync with Hashes in your Redis database. The index definition is created using the following command:

```
FT.CREATE idx:project ON hash PREFIX 1 "project:" SCORE_FIELD __score SCHEMA app_name TEXT WEIGHT 10 SORTABLE description TEXT SORTABLE type TEXT contributed_by TEXT quick_deploy TEXT language TEXT redis_commands TEXT WEIGHT 1.5 redis_features TEXT WEIGHT 1.5 redis_modules TEXT WEIGHT 1.5 special_tags TEXT verticals TEXT rank NUMERIC featured TEXT preview_image_url TEXT
```

The `ON hash PREFIX 1 "project:"` tells the Redis DB to index each key with the `project:` prefix. The `SCORE_FIELD` flag indicates the document field that should be used as an additional weight since RediSearch will multiply the final relevance value of that document in a search query by the `__score` field. This way a document's rank in queries can be altered based on the users' ranking. After the `SCHEMA` keyword, the index fields are defined. Each field is defined as `TEXT`. This way, we can run a full-text search on the indexed fields. It comes in handy for autocompletion since a phrase a user types will be queried against the entire dataset, ensuring that Backend returns each project, which may be relevant. To guarantee that queries consider hits in specific fields more relevant, some fields are given a higher weight than the default `1`. For this reason, `app_name` weights `10`, and `redis_features`, `redis_modules`, and `redis_commands` weights `1.5`.

### Querying the dataset

The search API translates the frontend user queries into RediSearch queries. For this app, we used [prefix matching](https://oss.redis.com/redisearch/Query_Syntax/#prefix_matching). With prefix matching, RediSearch compares all terms in the index against the given prefix. If a user types “red” into the search form, the API will issue the prefix query `Red*`.

With prefix matching, `Red*` will find many hits, including:

- Redis
- RediSearch
- RedisAI
- RedisGraph

The search form will start displaying results for hits across all these terms as the user types. Then the `GET /projects` endpoint handles these requests. The endpoint support a list of query parameters, which will be parsed and converted into RediSearch syntax (See the Swagger documentation for more info).

If the endpoint is called without any query parameter, the backend will query the DB with the [FT.SEARCH](https://oss.redis.com/redisearch/Commands/#ftsearch) command and `*` as query string, making sure all documents will be listed. A simple query looks the following way:

```
FT.SEARCH idx:project * WITHSCORES
```

The `WITHSCORES` flag is always added to the query. Optionally, using the limit and offset parameters, pagination is applied for the results utilizing the `LIMIT` flag. The default value for this flag is 0 10. Sorting by `app_name` and `description` is also possible thanks to the `SORTABLE` flag on these fields using the `sortBy` query parameter. Next to `sortBy` the `sortDirection` can also be provided. These two parameters are converted to the following RediSearch syntax: `SORTBY {field} [ASC|DESC]`. By default, projects are sorted by their score.

Specific field query parameters take an Array of String as an argument. This way, it is possible to filter a particular field. These parameters are parsed based on the [query syntax](https://oss.redis.com/redisearch/Query_Syntax/). So the following request:

```
GET http://localhost:3000/projects?redis_commands=FT.SEARCH&contributed_by=Redis Labs&language=Javascript&language=Python
```

will result in the following RediSearch query:

```
FT.SEARCH idx:project "@redis_commands:FT\.SEARCH @contributed_by:Redis Labs @language:Javascript | Python" WITHSCORES
```

All punctuation marks and whitespaces (besides underscores) separate the document and queries into tokens. The `.` in the `FT.SEARCH` phrase hence is escaped based on the rules of [tokenization](https://oss.redis.com/redisearch/Escaping/). The terms separated with `|` will result in an OR condition, while the relation between the different field queries will be an AND condition. So the query above will return all hashes which language is either (`Javascript` OR `Python`) AND `FT.SEARCH` is included in their `redis_commands` field AND contributed by `Redis Labs`.

The Backend also supports a `text_filter` query param which handles autocompletion. First, it's value is escaped based on the [text field tokenization](https://oss.redis.com/redisearch/Escaping/#the_rules_of_text_field_tokenization) rule. Then an `*` is added to the term to enable prefix matching. At last, following request:

```
GET http://localhost:3000/projects?text_filter=Redi
```

will result in:

```
FT.SEARCH idx:project Redi*
```

This query returns all projects with a word beginning with the phrase `Redi` in any of the indexed fields. Optionally, field filters can be combined with the text filtering so that users can do a lot of flexible queries.

The endpoint also supports a `highlight` query param, which adds the `HIGHLIGH` key to the query string if provided. This is especially useful for the autocompletion since RediSearch will enclose the term with a `<b></b>` tag. So if a user types `Redi`, the Backend will return the result the following way, enclosing the `RedisGraph` term:

```json
{
  "id": "project:4",
  "score": "2.75",
  "type": "Full App",
  "redis_modules": ["Redisearch", "RedisJSON"],
  "download_url": "https://github.com/redis-developer/basic-caching-demo-nodejs/archive/main.zip",
  "markdown": "https://raw.githubusercontent.com/redislabs-training/redis-sitesearch/master/README.md",
  "verticals": ["Real estate"],
  "contributed_by": "Community",
  "redis_commands": ["FT.SEARCH", "FT.SUGGET"],
  "repo_url": "https://github.com/redis-developer/basic-caching-demo-nodejs",
  "quick_deploy": true,
  "youtube_url": "https://www.youtube.com/watch?v=B_BVmJ90X8Q",
  "language": ["Javascript"],
  "hosted_url": "",
  "app_image_urls": [
    "https://github.com/redis-developer/basic-caching-demo-nodejs/blob/main/docs/screenshot001.png?raw=true"
  ],
  "redis_features": ["caching", "search"],
  "description": "<b>RedisGraph</b> is the first queryable Property Graph database to use sparse matrices to represent the adjacency matrix in graphs and linear algebra to query the graph.",
  "app_name": "<b>RedisGraph</b>, Based on the Property Graph Model",
  "deploy_buttons": [
    {
      "heroku": "https://heroku.com/deploy?template=https://github.com/redis-developer/basic-caching-demo-nodejs"
    },
    {
      "vercel": "https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-caching-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD&envDescription=REDIS_ENDPOINT_URI%20is%20required%20at%20least%20to%20connect%20to%20Redis%20clouding%20server"
    },
    {
      "Google": "https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-caching-demo-nodejs.git"
    }
  ],
  "special_tags": ["Paid"],
  "hidden": false
}
```
