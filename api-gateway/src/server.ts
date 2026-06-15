import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/book-service",
  createProxyMiddleware({
    target: "http://book-service:3000",
    changeOrigin: true,
  })
);

app.use(
  "/author-service",
  createProxyMiddleware({
    target: "http://author-service:3001",
    changeOrigin: true,
  })
);

app.use(
  "/category-service",
  createProxyMiddleware({
    target: "http://category-service:3002",
    changeOrigin: true,
  })
);

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});