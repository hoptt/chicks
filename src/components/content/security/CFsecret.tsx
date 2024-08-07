import { useEffect } from "react";

type Props = {
  handleCf: (status: number) => void;
};
export default function CFsecret({ handleCf }: Props) {
  useEffect(() => {
    window.turnstile.ready(function () {
      window.turnstile.render("#cfsc", {
        sitekey: `${import.meta.env.VITE_CF_SECRET_KEY}`,
        callback: async (token: any) => {
          console.log(token);
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
          console.log(JSON.stringify(data));
          handleCf(data.status);
        },
      });
    });
  }, []);
  return <div id="cfsc" className="mb-2" />;
}
