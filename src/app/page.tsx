"use client";

import { useEffect, useState } from "react";
import { meet, MeetSidePanelClient } from "@googleworkspace/meet-addons/meet.addons";
import { CLOUD_PROJECT_NUMBER } from "./constants";

export default function App() {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

  // Launches the main stage when the main button is clicked.
  async function startActivity() {
    if (!sidePanelClient) {
      throw new Error("Side Panel is not yet initialized!");
    }
    await sidePanelClient.startActivity({
      mainStageUrl: "MAIN_STAGE_URL",
    });
  }

  /**
   * Prepares the Add-on Side Panel Client.
   */
  useEffect(() => {
    (async () => {
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        console.log({ session });

        setSidePanelClient(await session.createSidePanelClient());
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <>
      <div>This is the Add-on Side Panel. Only you can see this.</div>
      <button onClick={startActivity}>Launch Activity in Main Stage.</button>
    </>
  );
}
