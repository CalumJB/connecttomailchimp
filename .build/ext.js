"use strict";
var __StripeExtExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@stripe/ui-extension-sdk/version.js
  var require_version = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SDK_VERSION = void 0;
      exports.SDK_VERSION = "8.10.0";
    }
  });

  // node_modules/@stripe/ui-extension-sdk/ui/index.js
  var require_ui = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/ui/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Tooltip = exports.TextField = exports.TextArea = exports.Tabs = exports.TableRow = exports.Table = exports.TableHeaderCell = exports.TableHead = exports.TableFooter = exports.TableCell = exports.TableBody = exports.Tab = exports.TabPanels = exports.TabPanel = exports.TabList = exports.Switch = exports.StripeFileUploader = exports.Spinner = exports.Sparkline = exports.SignInView = exports.SettingsView = exports.Select = exports.Radio = exports.Menu = exports.MenuItem = exports.MenuGroup = exports.List = exports.ListItem = exports.Link = exports.LineChart = exports.Inline = exports.Img = exports.Icon = exports.FormFieldGroup = exports.FocusView = exports.Divider = exports.DateField = exports.ContextView = exports.Chip = exports.ChipList = exports.Checkbox = exports.Button = exports.ButtonGroup = exports.Box = exports.BarChart = exports.Banner = exports.Badge = exports.Accordion = exports.AccordionItem = void 0;
      var jsx_runtime_1 = __require("react/jsx-runtime");
      var react_1 = __require("@remote-ui/react");
      var version_1 = require_version();
      var withSdkProps = (Component) => {
        const wrappedComponentName = Component.displayName || Component.toString();
        const WithSdkProps = (props) => (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props, { wrappedComponentName, sdkVersion: version_1.SDK_VERSION, schemaVersion: "v8" }));
        WithSdkProps.wrappedComponentName = wrappedComponentName;
        return WithSdkProps;
      };
      var defineComponent = (name, fragmentProps, wrapWithSdkProps) => {
        const remoteComponent = (0, react_1.createRemoteReactComponent)(name, {
          fragmentProps
        });
        if (!wrapWithSdkProps) {
          return remoteComponent;
        }
        return withSdkProps(remoteComponent);
      };
      exports.AccordionItem = defineComponent("AccordionItem", ["title", "actions", "media", "subtitle"], true);
      exports.Accordion = defineComponent("Accordion", [], true);
      exports.Badge = defineComponent("Badge", [], true);
      exports.Banner = defineComponent("Banner", ["actions", "description", "title"], true);
      exports.BarChart = defineComponent("BarChart", [], true);
      exports.Box = defineComponent("Box", [], true);
      exports.ButtonGroup = defineComponent("ButtonGroup", ["menuTrigger"], true);
      exports.Button = defineComponent("Button", [], true);
      exports.Checkbox = defineComponent("Checkbox", ["label"], true);
      exports.ChipList = defineComponent("ChipList", [], true);
      exports.Chip = defineComponent("Chip", [], true);
      exports.ContextView = defineComponent("ContextView", ["actions", "banner", "footerContent", "primaryAction", "secondaryAction"], true);
      exports.DateField = defineComponent("DateField", ["label"], true);
      exports.Divider = defineComponent("Divider", [], true);
      exports.FocusView = defineComponent("FocusView", ["footerContent", "primaryAction", "secondaryAction"], true);
      exports.FormFieldGroup = defineComponent("FormFieldGroup", [], true);
      exports.Icon = defineComponent("Icon", [], true);
      exports.Img = defineComponent("Img", [], true);
      exports.Inline = defineComponent("Inline", [], true);
      exports.LineChart = defineComponent("LineChart", [], true);
      exports.Link = defineComponent("Link", [], true);
      exports.ListItem = defineComponent("ListItem", ["icon", "image", "secondaryTitle", "title", "value"], true);
      exports.List = defineComponent("List", [], true);
      exports.MenuGroup = defineComponent("MenuGroup", ["title"], true);
      exports.MenuItem = defineComponent("MenuItem", [], true);
      exports.Menu = defineComponent("Menu", ["trigger"], true);
      exports.Radio = defineComponent("Radio", ["label"], true);
      exports.Select = defineComponent("Select", ["label"], true);
      exports.SettingsView = defineComponent("SettingsView", [], true);
      exports.SignInView = defineComponent("SignInView", ["descriptionActionContents", "footerContent"], true);
      exports.Sparkline = defineComponent("Sparkline", [], true);
      exports.Spinner = defineComponent("Spinner", [], true);
      exports.StripeFileUploader = defineComponent("StripeFileUploader", [], true);
      exports.Switch = defineComponent("Switch", ["label"], true);
      exports.TabList = defineComponent("TabList", [], true);
      exports.TabPanel = defineComponent("TabPanel", [], true);
      exports.TabPanels = defineComponent("TabPanels", [], true);
      exports.Tab = defineComponent("Tab", [], true);
      exports.TableBody = defineComponent("TableBody", [], true);
      exports.TableCell = defineComponent("TableCell", [], true);
      exports.TableFooter = defineComponent("TableFooter", [], true);
      exports.TableHead = defineComponent("TableHead", [], true);
      exports.TableHeaderCell = defineComponent("TableHeaderCell", [], true);
      exports.Table = defineComponent("Table", [], true);
      exports.TableRow = defineComponent("TableRow", [], true);
      exports.Tabs = defineComponent("Tabs", [], true);
      exports.TextArea = defineComponent("TextArea", ["label"], true);
      exports.TextField = defineComponent("TextField", ["label"], true);
      exports.Tooltip = defineComponent("Tooltip", ["trigger"], true);
    }
  });

  // node_modules/invariant/browser.js
  var require_browser = __commonJS({
    "node_modules/invariant/browser.js"(exports, module) {
      "use strict";
      var invariant = function(condition, format, a, b, c, d, e, f) {
        if (true) {
          if (format === void 0) {
            throw new Error("invariant requires an error message argument");
          }
        }
        if (!condition) {
          var error;
          if (format === void 0) {
            error = new Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(
              format.replace(/%s/g, function() {
                return args[argIndex++];
              })
            );
            error.name = "Invariant Violation";
          }
          error.framesToPop = 1;
          throw error;
        }
      };
      module.exports = invariant;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/_endpoint.js
  var require_endpoint = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/_endpoint.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getHostEndpoint = void 0;
      var invariant_1 = __importDefault(require_browser());
      var getHostEndpoint = () => {
        var _a;
        const hostEndpoint = (_a = globalThis.__StripeExtExports) === null || _a === void 0 ? void 0 : _a.endpoint;
        (0, invariant_1.default)(hostEndpoint, "hostEndpoint has not been initialized");
        return hostEndpoint;
      };
      exports.getHostEndpoint = getHostEndpoint;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/apiFetch.js
  var require_apiFetch = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/apiFetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stripeApiFetch = void 0;
      var _endpoint_1 = require_endpoint();
      var stripeApiFetch = (path, req) => {
        try {
          return (0, _endpoint_1.getHostEndpoint)().call.stripeApiFetch(path, req);
        } catch (e) {
          console.error("error calling stripe fetch", e);
          throw e;
        }
      };
      exports.stripeApiFetch = stripeApiFetch;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/clipboard.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.clipboardWriteText = void 0;
      var _endpoint_1 = require_endpoint();
      var clipboardWriteText2 = (text = "") => {
        return (0, _endpoint_1.getHostEndpoint)().call.clipboardWriteText(text);
      };
      exports.clipboardWriteText = clipboardWriteText2;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/context.js
  var require_context = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/context.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.useRefreshDashboardData = void 0;
      var React = __importStar(__require("react"));
      var _endpoint_1 = require_endpoint();
      var useRefreshDashboardData = () => {
        return React.useCallback(() => {
          return (0, _endpoint_1.getHostEndpoint)().call.refreshDashboardData();
        }, []);
      };
      exports.useRefreshDashboardData = useRefreshDashboardData;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/httpClient.js
  var require_httpClient = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/httpClient.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AUTHORIZATION_VALUE = exports.AUTHORIZATION_HEADER = exports.createHttpClient = exports.STRIPE_API_KEY = exports.StripeAppsHttpClient = void 0;
      var invariant_1 = __importDefault(require_browser());
      var apiFetch_1 = require_apiFetch();
      var matchesStripeKey = /[ps]k_(test|live)_[A-Za-z0-9]+/;
      var StripeAppsHttpResponse = class {
        constructor(resp) {
          this._resp = resp;
        }
        getHeaders() {
          return this._resp.headers;
        }
        getStatusCode() {
          return this._resp.status;
        }
        getRawResponse() {
          return this._resp;
        }
        toStream() {
          throw new Error("Streams have not been implemented in the Stripe HTTP client");
        }
        toJSON() {
          const { json } = this._resp;
          if (json === void 0) {
            return Promise.reject(new Error("Response body undefined"));
          } else {
            return Promise.resolve(json);
          }
        }
      };
      var StripeAppsHttpClient = class {
        constructor(fetch2) {
          this._fetch = fetch2;
        }
        getClientName() {
          return "stripe-ui-extension";
        }
        makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
          return __awaiter(this, void 0, void 0, function* () {
            (0, invariant_1.default)(protocol === "https", "Must use https connections in UI extensions");
            const fetchOptions = {
              method,
              headers
            };
            if (requestData) {
              fetchOptions.body = requestData;
            }
            const authHeader = headers.Authorization;
            if (authHeader && matchesStripeKey.test(authHeader)) {
              throw new Error("Do not use actual stripe keys when using the Stripe JS API client with UI extesions.\n\n Instead, use `STRIPE_API_KEY` from `@stripe/ui-extension-sdk/http_client` as a placeholder.");
            }
            const resp = yield this._fetch(path, fetchOptions);
            return new StripeAppsHttpResponse(resp);
          });
        }
      };
      exports.StripeAppsHttpClient = StripeAppsHttpClient;
      exports.STRIPE_API_KEY = "DO_NOT_PASS_A_REAL_API_KEY";
      var createHttpClient = () => new StripeAppsHttpClient(apiFetch_1.stripeApiFetch);
      exports.createHttpClient = createHttpClient;
      exports.AUTHORIZATION_HEADER = "Authorization";
      exports.AUTHORIZATION_VALUE = `Bearer ${exports.STRIPE_API_KEY}`;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/getDashboardUserEmail.js
  var require_getDashboardUserEmail = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/getDashboardUserEmail.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getDashboardUserEmail = void 0;
      var _endpoint_1 = require_endpoint();
      var httpClient_1 = require_httpClient();
      var getDashboardUserEmail = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
          const resp = yield (0, _endpoint_1.getHostEndpoint)().call.stripeApiFetch("/v1/user/email", {
            headers: {
              [httpClient_1.AUTHORIZATION_HEADER]: httpClient_1.AUTHORIZATION_VALUE
            }
          });
          if (resp.ok) {
            resp.email = resp.json.email;
            return resp;
          }
          return Promise.reject(resp);
        } catch (e) {
          console.error("Error getting dashboard user email", e);
          throw e;
        }
      });
      exports.getDashboardUserEmail = getDashboardUserEmail;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/getUserAuthorizedPermissions.js
  var require_getUserAuthorizedPermissions = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/getUserAuthorizedPermissions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getUserAuthorizedPermissions = void 0;
      var _endpoint_1 = require_endpoint();
      var getUserAuthorizedPermissions = () => {
        return (0, _endpoint_1.getHostEndpoint)().call.getUserAuthorizedPermissions();
      };
      exports.getUserAuthorizedPermissions = getUserAuthorizedPermissions;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/isPermissionAuthorized.js
  var require_isPermissionAuthorized = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/isPermissionAuthorized.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isPermissionAuthorized = void 0;
      var _endpoint_1 = require_endpoint();
      var isPermissionAuthorized = (permission) => {
        return (0, _endpoint_1.getHostEndpoint)().call.isPermissionAuthorized(permission);
      };
      exports.isPermissionAuthorized = isPermissionAuthorized;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/isSourceInAuthorizedCSP.js
  var require_isSourceInAuthorizedCSP = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/isSourceInAuthorizedCSP.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isSourceInAuthorizedCSP = void 0;
      var _endpoint_1 = require_endpoint();
      var isSourceInAuthorizedCSP = (source) => {
        return (0, _endpoint_1.getHostEndpoint)().call.isSourceInAuthorizedCSP(source);
      };
      exports.isSourceInAuthorizedCSP = isSourceInAuthorizedCSP;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/oauth.js
  var require_oauth = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/oauth.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createOAuthState = void 0;
      var _endpoint_1 = require_endpoint();
      var createOAuthState = (state = "") => {
        return (0, _endpoint_1.getHostEndpoint)().call.createOAuthState(state);
      };
      exports.createOAuthState = createOAuthState;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/platformRpcs.js
  var require_platformRpcs = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/platformRpcs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/signature.js
  var require_signature = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/signature.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fetchStripeSignature = void 0;
      var _endpoint_1 = require_endpoint();
      var fetchStripeSignature2 = (additionalPayload) => {
        return (0, _endpoint_1.getHostEndpoint)().call.fetchStripeSignature(additionalPayload);
      };
      exports.fetchStripeSignature = fetchStripeSignature2;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/toast.js
  var require_toast = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/toast.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.showToast = void 0;
      var _endpoint_1 = require_endpoint();
      var showToast = (message_1, ...args_1) => __awaiter(void 0, [message_1, ...args_1], void 0, function* (message, options = {}) {
        const endpoint = (0, _endpoint_1.getHostEndpoint)();
        return endpoint.call.showToast(message, options);
      });
      exports.showToast = showToast;
    }
  });

  // node_modules/@stripe/ui-extension-sdk/utils/index.js
  var require_utils = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/utils/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_endpoint(), exports);
      __exportStar(require_apiFetch(), exports);
      __exportStar(require_clipboard(), exports);
      __exportStar(require_context(), exports);
      __exportStar(require_getDashboardUserEmail(), exports);
      __exportStar(require_getUserAuthorizedPermissions(), exports);
      __exportStar(require_httpClient(), exports);
      __exportStar(require_isPermissionAuthorized(), exports);
      __exportStar(require_isSourceInAuthorizedCSP(), exports);
      __exportStar(require_oauth(), exports);
      __exportStar(require_platformRpcs(), exports);
      __exportStar(require_signature(), exports);
      __exportStar(require_toast(), exports);
    }
  });

  // .build/manifest.js
  var manifest_exports = {};
  __export(manifest_exports, {
    BUILD_TIME: () => BUILD_TIME,
    CustomerDetails: () => CustomerDetails_default,
    Customers: () => Customers_default,
    Home: () => Home_default,
    default: () => manifest_default
  });

  // src/views/Home.tsx
  var import_ui = __toESM(require_ui());
  var import_utils = __toESM(require_utils());

  // src/views/brand_icon.svg
  var brand_icon_default = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjIxOCA5LjEwMjg1QzI0LjQwMDggOC45OTQyMiAyNC41NTc3IDguODQ4ODcgMjQuNjgyIDguNjc3OTdMMTcuNTE1NSA0LjQxODA5QzE2LjU3NzcgMy44NjA2NCAxNS40MjIzIDMuODYwNjQgMTQuNDg0NSA0LjQxODA5TDcuMzE3OTggOC42Nzc5N0M3LjQ0MjI5IDguODQ4ODcgNy41OTkyNCA4Ljk5NDIyIDcuNzgxOTkgOS4xMDI4NUwxNS4yNTA5IDEzLjU0MjVDMTUuNzE2MyAxMy44MTkyIDE2LjI4MzcgMTMuODE5MiAxNi43NDkxIDEzLjU0MjVMMjQuMjE4IDkuMTAyODVaIiBmaWxsPSIjNkE3MzgzIi8+CjxwYXRoIGQ9Ik0yNi41IDExLjU2MDNDMjYuNSAxMS40MjE1IDI2LjQ5MSAxMS4yODQxIDI2LjQ3MzYgMTEuMTQ4NkMyNi4yNTI5IDExLjM0NzkgMjYuMDExMyAxMS41MjY4IDI1Ljc1MDkgMTEuNjgxN0wxOC4yODIgMTYuMTIxM0MxNi44NzE4IDE2Ljk1OTYgMTUuMTI4MiAxNi45NTk2IDEzLjcxOCAxNi4xMjEzTDYuMjQ5MSAxMS42ODE3QzUuOTg4NjYgMTEuNTI2OCA1Ljc0NzEgMTEuMzQ3OSA1LjUyNjQ0IDExLjE0ODZDNS41MDg5NSAxMS4yODQxIDUuNSAxMS40MjE1IDUuNSAxMS41NjAzVjIwLjQzOTdDNS41IDIxLjU1NDYgNi4wNzc3MiAyMi41ODQ4IDcuMDE1NTQgMjMuMTQyM0wxNC40ODQ1IDI3LjU4MTlDMTUuNDIyMyAyOC4xMzk0IDE2LjU3NzcgMjguMTM5NCAxNy41MTU1IDI3LjU4MTlMMjQuOTg0NSAyMy4xNDIzQzI1LjkyMjMgMjIuNTg0OCAyNi41IDIxLjU1NDYgMjYuNSAyMC40Mzk3VjExLjU2MDNaIiBmaWxsPSIjNkE3MzgzIi8+Cjwvc3ZnPgo=";

  // src/views/Home.tsx
  var import_react = __require("react");
  var import_jsx_runtime = __require("react/jsx-runtime");
  var Home = ({ userContext, environment }) => {
    const [mailchimpExists, setMailchimpExists] = (0, import_react.useState)(null);
    const [mailchimpData, setMailchimpData] = (0, import_react.useState)(null);
    const [loading, setLoading] = (0, import_react.useState)(false);
    const [error, setError] = (0, import_react.useState)(null);
    const createUser = () => __async(void 0, null, function* () {
      var _a;
      const signature = yield (0, import_utils.fetchStripeSignature)();
      const response = yield fetch("http://localhost:8080/api/stripe/create", {
        method: "POST",
        headers: {
          "Stripe-Signature": signature,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userContext == null ? void 0 : userContext.id,
          account_id: (_a = userContext == null ? void 0 : userContext.account) == null ? void 0 : _a.id
        })
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return yield response.json();
    });
    const [redirectUrl, setRedirectUrl] = (0, import_react.useState)(null);
    const startMailchimpOAuth = () => __async(void 0, null, function* () {
      var _a, _b;
      const signature = yield (0, import_utils.fetchStripeSignature)();
      const response = yield fetch("http://localhost:8080/api/oauth/mailchimp/start", {
        method: "POST",
        headers: {
          "Stripe-Signature": signature,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stripeUserId: userContext == null ? void 0 : userContext.id,
          stripeAccountId: (_a = userContext == null ? void 0 : userContext.account) == null ? void 0 : _a.id,
          state: (_b = userContext == null ? void 0 : userContext.account) == null ? void 0 : _b.id
        })
      });
      if (!response.ok) {
        const errorText = yield response.text();
        throw new Error(`Failed to start Mailchimp OAuth flow: ${errorText}`);
      }
      const data = yield response.json();
      if (data && data.redirectUrl) {
        setRedirectUrl(data.redirectUrl);
      } else {
        throw new Error("Did not receive a redirect URL from the backend.");
      }
    });
    const checkMailchimpUser = () => __async(void 0, null, function* () {
      var _a;
      const signature = yield (0, import_utils.fetchStripeSignature)();
      const response = yield fetch("http://localhost:8080/api/stripe/account/mailchimp", {
        method: "POST",
        headers: {
          "Stripe-Signature": signature,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userContext == null ? void 0 : userContext.id,
          account_id: (_a = userContext == null ? void 0 : userContext.account) == null ? void 0 : _a.id
        })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Mailchimp user");
      }
      return yield response.json();
    });
    const handleClick = () => __async(void 0, null, function* () {
      setLoading(true);
      setError(null);
      setMailchimpExists(null);
      setMailchimpData(null);
      try {
        yield createUser();
        const mailchimpResponse = yield checkMailchimpUser();
        if (mailchimpResponse.exists) {
          setMailchimpExists(true);
          setMailchimpData({
            stripeAccountId: mailchimpResponse.stripeAccountId,
            mailchimpAccountId: mailchimpResponse.mailchimpAccountId
          });
        } else {
          setMailchimpExists(false);
        }
      } catch (err) {
        setError(err.message || "Unknown error");
      }
      setLoading(false);
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.ContextView, {
      title: "Dashboard homepage",
      brandColor: "#F6F8FA",
      brandIcon: brand_icon_default,
      externalLink: {
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps"
      },
      footerContent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { marginBottom: "medium" },
        children: [
          "Questions? Get help with your app from the",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
            external: true,
            href: "https://stripe.com/docs/stripe-apps",
            target: "_blank",
            type: "secondary",
            children: "Stripe Apps docs"
          }),
          ",",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
            external: true,
            href: "https://support.stripe.com/",
            target: "_blank",
            type: "secondary",
            children: "Stripe Support"
          }),
          ", or the",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
            external: true,
            href: "https://discord.com/invite/stripe",
            target: "_blank",
            type: "secondary",
            children: "Stripe Developers Discord"
          }),
          "."
        ]
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: { stack: "y", rowGap: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
            onPress: handleClick,
            loading,
            children: "Call Backend 4"
          }),
          error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
            tone: "critical",
            children: [
              "Error: ",
              error
            ]
          }),
          mailchimpExists === true && mailchimpData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
              children: [
                "Mailchimp user exists! ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                "Stripe Account ID: ",
                mailchimpData.stripeAccountId,
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {})
              ]
            })
          }),
          mailchimpExists === false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
            css: { stack: "y", rowGap: "medium" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Inline, {
                children: "Here I need to show the option that will redirect the user to Mailchimp."
              }),
              !redirectUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, {
                type: "primary",
                onPress: () => __async(void 0, null, function* () {
                  setError(null);
                  setLoading(true);
                  try {
                    yield startMailchimpOAuth();
                    setLoading(false);
                  } catch (err) {
                    setError(err.message);
                    setLoading(false);
                  }
                }),
                loading,
                children: "Connect Mailchimp"
              }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
                href: redirectUrl,
                target: "_self",
                rel: "noopener noreferrer",
                type: "primary",
                children: "Click here to connect Mailchimp"
              })
            ]
          })
        ]
      })
    });
  };
  var Home_default = Home;

  // src/views/Customers.tsx
  var import_ui2 = __toESM(require_ui());
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  var Customers = ({ userContext, environment }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.ContextView, {
      title: "Customers page",
      brandColor: "#F6F8FA",
      brandIcon: brand_icon_default,
      externalLink: {
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps"
      },
      footerContent: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
        css: { marginBottom: "medium" },
        children: [
          "Questions? Get help with your app from the",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Link, {
            external: true,
            href: "https://stripe.com/docs/stripe-apps",
            target: "_blank",
            type: "secondary",
            children: "Stripe Apps docs"
          }),
          ",",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Link, {
            external: true,
            href: "https://support.stripe.com/",
            target: "_blank",
            type: "secondary",
            children: "Stripe Support"
          }),
          ", or the",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Link, {
            external: true,
            href: "https://discord.com/invite/stripe",
            target: "_blank",
            type: "secondary",
            children: "Stripe Developers Discord"
          }),
          "."
        ]
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
        css: { stack: "y", rowGap: "large" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Box, {
            children: "Click on a customer (or create a new one) to navigate to that customer\u2019s detail view."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Box, {
            css: { color: "info" },
            children: [
              "Edit the file",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Inline, {
                css: { fontFamily: "monospace", wordBreak: "break-all" },
                children: "src/views/Customers.tsx"
              }),
              " ",
              "and save to reload this view."
            ]
          })
        ]
      })
    });
  };
  var Customers_default = Customers;

  // src/views/CustomerDetails.tsx
  var import_react2 = __require("react");
  var import_ui3 = __toESM(require_ui());
  var import_utils2 = __toESM(require_utils());
  var import_jsx_runtime3 = __require("react/jsx-runtime");
  var CustomerDetails = ({
    userContext,
    environment
  }) => {
    const CLIPBOARD_TEXT = "stripe apps add view";
    const writeToClipboard = (0, import_react2.useCallback)(() => __async(void 0, null, function* () {
      try {
        yield (0, import_utils2.clipboardWriteText)(CLIPBOARD_TEXT);
      } catch (e) {
        console.error("Writing to the clipboard failed.");
      }
    }), []);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.ContextView, {
      title: "Customer details page",
      brandColor: "#F6F8FA",
      brandIcon: brand_icon_default,
      externalLink: {
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps"
      },
      footerContent: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
          css: { marginBottom: "medium" },
          children: [
            "Questions? Get help with your app from the",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Link, {
              external: true,
              href: "https://stripe.com/docs/stripe-apps",
              target: "_blank",
              type: "secondary",
              children: "Stripe Apps docs"
            }),
            ",",
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Link, {
              external: true,
              href: "https://support.stripe.com/",
              target: "_blank",
              type: "secondary",
              children: "Stripe Support"
            }),
            ", or the",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Link, {
              external: true,
              href: "https://discord.com/invite/stripe",
              target: "_blank",
              type: "secondary",
              children: "Stripe Developers Discord"
            }),
            "."
          ]
        })
      }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Box, {
          css: { font: "heading" },
          children: "Next steps"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
          css: { stack: "y", rowGap: "large" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
              children: [
                "Build your app with these",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Link, {
                    external: true,
                    href: "https://docs.stripe.com/stripe-apps/components",
                    children: "UI Components."
                  })
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
              children: [
                "To create more views for your app use",
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
                  css: {
                    stack: "x",
                    distribute: "space-between"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
                      css: {
                        alignSelfY: "center",
                        background: "container",
                        borderRadius: "medium",
                        padding: "small",
                        fontFamily: "monospace"
                      },
                      children: [
                        "$ ",
                        CLIPBOARD_TEXT
                      ]
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Box, {
                      css: { alignSelfY: "center" },
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Button, {
                        onPress: writeToClipboard,
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Icon, {
                          size: "small",
                          name: "clipboard"
                        })
                      })
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
              children: [
                "Learn more about views, authentication, and accessing data in",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Link, {
                  external: true,
                  href: "https://stripe.com/docs/stripe-apps",
                  target: "_blank",
                  children: "Stripe Apps docs"
                }),
                "."
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Divider, {}),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui3.Box, {
              css: { color: "info" },
              children: [
                "Edit the file",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.Inline, {
                  css: { fontFamily: "monospace" },
                  children: "src/views/CustomerDetails.tsx"
                }),
                " ",
                "and save to reload this view."
              ]
            })
          ]
        })
      ]
    });
  };
  var CustomerDetails_default = CustomerDetails;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2025-08-03 20:45:22.223424 +0100 BST m=+0.372463001";
  var manifest_default = {
    "id": "com.example.connecttomailchimp",
    "version": "0.0.2",
    "name": "Connect to Mailchimp",
    "icon": "",
    "permissions": [
      {
        "permission": "checkout_session_read",
        "purpose": "Read Checkout Session data in webhook events"
      }
    ],
    "connect_permissions": null,
    "ui_extension": {
      "views": [
        {
          "viewport": "stripe.dashboard.home.overview",
          "component": "Home"
        },
        {
          "viewport": "stripe.dashboard.customer.list",
          "component": "Customers"
        },
        {
          "viewport": "stripe.dashboard.customer.detail",
          "component": "CustomerDetails"
        }
      ],
      "content_security_policy": {
        "connect-src": null,
        "image-src": null,
        "purpose": ""
      }
    },
    "distribution_type": "private"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3ZlcnNpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3VpL2luZGV4LnRzeCIsICIuLi9ub2RlX21vZHVsZXMvaW52YXJpYW50L2Jyb3dzZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3V0aWxzL19lbmRwb2ludC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zcmMvdXRpbHMvYXBpRmV0Y2gudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3V0aWxzL2NsaXBib2FyZC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zcmMvdXRpbHMvY29udGV4dC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zcmMvdXRpbHMvaHR0cENsaWVudC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zcmMvdXRpbHMvZ2V0RGFzaGJvYXJkVXNlckVtYWlsLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3NyYy91dGlscy9nZXRVc2VyQXV0aG9yaXplZFBlcm1pc3Npb25zLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3NyYy91dGlscy9pc1Blcm1pc3Npb25BdXRob3JpemVkLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3NyYy91dGlscy9pc1NvdXJjZUluQXV0aG9yaXplZENTUC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zcmMvdXRpbHMvb2F1dGgudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91dGlscy9wbGF0Zm9ybVJwY3MuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3V0aWxzL3NpZ25hdHVyZS50cyIsICIuLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zcmMvdXRpbHMvdG9hc3QudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3JjL3V0aWxzL2luZGV4LnRzIiwgIm1hbmlmZXN0LmpzIiwgIi4uL3NyYy92aWV3cy9Ib21lLnRzeCIsICIuLi9zcmMvdmlld3MvQ3VzdG9tZXJzLnRzeCIsICIuLi9zcmMvdmlld3MvQ3VzdG9tZXJEZXRhaWxzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFtudWxsLCBudWxsLCAiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGxhdGZvcm1ScGNzLmpzLm1hcCIsIG51bGwsIG51bGwsIG51bGwsICJcbmltcG9ydCBIb21lIGZyb20gJy4uL3NyYy92aWV3cy9Ib21lJztpbXBvcnQgQ3VzdG9tZXJzIGZyb20gJy4uL3NyYy92aWV3cy9DdXN0b21lcnMnO2ltcG9ydCBDdXN0b21lckRldGFpbHMgZnJvbSAnLi4vc3JjL3ZpZXdzL0N1c3RvbWVyRGV0YWlscyc7XG5cbmV4cG9ydCAqIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBCVUlMRF9USU1FID0gJzIwMjUtMDgtMDMgMjA6NDU6MjIuMjIzNDI0ICswMTAwIEJTVCBtPSswLjM3MjQ2MzAwMSc7XG5cbmV4cG9ydCB7IFxuICBIb21lLFx0XG5cbiAgQ3VzdG9tZXJzLFx0XG5cbiAgQ3VzdG9tZXJEZXRhaWxzXHRcbiB9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFwiaWRcIjogXCJjb20uZXhhbXBsZS5jb25uZWN0dG9tYWlsY2hpbXBcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjJcIixcbiAgXCJuYW1lXCI6IFwiQ29ubmVjdCB0byBNYWlsY2hpbXBcIixcbiAgXCJpY29uXCI6IFwiXCIsXG4gIFwicGVybWlzc2lvbnNcIjogW1xuICAgIHtcbiAgICAgIFwicGVybWlzc2lvblwiOiBcImNoZWNrb3V0X3Nlc3Npb25fcmVhZFwiLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiUmVhZCBDaGVja291dCBTZXNzaW9uIGRhdGEgaW4gd2ViaG9vayBldmVudHNcIlxuICAgIH1cbiAgXSxcbiAgXCJjb25uZWN0X3Blcm1pc3Npb25zXCI6IG51bGwsXG4gIFwidWlfZXh0ZW5zaW9uXCI6IHtcbiAgICBcInZpZXdzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuaG9tZS5vdmVydmlld1wiLFxuICAgICAgICBcImNvbXBvbmVudFwiOiBcIkhvbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiBcInN0cmlwZS5kYXNoYm9hcmQuY3VzdG9tZXIubGlzdFwiLFxuICAgICAgICBcImNvbXBvbmVudFwiOiBcIkN1c3RvbWVyc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInZpZXdwb3J0XCI6IFwic3RyaXBlLmRhc2hib2FyZC5jdXN0b21lci5kZXRhaWxcIixcbiAgICAgICAgXCJjb21wb25lbnRcIjogXCJDdXN0b21lckRldGFpbHNcIlxuICAgICAgfVxuICAgIF0sXG4gICAgXCJjb250ZW50X3NlY3VyaXR5X3BvbGljeVwiOiB7XG4gICAgICBcImNvbm5lY3Qtc3JjXCI6IG51bGwsXG4gICAgICBcImltYWdlLXNyY1wiOiBudWxsLFxuICAgICAgXCJwdXJwb3NlXCI6IFwiXCJcbiAgICB9XG4gIH0sXG4gIFwiZGlzdHJpYnV0aW9uX3R5cGVcIjogXCJwcml2YXRlXCJcbn07XG4iLCAiaW1wb3J0IHtcbiAgQm94LFxuICBDb250ZXh0VmlldyxcbiAgQnV0dG9uLFxuICBJbmxpbmUsXG4gIExpbmssXG59IGZyb20gXCJAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWlcIjtcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uQ29udGV4dFZhbHVlIH0gZnJvbSBcIkBzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay9jb250ZXh0XCI7XG5pbXBvcnQgeyBmZXRjaFN0cmlwZVNpZ25hdHVyZSB9IGZyb20gXCJAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHNcIjtcblxuXG5pbXBvcnQgQnJhbmRJY29uIGZyb20gXCIuL2JyYW5kX2ljb24uc3ZnXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBIb21lID0gKHsgdXNlckNvbnRleHQsIGVudmlyb25tZW50IH06IEV4dGVuc2lvbkNvbnRleHRWYWx1ZSkgPT4ge1xuICBjb25zdCBbbWFpbGNoaW1wRXhpc3RzLCBzZXRNYWlsY2hpbXBFeGlzdHNdID0gdXNlU3RhdGU8Ym9vbGVhbiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFpbGNoaW1wRGF0YSwgc2V0TWFpbGNoaW1wRGF0YV0gPSB1c2VTdGF0ZTx7IHN0cmlwZUFjY291bnRJZD86IHN0cmluZzsgbWFpbGNoaW1wQWNjb3VudElkPzogc3RyaW5nIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGNyZWF0ZVVzZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3N0cmlwZS9jcmVhdGVcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJTdHJpcGUtU2lnbmF0dXJlXCI6IHNpZ25hdHVyZSxcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB1c2VyX2lkOiB1c2VyQ29udGV4dD8uaWQsXG4gICAgICAgIGFjY291bnRfaWQ6IHVzZXJDb250ZXh0Py5hY2NvdW50Py5pZCxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSB1c2VyXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH07XG5cbiAgY29uc3QgW3JlZGlyZWN0VXJsLCBzZXRSZWRpcmVjdFVybF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuY29uc3Qgc3RhcnRNYWlsY2hpbXBPQXV0aCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgZmV0Y2hTdHJpcGVTaWduYXR1cmUoKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9vYXV0aC9tYWlsY2hpbXAvc3RhcnRcIiwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJTdHJpcGUtU2lnbmF0dXJlXCI6IHNpZ25hdHVyZSxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgc3RyaXBlVXNlcklkOiB1c2VyQ29udGV4dD8uaWQsXG4gICAgICBzdHJpcGVBY2NvdW50SWQ6IHVzZXJDb250ZXh0Py5hY2NvdW50Py5pZCxcbiAgICAgIHN0YXRlOiB1c2VyQ29udGV4dD8uYWNjb3VudD8uaWRcbiAgICB9KSxcbiAgfSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGVycm9yVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzdGFydCBNYWlsY2hpbXAgT0F1dGggZmxvdzogJHtlcnJvclRleHR9YCk7XG4gIH1cblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBpZiAoZGF0YSAmJiBkYXRhLnJlZGlyZWN0VXJsKSB7XG4gICAgc2V0UmVkaXJlY3RVcmwoZGF0YS5yZWRpcmVjdFVybCk7ICAvLyBzdG9yZSB0aGUgVVJMIGluIHN0YXRlXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRGlkIG5vdCByZWNlaXZlIGEgcmVkaXJlY3QgVVJMIGZyb20gdGhlIGJhY2tlbmQuXCIpO1xuICB9XG59O1xuXG4gIGNvbnN0IGNoZWNrTWFpbGNoaW1wVXNlciA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBmZXRjaFN0cmlwZVNpZ25hdHVyZSgpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvc3RyaXBlL2FjY291bnQvbWFpbGNoaW1wXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiU3RyaXBlLVNpZ25hdHVyZVwiOiBzaWduYXR1cmUsXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXNlcl9pZDogdXNlckNvbnRleHQ/LmlkLFxuICAgICAgICBhY2NvdW50X2lkOiB1c2VyQ29udGV4dD8uYWNjb3VudD8uaWQsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBNYWlsY2hpbXAgdXNlclwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0TWFpbGNoaW1wRXhpc3RzKG51bGwpO1xuICAgIHNldE1haWxjaGltcERhdGEobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgY3JlYXRlVXNlcigpO1xuXG4gICAgICBjb25zdCBtYWlsY2hpbXBSZXNwb25zZSA9IGF3YWl0IGNoZWNrTWFpbGNoaW1wVXNlcigpO1xuXG4gICAgICBpZiAobWFpbGNoaW1wUmVzcG9uc2UuZXhpc3RzKSB7XG4gICAgICAgIHNldE1haWxjaGltcEV4aXN0cyh0cnVlKTtcbiAgICAgICAgc2V0TWFpbGNoaW1wRGF0YSh7XG4gICAgICAgICAgc3RyaXBlQWNjb3VudElkOiBtYWlsY2hpbXBSZXNwb25zZS5zdHJpcGVBY2NvdW50SWQsXG4gICAgICAgICAgbWFpbGNoaW1wQWNjb3VudElkOiBtYWlsY2hpbXBSZXNwb25zZS5tYWlsY2hpbXBBY2NvdW50SWQsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0TWFpbGNoaW1wRXhpc3RzKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIpO1xuICAgIH1cblxuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRleHRWaWV3XG4gICAgICB0aXRsZT1cIkRhc2hib2FyZCBob21lcGFnZVwiXG4gICAgICBicmFuZENvbG9yPVwiI0Y2RjhGQVwiXG4gICAgICBicmFuZEljb249e0JyYW5kSWNvbn1cbiAgICAgIGV4dGVybmFsTGluaz17e1xuICAgICAgICBsYWJlbDogXCJTdHJpcGUgQXBwcyBkb2NzXCIsXG4gICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9zdHJpcGUuY29tL2RvY3Mvc3RyaXBlLWFwcHNcIixcbiAgICAgIH19XG4gICAgICBmb290ZXJDb250ZW50PXtcbiAgICAgICAgPEJveCBjc3M9e3sgbWFyZ2luQm90dG9tOiBcIm1lZGl1bVwiIH19PlxuICAgICAgICAgIFF1ZXN0aW9ucz8gR2V0IGhlbHAgd2l0aCB5b3VyIGFwcCBmcm9tIHRoZXtcIiBcIn1cbiAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgZXh0ZXJuYWxcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3N0cmlwZS5jb20vZG9jcy9zdHJpcGUtYXBwc1wiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgU3RyaXBlIEFwcHMgZG9jc1xuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAse1wiIFwifVxuICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICBleHRlcm5hbFxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC5zdHJpcGUuY29tL1wiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgU3RyaXBlIFN1cHBvcnRcbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgLCBvciB0aGV7XCIgXCJ9XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGV4dGVybmFsXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kaXNjb3JkLmNvbS9pbnZpdGUvc3RyaXBlXCJcbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBTdHJpcGUgRGV2ZWxvcGVycyBEaXNjb3JkXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIC5cbiAgICAgICAgPC9Cb3g+XG4gICAgICB9XG4gICAgPlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6IFwieVwiLCByb3dHYXA6IFwibGFyZ2VcIiB9fT5cbiAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtoYW5kbGVDbGlja30gbG9hZGluZz17bG9hZGluZ30+XG4gICAgICAgICAgQ2FsbCBCYWNrZW5kIDRcbiAgICAgICAgPC9CdXR0b24+XG5cbiAgICAgICAge2Vycm9yICYmIDxJbmxpbmUgdG9uZT1cImNyaXRpY2FsXCI+RXJyb3I6IHtlcnJvcn08L0lubGluZT59XG5cbiAgICAgICAge21haWxjaGltcEV4aXN0cyA9PT0gdHJ1ZSAmJiBtYWlsY2hpbXBEYXRhICYmIChcbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPElubGluZT5cbiAgICAgICAgICAgICAgTWFpbGNoaW1wIHVzZXIgZXhpc3RzISA8YnIgLz5cbiAgICAgICAgICAgICAgU3RyaXBlIEFjY291bnQgSUQ6IHttYWlsY2hpbXBEYXRhLnN0cmlwZUFjY291bnRJZH0gPGJyIC8+XG4gICAgICAgICAgICA8L0lubGluZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKX1cblxue21haWxjaGltcEV4aXN0cyA9PT0gZmFsc2UgJiYgKFxuICA8Qm94IGNzcz17eyBzdGFjazogXCJ5XCIsIHJvd0dhcDogXCJtZWRpdW1cIiB9fT5cbiAgICA8SW5saW5lPlxuICAgICAgSGVyZSBJIG5lZWQgdG8gc2hvdyB0aGUgb3B0aW9uIHRoYXQgd2lsbCByZWRpcmVjdCB0aGUgdXNlciB0byBNYWlsY2hpbXAuXG4gICAgPC9JbmxpbmU+XG5cbiAgICB7IXJlZGlyZWN0VXJsID8gKFxuICAgICAgPEJ1dHRvblxuICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgIG9uUHJlc3M9e2FzeW5jICgpID0+IHtcbiAgICAgICAgICBzZXRFcnJvcihudWxsKTtcbiAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBzdGFydE1haWxjaGltcE9BdXRoKCk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTsgLy8gbG9hZGluZyBkb25lLCBub3cgc2hvdyBsaW5rXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXRFcnJvcigoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgID5cbiAgICAgICAgQ29ubmVjdCBNYWlsY2hpbXBcbiAgICAgIDwvQnV0dG9uPlxuICAgICkgOiAoXG4gICAgICAvLyBTaG93IHRoZSB1c2VyIGEgbGluayB0byBjbGljayB0byBjb250aW51ZSB0aGUgT0F1dGhcbiAgICAgIDxMaW5rXG4gICAgICAgIGhyZWY9e3JlZGlyZWN0VXJsfVxuICAgICAgICB0YXJnZXQ9XCJfc2VsZlwiIC8vIG9wZW4gaW4gc2FtZSB0YWJcbiAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgID5cbiAgICAgICAgQ2xpY2sgaGVyZSB0byBjb25uZWN0IE1haWxjaGltcFxuICAgICAgPC9MaW5rPlxuICAgICl9XG4gIDwvQm94PlxuKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQ29udGV4dFZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIiwgImltcG9ydCB7XG4gIEJveCxcbiAgQ29udGV4dFZpZXcsXG4gIERpdmlkZXIsXG4gIElubGluZSxcbiAgTGluayxcbn0gZnJvbSBcIkBzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aVwiO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tIFwiQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHRcIjtcblxuaW1wb3J0IEJyYW5kSWNvbiBmcm9tIFwiLi9icmFuZF9pY29uLnN2Z1wiO1xuXG4vKipcbiAqIFRoaXMgaXMgYSB2aWV3IHRoYXQgaXMgcmVuZGVyZWQgaW4gdGhlIFN0cmlwZSBkYXNoYm9hcmQncyBjdXN0b21lciBsaXN0IHBhZ2UuXG4gKiBJbiBzdHJpcGUtYXBwLmpzb24sIHRoaXMgdmlldyBpcyBjb25maWd1cmVkIHdpdGggc3RyaXBlLmRhc2hib2FyZC5jdXN0b21lci5saXN0IHZpZXdwb3J0LlxuICogWW91IGNhbiBhZGQgYSBuZXcgdmlldyBieSBydW5uaW5nIFwic3RyaXBlIGFwcHMgYWRkIHZpZXdcIiBmcm9tIHRoZSBDTEkuXG4gKi9cbmNvbnN0IEN1c3RvbWVycyA9ICh7IHVzZXJDb250ZXh0LCBlbnZpcm9ubWVudCB9OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXdcbiAgICAgIHRpdGxlPVwiQ3VzdG9tZXJzIHBhZ2VcIlxuICAgICAgYnJhbmRDb2xvcj1cIiNGNkY4RkFcIiAvLyByZXBsYWNlIHRoaXMgd2l0aCB5b3VyIGJyYW5kIGNvbG9yXG4gICAgICBicmFuZEljb249e0JyYW5kSWNvbn0gLy8gcmVwbGFjZSB0aGlzIHdpdGggeW91ciBicmFuZCBpY29uXG4gICAgICBleHRlcm5hbExpbms9e3tcbiAgICAgICAgbGFiZWw6IFwiU3RyaXBlIEFwcHMgZG9jc1wiLFxuICAgICAgICBocmVmOiBcImh0dHBzOi8vc3RyaXBlLmNvbS9kb2NzL3N0cmlwZS1hcHBzXCIsXG4gICAgICB9fVxuICAgICAgZm9vdGVyQ29udGVudD17XG4gICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkJvdHRvbTogXCJtZWRpdW1cIiB9fT5cbiAgICAgICAgICBRdWVzdGlvbnM/IEdldCBoZWxwIHdpdGggeW91ciBhcHAgZnJvbSB0aGV7XCIgXCJ9XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGV4dGVybmFsXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdHJpcGUuY29tL2RvY3Mvc3RyaXBlLWFwcHNcIlxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFN0cmlwZSBBcHBzIGRvY3NcbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgLFxuICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICBleHRlcm5hbFxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC5zdHJpcGUuY29tL1wiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgU3RyaXBlIFN1cHBvcnRcbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgLCBvciB0aGV7XCIgXCJ9XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGV4dGVybmFsXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kaXNjb3JkLmNvbS9pbnZpdGUvc3RyaXBlXCJcbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBTdHJpcGUgRGV2ZWxvcGVycyBEaXNjb3JkXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIC5cbiAgICAgICAgPC9Cb3g+XG4gICAgICB9XG4gICAgPlxuICAgICAgPEJveCBjc3M9e3sgc3RhY2s6IFwieVwiLCByb3dHYXA6IFwibGFyZ2VcIiB9fT5cbiAgICAgICAgPEJveD5cbiAgICAgICAgICBDbGljayBvbiBhIGN1c3RvbWVyIChvciBjcmVhdGUgYSBuZXcgb25lKSB0byBuYXZpZ2F0ZSB0byB0aGF0XG4gICAgICAgICAgY3VzdG9tZXImcnNxdW87cyBkZXRhaWwgdmlldy5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgIDxCb3ggY3NzPXt7IGNvbG9yOiBcImluZm9cIiB9fT5cbiAgICAgICAgICBFZGl0IHRoZSBmaWxle1wiIFwifVxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsIHdvcmRCcmVhazogXCJicmVhay1hbGxcIiB9fT5cbiAgICAgICAgICAgIHNyYy92aWV3cy9DdXN0b21lcnMudHN4XG4gICAgICAgICAgPC9JbmxpbmU+e1wiIFwifVxuICAgICAgICAgIGFuZCBzYXZlIHRvIHJlbG9hZCB0aGlzIHZpZXcuXG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9Db250ZXh0Vmlldz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEN1c3RvbWVycztcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgQ29udGV4dFZpZXcsXG4gIERpdmlkZXIsXG4gIEljb24sXG4gIElubGluZSxcbiAgTGluayxcbn0gZnJvbSBcIkBzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aVwiO1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25Db250ZXh0VmFsdWUgfSBmcm9tIFwiQHN0cmlwZS91aS1leHRlbnNpb24tc2RrL2NvbnRleHRcIjtcbmltcG9ydCB7IGNsaXBib2FyZFdyaXRlVGV4dCB9IGZyb20gXCJAc3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdXRpbHNcIjtcblxuaW1wb3J0IEJyYW5kSWNvbiBmcm9tIFwiLi9icmFuZF9pY29uLnN2Z1wiO1xuXG4vKipcbiAqIFRoaXMgaXMgYSB2aWV3IHRoYXQgaXMgcmVuZGVyZWQgaW4gdGhlIFN0cmlwZSBkYXNoYm9hcmQncyBjdXN0b21lciBkZXRhaWwgcGFnZS5cbiAqIEluIHN0cmlwZS1hcHAuanNvbiwgdGhpcyB2aWV3IGlzIGNvbmZpZ3VyZWQgd2l0aCBzdHJpcGUuZGFzaGJvYXJkLmN1c3RvbWVyLmRldGFpbCB2aWV3cG9ydC5cbiAqIFlvdSBjYW4gYWRkIGEgbmV3IHZpZXcgYnkgcnVubmluZyBcInN0cmlwZSBhcHBzIGFkZCB2aWV3XCIgZnJvbSB0aGUgQ0xJLlxuICovXG5jb25zdCBDdXN0b21lckRldGFpbHMgPSAoe1xuICB1c2VyQ29udGV4dCxcbiAgZW52aXJvbm1lbnQsXG59OiBFeHRlbnNpb25Db250ZXh0VmFsdWUpID0+IHtcbiAgY29uc3QgQ0xJUEJPQVJEX1RFWFQgPSBcInN0cmlwZSBhcHBzIGFkZCB2aWV3XCI7XG5cbiAgY29uc3Qgd3JpdGVUb0NsaXBib2FyZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2xpcGJvYXJkV3JpdGVUZXh0KENMSVBCT0FSRF9URVhUKTtcbiAgICAgIC8vIFdyaXRpbmcgdG8gdGhlIGNsaXBib2FyZCBzdWNjZWVkZWRcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBXcml0aW5nIHRvIHRoZSBjbGlwYm9hcmQgZmFpbGVkXG4gICAgICBjb25zb2xlLmVycm9yKFwiV3JpdGluZyB0byB0aGUgY2xpcGJvYXJkIGZhaWxlZC5cIik7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXdcbiAgICAgIHRpdGxlPVwiQ3VzdG9tZXIgZGV0YWlscyBwYWdlXCJcbiAgICAgIGJyYW5kQ29sb3I9XCIjRjZGOEZBXCIgLy8gcmVwbGFjZSB0aGlzIHdpdGggeW91ciBicmFuZCBjb2xvclxuICAgICAgYnJhbmRJY29uPXtCcmFuZEljb259IC8vIHJlcGxhY2UgdGhpcyB3aXRoIHlvdXIgYnJhbmQgaWNvblxuICAgICAgZXh0ZXJuYWxMaW5rPXt7XG4gICAgICAgIGxhYmVsOiBcIlN0cmlwZSBBcHBzIGRvY3NcIixcbiAgICAgICAgaHJlZjogXCJodHRwczovL3N0cmlwZS5jb20vZG9jcy9zdHJpcGUtYXBwc1wiLFxuICAgICAgfX1cbiAgICAgIGZvb3RlckNvbnRlbnQ9e1xuICAgICAgICA8PlxuICAgICAgICAgIDxCb3ggY3NzPXt7IG1hcmdpbkJvdHRvbTogXCJtZWRpdW1cIiB9fT5cbiAgICAgICAgICAgIFF1ZXN0aW9ucz8gR2V0IGhlbHAgd2l0aCB5b3VyIGFwcCBmcm9tIHRoZXtcIiBcIn1cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgIGV4dGVybmFsXG4gICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3N0cmlwZS5jb20vZG9jcy9zdHJpcGUtYXBwc1wiXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgIHR5cGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTdHJpcGUgQXBwcyBkb2NzXG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICBleHRlcm5hbFxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdXBwb3J0LnN0cmlwZS5jb20vXCJcbiAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgdHlwZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFN0cmlwZSBTdXBwb3J0XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAsIG9yIHRoZXtcIiBcIn1cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgIGV4dGVybmFsXG4gICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS9zdHJpcGVcIlxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICB0eXBlPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgU3RyaXBlIERldmVsb3BlcnMgRGlzY29yZFxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgLlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8Lz5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8Qm94IGNzcz17eyBmb250OiBcImhlYWRpbmdcIiB9fT5OZXh0IHN0ZXBzPC9Cb3g+XG4gICAgICA8Qm94IGNzcz17eyBzdGFjazogXCJ5XCIsIHJvd0dhcDogXCJsYXJnZVwiIH19PlxuICAgICAgICB7LyogVUkgQ29tcG9uZW50cyByZXNvdXJjZSAqL31cbiAgICAgICAgPEJveD5cbiAgICAgICAgICBCdWlsZCB5b3VyIGFwcCB3aXRoIHRoZXNle1wiIFwifVxuICAgICAgICAgIDxJbmxpbmU+XG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICBleHRlcm5hbFxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9kb2NzLnN0cmlwZS5jb20vc3RyaXBlLWFwcHMvY29tcG9uZW50c1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVJIENvbXBvbmVudHMuXG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIHsvKiBDcmVhdGluZyBhIG5ldyB2aWV3ICovfVxuICAgICAgICA8Qm94PlxuICAgICAgICAgIFRvIGNyZWF0ZSBtb3JlIHZpZXdzIGZvciB5b3VyIGFwcCB1c2VcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgICAgc3RhY2s6IFwieFwiLFxuICAgICAgICAgICAgICBkaXN0cmlidXRlOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIEV4YW1wbGUgb2YgYSBVSSBFeHRlbnNpb24gU0RLIG1ldGhvZDogaHR0cHM6Ly9kb2NzLnN0cmlwZS5jb20vc3RyaXBlLWFwcHMvcmVmZXJlbmNlL2V4dGVuc2lvbnMtc2RrLWFwaSNmdW5jdGlvbnMgKi99XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgICAgIGFsaWduU2VsZlk6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJjb250YWluZXJcIixcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwibWVkaXVtXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogXCJzbWFsbFwiLFxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICQge0NMSVBCT0FSRF9URVhUfVxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8Qm94IGNzcz17eyBhbGlnblNlbGZZOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e3dyaXRlVG9DbGlwYm9hcmR9PlxuICAgICAgICAgICAgICAgIDxJY29uIHNpemU9XCJzbWFsbFwiIG5hbWU9XCJjbGlwYm9hcmRcIiAvPlxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94PlxuICAgICAgICAgIExlYXJuIG1vcmUgYWJvdXQgdmlld3MsIGF1dGhlbnRpY2F0aW9uLCBhbmQgYWNjZXNzaW5nIGRhdGEgaW57XCIgXCJ9XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGV4dGVybmFsXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdHJpcGUuY29tL2RvY3Mvc3RyaXBlLWFwcHNcIlxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBTdHJpcGUgQXBwcyBkb2NzXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIC5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgIDxCb3ggY3NzPXt7IGNvbG9yOiBcImluZm9cIiB9fT5cbiAgICAgICAgICBFZGl0IHRoZSBmaWxle1wiIFwifVxuICAgICAgICAgIDxJbmxpbmUgY3NzPXt7IGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIgfX0+XG4gICAgICAgICAgICBzcmMvdmlld3MvQ3VzdG9tZXJEZXRhaWxzLnRzeFxuICAgICAgICAgIDwvSW5saW5lPntcIiBcIn1cbiAgICAgICAgICBhbmQgc2F2ZSB0byByZWxvYWQgdGhpcyB2aWV3LlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQ29udGV4dFZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21lckRldGFpbHM7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7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QUFBLElBQ3ZCLGdCQUFnQjtBQUFBLE1BQ2QsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLFlBQVk7QUFBQSxVQUNaLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsWUFBWTtBQUFBLFVBQ1osYUFBYTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxZQUFZO0FBQUEsVUFDWixhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLDJCQUEyQjtBQUFBLFFBQ3pCLGVBQWU7QUFBQSxRQUNmLGFBQWE7QUFBQSxRQUNiLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCO0FBQUEsRUFDdkI7IiwKICAibmFtZXMiOiBbImNsaXBib2FyZFdyaXRlVGV4dCIsICJmZXRjaCIsICJmZXRjaFN0cmlwZVNpZ25hdHVyZSIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfdWkiLCAiaW1wb3J0X3V0aWxzIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
