import { useEffect } from "react";

export default function CFsecret() {
  useEffect(() => {
    window.turnstile.ready(function () {
      window.turnstile.render("#cfsc", {
        sitekey: `${import.meta.env.VITE_CF_SECRET_KEY}`,
        callback: async (token: any) => {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/check-cf`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );
          const data = await response.json();
          console.log(`Challenge Success ${token}`);
          console.log(`Challenge Success dataa ${data}`);
        },
      });
    });
  }, []);
  return <div id="cfsc" className="my-3" />;
}
