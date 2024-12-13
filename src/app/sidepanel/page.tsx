"use client";

import { useEffect, useState } from "react";
import { meet, MeetSidePanelClient } from "@googleworkspace/meet-addons/meet.addons";
import { ACTIVITY_SIDE_PANEL_URL, CLOUD_PROJECT_NUMBER, MAIN_STAGE_URL } from "../constants";
import Link from "next/link";

/**
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
export default function Page() {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

  /**
   * Starts the add-on activity and passes the selected color to the Main Stage,
   * as part of the activity starting state.
   */
  async function startCollaboration() {
    if (!sidePanelClient) {
      throw new Error("Side Panel is not yet initialized!");
    }

    const startingColor = (document.getElementById("starting-color")! as HTMLInputElement).value;
    try {
      const colab = await sidePanelClient.startActivity({
        mainStageUrl: MAIN_STAGE_URL,
        sidePanelUrl: ACTIVITY_SIDE_PANEL_URL,
        // Pass the selected color to customize the initial display.
        additionalData: `{\"startingColor\": \"${startingColor}\"}`,
      });

      console.log({ colab });

      window.location.replace(ACTIVITY_SIDE_PANEL_URL + window.location.search);
    } catch (error) {
      console.log("coll>>>>", { error });
    }
  }

  async function getMeetingInfo() {
    if (!sidePanelClient) {
      throw new Error("Side Panel is not yet initialized!");
    }

    try {
      const meetingInfo = await sidePanelClient.getMeetingInfo();
      console.log({ meetingInfo });
    } catch (error) {
      console.log("meeting>>>>", { error });
    }
  }

  useEffect(() => {
    /**
     * Initializes the Add-on Side Panel Client.
     * https://developers.google.com/meet/add-ons/reference/websdk/addon_sdk.meetsidepanelclient
     */
    async function initializeSidePanelClient() {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        console.log({ session });

        const client = await session.createSidePanelClient();
        console.log({ client });

        setSidePanelClient(client);
      } catch (error) {
        console.log({ error });
      }
    }
    initializeSidePanelClient();
  }, []);

  return (
    <>
      <div>Welcome to Cdial Plugin This is a demo add-on.</div>
      <label htmlFor="starting-color">Pick a color you like. Everyone will see this:</label>
      <input
        aria-label="Color picker for animation in main stage"
        type="color"
        id="starting-color"
        name="starting-color"
        defaultValue="#00ff00"
      />
      <br />
      <br />
      <Link href={"/about"}>Lets go to about us page</Link>
      <br />
      <button aria-label="Launch activity for all participants" onClick={startCollaboration}>
        Start activity
      </button>
      {sidePanelClient && (
        <button aria-label="Get meeting Information" onClick={getMeetingInfo}>
          Get meeting Information
        </button>
      )}
    </>
  );
}
