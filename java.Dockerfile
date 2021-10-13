FROM eclipse-temurin:11

WORKDIR /app
COPY backend .

CMD ["./mvnw", "spring-boot:run"]
