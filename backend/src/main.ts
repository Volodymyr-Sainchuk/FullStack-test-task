async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow your Vercel frontend domain to connect
  app.enableCors({
    origin: '*', // Allows all origins, ideal for testing deployments
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
