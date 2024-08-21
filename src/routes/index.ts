import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { REST_DOCS_OPTIONS } from "../docs";
import SujetRoutes from "./sujet";
import TypeLogeRoutes from "./typeLoge";
import LogeRoutes from "./loge";
import RecolteRoutes from "./recolte";

export default class Routes {
  static register(app: Application) {
    app.use("/sujet", SujetRoutes);
    app.use("/typeLoge", TypeLogeRoutes);
    app.use("/loge", LogeRoutes);
    app.use("/recolte", RecolteRoutes);
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJSDoc(REST_DOCS_OPTIONS))
    );
  }
}
