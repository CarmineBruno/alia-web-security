import React from "react";
import {hydrate} from "react-dom";
import DangerousInnerHtml from "../pages/dangerousInnerHtml";

hydrate(<DangerousInnerHtml/>, document.getElementById("root"));