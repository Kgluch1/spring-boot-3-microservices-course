FROM eclipse-temurin:21-jre as runtime
WORKDIR /app
COPY target/notification-service-1.0-SNAPSHOT.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]
