import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// プラグインを拡張
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getServerSideProps() {
  // サーバー側で現在の時間をJSTに変換
  const serverTime = dayjs("2020-12-1").format("YYYY-MM-DD");

  console.log(serverTime);
  return {
    props: { serverTime },
  };
}

export default function Home({ serverTime }: { serverTime: string }) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    // クライアント側の現在の時間をJSTに変換
    setClientTime(dayjs("2020-12-1").format("YYYY-MM-DD"));
  }, []);

  // 時間差を計算 (ミリ秒単位)
  const timeDifference = clientTime
    ? dayjs(clientTime).diff(dayjs(serverTime))
    : null;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>SSR Time Test with Day.js</h1>
      <p>
        <strong>Server Time3333:</strong> {serverTime}
      </p>
      <p>
        <strong>Client Time22222:</strong> {clientTime}
      </p>
      <p>
        <strong>Time Difference:</strong>{" "}
        {timeDifference !== null ? `${timeDifference} ms` : "Calculating..."}
      </p>
    </div>
  );
}
