# Application Infrastructure

The diagam below shows the high level overview of how this application works. Both packages are located in the AWS cloud. The user/client requests access to the storeFront site located in an s3 storage bucket. Whenever the front-end app needs to retrieve/save information, it will communicate with the StoreFront_API server located in an Elastic Beanstalk service to do so. Attached to the Elastic Beanstalk service is a PostgreSQL RDS database where the server will store or retrieve the needed information.

![](./images/Project_Overview.svg)

<br>

## AWS Services Health Check

<br>

**StoreFront s3 bucket**

![](./images/s3_fe_bucket.png)

<br>

**Elastic Beanstalk Server Environment**

![](./images/elastic_beanstalk_env.png)

<br>

**RDS Postgres Availability**

![](./images/rds_pg_db.png)

<br>
