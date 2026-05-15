import app from "./app";
import envConfig from "./config/env-config";

app.listen(envConfig.PORT, () => {
  console.log(`App is running on Port: ${envConfig.PORT}`);
});
