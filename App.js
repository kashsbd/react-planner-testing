import { Map } from "immutable";
import { Provider } from "react-redux";
import { createStore } from "redux";

//download this demo catalog https://github.com/cvdlab/react-planner/tree/master/demo/src/catalog
import MyCatalog from "./assets/catalog/mycatalog";

import {
  Models as PlannerModels,
  Plugins as PlannerPlugins,
  ReactPlanner,
  reducer as PlannerReducer,
} from "react-planner";

//define state
let AppState = Map({
  "react-planner": new PlannerModels.State(),
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update("react-planner", (plannerState) =>
    PlannerReducer(plannerState, action)
  );
  return state;
};

let store = createStore(
  reducer,
  null,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

export default function App() {
  return (
    <Provider store={store}>
      <ReactPlanner
        catalog={MyCatalog}
        width={800}
        height={600}
        plugins={plugins}
        stateExtractor={(state) => state.get("react-planner")}
      />
    </Provider>
  );
}
