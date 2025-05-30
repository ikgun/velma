# --------- BUILD STAGE ---------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /usr/local/app

COPY pom.xml .
COPY src ./src

RUN mvn -f pom.xml clean package

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=docker","-jar","backend/target/velma-0.0.1-SNAPSHOT.jar"]
