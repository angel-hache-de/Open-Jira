# Next.js OpenJira App

## Techs
Next js and MongoDB

## Live demo
[open-jira](https://open-jira-rho.vercel.app/)

## Local
To run localy, it is needed the db

```
docker-compose up -d
```

- -d is \_\_detached

- MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configure env variables

Rename the file **.env.template** to **.env.**

## Fill the db with test info

Call:
`http://localhost:3000/api/seed`
