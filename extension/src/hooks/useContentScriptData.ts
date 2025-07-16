import { useState, useEffect, useCallback } from "react";

export function useContentScriptData<T>(message: unknown) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab?.id) {
        browser.tabs.sendMessage(tab.id, message, (response) => {
          if (browser.runtime.lastError) {
            setError(browser.runtime.lastError.message);
            setIsLoading(false);
            return;
          }
          setData(response);
          setIsLoading(false);
        });
      } else {
        setError("No active tab found.");
        setIsLoading(false);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred.");
      setIsLoading(false);
    }
  }, [message]);

  // Called every time the popup opens
  useEffect(() => {
    void refresh();
  }, []);

  return { response: data, error, isLoading, refresh };
}
