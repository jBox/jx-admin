import routes from "./routes";
import middleware from "./redux/middleware";
import reducers from "./redux/reducers";
import chaos from "chaos-magician";

const magician = chaos(routes, reducers, middleware);
magician.render();
