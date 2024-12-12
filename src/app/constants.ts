// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Identifier for the Cloud Project that is used to configure this add-on's
 * manifest and Google Workspace Marketplace listing.
 * @see {@link https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects}
 */
export const CLOUD_PROJECT_NUMBER = "903305509493";

export const SITE_BASE = "https://googleworkspace.github.io/meet/animation-next-js";

/**
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#main-stage}
 */
export const MAIN_STAGE_URL = SITE_BASE + "/mainstage";
/**
 * The page that displays in the Side Panel for the activity initiator to set
 * the activity starting state.
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
export const SIDE_PANEL_URL = SITE_BASE + "/sidepanel";
/**
 * The page that displays in the Side Panel for all participants to toggle settings.
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
export const ACTIVITY_SIDE_PANEL_URL = SITE_BASE + "/activitysidepanel";

// {
//     "addOns": {
//     "common": {
//       "name": "Cdial Sample Plugin",
//       "logoUrl": "https://res.cloudinary.com/dszxa5mey/image/upload/v1733972097/indigenious-icon_ckycxu.png"
//     },
//     "meet": {
//       "web": {
//         "sidePanelUri": "https://plugin-52d00o75e-nelsons-projects-814b47aa.vercel.app",
//         "addOnOrigins": ["https://plugin-52d00o75e-nelsons-projects-814b47aa.vercel.app"],
//         "darkModeLogoUrl": "https://res.cloudinary.com/dszxa5mey/image/upload/v1733972097/indigenious-icon_ckycxu.png",
//         "logoUrl": "https://res.cloudinary.com/dszxa5mey/image/upload/v1733972097/indigenious-icon_ckycxu.png",
//         "supportsScreenSharing": true
//       }
//     }
//   }
// }
