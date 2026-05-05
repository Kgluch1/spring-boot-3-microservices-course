# --------- Dockerfile for Spring Boot (Java 21) ---------
FROM eclipse-temurin:21-jre as runtime

WORKDIR /app

# Copy JAR (build it najpierw: mvn clean package -DskipTests)
COPY target/product-service-1.0-SNAPSHOT.jar app.jar

# Expose port (zmień jeśli inny w application.properties)
EXPOSE 8080

# Run Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
