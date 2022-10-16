import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Events from "./Events";
import Outcomes from "./Outcomes";
import Sports from "./Sports";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      {/* Sports */}
      <Route path="sports" element={<Sports />} />

      {/* Events */}
      <Route path="sports" element={<Events />}>
        <Route path=":sportId" element={<Events />} />
      </Route>

      {/* Outcomes */}
      <Route path="sports" element={<Outcomes />}>
        <Route path=":sportId" element={<Outcomes />}>
          <Route path="events" element={<Outcomes />}>
            <Route path=":eventId" element={<Outcomes />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);