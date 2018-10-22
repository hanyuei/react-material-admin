import { render } from "react-dom";
import routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "./styles.scss";
import "font-awesome/css/font-awesome.css";
require("./favicon.ico");

render(routes, document.getElementById("root"));
registerServiceWorker();
