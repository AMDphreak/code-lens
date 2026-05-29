import { render } from "solid-js/web";
import App from "./App";
import { bootstrapColorScheme } from "~/lib/color-scheme";
import "./app.css";

bootstrapColorScheme();

render(() => <App />, document.getElementById("root")!);
